import React, { useEffect, useState } from 'react'
import { CalendarDays, AlertTriangle, Link as LinkIcon, TrendingUp, Sparkles } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import SectionShell from '@/components/layout/SectionShell'
import { hotLinks, hotTopics, timeline } from '@/data/hotLinks'
import { ocrTop } from '@/data/ocrTop'
import { ocrKeywords } from '@/data/ocrKeywords'
import { pkuAiRules } from '@/data/pkuAiRules'
import { beijingMarking } from '@/data/beijingMarking'

const HotExamSection = () => {
  const [liveLinks, setLiveLinks] = useState(null)
  const [showAllTimeline, setShowAllTimeline] = useState(false)
  const [showAllLinks, setShowAllLinks] = useState(false)
  const [showAllRules, setShowAllRules] = useState(false)

  useEffect(() => {
    fetch('/news-latest.json', { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length) {
          setLiveLinks(
            data.map((d) => ({
              title: d.title || d.name,
              source: d.name || d.source || '未知',
              date: d.date || '',
              url: d.url,
            }))
          )
        }
      })
      .catch(() => {})
  }, [])

  return (
    <div className="mb-12" id="hot-exam">
      <SectionShell
        title="今年高频考点 & 关键节点"
        description="提炼三类信息：预测题型、时间线/权威信息、OCR 高频与复试要点"
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {/* 左列：题型 + 时间线 */}
          <div className="space-y-4">
            <Card className="border-slate-200 bg-white shadow-lg shadow-cyan-100/50 flex flex-col p-4 md:p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-blue-600">
                  <TrendingUp size={18} />
                  <span className="font-semibold">高概率题型（按科目）</span>
                </div>
                <span className="text-xs text-slate-500">近三年真题+预测</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {hotTopics.map((topic) => (
                  <div
                    key={topic.subject}
                    className="bg-slate-50 border border-slate-200 rounded-lg p-3 shadow-sm h-full flex flex-col"
                  >
                    <p className="text-sm font-semibold text-slate-800 mb-2">{topic.subject}</p>
                    <ul className="space-y-1 text-xs text-slate-700 flex-1">
                      {topic.items.slice(0, 4).map((it, idx) => (
                        <li key={idx} className="flex items-start gap-1 leading-snug">
                          <span className="text-blue-500 mt-0.5">•</span>
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="border-slate-200 bg-white shadow-md flex flex-col p-4 md:p-5">
              <div className="flex items-center gap-2 mb-3 text-amber-600">
                <CalendarDays size={18} />
                <span className="font-semibold">关键时间线</span>
              </div>
              <div className="space-y-2 text-sm text-slate-700 leading-relaxed max-h-72 overflow-auto pr-1">
                {(showAllTimeline ? timeline : timeline.slice(0, 6)).map((item) => (
                  <div key={item.date} className="flex justify-between gap-3">
                    <span className="font-mono text-[11px] text-slate-500 w-28">{item.date}</span>
                    <span className="text-[13px] flex-1">{item.label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded p-2 flex gap-2">
                <AlertTriangle size={14} /> 报名/确认各省略有差异，按省级公告为准。
              </div>
              {timeline.length > 6 && (
                <button
                  type="button"
                  className="mt-3 text-xs text-cyan-600 underline underline-offset-2"
                  onClick={() => setShowAllTimeline((v) => !v)}
                >
                  {showAllTimeline ? '收起时间线' : '展开全部'}
                </button>
              )}
            </Card>
          </div>

          {/* 右列：权威信息 + OCR + 复试规则 */}
          <div className="space-y-4">
            <Card className="border-slate-200 bg-white shadow-md flex flex-col p-4 md:p-5">
              <div className="flex items-center gap-2 mb-3 text-cyan-600">
                <LinkIcon size={18} />
                <span className="font-semibold">近三个月权威信息</span>
              </div>
              <div className="space-y-2 text-sm leading-relaxed max-h-64 overflow-auto pr-1">
                {(showAllLinks ? liveLinks || hotLinks : (liveLinks || hotLinks).slice(0, 8)).map(
                  (link, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 break-words"
                    >
                      <div className="flex justify-between text-[11px] text-slate-500 gap-2">
                        <span className="truncate">{link.source}</span>
                        <span className="shrink-0">{link.date}</span>
                      </div>
                      <div className="text-slate-800 text-[13px] leading-snug line-clamp-2">
                        {link.title}
                      </div>
                    </div>
                  )
                )}
              </div>
              {(liveLinks || hotLinks).length > 8 && (
                <button
                  type="button"
                  className="mt-3 text-xs text-cyan-600 underline underline-offset-2"
                  onClick={() => setShowAllLinks((v) => !v)}
                >
                  {showAllLinks ? '收起列表' : '展开全部'}
                </button>
              )}
            </Card>

            <Card className="border-slate-200 bg-white shadow-md flex flex-col p-4 md:p-5">
              <div className="flex items-center gap-2 mb-3 text-violet-600">
                <Sparkles size={18} />
                <span className="font-semibold">OCR 高频榜（模拟卷）</span>
              </div>
              <div className="grid gap-2 sm:grid-cols-2 text-sm text-slate-800">
                {ocrTop.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg px-3 py-2"
                  >
                    <span className="font-medium">{item.label}</span>
                    <span className="text-xs text-slate-500">出现 {item.freq} 次</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 space-y-2">
                <div className="text-xs text-slate-500">关键术语（≥12 次）：</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {ocrKeywords.map((k, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-slate-200 rounded-lg px-2 py-1 flex justify-between"
                    >
                      <span className="font-medium text-slate-800">{k.term}</span>
                      <span className="text-slate-500">×{k.freq}</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-3">数据来源：最新 OCR 的模拟卷与答案文本。</p>
            </Card>

            <Card className="border-slate-200 bg-white shadow-md flex flex-col p-4 md:p-5">
              <div className="flex items-center gap-2 mb-2 text-indigo-600">
                <span className="font-semibold">复试规则 & 阅卷要点</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <p className="text-sm text-slate-700 font-semibold">北大智能学院</p>
                  <ul className="space-y-2 text-[13px] text-slate-700 leading-relaxed break-words">
                    {(showAllRules ? pkuAiRules.bullets : pkuAiRules.bullets.slice(0, 4)).map(
                      (b, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="text-indigo-500 mt-0.5">•</span>
                          <span>{b}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-slate-700 font-semibold">北京统考阅卷</p>
                  <ul className="space-y-2 text-[13px] text-slate-700 leading-relaxed break-words">
                    {(showAllRules
                      ? beijingMarking.bullets
                      : beijingMarking.bullets.slice(0, 4)
                    ).map((item, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="text-emerald-500 mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="text-xs text-slate-500 mt-2">完整规则请见下方链接区域。</div>
              {(pkuAiRules.bullets.length > 4 || beijingMarking.bullets.length > 4) && (
                <button
                  type="button"
                  className="mt-3 text-xs text-cyan-600 underline underline-offset-2"
                  onClick={() => setShowAllRules((v) => !v)}
                >
                  {showAllRules ? '收起' : '展开全部'}
                </button>
              )}
            </Card>
          </div>
        </div>
      </SectionShell>
    </div>
  )
}

export default HotExamSection
