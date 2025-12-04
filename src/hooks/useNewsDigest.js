import { useQuery } from '@tanstack/react-query'
import { newsService } from '@/services/api'
import { hotLinks } from '@/data/hotLinks'

const CACHE_KEY = 'news-digest-cache-v2'
const MAX_ITEMS = 6
const isBrowser = typeof window !== 'undefined'

const parseLines = (text) => {
  if (!text) return []
  return text
    .split('\n')
    .map((line) => line.replace(/^[-\u2022]\s*/, '').trim())
    .filter(Boolean)
    .slice(0, MAX_ITEMS)
    .map((line, idx) => {
      const match = line.match(/(\d{4}[-./]\d{1,2}[-./]\d{1,2}|\d{1,2}[-./]\d{1,2})/)
      const date = match ? match[0] : '今日'
      return {
        id: `${date}-${idx}`,
        date,
        text: line,
      }
    })
}

const buildFallback = () =>
  hotLinks.slice(0, MAX_ITEMS).map((link, idx) => ({
    id: `fallback-${idx}`,
    date: link.date || '近期',
    text: `${link.source ? `[${link.source}] ` : ''}${link.title}`,
  }))

const readCache = (query) => {
  if (!isBrowser) return null
  try {
    const raw = window.localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (parsed?.items?.length && parsed.query === query) {
      return parsed
    }
  } catch (err) {
    console.warn('读取资讯缓存失败', err)
  }
  return null
}

const writeCache = (payload) => {
  if (!isBrowser) return
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(payload))
  } catch (err) {
    console.warn('写入资讯缓存失败', err)
  }
}

export const useNewsDigest = (query) => {
  return useQuery({
    queryKey: ['news-digest', query],
    staleTime: 1000 * 60 * 60 * 6, // 6h
    gcTime: 1000 * 60 * 60 * 24, // 24h
    retry: 1,
    initialData: () => {
      const cached = readCache(query)
      if (cached) return { ...cached, source: 'cache' }
      return { items: buildFallback(), time: Date.now(), query, source: 'fallback' }
    },
    queryFn: async () => {
      const content = await newsService.fetchDigest(query)
      const parsed = parseLines(content)
      if (!parsed.length) throw new Error('未解析到资讯内容')
      const payload = { items: parsed, time: Date.now(), query, source: 'api' }
      writeCache(payload)
      return payload
    },
  })
}

export const newsHelpers = {
  parseLines,
  buildFallback,
}
