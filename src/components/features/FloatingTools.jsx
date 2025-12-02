import React from 'react';
import { Bell, ArrowUp, CalendarClock } from 'lucide-react';
import { cn } from '../../utils/cn';

export const FloatingTools = ({ onTop }) => {
  return (
    <div className="fixed right-5 bottom-6 z-40 flex flex-col gap-3">
      <button
        className={cn('w-12 h-12 rounded-full shadow-lg bg-white border border-slate-200 flex items-center justify-center hover:-translate-y-1 transition')}
        aria-label="订阅日历"
      >
        <CalendarClock className="text-indigo-600" size={18} />
      </button>
      <button
        className={cn('w-12 h-12 rounded-full shadow-lg bg-white border border-slate-200 flex items-center justify-center hover:-translate-y-1 transition')}
        aria-label="提醒通知"
      >
        <Bell className="text-amber-500" size={18} />
      </button>
      <button
        onClick={onTop}
        className={cn('w-12 h-12 rounded-full shadow-lg bg-slate-900 text-white flex items-center justify-center hover:-translate-y-1 transition')}
        aria-label="返回顶部"
      >
        <ArrowUp size={18} />
      </button>
    </div>
  );
};

export default FloatingTools;
