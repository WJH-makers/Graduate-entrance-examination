import React from 'react';
import { CalendarDays, Target, Activity, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { studyPlanDays, studyAdjustments } from '../../data/studyPlan';

const colorByDay = (day) => {
  const n = parseInt(day.replace('D', ''), 10);
  if (n >= 14) return 'from-cyan-500/80 to-sky-500/50';
  if (n >= 7) return 'from-violet-500/70 to-fuchsia-500/40';
  if (n >= 2) return 'from-amber-500/80 to-orange-500/40';
  return 'from-emerald-500/80 to-lime-500/50';
};

const StudyPlan = () => {
  return (
    <div className="mb-20 section-block" id="study-plan">
      <div className="section-title-bar mb-4 px-1">
        <span className="bar" />
        <h2>冲刺 20 天计划</h2>
        <span className="pill-soft">按 2025-12-20/21 初试节奏；日期变动整体平移</span>
        <Badge variant="secondary" className="ml-auto flex items-center gap-1">
          <Target size={14} /> D-20 起跑
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {studyPlanDays.map((item) => (
          <Card key={item.id} hover className="relative overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${colorByDay(item.day)} opacity-10 pointer-events-none`} />
            <div className="flex items-start justify-between mb-3 relative z-10">
              <div className="flex items-center gap-3">
                <Badge variant="primary" className="font-mono">{item.day}</Badge>
                <div>
                  <p className="text-xs text-slate-500">{item.date}</p>
                  <h3 className="text-lg font-semibold text-slate-900">{item.goal}</h3>
                </div>
              </div>
              <Badge variant="outline" className="text-xs">{item.output}</Badge>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm text-slate-800 relative z-10">
              <PlanRow label="数学" value={item.math} />
              <PlanRow label="计科408" value={item.cs} />
              <PlanRow label="英语" value={item.english} />
              <PlanRow label="政治" value={item.politics} />
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <div className="flex items-center gap-2 mb-3 text-slate-900">
          <Activity size={18} /> 学习方式即时微调
        </div>
        <ul className="space-y-2 text-sm text-slate-800">
          {studyAdjustments.map((tip, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <CheckCircle2 size={14} className="text-emerald-500 mt-0.5" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2 text-xs text-slate-500 mt-3">
          <ArrowUpRight size={14} /> 考前 48h 仅做错题与框架复盘，避免新题引发焦虑。
        </div>
      </Card>
    </div>
  );
};

const PlanRow = ({ label, value }) => (
  <div className="bg-slate-50 rounded-lg px-3 py-2 border border-slate-200">
    <p className="text-xs text-slate-500 mb-1">{label}</p>
    <p className="text-sm text-slate-900 leading-snug">{value}</p>
  </div>
);

export default StudyPlan;
