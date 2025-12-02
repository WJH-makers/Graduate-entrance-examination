import { useState, useCallback } from 'react';
import { chatService } from '../services/api';

// 最大消息历史数量，防止内存泄漏
const MAX_MESSAGES = 50;

export const useDeepSeek = (initialMessages = []) => {
    const [messages, setMessages] = useState(initialMessages);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendMessage = useCallback(async (content) => {
        if (!content.trim()) return;

        const userMessage = { role: 'user', content };

        // 使用函数式更新避免闭包问题
        setMessages(prev => {
            const newMessages = [...prev, userMessage];
            // 限制消息历史数量
            return newMessages.length > MAX_MESSAGES
                ? newMessages.slice(-MAX_MESSAGES)
                : newMessages;
        });

        setIsLoading(true);
        setError(null);

        try {
            // 使用最新的消息状态进行API调用
            setMessages(prevMessages => {
                const apiMessages = [...prevMessages].map(({ role, content }) => ({ role, content }));

                // 异步调用API
                chatService.sendMessage(apiMessages)
                    .then(aiMessage => {
                        setMessages(prev => {
                            const newMessages = [...prev, aiMessage];
                            return newMessages.length > MAX_MESSAGES
                                ? newMessages.slice(-MAX_MESSAGES)
                                : newMessages;
                        });
                        setIsLoading(false);
                    })
                    .catch(err => {
                        setError(err.message);
                        setMessages(prev => [...prev, {
                            role: 'assistant',
                            content: `抱歉，${err.message}。请稍后再试。`
                        }]);
                        setIsLoading(false);
                    });

                return prevMessages;
            });
        } catch (err) {
            setError(err.message);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: '抱歉，连接服务器时出现问题，请检查网络或稍后再试。'
            }]);
            setIsLoading(false);
        }
    }, []); // 空依赖数组，因为我们使用函数式更新

    return {
        messages,
        isLoading,
        error,
        sendMessage
    };
};
