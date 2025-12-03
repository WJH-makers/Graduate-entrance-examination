import React, { useEffect, useState } from 'react';
import { CalendarDays, AlertTriangle, Link as LinkIcon, TrendingUp, Sparkles } from 'lucide-react';
import { Card } from '../ui/Card';
import { hotLinks, hotTopics, timeline } from '../../data/hotLinks';
import { ocrTop } from '../../data/ocrTop';
import { ocrKeywords } from '../../data/ocrKeywords';
import { pkuAiRules } from '../../data/pkuAiRules';
import { beijingMarking } from '../../data/beijingMarking';

const HotExamSection = () => {
  const [liveLinks, setLiveLinks] = useState(null);

  useEffect(() => {
    fetch('/news-latest.json', { cache: 'no-store' })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (Array.isArray(data) && data.length) {
          setLiveLinks(data.map(d => ({
            title: d.title || d.name,
            source: d.name || d.source || '未知',
            date: d.date || '',
            url: d.url
          })));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="mb-12" id="hot-exam">
      <div className="flex items-center justify-between mb-6 px-1">
        <div className="flex items-center gap-2">
          <span className="w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full" />
          <h2 className="text-2xl font-bold text-slate-900">今年高频考点 & 关键节点</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 items-start">
        {/* 高频题型 - 全宽水平排布 */}
        <Card className="border-slate-200 bg-white/90 shadow-lg shadow-cyan-100/50 flex flex-col p-4 md:p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-blue-600">
              <TrendingUp size={18} />
              <span className="font-semibold">高概率题型（按科目）</span>
            </div>
            <span className="text-xs text-slate-500">近三年真题+预测汇总</span>
          </div>
          <div className="grid grid-cols-1 gap-3 pb-1 flex-1">
            {hotTopics.map(topic => (
              <div key={topic.subject} className="bg-slate-50 border border-slate-200 rounded-lg p-3 shadow-sm">
                <p className="text-sm font-semibold text-slate-800 mb-2">{topic.subject}</p>
                <div className="space-y-1">
                  {topic.items.map((it, idx) => (
                    <div key={idx} className="text-xs text-slate-700 flex items-start gap-1">
                      <span className="text-blue-500 mt-0.5">•</span>
                      <span>{it}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* 时间轴 */}
          <Card className="border-slate-200 bg-white/90 shadow-md flex flex-col p-4 md:p-5 h-full">
            <div className="flex items-center gap-2 mb-3 text-amber-600">
              <CalendarDays size={18} />
              <span className="font-semibold">关键时间线</span>
            </div>
            <ul className="space-y-2 text-sm text-slate-700 leading-relaxed flex-1 overflow-y-auto pr-1">
              {timeline.map(item => (
                <li key={item.date} className="flex gap-2">
                  <span className="font-mono text-xs text-slate-500 w-24">{item.date}</span>
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded p-2 flex gap-2">
              <AlertTriangle size={14} /> 报名/确认各省略有差异，按省级公告为准。
            </div>
          </Card>

          {/* 最新权威链接 */}
          <Card className="border-slate-200 bg-white/90 shadow-md flex flex-col p-4 md:p-5 h-full">
            <div className="flex items-center gap-2 mb-3 text-cyan-600">
              <LinkIcon size={18} />
              <span className="font-semibold">近三个月权威信息（自动爬取优先）</span>
            </div>
            <div className="flex-1 max-h-[320px] overflow-y-auto pr-1 space-y-2 text-sm leading-relaxed">
              {(liveLinks || hotLinks).map((link, idx) => (
                <a
                  key={idx}
                  className="block p-2 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 break-words"
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>{link.source}</span>
                    <span>{link.date}</span>
                  </div>
                  <div className="text-slate-800">{link.title}</div>
                </a>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* OCR 高频榜 */}
          <Card className="border-slate-200 bg-white/90 shadow-md flex flex-col p-4 md:p-5 h-full">
            <div className="flex items-center gap-2 mb-3 text-violet-600">
              <Sparkles size={18} />
              <span className="font-semibold">OCR 高频榜（模拟卷）</span>
            </div>
            <div className="space-y-2 text-sm text-slate-800 flex-1 overflow-y-auto pr-1">
              {ocrTop.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
                  <span className="font-medium">{item.label}</span>
                  <span className="text-xs text-slate-500">出现 {item.freq} 次</span>
                </div>
              ))}
            </div>
            <div className="mt-3 space-y-2">
              <div className="text-xs text-slate-500">关键术语（≥12 次）：</div>
              <div className="grid grid-cols-1 gap-2 text-xs">
                {ocrKeywords.map((k, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 rounded-lg px-2 py-1 flex justify-between">
                    <span className="font-medium text-slate-800">{k.term}</span>
                    <span className="text-slate-500">×{k.freq}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-3">数据来源：最新 OCR 的模拟卷与答案文本。</p>
          </Card>

          {/* 复试规则 + 阅卷要点合并 */}
          <Card className="border-slate-200 bg-white/90 shadow-md flex flex-col p-4 md:p-5 h-full">
            <div className="flex items-center gap-2 mb-2 text-indigo-600">
              <span className="font-semibold">复试规则 & 阅卷要点</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1 overflow-y-auto pr-1">
              <div className="space-y-2">
                <p className="text-sm text-slate-700 font-semibold">北大智能学院</p>
                <ul className="space-y-2 text-sm text-slate-700 leading-relaxed break-words">
                  {pkuAiRules.bullets.map((b, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="text-indigo-500 mt-0.5">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-slate-700 font-semibold">北京统考阅卷</p>
                <ul className="space-y-2 text-sm text-slate-700 leading-relaxed break-words">
                  {beijingMarking.bullets.map((item, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="text-emerald-500 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="text-xs text-slate-500 mt-2">完整规则请见下方链接区域。</div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HotExamSection;
