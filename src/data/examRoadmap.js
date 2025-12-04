export const timelineEvents = [
  {
    date: '2025-09-24',
    title: '初试时间公布',
    detail: '教育部：2026 初试定于 2025-12-20/21',
    tag: '时间',
    color: 'violet',
  },
  {
    date: '2025-10-10~13',
    title: '预报名',
    detail: '研招网预报名窗口开放，先校验个人/报考信息',
    tag: '报名',
    color: 'amber',
  },
  {
    date: '2025-10-16~27',
    title: '正式报名',
    detail: '研招网正式报名，确认报考点与院校专业',
    tag: '报名',
    color: 'amber',
  },
  {
    date: '2025-10-31~11-05',
    title: '网上确认/现场确认',
    detail: '各省略有差异：上海 10-31~11-5；甘肃 11-1~11-5；北京/江苏 10-28 发布提醒',
    tag: '确认',
    color: 'cyan',
  },
  {
    date: '2025-12-20/21',
    title: '初试',
    detail: '政治/英语/数学/专业课，提前打印准考证，携带身份证与确认材料',
    tag: '考试',
    color: 'violet',
  },
]

export const sourceItems = [
  {
    source: '教育部',
    date: '2025-09-24',
    title: '2026 初试时间定为 12-20/21',
    tag: '权威',
    color: 'violet',
  },
  { source: '新华社', date: '2025-09-24', title: '初试时间公布快讯', tag: '媒体', color: 'blue' },
  {
    source: '研招网',
    date: '2025-09-30',
    title: '正式报名 10-16~27，预报名 10-10~13',
    tag: '报名',
    color: 'amber',
  },
  {
    source: '研招网',
    date: '2025-10-17',
    title: '网上确认时间汇总（多省）',
    tag: '确认',
    color: 'cyan',
  },
  {
    source: '研招网',
    date: '2025-10-27',
    title: '甘肃省确认：11-1~11-5',
    tag: '确认',
    color: 'cyan',
  },
  { source: '研招网', date: '2025-10-28', title: '北京、江苏确认提醒', tag: '确认', color: 'cyan' },
  {
    source: '上海研招网',
    date: '2025-09-30',
    title: '上海确认安排 10-31~11-5',
    tag: '确认',
    color: 'cyan',
  },
  { source: 'EOL', date: '2025-09-24', title: '初试时间通告', tag: '媒体', color: 'blue' },
  { source: 'chinakaoyan', date: '2025-09-30', title: '时间表汇总', tag: '汇总', color: 'slate' },
  {
    source: '新东方',
    date: '2025-09-19',
    title: '政治大纲要点与获取方式',
    tag: '大纲',
    color: 'emerald',
  },
  {
    source: 'Koolearn',
    date: '2025-09-04',
    title: '数学大纲解读与重点',
    tag: '大纲',
    color: 'emerald',
  },
  {
    source: '新东方',
    date: '2025-11-07',
    title: '大纲深度解读（直播/回放）',
    tag: '大纲',
    color: 'emerald',
  },
]

export const keywords = [
  { term: '进程/调度', freq: 40, category: 'OS' },
  { term: 'TCP 时序与窗口', freq: 31, category: '计网' },
  { term: '排序/查找', freq: 22, category: '数据结构' },
  { term: 'Cache 映射与命中', freq: 19, category: '体系结构' },
  { term: '堆与优先队列', freq: 17, category: '数据结构' },
  { term: 'IP', freq: 17, category: '计网' },
  { term: 'TLB 与 EAT', freq: 15, category: '体系结构' },
  { term: 'PC/程序计数器', freq: 33, category: '体系结构' },
  { term: '矩阵与行列式', freq: 6, category: '数学' },
  { term: '红黑树/B 树', freq: 7, category: '数据结构' },
  { term: 'TCP', freq: 31, category: '计网' },
  { term: 'CPU', freq: 12, category: '体系结构' },
]

export const ruleBlocks = [
  {
    title: '复试规则（北大智能学院示例）',
    chip: '官方基准',
    items: [
      '统考复试分数线：总分 370；单科线 政治/英语 ≥50，专一/专二 ≥90',
      '复试模块：上机编程、专业问答、科研潜力陈述、英语听说；复试占总成绩 50%',
      '总成绩 = 50% × (初试总分 / 5) + 50% × 复试成绩；复试低于 60 不录取',
      '差额复试 120%–200%，全程录音录像，时间多在 3 月中下旬（统考）',
      '材料核验：人证、学籍、成绩单、外语成绩；虚假材料取消资格',
    ],
  },
  {
    title: '阅卷要点（北京统考示例）',
    chip: '流程',
    items: [
      '电子阅卷，条码隐名，分卷按题切块',
      '双评+仲裁：差值超阈值进入三评/组长仲裁',
      '给分细则颗粒化：步骤得分，不扣暴露步',
      '常见失分：步骤缺漏、符号错误、答非所问',
    ],
  },
]
