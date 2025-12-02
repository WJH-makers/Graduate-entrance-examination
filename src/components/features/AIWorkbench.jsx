import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/Tabs';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { Loader2, Wand2, Target, ListChecks, Quote, MessageSquare } from 'lucide-react';
import { generateWithDeepSeek } from '../../services/api';

const Section = ({ icon, title, children }) => {
    const IconComp = icon;
    return (
        <div className="space-y-2">
            <div className="flex items-center gap-2 text-cyan-200 text-sm font-semibold">
                <IconComp size={16} /> {title}
            </div>
            {children}
        </div>
    );
};

const AIWorkbench = () => {
    const [input, setInput] = useState('北大软微 人工智能 考研');
    const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);
    const run = async (prompt) => {
        setLoading(true);
        setOutput('');
        try {
            const res = await generateWithDeepSeek([
                { role: 'system', content: '你是考研冲刺助手，输出简洁 Markdown。' },
                { role: 'user', content: prompt }
            ], 0.6);
            setOutput(res);
        } catch (err) {
            setOutput(err.message || '生成失败');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="bg-white/5 border-white/10">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <span className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-violet-500 rounded-full" />
                    <div>
                        <p className="text-xs text-cyan-300 uppercase tracking-[0.2em]">DeepSeek Power</p>
                        <h3 className="text-xl font-bold text-white">AI 冲刺工作台</h3>
                    </div>
                </div>
            </div>

            <Tabs defaultValue="predict" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="predict">考点预测</TabsTrigger>
                    <TabsTrigger value="plan">微计划</TabsTrigger>
                    <TabsTrigger value="mnemonic">口决生成</TabsTrigger>
                    <TabsTrigger value="essay">作文改写</TabsTrigger>
                    <TabsTrigger value="interview">复试模拟</TabsTrigger>
                </TabsList>

                <TabsContent value="predict">
                    <Section icon={Target} title="输入关键词（院校/科目/热点）">
                        <Textarea value={input} onChange={(e) => setInput(e.target.value)} rows={3} />
                    </Section>
                    <Button className="mt-3" onClick={() => run(`请基于最新公开信息，生成考点预测列表（5条要点），面向 ${input}。每条含考法+准备建议，80字内，短横线列出。`)} disabled={loading}>
                        {loading ? <Loader2 className="animate-spin" size={16} /> : <Wand2 size={16} />} 生成预测
                    </Button>
                </TabsContent>

                <TabsContent value="plan">
                    <Section icon={ListChecks} title="弱项/需求描述">
                        <Textarea placeholder="例：二重积分易失分；TCP 拥塞不会画；作文时间分配…" value={input} onChange={(e) => setInput(e.target.value)} rows={3} />
                    </Section>
                    <Button className="mt-3" onClick={() => run(`请据此生成3天微计划：${input}。每天列 3-5 个可执行任务，包含时间/材料/达成标准，使用短横线。`)} disabled={loading}>
                        {loading ? <Loader2 className="animate-spin" size={16} /> : <Wand2 size={16} />} 生成微计划
                    </Button>
                </TabsContent>

                <TabsContent value="mnemonic">
                    <Section icon={Quote} title="输入知识点（可多条）">
                        <Textarea placeholder="例：p-test 判别；OPT/LRU 栈性质；旋度梯度=0" value={input} onChange={(e) => setInput(e.target.value)} rows={3} />
                    </Section>
                    <Button className="mt-3" onClick={() => run(`为以下考点生成10秒口决和30秒步骤提示：${input}。用短横线列出口决，用数字列步骤。`)} disabled={loading}>
                        {loading ? <Loader2 className="animate-spin" size={16} /> : <Wand2 size={16} />} 生成口决
                    </Button>
                </TabsContent>

                <TabsContent value="essay">
                    <Section icon={MessageSquare} title="作文原文/提纲">
                        <Textarea placeholder="粘贴小作文/大作文草稿或要点" value={input} onChange={(e) => setInput(e.target.value)} rows={4} />
                    </Section>
                    <Button className="mt-3" onClick={() => run(`请改写并优化以下作文内容：${input}。返回：1) 提纲要点；2) 高分句式3句（含分裂/让步/因果各1）；3) 词汇替换列表。`)} disabled={loading}>
                        {loading ? <Loader2 className="animate-spin" size={16} /> : <Wand2 size={16} />} 改写作文
                    </Button>
                </TabsContent>

                <TabsContent value="interview">
                    <Section icon={MessageSquare} title="复试自我介绍/项目关键词">
                        <Textarea placeholder="例：自我介绍+项目：CV 检测，C++/PyTorch；兴趣：RL" value={input} onChange={(e) => setInput(e.target.value)} rows={3} />
                    </Section>
                    <Button className="mt-3" onClick={() => run(`扮演考官，基于“${input}”生成3轮问答：每轮给1个问题+示范回答要点+改进建议（中文即可）。`)} disabled={loading}>
                        {loading ? <Loader2 className="animate-spin" size={16} /> : <Wand2 size={16} />} 生成复试问答
                    </Button>
                </TabsContent>
            </Tabs>

            {loading && <p className="text-sm text-cyan-300 mt-4 flex items-center gap-2"><Loader2 size={14} className="animate-spin" /> 调用 DeepSeek 中…</p>}
            {!loading && output && (
                <div className="mt-4 p-3 rounded-lg border border-white/10 bg-black/30 text-sm whitespace-pre-wrap text-gray-100">
                    {output}
                </div>
            )}
        </Card>
    );
};

export default AIWorkbench;
