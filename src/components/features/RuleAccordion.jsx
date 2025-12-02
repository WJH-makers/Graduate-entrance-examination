import React, { useState } from 'react';
import { ruleBlocks } from '../../data/examRoadmap';
import { ChevronDown } from 'lucide-react';

export const RuleAccordion = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="rules" className="mb-10">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-sm text-slate-500 uppercase tracking-wide">复试 & 阅卷</p>
          <h2 className="text-2xl font-bold text-slate-900">复试规则与阅卷要点</h2>
        </div>
        <span className="text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">官方渠道优先</span>
      </div>
      <div className="space-y-3">
        {ruleBlocks.map((block, idx) => {
          const open = openIndex === idx;
          return (
            <div key={idx} className="border border-slate-200 rounded-xl bg-white shadow-sm">
              <button
                className="w-full flex items-center justify-between px-4 py-3 text-left"
                onClick={() => setOpenIndex(open ? -1 : idx)}
              >
                <div className="flex items-center gap-3">
                  <span className="px-2 py-1 text-[11px] font-semibold rounded-full bg-slate-900 text-white">{block.chip}</span>
                  <span className="text-sm font-semibold text-slate-900">{block.title}</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`} />
              </button>
              {open && (
                <div className="px-4 pb-4">
                  <ul className="space-y-2 text-sm text-slate-700 leading-relaxed list-disc list-inside">
                    {block.items.map((it, i) => (
                      <li key={i}>{it}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default RuleAccordion;
