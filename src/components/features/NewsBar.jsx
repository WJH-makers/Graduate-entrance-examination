import React, { useEffect, useState } from 'react';
import { Search, RefreshCw, Sparkles, Newspaper, Loader2, Clock3 } from 'lucide-react';
import { Card } from '../ui/Card';
import { newsService } from '../../services/api';
import { hotLinks } from '../../data/hotLinks';

const presets = [
  '考研 最新 政策 动态',
  '初试 成绩 复试 时间',
  '研招网 官方 通知',
  '院校 调剂 名额',
  '北大 软微 人工智能 复试 调剂'
];

const CACHE_KEY = 'news-digest-cache-v1';
const MAX_ITEMS = 6;

const parseLines = (text) => {
  if (!text) return [];
  return text
    .split('\n')
    .map(line => line.replace(/^[-\u2022]\s*/, '').trim())
    .filter(Boolean)
    .slice(0, MAX_ITEMS)
    .map((line, idx) => {
      const match = line.match(/(\d{4}[-./]\d{1,2}[-./]\d{1,2}|\d{1,2}[-./]\d{1,2})/);
      const date = match ? match[0] : '今日';
      return {
        id: `${date}-${idx}`,
        date,
        text: line
      };
    });
};

const buildFallback = () => hotLinks.slice(0, 6).map((link, idx) => ({
  id: `fallback-${idx}`,
  date: link.date || '近期',
  text: `${link.source ? `[${link.source}] ` : ''}${link.title}`
}));

export const NewsBar = () => {
  const [query, setQuery] = useState('考研 最新 动态');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);

  const loadCache = () => {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (parsed?.items?.length) return parsed;
    } catch (err) {
      console.warn('读取资讯缓存失败', err);
    }
    return null;
  };

  const saveCache = (payload) => {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
    } catch (err) {
      console.warn('写入资讯缓存失败', err);
    }
  };

  const fetchNews = async (q, { silent = false } = {}) => {
    if (!silent) setLoading(true);
    setError('');
    try {
      const content = await newsService.fetchDigest(q);
      const parsed = parseLines(content);
      if (parsed.length === 0) throw new Error('未解析到资讯内容');
      setItems(parsed);
      const payload = { items: parsed, time: Date.now(), query: q };
      saveCache(payload);
      setLastUpdated(payload.time);
    } catch (err) {
      setError(err.message || '获取资讯失败');
      const cached = loadCache();
      if (cached?.items?.length) {
        setItems(cached.items);
        setLastUpdated(cached.time);
      } else if (!items.length) {
        setItems(buildFallback());
      }
    } finally {
      if (!silent) setLoading(false);
    }
  };

  useEffect(() => {
    const cached = loadCache();
    if (cached?.items?.length) {
      setItems(cached.items);
      setLastUpdated(cached.time);
    } else {
      setItems(buildFallback());
      setLastUpdated(Date.now());
    }
    fetchNews(query, { silent: Boolean(cached) });
    const timer = setInterval(() => fetchNews(query, { silent: true }), 12 * 60 * 60 * 1000); // 每12小时自动刷新
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePreset = (p) => {
    setQuery(p);
    fetchNews(p);
  };

  return (
    <Card className="p-0 overflow-hidden border-slate-200 bg-white">
      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-1 h-8 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full" />
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-600 flex items-center gap-2"><Sparkles size={14}/> Daily Brief</p>
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Newspaper size={18} className="text-cyan-600" /> 考研资讯快报
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {lastUpdated && (
              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                <Clock3 size={12} /> 更新：{new Date(lastUpdated).toLocaleString('zh-CN', { hour12: false })}
              </span>
            )}
            <button
              onClick={() => fetchNews(query)}
              className="flex items-center gap-2 px-3 py-2 text-xs rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition btn-shine"
            >
              {loading ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
              刷新
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') fetchNews(query); }}
                placeholder="输入关键词，例如：考研政策 / 复试时间 / 调剂"
                className="w-full bg-white border border-slate-200 rounded-lg pl-10 pr-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-100"
              />
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {presets.map(p => (
                <button
                  key={p}
                  onClick={() => handlePreset(p)}
                  className="px-2.5 py-1 rounded-full text-xs border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 transition"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-2" aria-live="polite" aria-busy={loading}>
          {loading && (
            <div className="flex items-center gap-2 text-cyan-700 text-sm">
              <Loader2 size={16} className="animate-spin" /> 正在从 DeepSeek 获取最新资讯...
            </div>
          )}
          {error && (
            <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </div>
          )}
          {!loading && !error && items.map(item => (
            <div
              key={item.id}
              className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 hover:bg-white transition"
            >
              <div className="text-[10px] text-cyan-700 font-semibold mt-0.5">{item.date}</div>
              <p className="text-slate-800 text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
          {!loading && !error && items.length === 0 && (
            <p className="text-slate-500 text-sm">暂无结果，试试其他关键词。</p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default NewsBar;
