import express from 'express'
import fetch from 'node-fetch'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 8787
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY
const DEEPSEEK_BASE = process.env.DEEPSEEK_BASE || 'https://api.deepseek.com'

if (!DEEPSEEK_API_KEY) {
  console.warn('⚠️  Missing DEEPSEEK_API_KEY, /api/deepseek will reject requests.')
}

const app = express()
app.use(express.json({ limit: '1mb' }))

app.post('/api/deepseek/chat', async (req, res) => {
  if (!DEEPSEEK_API_KEY) {
    return res.status(500).json({ error: 'Server missing DEEPSEEK_API_KEY' })
  }
  const { messages = [], model = 'deepseek-chat', temperature = 0.7 } = req.body || {}

  try {
    const resp = await fetch(`${DEEPSEEK_BASE}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({ messages, model, temperature }),
    })
    if (!resp.ok) {
      const text = await resp.text()
      return res.status(resp.status).json({ error: text || resp.statusText })
    }
    const data = await resp.json()
    return res.json(data)
  } catch (err) {
    console.error('DeepSeek proxy error:', err)
    return res.status(502).json({ error: 'Bad gateway to DeepSeek' })
  }
})

app.listen(PORT, () => {
  console.log(`DeepSeek proxy server running on http://localhost:${PORT}`)
})
