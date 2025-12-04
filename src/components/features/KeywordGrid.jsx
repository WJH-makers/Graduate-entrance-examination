import React from 'react'
import { keywords } from '@/data/examRoadmap'

const palette = {
  OS: 'from-rose-500 to-orange-500',
  计网: 'from-cyan-500 to-blue-500',
  数据结构: 'from-emerald-500 to-teal-500',
  体系结构: 'from-indigo-500 to-purple-500',
  数学: 'from-amber-500 to-yellow-500',
}

export const KeywordGrid = () => {
  return (
    <section id="keywords" className="mb-10">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-sm text-slate-500 uppercase tracking-wide">高频考点</p>
          <h2 className="text-2xl font-bold text-slate-900">模拟卷 OCR 高频术语</h2>
        </div>
        <span className="text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
          按出现频次排序
        </span>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {keywords.map((k, idx) => (
          <div
            key={idx}
            className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <div
              className={`absolute inset-0 opacity-10 bg-gradient-to-br ${palette[k.category] || 'from-slate-200 to-slate-300'}`}
              aria-hidden
            />
            <div className="p-4 relative">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-semibold text-slate-900">{k.term}</p>
                <span className="text-xs font-semibold text-slate-500">{k.category}</span>
              </div>
              <div className="text-3xl font-bold text-slate-900">
                {k.freq}
                <span className="text-sm text-slate-500 ml-1">次</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default KeywordGrid
