import React, { useMemo, useState } from 'react'
import { sourceItems } from '@/data/examRoadmap'
import { cn } from '@/utils/cn'

const colorMap = {
  violet: 'bg-violet-100 text-violet-700',
  amber: 'bg-amber-100 text-amber-700',
  cyan: 'bg-cyan-100 text-cyan-700',
  blue: 'bg-blue-100 text-blue-700',
  slate: 'bg-slate-100 text-slate-700',
  emerald: 'bg-emerald-100 text-emerald-700',
}

const uniqueSources = ['全部', ...Array.from(new Set(sourceItems.map((i) => i.source)))]

export const SourceBoard = () => {
  const [active, setActive] = useState('全部')

  const filtered = useMemo(() => {
    if (active === '全部') return sourceItems
    return sourceItems.filter((i) => i.source === active)
  }, [active])

  return (
    <section id="sources" className="mb-10">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-sm text-slate-500 uppercase tracking-wide">权威信息</p>
          <h2 className="text-2xl font-bold text-slate-900">近三个月官方/媒体资讯</h2>
        </div>
        <div className="flex gap-2 overflow-x-auto max-w-[520px] pr-2">
          {uniqueSources.map((src) => (
            <button
              key={src}
              onClick={() => setActive(src)}
              className={cn(
                'px-3 py-1 text-xs rounded-full border transition-colors whitespace-nowrap',
                active === src
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
              )}
            >
              {src}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((item, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-900">{item.source}</span>
                <span className="text-xs text-slate-500">{item.date}</span>
              </div>
              <span
                className={cn(
                  'px-2 py-1 text-[11px] font-semibold rounded-full',
                  colorMap[item.color] || 'bg-slate-100 text-slate-700'
                )}
              >
                {item.tag}
              </span>
            </div>
            <p className="text-sm text-slate-700 leading-snug">{item.title}</p>
            <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
              <button className="px-2 py-1 rounded-lg bg-slate-100 border border-slate-200 hover:border-slate-300">
                复制要点
              </button>
              <span className="px-2 py-1 rounded-lg bg-slate-50 border border-dashed border-slate-200">
                原文链接（待接入爬虫）
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default SourceBoard
