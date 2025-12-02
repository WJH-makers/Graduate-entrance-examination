import React, { useState } from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { Sparkles, ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '../ui/Button';

const createParticles = (count = 20) =>
    [...Array(count)].map(() => ({
        width: Math.random() * 4 + 1,
        height: Math.random() * 4 + 1,
        top: Math.random() * 100,
        left: Math.random() * 100,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5,
    }));

const Hero = () => {
    const [particles] = useState(() => createParticles());

    return (
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] text-center px-4 overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                        rotate: [0, 90, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.2, 0.4, 0.2],
                        x: [0, 100, 0]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[100px]"
                />
                {/* Floating Particles */}
                {particles.map((p, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-white/10 rounded-full"
                        style={{
                            width: `${p.width}px`,
                            height: `${p.height}px`,
                            top: `${p.top}%`,
                            left: `${p.left}%`,
                        }}
                        animate={{
                            y: [0, -100, 0],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: p.duration,
                            repeat: Infinity,
                            ease: "linear",
                            delay: p.delay
                        }}
                    />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md shadow-lg shadow-violet-500/10 hover:bg-white/10 transition-colors cursor-default"
            >
                <Sparkles size={16} className="text-yellow-400 animate-pulse" />
                <span className="text-sm font-medium text-gray-200">2026 考研一站式备考平台</span>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-6xl md:text-8xl font-extrabold mb-8 tracking-tight leading-tight relative"
            >
                <span className="text-white drop-shadow-2xl">研路</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-cyan-400 to-violet-400 animate-gradient bg-300%">漫漫</span>
                <br />
                <span className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500">
                    亦可璀璨
                </span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
            >
                汇集 <span className="text-violet-400 font-semibold">数学一</span>、
                <span className="text-cyan-400 font-semibold">英语一</span>、
                <span className="text-pink-400 font-semibold">政治</span>、
                <span className="text-emerald-400 font-semibold">计算机408</span> 核心资料与重难点解析。
                <br />
                让每一次复习都更高效，让每一份努力都值得。
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 z-20"
            >
                <Button size="lg" className="group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="relative flex items-center">
                        开始探索
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                    </span>
                </Button>
                <Button variant="secondary" size="lg" className="group">
                    <BookOpen className="mr-2 group-hover:scale-110 transition-transform" size={18} />
                    浏览资料库
                </Button>
            </motion.div>
        </div>
    );
};

export default Hero;
