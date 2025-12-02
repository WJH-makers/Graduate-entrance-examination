import { useState, useCallback, useRef } from 'react';
import { chatService } from '../services/api';

// 最大消息历史数量，防止内存泄漏
const MAX_MESSAGES = 50;

export const useDeepSeek = (initialMessages = []) => {
    const [messages, setMessages] = useState(initialMessages);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const requestIdRef = useRef(0);

    const sendMessage = useCallback(async (content) => {
        if (!content.trim()) return;

        const userMessage = { role: 'user', content };
        let nextMessages = [];
        setMessages(prev => {
            const newList = [...prev, userMessage];
            nextMessages = newList.length > MAX_MESSAGES
                ? newList.slice(-MAX_MESSAGES)
                : newList;
            return nextMessages;
        });

        const currentRequestId = ++requestIdRef.current;
        setIsLoading(true);
        setError(null);

        try {
            const apiMessages = nextMessages.map(({ role, content }) => ({ role, content }));
            const aiMessage = await chatService.sendMessage(apiMessages);

            // 只处理最新请求，旧请求直接丢弃
            if (currentRequestId !== requestIdRef.current) return;

            setMessages(prev => {
                const newList = [...prev, aiMessage];
                return newList.length > MAX_MESSAGES ? newList.slice(-MAX_MESSAGES) : newList;
            });
        } catch (err) {
            setError(err.message);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: '抱歉，连接服务器时出现问题，请检查网络或稍后再试。'
            }]);
        } finally {
            // 仅在当前请求仍是最新时结束 loading
            if (currentRequestId === requestIdRef.current) {
                setIsLoading(false);
            }
        }
    }, []);

    return {
        messages,
        isLoading,
        error,
        sendMessage
    };
};
