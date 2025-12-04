import { mathKnowledge } from './knowledge/math'
import { cs408Knowledge } from './knowledge/cs408'
import { politicsKnowledge } from './knowledge/politics'
import { englishKnowledge } from './knowledge/english'

export const resources = [
  {
    id: 1,
    title: '2025考研数学一 - 张宇36讲全套高清扫描版',
    category: 'Math',
    type: 'PDF',
    size: '145MB',
    downloadUrl: '#',
    tags: ['高数', '线代', '概率论', '张宇', '基础强化'],
  },
  {
    id: 2,
    title: '计算机408 - 王道数据结构考研复习指导',
    category: '408',
    type: 'PDF',
    size: '82MB',
    downloadUrl: '#',
    tags: ['数据结构', '王道', '代码题', '算法'],
  },
  {
    id: 3,
    title: '考研英语一 - 黄皮书历年真题解析 (2005-2024)',
    category: 'English',
    type: 'PDF',
    size: '230MB',
    downloadUrl: '#',
    tags: ['阅读', '写作', '完型', '真题', '黄皮书'],
  },
  {
    id: 4,
    title: '考研政治 - 肖秀荣1000题 (解析版)',
    category: 'Politics',
    type: 'PDF',
    size: '65MB',
    downloadUrl: '#',
    tags: ['马原', '毛中特', '史纲', '肖秀荣', '刷题'],
  },
  {
    id: 5,
    title: '408 - 计算机网络自顶向下方法 (第8版) 笔记',
    category: '408',
    type: 'PDF',
    size: '18MB',
    downloadUrl: '#',
    tags: ['网络', '笔记', '知识点'],
  },
  {
    id: 6,
    title: '数学一 - 李林考前预测6套卷 (绝密)',
    category: 'Math',
    type: 'PDF',
    size: '22MB',
    downloadUrl: '#',
    tags: ['模拟卷', '李林', '冲刺'],
  },
  {
    id: 7,
    title: '考研英语写作 - 王江涛高分作文考前预测20篇',
    category: 'English',
    type: 'PDF',
    size: '15MB',
    downloadUrl: '#',
    tags: ['写作', '作文模板', '预测'],
  },
  {
    id: 8,
    title: '考研政治 - 徐涛核心考案',
    category: 'Politics',
    type: 'PDF',
    size: '45MB',
    downloadUrl: '#',
    tags: ['徐涛', '强化班', '笔记'],
  },
  {
    id: 9,
    title: '2026 数学一 - 李林6+4 预测卷（官方店版）',
    category: 'Math',
    type: 'Paper/PDF',
    size: '10 套',
    downloadUrl: 'https://tao.hooos.com/goods_ZKVM4ri6tPzob4eWXHBwvTVt6-yz622osm2Y8XmdOFy.html',
    tags: ['押题', '预测', '李林', '6+4'],
  },
  {
    id: 10,
    title: '2026 数学一 - 张宇 8+4 终极预测卷',
    category: 'Math',
    type: 'Paper/PDF',
    size: '12 套',
    downloadUrl: 'https://tao.hooos.com/goods_7AORvwT4t5nGdRMOAcnnbSMtV-QAnppRSw6doNQQnuk.html',
    tags: ['押题', '张宇', '模拟卷'],
  },
  {
    id: 11,
    title: '2026 计算机 408 - 王道全家桶（真题+预测卷）',
    category: '408',
    type: 'Paper/PDF',
    size: '6 本/多套卷',
    downloadUrl: 'https://tao.hooos.com/goods_D7VjgMocDt5vjv6098IQQNtjtn-OpRwwaFxDxgjeGNs2.html',
    tags: ['王道', '真题', '模拟', '押题'],
  },
  {
    id: 12,
    title: '2026 计算机 408 - 历年真题+4 套模拟（AI 讲解版）',
    category: '408',
    type: 'Ebook/Video',
    size: '8.3MB',
    downloadUrl: 'https://wx.100eshu.com/product/0-960153.html',
    tags: ['408', '真题', '模拟', '视频'],
  },
]

export const knowledgeBase = {
  Math: {
    title: '数学一重难点 & 经典习题',
    sections: mathKnowledge,
  },
  408: {
    title: '计算机408重难点 & 经典习题',
    sections: cs408Knowledge,
  },
  English: {
    title: '考研英语核心技巧',
    sections: englishKnowledge,
  },
  Politics: {
    title: '考研政治背诵要点',
    sections: politicsKnowledge,
  },
}
