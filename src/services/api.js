import OpenAI from 'openai';

// 从环境变量读取API密钥
const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY;

// 验证API密钥
if (!apiKey) {
    console.error('DeepSeek API密钥未配置。请在.env文件中设置VITE_DEEPSEEK_API_KEY');
}

// Initialize OpenAI client with DeepSeek configuration
const client = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: apiKey,
    dangerouslyAllowBrowser: true // 注意：生产环境应使用后端代理
});

export const chatService = {
    /**
     * Send a message to DeepSeek API
     * @param {Array<{role: string, content: string}>} messages 
     * @returns {Promise<{role: string, content: string}>}
     */
    async sendMessage(messages) {
        if (!apiKey) {
            throw new Error('API密钥未配置');
        }

        try {
            const completion = await client.chat.completions.create({
                messages,
                model: 'deepseek-chat',
                temperature: 1.0,
            });

            return completion.choices[0].message;
        } catch (error) {
            console.error('DeepSeek API Error:', error);

            // 更详细的错误信息
            if (error.status === 401) {
                throw new Error('API密钥无效，请检查配置');
            } else if (error.status === 429) {
                throw new Error('API请求过于频繁，请稍后再试');
            } else if (error.status === 500) {
                throw new Error('DeepSeek服务暂时不可用');
            }

            throw new Error('连接AI服务失败');
        }
    }
};

// 通用生成器：返回 string 结果
export const generateWithDeepSeek = async (messages, temperature = 0.7) => {
    if (!apiKey) {
        throw new Error('API密钥未配置');
    }
    const completion = await client.chat.completions.create({
        messages,
        model: 'deepseek-chat',
        temperature
    });
    return completion.choices?.[0]?.message?.content || '';
};

export const newsService = {
    /**
     * Fetch condensed news digest focused on exam-related topics via DeepSeek
     * @param {string} query
     * @returns {Promise<string>} raw markdown text
     */
    async fetchDigest(query) {
        if (!apiKey) {
            throw new Error('API密钥未配置');
        }
        const messages = [
            {
                role: 'system',
                content: [
                    '你是一名“考研资讯快报”编辑，输出格式保持简洁：',
                    '- 用 5 条要点（短横线开头）',
                    '- 每条包含【日期】、标题、20-30 字摘要',
                    '- 关注考研政策、报名/初试/复试、院校动态、官方权威消息；若无相关热点，用学习方法/提醒替代',
                    '- 不要长段落，不要引用，不要表格'
                ].join('\n')
            },
            {
                role: 'user',
                content: `请基于最新公开信息，生成今日考研资讯摘要。搜索主题：${query || '考研 最新 政策 动态 新闻' }`
            }
        ];

        const completion = await client.chat.completions.create({
            messages,
            model: 'deepseek-chat',
            temperature: 0.7,
        });

        return completion.choices?.[0]?.message?.content || '';
    }
};
