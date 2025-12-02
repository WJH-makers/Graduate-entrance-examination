import React from 'react';
import { ClipboardCheck, Sparkles } from 'lucide-react';
import { Card } from '../ui/Card';
import { beijingMarking } from '../../data/beijingMarking';

const BeijingMarkingCard = () => {
  return (
    <Card className="border-slate-200 bg-white p-4 md:p-5 max-h-[520px] overflow-hidden">
      <div className="flex items-center gap-2 mb-3 text-emerald-600">
        <ClipboardCheck size={18} />
        <span className="font-semibold">北京统考阅卷要点</span>
      </div>
      <p className="text-sm text-slate-700 mb-3">{beijingMarking.title}</p>
      <div className="space-y-2 text-sm text-slate-700 overflow-y-auto pr-1 max-h-[320px]">
        <ul className="space-y-2">
          {beijingMarking.bullets.map((item, idx) => (
            <li key={idx} className="flex gap-2">
              <Sparkles size={14} className="text-emerald-500 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

export default BeijingMarkingCard;
