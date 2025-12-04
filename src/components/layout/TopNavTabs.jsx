import React from 'react'
import { LayoutGrid, BookOpen, Target, Cpu, Sparkles } from 'lucide-react'
import { knowledgeBase } from '@/data/resources'

const pages = [
  { id: 'home', label: '主页', icon: LayoutGrid },
  { id: 'knowledge', label: '知识库', icon: BookOpen },
  { id: 'plan', label: '冲刺计划', icon: Target },
  { id: 'workbench', label: 'AI 工作台', icon: Cpu },
]

const subjectLabel = { Math: '数学一', 408: '计算机408', English: '英语一', Politics: '政治' }

const calcStats = () => {
  const total = Object.values(knowledgeBase).reduce((sum, s) => sum + (s.sections?.length || 0), 0)
  const bySubject = Object.entries(knowledgeBase).map(([k, v]) => ({
    id: k,
    count: v.sections?.length || 0,
    label: subjectLabel[k] || k,
  }))
  return { total, bySubject }
}

const stats = calcStats()

const TopNavTabs = ({ activePage, onChange }) => {
  return (
    <div className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-slate-200/80 shadow-sm shadow-slate-200 mb-6">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-3 py-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 text-white shadow-sm">
            <Sparkles size={14} className="text-amber-300" />
            <span className="text-sm font-semibold">研路导航</span>
          </div>
          <div className="flex gap-2 items-center">
            {pages.map((p) => {
              const Icon = p.icon
              const active = activePage === p.id
              return (
                <button
                  key={p.id}
                  onClick={() => onChange(p.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all border ${
                    active
                      ? 'bg-gradient-to-r from-cyan-500 to-amber-400 text-white border-transparent shadow'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  <Icon size={16} />
                  {p.label}
                </button>
              )
            })}
          </div>
        </div>
        <div className="hidden md:flex items-center gap-3 text-xs text-slate-600">
          <span className="px-2 py-1 rounded-full bg-slate-100 border border-slate-200">
            知识点总数：{stats.total}
          </span>
          {stats.bySubject.map((s) => (
            <span
              key={s.id}
              className="px-2.5 py-1 rounded-full bg-white border border-slate-200 shadow-sm"
            >
              {s.label}: {s.count}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TopNavTabs
