import React from 'react'
import HotExamSection from '@/components/features/HotExamSection'
import SectionShell from '@/components/layout/SectionShell'
import { Card } from '@/components/ui/Card'
import { topPicks } from '@/data/topPicks'

const HotExamPage = () => {
  return (
    <div className="mt-6 space-y-6">
      <SectionShell
        title="各科最可能命题 Top10"
        badge="精简版冲刺清单"
        description="每科 50+ 考点中筛出的 10 个高命中率核心，先刷这些。"
        className="shadow-md shadow-slate-200/60"
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {topPicks.map((group) => (
            <Card
              key={group.key}
              className="border-slate-200 bg-white shadow-sm h-full flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-slate-900">{group.subject}</h3>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200">
                  Top 10
                </span>
              </div>
              <ol className="space-y-1.5 text-sm text-slate-800 list-decimal list-inside leading-snug">
                {group.items.map((item, idx) => (
                  <li key={idx} className="pl-0.5">
                    {item}
                  </li>
                ))}
              </ol>
            </Card>
          ))}
        </div>
      </SectionShell>

      <HotExamSection variant="standalone" />
    </div>
  )
}

export default HotExamPage
