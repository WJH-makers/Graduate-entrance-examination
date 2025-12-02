import React from 'react';
import { LayoutGrid, BookOpen, Target, Cpu } from 'lucide-react';
import { knowledgeBase } from '../../data/resources';

const pages = [
  { id: 'home', label: '主页', icon: LayoutGrid },
  { id: 'knowledge', label: '知识库', icon: BookOpen },
  { id: 'plan', label: '冲刺计划', icon: Target },
  { id: 'workbench', label: 'AI 工作台', icon: Cpu },
];

const subjectLabel = { Math: '数学一', '408': '计算机408', English: '英语一', Politics: '政治' };

const calcStats = () => {
  const total = Object.values(knowledgeBase).reduce((sum, s) => sum + (s.sections?.length || 0), 0);
  const bySubject = Object.entries(knowledgeBase).map(([k, v]) => ({
    id: k,
    count: v.sections?.length || 0,
    label: subjectLabel[k] || k
  }));
  return { total, bySubject };
};

const stats = calcStats();

const TopNavTabs = ({ activePage, onChange }) => {
  return (
    <div className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-slate-200 mb-6">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-2 py-3">
        <div className="flex gap-2 items-center">
          {pages.map((p) => {
            const Icon = p.icon;
            const active = activePage === p.id;
            return (
              <button
                key={p.id}
                onClick={() => onChange(p.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all border ${
                  active
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white border-transparent shadow'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Icon size={16} />
                {p.label}
              </button>
            );
          })}
        </div>
        <div className="hidden sm:flex items-center gap-3 text-xs text-slate-500">
          <span>知识点总数：{stats.total}</span>
          {stats.bySubject.map((s) => (
            <span key={s.id} className="px-2 py-1 rounded bg-slate-100 text-slate-600 border border-slate-200">
              {s.label}: {s.count}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopNavTabs;
