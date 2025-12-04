import fs from 'node:fs'
import path from 'node:path'
import { mathKnowledge } from '../src/data/knowledge/math.js'
import { cs408Knowledge } from '../src/data/knowledge/cs408.js'
import { englishKnowledge } from '../src/data/knowledge/english.js'
import { politicsKnowledge } from '../src/data/knowledge/politics.js'

const subjects = {
  Math: mathKnowledge,
  '计算机408': cs408Knowledge,
  '英语一': englishKnowledge,
  政治: politicsKnowledge,
}

const ensureSecondary = (item) => {
  const set = new Set()
  const push = (txt) => {
    if (!txt) return
    const clean = String(txt).trim()
    if (clean.length) set.add(clean)
  }
  ;(item.secondaryConclusions || []).forEach(push)
  ;(item.examTips || []).forEach(push)
  ;(item.memoryTips || []).forEach(push)
  ;(item.triggers || []).forEach((t) => push(`看到【${t}】应联想本考点。`))
  ;(item.mistakes || []).forEach((m) => push(`避免误区：${m}`))
  ;(item.classicProblems || []).forEach((p) => push(`例题提示：${p.description || p.title || ''}`))
  push(item.detailedAnalysis)
  push(item.content)

  // 保底至少 5 条
  if (set.size === 0 && item.content) push(item.content)
  const fillers = [
    `必背定义：${item.title}`,
    `常考公式/框架：结合本章节核心公式或逻辑链条作答。`,
    `易混点：与同类概念区分后写出关键差异。`,
    `套路：先写结论→理由→例证→收束，应对选择/简答/大题。`,
    `应试：书写 3-5 句闭环，注意因果/条件/对比衔接词。`,
  ]
  let i = 0
  while (set.size < 5) {
    push(fillers[i % fillers.length])
    i++
  }
  return Array.from(set).slice(0, 8)
}

const explain = (item) => {
  return (
    item.detailedAnalysis ||
    item.content ||
    item.classicProblems?.[0]?.description ||
    `核心概念：${item.title}，关注 ${item.category} / ${item.subcategory} 的定义、性质与应用。`
  )
}

const groupBy = (arr, keyFn) => {
  return arr.reduce((acc, cur) => {
    const k = keyFn(cur)
    acc[k] = acc[k] || []
    acc[k].push(cur)
    return acc
  }, {})
}

const lines = []
lines.push(`# Clarified Knowledge Points`)
lines.push(`生成时间：${new Date().toISOString()}`)
lines.push('')

const bucket = (freq = 0) => {
  if (freq >= 9) return '高'
  if (freq >= 6) return '中'
  return '低'
}

Object.entries(subjects).forEach(([subject, items]) => {
  // Top 30 focus list
  lines.push(`## ${subject} 重点 Top30（按频度排序，出题概率：高/中/低）`)
  const top30 = [...items]
    .sort((a, b) => (b.frequency || 0) - (a.frequency || 0))
    .slice(0, 30)
  top30.forEach((item, idx) => {
    lines.push(
      `- ${idx + 1}. ${item.title}（分类：${item.category}${
        item.subcategory ? ' / ' + item.subcategory : ''
      }；频度=${item.frequency ?? '—'}；概率=${bucket(item.frequency)})`
    )
  })
  lines.push('')

  lines.push(`## ${subject}`)
  const byCat = groupBy(items, (i) => `${i.category} / ${i.subcategory || '未分组'}`)
  Object.entries(byCat).forEach(([cat, arr]) => {
    lines.push(`### ${cat}`)
    arr.forEach((item) => {
      const sec = ensureSecondary(item)
      lines.push(`- **${item.title}** (难度: ${item.difficulty || '—'}, 高频: ${item.frequency ?? '—'})`)
      lines.push(`  - 讲解：${explain(item)}`)
      sec.forEach((s) => lines.push(`  - 二级结论：${s}`))
      if (item.mistakes?.length) {
        lines.push(`  - 易错点：${item.mistakes.slice(0, 3).join('；')}`)
      }
      if (item.examTips?.length) {
        lines.push(`  - 应试提示：${item.examTips.slice(0, 2).join('；')}`)
      }
      if (item.classicProblems?.length) {
        const cp = item.classicProblems[0]
        lines.push(`  - 例题：${cp.title || '典型题'} — ${cp.description || ''}`)
      }
    })
    lines.push('')
  })
})

const outPath = path.join(process.cwd(), 'public', 'knowledge_clarified.md')
fs.writeFileSync(outPath, lines.join('\n'), 'utf8')
console.log(`✔ Clarified knowledge exported to ${outPath}`)
