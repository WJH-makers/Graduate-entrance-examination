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

  // 保底给 2 条
  if (set.size === 0 && item.content) push(item.content)
  if (set.size < 2 && item.classicProblems?.length) {
    push(item.classicProblems[0].description)
  }
  while (set.size < 2) {
    push(`重点：掌握 ${item.title} 的定义与典型题。`)
  }
  return Array.from(set).slice(0, 4)
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

Object.entries(subjects).forEach(([subject, items]) => {
  lines.push(`## ${subject}`)
  const byCat = groupBy(items, (i) => `${i.category} / ${i.subcategory || '未分组'}`)
  Object.entries(byCat).forEach(([cat, arr]) => {
    lines.push(`### ${cat}`)
    arr.forEach((item) => {
      const sec = ensureSecondary(item)
      lines.push(`- **${item.title}** (难度: ${item.difficulty || '—'}, 高频: ${item.frequency ?? '—'})`)
      lines.push(`  - 讲解：${explain(item)}`)
      sec.forEach((s) => lines.push(`  - 二级结论：${s}`))
    })
    lines.push('')
  })
})

const outPath = path.join(process.cwd(), 'public', 'knowledge_clarified.md')
fs.writeFileSync(outPath, lines.join('\n'), 'utf8')
console.log(`✔ Clarified knowledge exported to ${outPath}`)
