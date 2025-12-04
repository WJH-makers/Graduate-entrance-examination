const apiBase = import.meta.env.VITE_API_BASE || '/api/deepseek'
const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY // 仅用于开发直连
const useProxy = !!import.meta.env.VITE_USE_PROXY || !apiKey

const headers = () => {
  if (useProxy) return { 'Content-Type': 'application/json' }
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  }
}

const postJson = async (url, body) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || res.statusText)
  }
  return res.json()
}

const proxyChat = async (messages, temperature = 0.7) => {
  const data = await postJson(`${apiBase}/chat`, {
    messages,
    model: 'deepseek-chat',
    temperature,
  })
  const msg = data?.choices?.[0]?.message
  if (!msg) throw new Error('无返回内容')
  return msg
}

export const chatService = {
  /** 发送聊天请求，优先走后端代理（/api/deepseek/chat） */
  async sendMessage(messages) {
    if (!messages?.length) throw new Error('messages 为空')
    return proxyChat(messages, 1.0)
  },
}

// 通用生成器：返回 string 结果
export const generateWithDeepSeek = async (messages, temperature = 0.7) => {
  const msg = await proxyChat(messages, temperature)
  return msg.content || ''
}

export const newsService = {
  /** Fetch condensed news digest focused on exam-related topics via DeepSeek */
  async fetchDigest(query) {
    const messages = [
      {
        role: 'system',
        content: [
          '你是一名“考研资讯快报”编辑，输出格式保持简洁：',
          '- 用 5 条要点（短横线开头）',
          '- 每条包含【日期】、标题、20-30 字摘要',
          '- 关注考研政策、报名/初试/复试、院校动态、官方权威消息；若无相关热点，用学习方法/提醒替代',
          '- 不要长段落，不要引用，不要表格',
        ].join('\\n'),
      },
      {
        role: 'user',
        content: `请基于最新公开信息生成今日考研资讯摘要。搜索主题：${
          query || '考研 最新 政策 动态 新闻'
        }`,
      },
    ]

    const msg = await proxyChat(messages, 0.7)
    return msg.content || ''
  },
}
