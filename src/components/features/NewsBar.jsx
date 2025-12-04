import React, { useMemo, useState } from 'react'
import { Search, RefreshCw, Sparkles, Newspaper, Loader2, Clock3 } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { useNewsDigest } from '@/hooks/useNewsDigest'
import { hotLinks } from '@/data/hotLinks'

const presets = [
  '考研 最新 政策 动态',
  '初试 成绩 复试 时间',
  '研招网 官方 通知',
  '院校 调剂 名额',
  '北大 软微 人工智能 复试 调剂',
]

export const NewsBar = () => {
  const [query, setQuery] = useState('考研 最新 动态')
  const { data, isFetching, error, refetch } = useNewsDigest(query)

  const items = data?.items || []
  const lastUpdated = data?.time
  const sourceLabel = useMemo(() => {
    if (data?.source === 'cache') return '缓存'
    if (data?.source === 'fallback') return '热榜'
    return 'DeepSeek'
  }, [data?.source])

  const fallbackTip = useMemo(() => {
    if (data?.source === 'fallback') {
      const first = hotLinks[0]
      return first ? `暂无最新数据，显示内置热榜：${first.title}` : '暂无最新数据'
    }
    return ''
  }, [data?.source])

  const handlePreset = (p) => {
    setQuery(p)
  }

  const handleSubmit = () => {
    refetch()
  }

  return (
    <Card className="p-0 overflow-hidden border-slate-200 bg-white">
      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-1 h-8 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full" />
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-600 flex items-center gap-2">
                <Sparkles size={14} /> Daily Brief
              </p>
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Newspaper size={18} className="text-cyan-600" /> 考研资讯快报
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {lastUpdated && (
              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                <Clock3 size={12} /> 更新：
                {new Date(lastUpdated).toLocaleString('zh-CN', { hour12: false })}
              </span>
            )}
            <span className="text-[11px] text-slate-400">{sourceLabel}</span>
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-3 py-2 text-xs rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition btn-shine"
            >
              {isFetching ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <RefreshCw size={14} />
              )}
              刷新
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSubmit()
                }}
                placeholder="输入关键词，例如：考研政策 / 复试时间 / 调剂"
                className="w-full bg-white border border-slate-200 rounded-lg pl-10 pr-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-100"
              />
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {presets.map((p) => (
                <button
                  key={p}
                  onClick={() => handlePreset(p)}
                  className="px-2.5 py-1 rounded-full text-xs border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 transition"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-2" aria-live="polite" aria-busy={isFetching}>
          {isFetching && (
            <div className="flex items-center gap-2 text-cyan-700 text-sm">
              <Loader2 size={16} className="animate-spin" /> 正在从 DeepSeek 获取最新资讯...
            </div>
          )}
          {error && (
            <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error.message || '获取资讯失败'}
            </div>
          )}
          {fallbackTip && (
            <div className="text-amber-700 text-xs bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
              {fallbackTip}
            </div>
          )}
          {!isFetching &&
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 hover:bg-white transition"
              >
                <div className="text-[10px] text-cyan-700 font-semibold mt-0.5">{item.date}</div>
                <p className="text-slate-800 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          {!isFetching && !items.length && (
            <p className="text-slate-500 text-sm">暂无结果，试试其他关键词。</p>
          )}
        </div>
      </div>
    </Card>
  )
}

export default NewsBar
