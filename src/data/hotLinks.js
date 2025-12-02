// 近期（2025-09~至今）考研权威信息与时间节点
export const hotLinks = [
  { title: "教育部：2026初试时间定为 2025-12-20/21", source: "教育部规章", date: "2025-09-24", url: "https://finance.sina.com.cn/tjhz/2025-09-24/doc-infrqyfc9462157.shtml?utm_source=openai" },
  { title: "新华社：考研初试时间公布", source: "新华社", date: "2025-09-24", url: "https://news.voc.com.cn/news/202509/30529577.html?utm_source=openai" },
  { title: "中国教育在线：初试时间通告", source: "EOL", date: "2025-09-24", url: "https://news.eol.cn/yaowen/202509/t20250924_2691733.shtml?utm_source=openai" },
  { title: "研招网：正式报名 10-16~27，预报名 10-10~13", source: "研招网", date: "2025-09-30", url: "https://yz.chsi.com.cn/kyzx/other/202509/20250930/2293435905.html?utm_source=openai" },
  { title: "甘肃省：网上确认 11-1~11-5", source: "研招网", date: "2025-10-27", url: "https://yz.chsi.com.cn/kyzx/kydt/202510/20251027/2293438669.html?utm_source=openai" },
  { title: "北京确认安排发布", source: "研招网", date: "2025-10-28", url: "https://yz.chsi.com.cn/kyzx/kydt/202510/20251028/2293438804.html?utm_source=openai" },
  { title: "江苏确认提醒", source: "研招网", date: "2025-10-28", url: "https://yz.chsi.com.cn/kyzx/kydt/202510/20251028/2293438851.html?utm_source=openai" },
  { title: "网上确认时间汇总（多省）", source: "研招网", date: "2025-10-17", url: "https://yz.chsi.com.cn/kyzx/kydt/202510/20251017/2293439784.html?utm_source=openai" },
  { title: "上海确认安排 10-31~11-5", source: "研招网", date: "2025-09-30", url: "https://yz.chsi.com.cn/kyzx/kydt/202509/20250930/2293435711.html?utm_source=openai" },
  { title: "报名流程与时间解析", source: "yzw.org.cn", date: "2025-09-30", url: "https://www.yzw.org.cn/news/guojiazhengce/202503/0520298.html?utm_source=openai" },
  { title: "时间表汇总（考研网）", source: "chinakaoyan", date: "2025-09-30", url: "https://www.chinakaoyan.com/info/article/id/631735.shtml?utm_source=openai" },
  { title: "政治大纲要点与获取方式", source: "新东方", date: "2025-09-19", url: "https://kaoyan.xdf.cn/202509/14949042.html?utm_source=openai" },
  { title: "数学大纲解读与重点", source: "Koolearn", date: "2025-09-04", url: "https://news.koolearn.com/20250904/1276846.html?utm_source=openai" },
  { title: "数学一高数攻略", source: "Koolearn", date: "2025-09-04", url: "https://news.koolearn.com/20250904/1276864.html?utm_source=openai" },
  { title: "大纲深度解读（新东方）", source: "新东方", date: "2025-11-07", url: "https://kaoyan.xdf.cn/202511/15001278.html?utm_source=openai" },
  { title: "时间表（大学生必备网）", source: "dxsbb", date: "2025-10-11", url: "https://www.dxsbb.com/news/3681.html?utm_source=openai" },
  { title: "新浪财经时间表", source: "新浪", date: "2025-09-24", url: "https://finance.sina.com.cn/jjxw/2025-09-24/doc-infrqprp1742102.shtml?utm_source=openai" },
  { title: "中国甘肃网时间表", source: "中国甘肃网", date: "2025-09-25", url: "https://gansu.gscn.com.cn/system/2025/09/25/013389199.shtml?utm_source=openai" },
  { title: "湖北日报时间表", source: "湖北日报", date: "2025-09-24", url: "https://news.cnhubei.com/content/2025-09/24/content_19527900.html?utm_source=openai" },
  { title: "教育在线：时间表与科目列表", source: "EOL", date: "2025-09-24", url: "https://www.eol.cn/news/yaowen/202509/t20250924_2691733.shtml?utm_source=openai" }
];

// 高频题型提示（用于卡片展示）
export const hotTopics = [
  { subject: '数学一', items: ['极限 + 等价无穷小', '幂级数/收敛半径与端点', '线代特征值/正定判别', '概率：正态线性组合、中心极限定理'] },
  { subject: '计算机408', items: ['同步与死锁（信号量/哲学家）', '虚存置换与 TLB/工作集', '流水线冒险+Cache 映射', '最短路/MST/哈希冲突'] },
  { subject: '英语一', items: ['阅读主旨+同义替换', '科技话题大作文三段式', '被动语态英译汉转主动', '完形逻辑词+搭配优先'] },
  { subject: '政治', items: ['总路线与三大作风', '总体国家安全观', '双碳与绿色发展', '共同富裕路径（做大/分好/兜底）'] }
];

export const timeline = [
  { date: '2025-09-24', label: '初试时间公布：2025-12-20/21' },
  { date: '2025-10-10~13', label: '预报名' },
  { date: '2025-10-16~27', label: '正式报名' },
  { date: '2025-10-31~11-05', label: '网上确认（各省略有差异）' },
  { date: '2025-12-20/21', label: '初试（政治/英/数/专业课）' }
];
