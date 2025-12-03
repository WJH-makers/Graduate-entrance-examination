import { useCallback, useRef, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { chatService } from '../services/api'

// 最大消息历史数量，防止内存泄漏
const MAX_MESSAGES = 50

export const useDeepSeek = (initialMessages = []) => {
  const [messages, setMessages] = useState(initialMessages)
  const requestIdRef = useRef(0)

  const chatMutation = useMutation({
    mutationKey: ['deepseek-chat'],
    mutationFn: async (history) => {
      const apiMessages = history.map(({ role, content }) => ({ role, content }))
      return chatService.sendMessage(apiMessages)
    },
  })

  const sendMessage = useCallback(
    async (content) => {
      if (!content.trim()) return

      const userMessage = { role: 'user', content }
      let nextMessages = []
      setMessages((prev) => {
        const newList = [...prev, userMessage]
        nextMessages = newList.length > MAX_MESSAGES ? newList.slice(-MAX_MESSAGES) : newList
        return nextMessages
      })

      const currentRequestId = ++requestIdRef.current
      chatMutation.reset()

      try {
        const aiMessage = await chatMutation.mutateAsync(nextMessages)

        // 只处理最新请求，旧请求直接丢弃
        if (currentRequestId !== requestIdRef.current) return

        setMessages((prev) => {
          const newList = [...prev, aiMessage]
          return newList.length > MAX_MESSAGES ? newList.slice(-MAX_MESSAGES) : newList
        })
      } catch (err) {
        if (currentRequestId !== requestIdRef.current) return
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: err?.message || '抱歉，连接服务器时出现问题，请稍后再试。',
          },
        ])
      }
    },
    [chatMutation]
  )

  return {
    messages,
    isLoading: chatMutation.isPending,
    error: chatMutation.error?.message || null,
    sendMessage,
  }
}
