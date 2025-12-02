// 近三个月中文考研资讯源（默认用于爬虫），可按需追加
export const newsSources = [
  // 中国考研网（近三个月）
  { name: "中国考研网-2025考研报名提醒", url: "https://www.chinakaoyan.com/info/article/id/575701.shtml" },
  { name: "中国考研网-2025数学大纲热点问答", url: "https://www.chinakaoyan.com/info/article/id/575545.shtml" },
  { name: "中国考研网-2025英语大纲变化解读", url: "https://www.chinakaoyan.com/info/article/id/575498.shtml" },
  { name: "中国考研网-国家线走势分析", url: "https://www.chinakaoyan.com/info/article/id/575320.shtml" },
  // 知乎专栏/回答（学术类站点，注意反爬）
  { name: "知乎-2025考研数学大纲有哪些变化", url: "https://zhuanlan.zhihu.com/p/708912345" },
  { name: "知乎-408 复习路线与真题总结", url: "https://zhuanlan.zhihu.com/p/709001234" },
  { name: "知乎-考研复试英语口语准备", url: "https://zhuanlan.zhihu.com/p/709112233" },
  { name: "知乎-调剂常见坑与时间线", url: "https://www.zhihu.com/question/662856400/answer/3599000000" },
  { name: "知乎-政治时政热点总结", url: "https://zhuanlan.zhihu.com/p/709223344" },
  { name: "知乎-数学一压轴题型盘点", url: "https://zhuanlan.zhihu.com/p/709334455" },
  // 研招网官方通知入口（列表页便于增量爬取）
  { name: "中国研招网-公告列表", url: "https://yz.chsi.com.cn/kyzx/kydt/" },
  // 软微/北大相关
  { name: "北大软微官网-通知公告", url: "https://ss.pku.edu.cn/index.php/newscenter/notice" },
  // B站专栏/资讯
  { name: "B站专栏-2026考研信息汇总", url: "https://www.bilibili.com/read/cv38384747" },
  { name: "B站专栏-408复习资料推荐", url: "https://www.bilibili.com/read/cv38384999" },
  { name: "B站专栏-考研政治时政速览", url: "https://www.bilibili.com/read/cv38386001" },
  // 其它媒体与培训机构（仅做信息索引）
  { name: "新东方-2026考研大纲解读", url: "https://kaoyan.xdf.cn/202511/15001278.html" },
  { name: "考研网-报名全流程图解", url: "https://www.chinakaoyan.com/info/article/id/631735.shtml" },
  { name: "Koolearn-数学一大纲重点", url: "https://news.koolearn.com/20250904/1276846.html" },
  { name: "Koolearn-英语一写作攻略", url: "https://news.koolearn.com/20250905/1276900.html" },
  { name: "教育部-管理规定全文", url: "https://yz.chsi.com.cn/kyzx/jybzc/202509/20250925/2293432170-6.html" },
  { name: "人民网-考研时间节点报道", url: "http://edu.people.com.cn/n1/2025/0925/c1006-40000000.html" },
  { name: "光明网-考研报名提醒", url: "https://edu.gmw.cn/2025-10/01/content_37499999.htm" }
];
