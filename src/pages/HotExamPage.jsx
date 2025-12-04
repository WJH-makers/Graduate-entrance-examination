import React from 'react'
import {
  Activity,
  AlertTriangle,
  CalendarDays,
  Clock3,
  Flame,
  Link as LinkIcon,
  ListChecks,
  Sparkles,
  TrendingUp,
} from 'lucide-react'
import SectionShell from '@/components/layout/SectionShell'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { hotTopics, timeline, hotLinks } from '@/data/hotLinks'
import { ocrTop } from '@/data/ocrTop'
import { ocrKeywords } from '@/data/ocrKeywords'
import { pkuAiRules } from '@/data/pkuAiRules'
import { beijingMarking } from '@/data/beijingMarking'

const HotExamPage = () => {
  return (
    <div className="space-y-6 pb-14" id="hot">
      <SectionShell
        title="高频考点 · 关键节点"
        badge="新版全幅页面"
        description="按科目看预测题型，快速浏览时间线与权威来源，聚合 OCR 高频与复试要点。"
        className="shadow-lg shadow-slate-200/60"
      >
        <div className="grid gap-4 xl:grid-cols-4 md:grid-cols-2 grid-cols-1">
          {hotTopics.map((topic) => (
            <Card
              key={topic.subject}
              className="h-full border-slate-200 bg-white shadow-sm hover:shadow-lg transition"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2 text-blue-600">
                  <TrendingUp size={16} />
                  <span className="font-semibold text-sm">{topic.subject}</span>
                </div>
                <Badge size="xs" variant="secondary">
                  近三年真题+预测
                </Badge>
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
      </SectionShell>

      <SectionShell
        title="关键时间线 & 近三个月权威信息"
        badge="时间 / 来源 / 政策"
        description="招生节点用绝对日期标注，权威来源按发布时间排序，方便对照省级公告。"
      >
        <div className="grid gap-4 lg:grid-cols-5">
          <Card className="lg:col-span-2 border-slate-200 bg-white shadow-md h-full">
            <div className="flex items-center gap-2 mb-3 text-amber-600">
              <CalendarDays size={18} />
              <span className="font-semibold">时间线</span>
            </div>
            <div className="space-y-2 text-sm text-slate-800 leading-relaxed">
              {timeline.map((item) => (
                <div
                  key={item.date}
                  className="flex gap-3 items-start border border-slate-100 rounded-lg px-3 py-2 bg-slate-50"
                >
                  <Badge size="xs" variant="outline" className="font-mono text-[11px]">
                    {item.date}
                  </Badge>
                  <div className="flex-1">{item.label}</div>
                </div>
              ))}
              <div className="mt-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded p-2 flex gap-2 items-start">
                <AlertTriangle size={14} className="mt-0.5" />
                报名/确认各省略有差异，务必核对省级公告。
              </div>
            </div>
          </Card>

          <Card className="lg:col-span-3 border-slate-200 bg-white shadow-md h-full">
            <div className="flex items-center gap-2 mb-3 text-cyan-600">
              <LinkIcon size={18} />
              <span className="font-semibold">近三个月权威信息</span>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {hotLinks.map((link, idx) => (
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
      </SectionShell>

      <SectionShell
        title="OCR 高频榜 · 复试要点"
        badge="机考/阅卷提示"
        description="最近 OCR 统计 + 复试规则速览，直接对照背诵与练习。"
      >
        <div className="grid gap-4 xl:grid-cols-3">
          <Card className="border-slate-200 bg-white shadow-md h-full">
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

          <Card className="border-slate-200 bg-white shadow-md h-full xl:col-span-2">
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
      </SectionShell>
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

export default HotExamPage
