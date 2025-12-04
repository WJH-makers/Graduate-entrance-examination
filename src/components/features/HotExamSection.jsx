import React, { useEffect, useState } from 'react'
import {
  CalendarDays,
  AlertTriangle,
  Link as LinkIcon,
  TrendingUp,
  Sparkles,
  X,
  Activity,
  Clock3,
  Flame,
  ListChecks,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import SectionShell from '@/components/layout/SectionShell'
import { hotLinks, hotTopics, timeline } from '@/data/hotLinks'
import { ocrTop } from '@/data/ocrTop'
import { ocrKeywords } from '@/data/ocrKeywords'
import { pkuAiRules } from '@/data/pkuAiRules'
import { beijingMarking } from '@/data/beijingMarking'

const HotExamSection = ({ variant = 'card' }) => {
  const [liveLinks, setLiveLinks] = useState(null)
  const [showAllTimeline, setShowAllTimeline] = useState(false)
  const [showAllLinks, setShowAllLinks] = useState(false)
  const [showAllRules, setShowAllRules] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const enableModal = variant !== 'standalone'

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
        actions={
          enableModal ? (
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-amber-400 text-white shadow-sm hover:shadow-md transition"
            >
              全屏查看
            </button>
          ) : null
        }
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-2 auto-rows-fr">
          <Card className="border-slate-200 bg-white shadow-lg shadow-cyan-100/50 flex flex-col p-4 md:p-5 h-full">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-blue-600">
                <TrendingUp size={18} />
                <span className="font-semibold">高概率题型（按科目）</span>
              </div>
              <span className="text-xs text-slate-500">近三年真题+预测</span>
            </div>
            <div className="grid gap-2">
              {hotTopics.slice(0, 4).map((topic) => (
                <div
                  key={topic.subject}
                  className="bg-slate-50 border border-slate-200 rounded-lg p-3 shadow-sm"
                >
                  <p className="text-sm font-semibold text-slate-800 mb-2">{topic.subject}</p>
                  <ul className="space-y-1 text-xs text-slate-700">
                    {topic.items.slice(0, 3).map((it, idx) => (
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

          <Card className="border-slate-200 bg-white shadow-md flex flex-col p-4 md:p-5 h-full">
            <div className="flex items-center gap-2 mb-3 text-amber-600">
              <CalendarDays size={18} />
              <span className="font-semibold">关键时间线</span>
            </div>
            <div className="space-y-2 text-sm text-slate-700 leading-relaxed max-h-64 sm:max-h-72 overflow-auto pr-1 min-w-0">
              {(showAllTimeline ? timeline : timeline.slice(0, 5)).map((item) => (
                <div key={item.date} className="flex justify-between gap-3">
                  <span className="font-mono text-[11px] text-slate-500 w-24 shrink-0">
                    {item.date}
                  </span>
                  <span className="text-[13px] flex-1">{item.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded p-2 flex gap-2">
              <AlertTriangle size={14} /> 报名/确认各省略有差异，按省级公告为准。
            </div>
            {timeline.length > 5 && (
              <button
                type="button"
                className="mt-3 text-xs text-cyan-600 underline underline-offset-2"
                onClick={() => setShowAllTimeline((v) => !v)}
              >
                {showAllTimeline ? '收起时间线' : '展开全部'}
              </button>
            )}
          </Card>

          <Card className="border-slate-200 bg-white shadow-md flex flex-col p-4 md:p-5 h-full">
            <div className="flex items-center gap-2 mb-3 text-cyan-600">
              <LinkIcon size={18} />
              <span className="font-semibold">近三个月权威信息</span>
            </div>
            <div className="space-y-2 text-sm leading-relaxed max-h-64 sm:max-h-72 overflow-auto pr-1 min-w-0">
              {(showAllLinks ? liveLinks || hotLinks : (liveLinks || hotLinks).slice(0, 6)).map(
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
            {(liveLinks || hotLinks).length > 6 && (
              <button
                type="button"
                className="mt-3 text-xs text-cyan-600 underline underline-offset-2"
                onClick={() => setShowAllLinks((v) => !v)}
              >
                {showAllLinks ? '收起列表' : '展开全部'}
              </button>
            )}
          </Card>

          <Card className="border-slate-200 bg-white shadow-md flex flex-col p-4 md:p-5 h-full">
            <div className="flex items-center gap-2 mb-3 text-violet-600">
              <Sparkles size={18} />
              <span className="font-semibold">OCR 高频榜 & 复试要点</span>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 text-sm text-slate-800">
              {ocrTop.slice(0, 6).map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg px-3 py-2"
                >
                  <span className="font-medium">{item.label}</span>
                  <span className="text-xs text-slate-500">×{item.freq}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 space-y-2">
              <div className="text-xs text-slate-500">关键术语（≥12 次）：</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {ocrKeywords.slice(0, 8).map((k, idx) => (
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
            <div className="mt-4 border-t pt-3 border-slate-200 space-y-2 text-xs text-slate-700">
              <p className="font-semibold text-slate-800">复试规则速览</p>
              <ul className="space-y-1">
                {pkuAiRules.bullets.slice(0, 2).map((b, i) => (
                  <li key={`pku-${i}`} className="flex gap-2">
                    <span className="text-indigo-500 mt-0.5">•</span>
                    <span>{b}</span>
                  </li>
                ))}
                {beijingMarking.bullets.slice(0, 2).map((b, i) => (
                  <li key={`bj-${i}`} className="flex gap-2">
                    <span className="text-emerald-500 mt-0.5">•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="text-cyan-600 underline underline-offset-2"
                onClick={() => setShowAllRules((v) => !v)}
              >
                {showAllRules ? '收起复试要点' : '展开全部复试要点'}
              </button>
              {showAllRules && (
                <div className="grid grid-cols-1 gap-2">
                  {pkuAiRules.bullets.slice(2, 6).map((b, i) => (
                    <div key={`pku-more-${i}`} className="text-[12px] text-slate-600">
                      • {b}
                    </div>
                  ))}
                  {beijingMarking.bullets.slice(2, 6).map((b, i) => (
                    <div key={`bj-more-${i}`} className="text-[12px] text-slate-600">
                      • {b}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </div>
      </SectionShell>

      {enableModal && showModal && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <div className="relative z-10 max-w-6xl mx-auto my-6 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200 bg-slate-50">
              <div>
                <p className="text-xs text-slate-500">高频考点 · 关键节点 · OCR 与复试要点</p>
                <h3 className="text-lg font-bold text-slate-900">大屏视图</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-2 rounded-full hover:bg-slate-200 text-slate-600"
                aria-label="关闭"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-5 space-y-5 max-h-[80vh] overflow-y-auto">
              <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-2">
                {hotTopics.map((topic) => (
                  <Card key={topic.subject} className="h-full border-slate-200 bg-white shadow-sm">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2 text-blue-600">
                        <TrendingUp size={16} />
                        <span className="font-semibold text-sm">{topic.subject}</span>
                      </div>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200">
                        近三年真题+预测
                      </span>
                    </div>
                    <ul className="space-y-1.5 text-sm text-slate-800 leading-snug">
                      {topic.items.map((it, idx) => (
                        <li key={idx} className="flex gap-2 items-start">
                          <span className="text-cyan-500 mt-0.5">•</span>
                          <span className="flex-1">{it}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>

              <div className="grid gap-4 lg:grid-cols-5">
                <Card className="lg:col-span-2 border-slate-200 bg-white shadow-sm h-full">
                  <div className="flex items-center gap-2 mb-3 text-amber-600">
                    <CalendarDays size={18} />
                    <span className="font-semibold">关键时间线</span>
                  </div>
                  <div className="space-y-2 text-sm text-slate-800 leading-relaxed">
                    {timeline.map((item) => (
                      <div
                        key={item.date}
                        className="flex gap-3 items-start border border-slate-100 rounded-lg px-3 py-2 bg-slate-50"
                      >
                        <span className="font-mono text-[11px] text-slate-600 w-24 shrink-0">
                          {item.date}
                        </span>
                        <div className="flex-1">{item.label}</div>
                      </div>
                    ))}
                    <div className="mt-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded p-2 flex gap-2 items-start">
                      <AlertTriangle size={14} className="mt-0.5" />
                      报名/确认各省略有差异，务必核对省级公告。
                    </div>
                  </div>
                </Card>

                <Card className="lg:col-span-3 border-slate-200 bg-white shadow-sm h-full">
                  <div className="flex items-center gap-2 mb-3 text-cyan-600">
                    <LinkIcon size={18} />
                    <span className="font-semibold">近三个月权威信息</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    {(liveLinks || hotLinks).map((link, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-white transition"
                      >
                        <div className="flex justify-between text-[11px] text-slate-500 gap-2 mb-1">
                          <span className="truncate">{link.source}</span>
                          <span className="shrink-0">{link.date}</span>
                        </div>
                        <div className="text-slate-900 text-sm leading-snug">{link.title}</div>
                        {link.url && (
                          <div className="mt-2 text-[11px] text-cyan-600 flex items-center gap-1">
                            <Activity size={12} />
                            <span className="truncate">{link.url.replace(/^https?:\/\//, '')}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              <div className="grid gap-4 xl:grid-cols-3">
                <Card className="border-slate-200 bg-white shadow-sm h-full">
                  <div className="flex items-center gap-2 mb-3 text-violet-600">
                    <Sparkles size={18} />
                    <span className="font-semibold">OCR 高频榜</span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-2 text-sm text-slate-800">
                    {ocrTop.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg px-3 py-2"
                      >
                        <span className="font-medium">{item.label}</span>
                        <span className="text-xs text-slate-500">×{item.freq}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 space-y-1 text-xs text-slate-600">
                    <div className="font-semibold text-slate-800 mb-1">关键术语（≥12 次）：</div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {ocrKeywords.map((k, idx) => (
                        <div
                          key={idx}
                          className="bg-white border border-slate-200 rounded-lg px-2 py-1 flex flex-col gap-0.5"
                        >
                          <div className="flex justify-between text-[12px] text-slate-800">
                            <span className="font-medium">{k.term}</span>
                            <span className="text-slate-500">×{k.freq}</span>
                          </div>
                          <span className="text-[11px] text-slate-500">{k.note}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                <Card className="border-slate-200 bg-white shadow-sm h-full xl:col-span-2">
                  <div className="flex items-center gap-2 mb-3 text-emerald-600">
                    <Flame size={18} />
                    <span className="font-semibold">复试规则速览</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <RuleList
                      title={pkuAiRules.title}
                      bullets={pkuAiRules.bullets}
                      icon={<ListChecks size={14} />}
                    />
                    <RuleList
                      title={beijingMarking.title}
                      bullets={beijingMarking.bullets}
                      icon={<Clock3 size={14} />}
                    />
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const RuleList = ({ title, bullets, icon }) => (
  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
    <div className="flex items-center gap-2 text-slate-800 font-semibold text-sm">
      {icon}
      <span className="line-clamp-1" title={title}>
        {title}
      </span>
    </div>
    <ul className="space-y-1 text-sm text-slate-700 leading-relaxed">
      {bullets.slice(0, 6).map((b, i) => (
        <li key={i} className="flex gap-2 items-start">
          <span className="text-cyan-500 mt-0.5">•</span>
          <span>{b}</span>
        </li>
      ))}
    </ul>
  </div>
)

export default HotExamSection
