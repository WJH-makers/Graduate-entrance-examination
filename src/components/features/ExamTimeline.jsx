import React from 'react';
import { timelineEvents } from '../../data/examRoadmap';

const colorMap = {
  violet: 'from-violet-500 to-cyan-500',
  amber: 'from-amber-400 to-orange-500',
  cyan: 'from-cyan-500 to-sky-500',
  blue: 'from-blue-500 to-indigo-500',
};

export const ExamTimeline = () => {
  return (
    <section id="timeline" className="mb-10">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-sm text-slate-500 uppercase tracking-wide">关键时间线</p>
          <h2 className="text-2xl font-bold text-slate-900">2026 考研时间轴（自动汇总）</h2>
        </div>
        <div className="text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">报名/确认各省略有差异，按省级公告为准</div>
      </div>
      <div className="relative pl-8">
        <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-400 via-indigo-500 to-violet-500" aria-hidden />
        <div className="space-y-6">
          {timelineEvents.map((ev, idx) => (
            <div key={idx} className="relative flex gap-4">
              <div className="absolute left-2 -translate-x-1.5 mt-1 w-3 h-3 rounded-full bg-white border-2 border-cyan-500 shadow" aria-hidden />
              <div className="w-28 shrink-0">
                <div className="text-sm font-semibold text-slate-700">{ev.date}</div>
              </div>
              <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-1">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${colorMap[ev.color] || 'from-slate-200 to-slate-300'} text-white`}>{ev.tag}</span>
                  <h3 className="text-base font-semibold text-slate-900">{ev.title}</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{ev.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExamTimeline;
