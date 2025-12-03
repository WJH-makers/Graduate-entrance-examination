import React, { useState, useMemo } from 'react'
import {
  Search,
  BookOpen,
  ChevronDown,
  Filter,
  Brain,
  Calculator,
  Lightbulb,
  Link as LinkIcon,
  Star,
  Zap,
  Terminal,
  Languages,
  Scale,
  AlertTriangle,
  Clock3 as ClockIcon,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion' // eslint-disable-line no-unused-vars
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { LatexRenderer, FormulaBlock } from '../ui/LatexRenderer'
import { FrequencyBadge } from '../ui/FrequencyBadge'
import { MermaidDiagram } from '../ui/MermaidDiagram'
import { knowledgeBase } from '../../data/resources'
import { cn } from '../../utils/cn'
import { translateLabel as t } from '../../constants/labels'

// 统一知识点数据结构，确保排序/展示一致
const normalizeSection = (section) => {
  const classicProblems =
    section.classicProblems || (section.classicProblem ? [section.classicProblem] : [])
  const difficulty = ['High', 'Medium', 'Low'].includes(section.difficulty)
    ? section.difficulty
    : 'Medium'

  const comparisons = Array.isArray(section.comparisons) ? section.comparisons : []
  const triggers = Array.isArray(section.triggers)
    ? section.triggers
    : section.triggers
      ? [section.triggers]
      : []
  const timeline = Array.isArray(section.timeline) ? section.timeline : []
  const memoryTips = Array.isArray(section.memoryTips)
    ? section.memoryTips
    : section.memoryTips
      ? [section.memoryTips]
      : []
  const prerequisites = Array.isArray(section.prerequisites)
    ? section.prerequisites
    : section.prerequisites
      ? [section.prerequisites]
      : []

  const fromRecent = section.recentExams?.map((year, idx) => ({
    year,
    question: `${year} 真题同型：${section.title}`,
    answer:
      section.examTips?.[0] ||
      classicProblems[idx]?.solution ||
      classicProblems[idx]?.description ||
      section.content?.slice(0, 100),
  }))

  const fromClassic = classicProblems.length
    ? classicProblems.slice(0, 2).map((p, idx) => ({
        year: section.recentExams?.[idx] || '近年',
        question: p.title || section.title,
        answer: p.solution || p.description,
      }))
    : []

  const pastExams = section.pastExams || fromRecent || fromClassic || []

  const autoMemory = []
  if (!memoryTips.length) {
    if (triggers.length)
      autoMemory.push(`看到关键词【${triggers.slice(0, 2).join(' / ')}】立即联想本考点。`)
    if (section.tags?.length) autoMemory.push(`标签串记：${section.tags.slice(0, 3).join(' - ')}`)
    if (!autoMemory.length) autoMemory.push('画一张思维导图：定义→公式/性质→典型题。')
  }

  const autoSecondary = []
  if (!section.secondaryConclusions?.length) {
    if (section.examTips?.length) autoSecondary.push(...section.examTips.slice(0, 2))
    if (!autoSecondary.length && memoryTips.length) autoSecondary.push(...memoryTips.slice(0, 2))
  }

  return {
    tags: [],
    importance: 3,
    frequency: 5,
    ...section,
    difficulty,
    classicProblems,
    pastExams,
    comparisons,
    triggers,
    timeline,
    prerequisites,
    memoryTips: memoryTips.length ? memoryTips : autoMemory,
    secondaryConclusions: section.secondaryConclusions?.length
      ? section.secondaryConclusions
      : autoSecondary,
  }
}

const subjectIcons = {
  All: Brain,
  Math: Calculator,
  408: Terminal,
  English: Languages,
  Politics: Scale,
}

const KnowledgeSection = () => {
  // 默认展示数学，避免一次加载全部导致图谱过大
  const [selectedSubject, setSelectedSubject] = useState('Math')
  const [selectedCategory, setSelectedCategory] = useState('全部分类')
  const [selectedSubcategory, setSelectedSubcategory] = useState('全部子分类')
  const [searchTerm, setSearchTerm] = useState('')
  const [showDiagram, setShowDiagram] = useState(false)
  const [page, setPage] = useState(1)
  const pageSize = 10

  const currentSubject = useMemo(() => {
    return knowledgeBase[selectedSubject]
  }, [selectedSubject])

  const SubjectIcon = subjectIcons[selectedSubject] || Brain
  // 当筛选条件变化时重置分页
  React.useEffect(() => {
    setPage(1)
  }, [selectedSubject, selectedCategory, selectedSubcategory, searchTerm, showDiagram])

  const tooManyForDiagram = useMemo(
    () => (currentSubject?.sections?.length || 0) > 200,
    [currentSubject]
  )
  // 如果数据过多，强制回到列表视图
  React.useEffect(() => {
    if (tooManyForDiagram && showDiagram) setShowDiagram(false)
  }, [tooManyForDiagram, showDiagram])

  // 预归一化数据（附中文标签）
  const normalizedSections = useMemo(() => {
    if (!currentSubject?.sections) return []
    return currentSubject.sections.map((s) => ({
      ...normalizeSection(s),
      categoryLabel: t(s.category || '未分类'),
      subcategoryLabel: t(s.subcategory || '其他'),
    }))
  }, [currentSubject])

  // 获取所有分类和子分类（用中文标签）
  const categories = useMemo(() => {
    if (!normalizedSections.length) return ['全部分类']
    const cats = ['全部分类', ...new Set(normalizedSections.map((s) => s.categoryLabel))]
    return cats
  }, [normalizedSections])

  const subcategories = useMemo(() => {
    if (!normalizedSections.length || selectedCategory === '全部分类') return ['全部子分类']
    const subs = normalizedSections
      .filter((s) => s.categoryLabel === selectedCategory)
      .map((s) => s.subcategoryLabel)
      .filter(Boolean)
    return ['全部子分类', ...new Set(subs)]
  }, [normalizedSections, selectedCategory])

  // 筛选知识点
  const filteredSections = useMemo(() => {
    if (!normalizedSections.length) return []

    return normalizedSections.filter((section) => {
      const matchCategory =
        selectedCategory === '全部分类' || section.categoryLabel === selectedCategory
      const matchSubcategory =
        selectedSubcategory === '全部子分类' || section.subcategoryLabel === selectedSubcategory
      const matchSearch =
        searchTerm === '' ||
        section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        section.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        section.categoryLabel.toLowerCase().includes(searchTerm.toLowerCase()) ||
        section.subcategoryLabel.toLowerCase().includes(searchTerm.toLowerCase()) ||
        section.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      return matchCategory && matchSubcategory && matchSearch
    })
  }, [normalizedSections, selectedCategory, selectedSubcategory, searchTerm])

  // 按频率优先，其次难度（易→难），再按重要度
  const sortedSections = useMemo(() => {
    const diffOrder = { Low: 0, Medium: 1, High: 2 }
    return [...filteredSections].sort((a, b) => {
      const freqA = a.frequency ?? 0
      const freqB = b.frequency ?? 0
      if (freqA !== freqB) return freqB - freqA // 频率高的在前
      const dA = diffOrder[a.difficulty] ?? 1
      const dB = diffOrder[b.difficulty] ?? 1
      if (dA !== dB) return dA - dB // 难度低的在前
      const impA = a.importance ?? 0
      const impB = b.importance ?? 0
      return impB - impA
    })
  }, [filteredSections])

  const totalPages = Math.max(1, Math.ceil(sortedSections.length / pageSize))
  const paginatedSections = sortedSections.slice((page - 1) * pageSize, page * pageSize)

  // 生成知识图谱Mermaid代码
  const sanitize = (text) =>
    (text || '未命名')
      // 仅保留中英数字和常用分隔符，避免 Mermaid 语法冲突
      .replace(/[^a-zA-Z0-9\u4e00-\u9fa5：:·\\s._-]/g, '')
      .slice(0, 38)

  const mermaidChart = useMemo(() => {
    if (!currentSubject?.sections || tooManyForDiagram) return ''

    // 仅选取高频优先的前 120 个考点，避免边过多
    const topSections = [...(currentSubject.sections || [])]
      .sort((a, b) => (b.frequency || 0) - (a.frequency || 0))
      .slice(0, 120)

    const bucketOf = (freq = 0) => {
      if (freq >= 12) return '高频'
      if (freq >= 6) return '中频'
      return '低频'
    }

    const buckets = { 高频: [], 中频: [], 低频: [] }
    topSections.forEach((s) => {
      const bucket = bucketOf(s.frequency)
      const label = `${sanitize(t(s.category || ''))}：${sanitize(s.title)}`
      buckets[bucket].push(label)
    })

    let chart = 'graph LR\n'
    chart += '    %% Styles\n'
    chart +=
      '    classDef root fill:#8b5cf6,stroke:#7c3aed,stroke-width:2px,color:white,font-weight:bold;\n'
    chart +=
      '    classDef bucket fill:#06b6d4,stroke:#0891b2,stroke-width:2px,color:white,font-weight:bold;\n'
    chart += '    classDef item fill:#e0f2fe,stroke:#38bdf8,stroke-width:1px,color:#0f172a;\n'
    chart += `    ROOT[${sanitize(currentSubject.title)}]:::root\n`

    ;['高频', '中频', '低频'].forEach((bk, bi) => {
      const bId = `B${bi}`
      chart += `    ROOT --> ${bId}("${bk}考点"):::bucket\n`
      buckets[bk].forEach((label, li) => {
        const itemId = `I${bi}_${li}`
        chart += `    ${bId} --> ${itemId}("${label}"):::item\n`
      })
    })

    return chart
  }, [currentSubject, tooManyForDiagram])

  return (
    <div className="relative z-10 mb-20 section-block">
      {/* Header */}
      <div className="section-title-bar mb-4 px-1">
        <span className="bar" />
        <h2>知识体系</h2>
        <span className="pill-soft">按科目 · 分类 · 子类浏览</span>
        <div className="ml-auto flex gap-2 text-xs">
          <a
            href="/knowledge_summary.md"
            className="px-3 py-1 rounded-full border border-slate-200 text-slate-600 hover:text-cyan-600 hover:border-cyan-300 transition"
            target="_blank"
            rel="noreferrer"
          >
            下载汇总
          </a>
          <a
            href="/knowledge_shortlist.md"
            className="px-3 py-1 rounded-full border border-slate-200 text-slate-600 hover:text-cyan-600 hover:border-cyan-300 transition"
            target="_blank"
            rel="noreferrer"
          >
            冲刺清单
          </a>
        </div>
      </div>

      {/* Subject Tabs */}
      <div className="flex gap-3 mb-6 overflow-x-auto pb-2 no-scrollbar">
        {Object.keys(knowledgeBase).map((subject) => {
          const Icon = subjectIcons[subject] || Brain
          const title = knowledgeBase[subject].title
          return (
            <button
              key={subject}
              onClick={() => {
                setSelectedSubject(subject)
                setSelectedCategory('全部分类')
                setSelectedSubcategory('全部子分类')
              }}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all border whitespace-nowrap shadow-sm hover:shadow-md',
                selectedSubject === subject
                  ? 'bg-gradient-to-r from-cyan-500 to-amber-400 text-white border-transparent shadow-lg shadow-cyan-500/25'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
              )}
            >
              <Icon size={18} />
              {title}
            </button>
          )
        })}
      </div>

      {/* Filters and Search */}
      <div className="bg-gradient-to-r from-white via-sky-50 to-cyan-50 backdrop-blur-sm rounded-xl p-5 mb-6 border border-slate-200 shadow-lg shadow-cyan-100/60">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Category Filter */}
          <div>
            <label className="block text-xs text-slate-500 mb-2 font-medium">分类</label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value)
                setSelectedSubcategory('全部子分类')
              }}
              className="w-full bg-white/90 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 text-sm focus:outline-none focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-100 shadow-sm"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-gray-100 text-gray-900">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory Filter */}
          <div>
            <label className="block text-xs text-slate-500 mb-2 font-medium">子分类</label>
            <select
              value={selectedSubcategory}
              onChange={(e) => setSelectedSubcategory(e.target.value)}
              className="w-full bg-white/90 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 text-sm focus:outline-none focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-100 shadow-sm"
              disabled={selectedCategory === '全部分类'}
            >
              {subcategories.map((subcat) => (
                <option key={subcat} value={subcat} className="bg-gray-100 text-gray-900">
                  {subcat}
                </option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div>
            <label className="block text-xs text-slate-500 mb-2 font-medium">搜索</label>
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="搜索知识点..."
                className="w-full bg-white/90 border border-slate-200 rounded-lg pl-10 pr-3 py-2 text-slate-900 text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-100 shadow-sm"
              />
            </div>
          </div>
        </div>
        {/* View Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600">共 {sortedSections.length} 个知识点</span>
          {tooManyForDiagram ? (
            <span className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
              考点数量超过 300，已自动关闭知识图谱，请切换单科查看。
            </span>
          ) : (
            <button
              onClick={() => setShowDiagram(!showDiagram)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white hover:bg-slate-50 text-slate-700 transition-colors border border-slate-200"
            >
              {showDiagram ? <Filter size={16} /> : <LinkIcon size={16} />}
              {showDiagram ? '列表视图' : '知识图谱（实验）'}
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 gap-4">
        {showDiagram ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 overflow-hidden shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <LinkIcon size={20} className="text-cyan-500" />
              知识体系结构
            </h3>
            <MermaidDiagram chart={mermaidChart} />
            <p className="text-xs text-slate-500 mt-2">
              若仍提示语法错误，可切换“列表视图”继续浏览。
            </p>
          </div>
        ) : sortedSections.length > 0 ? (
          <>
            {paginatedSections.map((section) => (
              <KnowledgeCard
                key={section.id || `${section.subject}-${section.title}`}
                section={section}
              />
            ))}
            <div className="flex items-center justify-between text-sm text-slate-600 px-1">
              <span>
                第 {page} / {totalPages} 页 · 每页 {pageSize} 条
              </span>
              <div className="flex gap-2">
                <button
                  className="px-3 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  上一页
                </button>
                <button
                  className="px-3 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  下一页
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-20 text-gray-500">
            <p>未找到相关知识点</p>
          </div>
        )}
      </div>
    </div>
  )
}

const KnowledgeCard = ({ section }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-0 overflow-hidden border-slate-200 bg-white hover:bg-slate-50 transition-colors text-slate-900">
        <div
          className="p-5 cursor-pointer flex justify-between items-start gap-4 group"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                {section.title}
              </h3>
              <div className="flex gap-2">
                {section.source && (
                  <Badge
                    variant="outline"
                    size="sm"
                    className="text-violet-700 border-violet-200 bg-violet-50"
                  >
                    来源：{section.source}
                  </Badge>
                )}
                {section.subject && (
                  <Badge variant="secondary" size="sm">
                    {section.subject === '408' ? '计科408' : section.subject}
                  </Badge>
                )}
                <Badge
                  variant={
                    section.difficulty === 'High'
                      ? 'danger'
                      : section.difficulty === 'Medium'
                        ? 'warning'
                        : 'success'
                  }
                  size="sm"
                >
                  {section.difficulty === 'High'
                    ? '高频难点'
                    : section.difficulty === 'Medium'
                      ? '中等难度'
                      : '基础考点'}
                </Badge>
                {section.category && (
                  <Badge
                    variant="default"
                    className="bg-slate-100 text-slate-600 border-slate-200"
                    size="sm"
                  >
                    {t(section.category)}
                  </Badge>
                )}
                {section.examFrequency && (
                  <FrequencyBadge
                    frequency={section.examFrequency}
                    recentExams={section.recentExams || []}
                    showStars={false}
                  />
                )}
              </div>
              {section.importance && (
                <div className="flex gap-0.5">
                  {[...Array(section.importance)].map((_, i) => (
                    <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {section.tags &&
                section.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded"
                  >
                    #{tag}
                  </span>
                ))}
            </div>
            <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all">
              {section.content}
            </p>
          </div>
          <div
            className={cn(
              'w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center transition-all duration-300 group-hover:bg-slate-200 mt-1 flex-shrink-0',
              isOpen ? 'rotate-180 bg-cyan-100 text-cyan-600' : 'text-slate-500'
            )}
          >
            <ChevronDown size={18} />
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden bg-black/20"
            >
              <div className="p-5 border-t border-white/5 space-y-6">
                {/* Detailed Analysis */}
                {section.detailedAnalysis && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-cyan-300 mb-1">
                      <Search size={14} />
                      <span className="font-bold text-xs uppercase tracking-wider">深度解析</span>
                    </div>
                    <div className="bg-cyan-500/5 rounded-lg p-4 border border-cyan-500/10">
                      <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                        {section.detailedAnalysis}
                      </p>
                    </div>
                  </div>
                )}

                {/* Secondary Conclusions (New Feature) */}
                {section.secondaryConclusions && section.secondaryConclusions.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-amber-700 mb-1">
                      <Zap size={14} />
                      <span className="font-bold text-xs uppercase tracking-wider">
                        秒杀结论 (二级结论)
                      </span>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-amber-200 space-y-2">
                      {section.secondaryConclusions.map((conclusion, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="text-amber-500 mt-1">•</span>
                          <p className="text-slate-800 text-sm leading-relaxed">{conclusion}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Formulas */}
                {section.formulas && section.formulas.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-violet-300 mb-2">
                      <Calculator size={14} />
                      <span className="font-bold text-xs uppercase tracking-wider">核心公式</span>
                    </div>
                    <div className="space-y-4">
                      {section.formulas.map((formula, idx) => (
                        <FormulaBlock
                          key={idx}
                          label={formula.label}
                          latex={formula.latex}
                          description={formula.description}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Exam Tips */}
                {section.examTips && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-amber-700 mb-1">
                      <Lightbulb size={14} />
                      <span className="font-bold text-xs uppercase tracking-wider">备考点拨</span>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-amber-200">
                      <ul className="list-disc list-inside space-y-1">
                        {section.examTips.map((tip, i) => (
                          <li key={i} className="text-slate-800 text-sm">
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Memory techniques */}
                {section.memoryTips && section.memoryTips.length > 0 && (
                  <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 space-y-2">
                    <div className="flex items-center gap-2 text-teal-700">
                      <Brain size={14} />
                      <span className="font-bold text-xs uppercase tracking-wider">记忆技巧</span>
                    </div>
                    <ul className="list-disc list-inside space-y-1">
                      {section.memoryTips.map((tip, i) => (
                        <li key={i} className="text-slate-800 text-sm leading-relaxed">
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Mistakes */}
                {section.mistakes && section.mistakes.length > 0 && (
                  <div className="bg-red-500/5 border border-red-500/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-red-400 mb-2">
                      <AlertTriangle size={14} />
                      <span className="font-bold text-xs uppercase tracking-wider">易错点</span>
                    </div>
                    <ul className="list-disc list-inside space-y-1">
                      {section.mistakes.map((mistake, i) => (
                        <li key={i} className="text-gray-400 text-sm">
                          {mistake}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Scene & Triggers */}
                {(section.scene || (section.triggers && section.triggers.length > 0)) && (
                  <div className="bg-blue-500/5 border border-blue-500/10 rounded-lg p-4 space-y-2">
                    <div className="flex items-center gap-2 text-blue-300">
                      <Terminal size={14} />
                      <span className="font-bold text-xs uppercase tracking-wider">题型/触发</span>
                    </div>
                    {section.scene && (
                      <p className="text-gray-200 text-sm leading-relaxed">{section.scene}</p>
                    )}
                    {section.triggers && section.triggers.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {section.triggers.map((tr, idx) => (
                          <Badge key={idx} variant="secondary" size="xs">
                            {tr}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Comparisons */}
                {section.comparisons && section.comparisons.length > 0 && (
                  <div className="bg-amber-500/5 border border-amber-500/10 rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-2 text-amber-300">
                      <Scale size={14} />
                      <span className="font-bold text-xs uppercase tracking-wider">对比辨析</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      {section.comparisons.slice(0, 4).map((cmp, idx) => (
                        <div
                          key={idx}
                          className="bg-white/5 border border-white/10 rounded-md p-3 space-y-1"
                        >
                          <div className="text-sm text-white font-semibold flex justify-between">
                            <span>{cmp.left}</span>
                            <span className="text-gray-400">vs</span>
                            <span>{cmp.right}</span>
                          </div>
                          {cmp.keyDiff && (
                            <p className="text-xs text-gray-300 leading-relaxed">{cmp.keyDiff}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Timeline (for politics/史纲) */}
                {section.timeline && section.timeline.length > 0 && (
                  <div className="bg-purple-500/5 border border-purple-500/10 rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-2 text-purple-300">
                      <ClockIcon size={14} />
                      <span className="font-bold text-xs uppercase tracking-wider">时间线</span>
                    </div>
                    <div className="space-y-2">
                      {section.timeline.slice(0, 5).map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <Badge variant="outline" size="xs">
                            {item.year}
                          </Badge>
                          <div className="space-y-0.5">
                            <p className="text-gray-200 text-sm">{item.event}</p>
                            {item.meaning && (
                              <p className="text-gray-400 text-xs">意义：{item.meaning}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Official / quote chunk */}
                {section.quoteChunk && (
                  <div className="bg-cyan-500/5 border border-cyan-500/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-cyan-300 mb-1">
                      <BookOpen size={14} />
                      <span className="font-bold text-xs uppercase tracking-wider">背诵块</span>
                    </div>
                    <p className="text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">
                      {section.quoteChunk}
                    </p>
                  </div>
                )}

                {/* 经典例题 */}
                {section.classicProblems && section.classicProblems.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-cyan-700">
                      <BookOpen size={14} />
                      <span className="font-bold text-xs uppercase tracking-wider">经典例题</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      {section.classicProblems.slice(0, 4).map((problem, idx) => (
                        <div
                          key={idx}
                          className="bg-white rounded-lg p-4 border border-slate-200 space-y-2 shadow-sm"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-slate-900 text-sm font-semibold">
                              {problem.title || `例题 ${idx + 1}`}
                            </span>
                            <Badge
                              variant="outline"
                              size="xs"
                              className="text-slate-700 border-slate-300"
                            >
                              {problem.label || `Q${idx + 1}`}
                            </Badge>
                          </div>
                          {problem.description && (
                            <p className="text-slate-700 text-sm leading-relaxed">
                              {problem.description}
                            </p>
                          )}
                          {problem.solution && (
                            <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                              <p className="text-slate-900 text-sm leading-relaxed whitespace-pre-wrap">
                                {problem.solution}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 题型预测 */}
                {section.prediction && (
                  <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-lg p-4 space-y-2">
                    <div className="flex items-center gap-2 text-indigo-300">
                      <Zap size={14} />
                      <span className="font-bold text-xs uppercase tracking-wider">题型预测</span>
                    </div>
                    <p className="text-gray-200 text-sm">
                      主题：{section.prediction.topic} · 设问模式：{section.prediction.pattern}
                    </p>
                    {section.prediction.prob && (
                      <p className="text-gray-400 text-xs">
                        命中概率估计：{Math.round(section.prediction.prob * 100)}%
                      </p>
                    )}
                  </div>
                )}

                {/* Related Points */}
                {section.relatedPoints && section.relatedPoints.length > 0 && (
                  <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                    <LinkIcon size={14} className="text-gray-500" />
                    <span className="text-xs text-gray-500">关联考点:</span>
                    <div className="flex gap-2">
                      {section.relatedPoints.map((pointId) => (
                        <Badge
                          key={pointId}
                          variant="outline"
                          size="xs"
                          className="text-gray-400 border-gray-700"
                        >
                          {pointId}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  )
}

export default KnowledgeSection
