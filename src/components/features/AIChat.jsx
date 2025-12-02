import React, { useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, Sparkles, Bot } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { useDeepSeek } from '../../hooks/useDeepSeek';
import { cn } from '../../utils/cn';

const AIChat = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const initialMessages = [
        {
            role: 'system',
            content: `You are a professional and knowledgeable AI tutor for the Chinese Postgraduate Entrance Exam (考研). 
      You specialize in:
      1. Mathematics (Math I, II, III) - Calculus, Linear Algebra, Probability.
      2. English (English I, II) - Reading comprehension, translation, writing.
      3. Politics - Marxism, Maoism, History, Legal basis.
      4. Computer Science 408 - Data Structures, CO, OS, Networks.
      
      Provide detailed, first-hand study materials, explanations, and strategies. 
      Be encouraging, precise, and helpful. Use Chinese for communication.`
        },
        { role: 'assistant', content: '同学你好！我是你的考研专属AI导师。无论是数学难题、英语长难句，还是政治背诵技巧，我都能帮你解答。今天想学点什么？' }
    ];

    const { messages, isLoading, sendMessage } = useDeepSeek(initialMessages);
    const [inputValue, setInputValue] = React.useState('');

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    // 聚焦输入框当聊天打开时
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;
        sendMessage(inputValue);
        setInputValue('');
    };

    // 键盘快捷键支持 (Escape关闭)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(true)}
                aria-label="打开AI聊天助手"
                aria-expanded={isOpen}
                className={cn(
                    "fixed bottom-8 right-8 p-4 rounded-full text-white shadow-lg shadow-violet-500/30 transition-all duration-300 z-50 group hover:scale-110",
                    isOpen ? 'hidden' : 'block'
                )}
                style={{ background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)' }}
            >
                <div className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-0 group-hover:opacity-100 transition-opacity" />
                <MessageSquare size={28} />
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div
                    className="fixed bottom-8 right-8 w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] z-50 animate-float-up"
                    role="dialog"
                    aria-label="AI聊天助手"
                    aria-modal="true"
                >
                    <Card className="h-full flex flex-col p-0 border-white/10 shadow-2xl shadow-black/50 !bg-[#0f172a]/90 backdrop-blur-xl">
                        {/* Header */}
                        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 shadow-lg shadow-violet-500/20" aria-hidden="true">
                                    <Bot size={20} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-sm">DeepSeek 考研导师</h3>
                                    <p className="text-xs text-cyan-300 flex items-center gap-1.5">
                                        <span className="relative flex h-2 w-2" aria-label="在线状态">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                                        </span>
                                        在线中
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                aria-label="关闭聊天"
                                className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div
                            className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin"
                            role="log"
                            aria-live="polite"
                            aria-label="聊天消息"
                        >
                            {messages.filter(m => m.role !== 'system').map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`flex max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} gap-3`}>
                                        {/* Avatar */}
                                        <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user'
                                                ? 'bg-gradient-to-br from-violet-500 to-cyan-500'
                                                : 'bg-white/10'
                                                }`}
                                            aria-hidden="true"
                                        >
                                            {msg.role === 'user' ? <Sparkles size={14} /> : <Bot size={14} />}
                                        </div>

                                        {/* Bubble */}
                                        <div
                                            className={cn(
                                                "p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm",
                                                msg.role === 'user'
                                                    ? 'bg-gradient-to-br from-violet-600 to-cyan-600 text-white rounded-tr-none'
                                                    : 'bg-white/10 text-gray-100 rounded-tl-none border border-white/5'
                                            )}
                                        >
                                            {msg.content}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="flex max-w-[85%] gap-3">
                                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                                            <Bot size={14} />
                                        </div>
                                        <div className="bg-white/10 p-4 rounded-2xl rounded-tl-none border border-white/5 flex items-center gap-3">
                                            <Loader2 size={16} className="animate-spin text-cyan-400" />
                                            <span className="text-gray-400 text-sm">DeepSeek 正在思考...</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form
                            onSubmit={handleSubmit}
                            className="p-4 border-t border-white/10 bg-black/20"
                            aria-label="发送消息"
                        >
                            <div className="relative flex gap-2">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="输入你的问题..."
                                    aria-label="消息输入框"
                                    className="flex-1 bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                                />
                                <Button
                                    type="submit"
                                    disabled={isLoading || !inputValue.trim()}
                                    size="icon"
                                    aria-label="发送消息"
                                    className="w-12 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 hover:from-violet-400 hover:to-cyan-400"
                                >
                                    <Send size={18} />
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            )}
        </>
    );
};

export default AIChat;
