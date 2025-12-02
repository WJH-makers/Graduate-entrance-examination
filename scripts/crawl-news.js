/**
 * 轻量爬虫：抓取 newsSources 列表中的标题/发布时间/正文前 800 字，并过滤近 90 天
 * 运行：npm run crawl:news
 * 可选参数：node scripts/crawl-news.js url1 url2 ... （覆盖默认列表）
 * 输出：stdout JSON 数组 [{url,title,date,summary,within90:true/false}]
 * 同时写入 /public/news-latest.json 供前端实时读取
 * 说明：不依赖 cheerio，使用正则做简解析，适合 CI/本地快速跑。
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { newsSources } from '../src/data/newsSources.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const fetchText = async (url) => {
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (ExamBot)' } });
  return await res.text();
};

const extract = (html) => {
  const title = (html.match(/<title>(.*?)<\/title>/i)?.[1] || '').trim();
  const date = (html.match(/(\d{4}[./-]\d{1,2}[./-]\d{1,2})/)?.[1] ||
    html.match(/(\d{1,2}[./-]\d{1,2}[./-]\d{2,4})/)?.[1] || '').trim();
  const body = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const summary = body.slice(0, 800);
  return { title, date, summary };
};

const isWithin90Days = (dateStr) => {
  if (!dateStr) return false;
  const norm = dateStr.replace(/\./g, '-').replace(/\//g, '-');
  const parts = norm.split('-').map(p => parseInt(p, 10));
  if (parts.length < 3 || isNaN(parts[0])) return false;
  let year = parts[0], month = parts[1], day = parts[2];
  if (year < 100) year += 2000;
  const d = new Date(year, month - 1, day);
  if (isNaN(d.getTime())) return false;
  const diff = (Date.now() - d.getTime()) / (1000 * 60 * 60 * 24);
  return diff >= 0 && diff <= 90;
};

const run = async () => {
  // eslint-disable-next-line no-undef
  const argv = (typeof process !== 'undefined' && process.argv) ? process.argv : [];
  const urlsFromArg = argv.length > 2 ? argv.slice(2) : [];
  const list = urlsFromArg.length ? urlsFromArg.map((u, i) => ({ name: `arg-${i}`, url: u })) : newsSources;
  const results = [];
  for (const src of list) {
    try {
      const html = await fetchText(src.url);
      const { title, date, summary } = extract(html);
      results.push({ ...src, title, date, summary, within90: isWithin90Days(date) });
    } catch (e) {
      results.push({ ...src, error: e.message });
    }
  }
  const out = JSON.stringify(results, null, 2);
  console.log(out);
  fs.writeFileSync(path.join(__dirname, 'news-output.json'), out);
  // 写入 public，供前端读取
  const publicOut = path.resolve(__dirname, '../public/news-latest.json');
  fs.writeFileSync(publicOut, out);
};

run();
