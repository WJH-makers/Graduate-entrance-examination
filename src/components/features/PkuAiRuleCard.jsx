import React from 'react'
import { ShieldCheck, Link as LinkIcon, BookOpen } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { pkuAiRules } from '@/data/pkuAiRules'

const PkuAiRuleCard = () => {
  return (
    <Card className="border-slate-200 bg-white p-4 md:p-5 max-h-[520px] overflow-hidden">
      <div className="flex items-center gap-2 mb-3 text-indigo-600">
        <ShieldCheck size={18} />
        <span className="font-semibold">北大智能学院（软微）复试规则要点</span>
      </div>
      <p className="text-sm text-slate-700 mb-3">{pkuAiRules.title}</p>
      <div className="space-y-2 text-sm text-slate-700 leading-relaxed break-words overflow-y-auto pr-1 max-h-[320px]">
        <ul className="space-y-2">
          {pkuAiRules.bullets.map((b, idx) => (
            <li key={idx} className="flex gap-2">
              <span className="text-indigo-500 mt-0.5">•</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-1 text-xs text-slate-500 uppercase tracking-wide">
          <BookOpen size={14} /> 官方链接
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {pkuAiRules.links.map((lnk, idx) => (
            <a
              key={idx}
              href={lnk.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm text-indigo-700 hover:underline"
            >
              <LinkIcon size={14} /> {lnk.label}
            </a>
          ))}
        </div>
      </div>
    </Card>
  )
}

export default PkuAiRuleCard
