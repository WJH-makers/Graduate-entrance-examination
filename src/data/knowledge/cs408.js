export const cs408Knowledge = [
  {
    "id": "cs2",
    "category": "Data Structures",
    "subcategory": "Linear Lists",
    "title": "线性表 - 顺序表与链表",
    "difficulty": "Low",
    "importance": 4,
    "tags": [
      "数据结构",
      "线性表",
      "链表"
    ],
    "content": "插入/删除操作的时间复杂度对比，头插法/尾插法建立链表。",
    "classicProblems": [
      {
        "title": "链表逆置",
        "description": "原地逆置单链表",
        "solution": "头插法或三指针法。"
      }
    ],
    "mistakes": [
      "链表操作忘记断链保护",
      "数组下标越界"
    ],
    "detailedAnalysis": "顺序表支持随机访问，但插入删除需要移动大量元素；链表不支持随机访问，但插入删除只需修改指针。",
    "examTips": [
      "链表逆置是高频考点。"
    ],
    "secondaryConclusions": [
      "链表判环：快慢指针法（快指针每次走2步，慢指针每次走1步）。",
      "寻找链表倒数第 k 个节点：双指针法（先行指针先走 k 步）。"
    ],
    "frequency": 5
  },
  {
    "id": "cs3",
    "category": "Data Structures",
    "subcategory": "Stack & Queue",
    "title": "栈与队列的应用",
    "difficulty": "Medium",
    "importance": 4,
    "tags": [
      "数据结构",
      "栈",
      "队列"
    ],
    "content": "括号匹配，表达式求值（中缀转后缀），层次遍历，缓冲队列。",
    "classicProblems": [
      {
        "title": "栈实现队列",
        "description": "用两个栈实现队列的入队和出队",
        "solution": "栈1负责入，栈2负责出，栈2空时将栈1全部倒入栈2。"
      }
    ],
    "mistakes": [
      "栈空/栈满判断错误",
      "循环队列队尾指针计算错误"
    ],
    "detailedAnalysis": "栈是“后进先出” (LIFO)，队列是“先进先出” (FIFO)。",
    "examTips": [
      "循环队列的判空判满条件：(rear+1)%maxSize == front (满), rear == front (空)。"
    ],
    "frequency": 5
  },
  {
    "id": "cs5",
    "category": "Data Structures",
    "subcategory": "Trees",
    "title": "二叉树遍历",
    "difficulty": "Medium",
    "importance": 5,
    "tags": [
      "数据结构",
      "树",
      "遍历"
    ],
    "content": "前中后序递归与非递归实现，层次遍历。",
    "classicProblems": [
      {
        "title": "非递归后序",
        "description": "使用栈实现二叉树后序遍历",
        "solution": "需记录上一次访问的节点 r，判断是从左子树返回还是右子树返回。"
      }
    ],
    "mistakes": [
      "非递归遍历栈操作顺序错误",
      "已知前序+后序无法确定二叉树"
    ],
    "detailedAnalysis": "二叉树遍历分为前序 (NLR)、中序 (LNR)、后序 (LRN) 和层次遍历。",
    "examTips": [
      "已知前序+中序，或后序+中序，可以唯一确定二叉树。"
    ],
    "secondaryConclusions": [
      "n0 = n2 + 1 (度为0的节点数总是比度为2的节点数多1)。",
      "满二叉树高度 h = log2(n+1)。",
      "完全二叉树高度 h = floor(log2(n)) + 1。"
    ],
    "frequency": 5
  },
  {
    "id": "cs6",
    "category": "Data Structures",
    "subcategory": "Trees",
    "title": "线索二叉树",
    "difficulty": "Medium",
    "importance": 4,
    "tags": [
      "数据结构",
      "树",
      "线索化"
    ],
    "content": "线索化过程，利用线索找前驱/后继。",
    "classicProblems": [
      {
        "title": "找后继",
        "description": "中序线索二叉树找后继",
        "solution": "若 rchild==0，则后继为右子树中最左下的节点；若 rchild==1，则后继为右孩子。"
      }
    ],
    "mistakes": [
      "空指针域利用错误",
      "线索化递归结束条件"
    ],
    "detailedAnalysis": "线索二叉树利用 n+1 个空链域存放前驱和后继信息。",
    "examTips": [
      "中序线索二叉树找前驱后继最容易。"
    ],
    "frequency": 5
  },
  {
    "id": "cs8",
    "category": "Data Structures",
    "subcategory": "Graphs",
    "title": "图的存储与遍历",
    "difficulty": "Medium",
    "importance": 5,
    "tags": [
      "数据结构",
      "图",
      "遍历"
    ],
    "content": "邻接矩阵、邻接表，BFS 与 DFS。",
    "classicProblems": [
      {
        "title": "连通性判断",
        "description": "如何判断无向图是否连通？",
        "solution": "从任一顶点出发进行 BFS/DFS，若访问节点数等于总节点数，则连通。"
      }
    ],
    "mistakes": [
      "邻接表表示不唯一",
      "BFS 需要辅助队列"
    ],
    "detailedAnalysis": "图的存储主要有邻接矩阵（适合稠密图）和邻接表（适合稀疏图）。",
    "examTips": [
      "BFS 类似于树的层次遍历，可以求无权图最短路径。"
    ],
    "frequency": 5
  },
  {
    "id": "cs9",
    "category": "Data Structures",
    "subcategory": "Graphs",
    "title": "最小生成树 (MST)",
    "difficulty": "High",
    "importance": 5,
    "tags": [
      "算法",
      "图",
      "MST"
    ],
    "content": "Prim 算法（加点法），Kruskal 算法（加边法）。",
    "classicProblems": [
      {
        "title": "算法选择",
        "description": "稠密图求 MST 用哪个算法？",
        "solution": "Prim 算法 (O(V^2))。Kruskal 适合稀疏图 (O(E log E))。"
      }
    ],
    "mistakes": [
      "Prim 算法更新距离错误",
      "Kruskal 判环错误"
    ],
    "detailedAnalysis": "MST 是图论经典问题。Prim 关注点，Kruskal 关注边。",
    "examTips": [
      "Prim 算法适合稠密图，Kruskal 算法适合稀疏图。"
    ],
    "frequency": 5
  },
  {
    "id": "cs10",
    "category": "Data Structures",
    "subcategory": "Graphs",
    "title": "最短路径",
    "difficulty": "High",
    "importance": 5,
    "tags": [
      "算法",
      "图",
      "最短路径"
    ],
    "content": "Dijkstra 算法（单源，无负权），Floyd 算法（多源）。",
    "classicProblems": [
      {
        "title": "Dijkstra 适用性",
        "description": "Dijkstra 能否处理负权边？",
        "solution": "不能。负权边需用 Bellman-Ford 或 SPFA。"
      }
    ],
    "mistakes": [
      "Dijkstra 贪心策略理解错误",
      "Floyd 三重循环顺序错误"
    ],
    "detailedAnalysis": "Dijkstra 基于贪心，Floyd 基于动态规划。",
    "examTips": [
      "Dijkstra 时间复杂度 O(V^2)，Floyd 时间复杂度 O(V^3)。"
    ],
    "frequency": 5
  },
  {
    "id": "cs12",
    "category": "Data Structures",
    "subcategory": "Search & Sort",
    "title": "平衡二叉树 (AVL)",
    "difficulty": "High",
    "importance": 4,
    "tags": [
      "数据结构",
      "查找",
      "AVL"
    ],
    "content": "平衡因子，四种旋转调整 (LL, RR, LR, RL)。",
    "classicProblems": [
      {
        "title": "旋转类型",
        "description": "在左孩子的右子树插入导致失衡，如何调整？",
        "solution": "LR 旋转（先左旋后右旋）。"
      }
    ],
    "mistakes": [
      "旋转方向搞反",
      "平衡因子计算错误"
    ],
    "detailedAnalysis": "AVL 树保证了查找效率为 O(log n)。",
    "examTips": [
      "插入节点后，只需调整最小不平衡子树。"
    ],
    "frequency": 5
  },
  {
    "id": "cs13_new",
    "category": "Data Structures",
    "subcategory": "Search & Sort",
    "title": "B树与B+树",
    "difficulty": "High",
    "importance": 5,
    "frequency": 6,
    "tags": [
      "数据结构",
      "查找",
      "B树"
    ],
    "content": "多路平衡查找树。B树节点存数据，B+树仅叶子存数据。",
    "classicProblems": [
      {
        "title": "高度计算",
        "description": "含 n 个关键字的 m 阶 B 树的最大高度？",
        "solution": "H <= log_ceil(m/2) ((n+1)/2) + 1。"
      }
    ],
    "mistakes": [
      "B树与B+树叶子节点链接区别",
      "分裂与合并规则"
    ],
    "detailedAnalysis": "B树主要用于文件系统索引。B+树适合范围查询（叶子节点链表）。",
    "examTips": [
      "B树关键字数：ceil(m/2)-1 <= n <= m-1。"
    ],
    "secondaryConclusions": [
      "m 阶 B 树根节点至少 2 子树（若不空）。",
      "B+ 树所有叶子节点在同一层，且通过指针链接。"
    ]
  },
  {
    "id": "cs14",
    "category": "Data Structures",
    "subcategory": "Search & Sort",
    "title": "快速排序",
    "difficulty": "High",
    "importance": 5,
    "tags": [
      "算法",
      "排序",
      "快排"
    ],
    "content": "Partition 划分过程，递归实现，时间复杂度分析。",
    "classicProblems": [
      {
        "title": "最坏情况",
        "description": "快排什么时候最慢？",
        "solution": "数组有序或逆序时，退化为 O(n^2)。"
      }
    ],
    "mistakes": [
      "划分基准归位错误",
      "递归边界条件"
    ],
    "detailedAnalysis": "快排是平均性能最好的排序算法。核心是 Partition 操作。",
    "examTips": [
      "快排是不稳定的。"
    ],
    "secondaryConclusions": [
      "快排最好情况 O(n log n)，最坏情况 O(n^2)。",
      "空间复杂度：最好 O(log n) (递归栈深度)，最坏 O(n)。",
      "当数据量较小时，快排不如插入排序。"
    ],
    "frequency": 5
  },
  {
    "id": "cs16",
    "category": "Computer Organization",
    "subcategory": "Data Representation",
    "title": "IEEE 754 浮点数",
    "difficulty": "High",
    "importance": 5,
    "tags": [
      "计组",
      "浮点数",
      "IEEE754"
    ],
    "content": "符号位、阶码（移码）、尾数（原码/补码），规格化。",
    "classicProblems": [
      {
        "title": "浮点数转换",
        "description": "将 -0.75 转换为 IEEE 754 单精度格式",
        "solution": "符号1，0.75=1.1*2^-1，阶码 127-1=126..."
      }
    ],
    "mistakes": [
      "阶码偏置值 127 记错",
      "隐藏位 1 忘记"
    ],
    "detailedAnalysis": "IEEE 754 标准规定了浮点数的存储格式。单精度 32 位 (1+8+23)，双精度 64 位 (1+11+52)。",
    "examTips": [
      "阶码用移码表示，偏置值为 127 (单) 或 1023 (双)。"
    ],
    "frequency": 5
  },
  {
    "id": "cs19",
    "category": "Computer Organization",
    "subcategory": "Memory",
    "title": "Cache 映射方式",
    "difficulty": "High",
    "importance": 5,
    "tags": [
      "计组",
      "Cache",
      "映射"
    ],
    "content": "直接映射、全相联映射、组相联映射。",
    "classicProblems": [
      {
        "title": "地址计算",
        "description": "已知 Cache 大小、块大小，求主存地址的标记、组号、块内地址位数",
        "solution": "根据映射方式划分地址位。"
      }
    ],
    "mistakes": [
      "组号位数计算错误",
      "标记位长度计算错误"
    ],
    "detailedAnalysis": "Cache 映射解决了主存块如何放入 Cache 的问题。",
    "examTips": [
      "组相联映射是折中方案，最为常用。"
    ],
    "frequency": 5
  },
  {
    "id": "cs21",
    "category": "Computer Organization",
    "subcategory": "CPU",
    "title": "指令流水线",
    "difficulty": "High",
    "importance": 5,
    "tags": [
      "计组",
      "流水线",
      "性能"
    ],
    "content": "流水线周期，吞吐率，加速比，三大冒险（结构、数据、控制）。",
    "classicProblems": [
      {
        "title": "数据冒险",
        "description": "RAW (写后读) 冒险如何解决？",
        "solution": "数据旁路 (Forwarding) 或 暂停 (Stall)。"
      }
    ],
    "mistakes": [
      "流水线级数与时钟周期混淆",
      "冒险类型判断错误"
    ],
    "detailedAnalysis": "流水线技术通过指令重叠执行提高吞吐率。",
    "examTips": [
      "结构冒险通常由资源冲突（如同时访问内存）引起。"
    ],
    "frequency": 5
  },
  {
    "id": "cs23",
    "category": "Operating Systems",
    "subcategory": "Process Management",
    "title": "进程状态与转换",
    "difficulty": "Low",
    "importance": 5,
    "tags": [
      "OS",
      "进程",
      "状态"
    ],
    "content": "三态模型（运行、就绪、阻塞），五态模型（新建、终止）。",
    "classicProblems": [
      {
        "title": "状态转换",
        "description": "阻塞态能否直接转为运行态？",
        "solution": "不能。必须先转为就绪态，等待调度。"
      }
    ],
    "mistakes": [
      "就绪与阻塞的区别不清",
      "挂起态理解错误"
    ],
    "detailedAnalysis": "进程是资源分配的基本单位。掌握状态转换图是基础。",
    "examTips": [
      "只有就绪态和运行态可以相互转换（时间片完/被抢占）。"
    ],
    "frequency": 5
  },
  {
    "id": "cs25",
    "category": "Operating Systems",
    "subcategory": "Process Management",
    "title": "死锁",
    "difficulty": "High",
    "importance": 5,
    "tags": [
      "OS",
      "死锁",
      "银行家算法"
    ],
    "content": "死锁四个必要条件，预防、避免（银行家算法）、检测与解除。",
    "classicProblems": [
      {
        "title": "安全序列",
        "description": "给定资源分配表，判断系统是否安全",
        "solution": "运行银行家算法寻找安全序列。"
      }
    ],
    "mistakes": [
      "死锁与饥饿混淆",
      "银行家算法步骤错误"
    ],
    "detailedAnalysis": "死锁是多个进程因争夺资源而无限等待的现象。",
    "examTips": [
      "破坏四个必要条件之一即可预防死锁。"
    ],
    "frequency": 5
  },
  {
    "id": "cs26",
    "category": "Operating Systems",
    "subcategory": "Process Management",
    "title": "信号量与 PV 操作",
    "difficulty": "High",
    "importance": 5,
    "tags": [
      "OS",
      "同步",
      "互斥"
    ],
    "content": "生产者-消费者问题，读者-写者问题，哲学家进餐问题。",
    "classicProblems": [
      {
        "title": "同步互斥",
        "description": "缓冲区大小为 n，如何控制生产与消费？",
        "solution": "互斥信号量 mutex=1，空闲 empty=n，满 full=0。"
      }
    ],
    "mistakes": [
      "P/V 操作顺序颠倒（死锁风险）",
      "信号量初值设置错误"
    ],
    "detailedAnalysis": "PV 操作是解决进程同步互斥的经典工具。",
    "examTips": [
      "先 P 同步信号量，后 P 互斥信号量。"
    ],
    "frequency": 5
  },
  {
    "id": "cs28",
    "category": "Operating Systems",
    "subcategory": "Memory Management",
    "title": "分页存储管理",
    "difficulty": "Medium",
    "importance": 5,
    "tags": [
      "OS",
      "内存",
      "分页"
    ],
    "content": "页表，逻辑地址转物理地址，快表 (TLB)。",
    "classicProblems": [
      {
        "title": "地址转换",
        "description": "已知页大小 4KB，逻辑地址 0x2345，页表...求物理地址",
        "solution": "提取页号和页内偏移，查页表得块号，拼接。"
      }
    ],
    "mistakes": [
      "页号与块号混淆",
      "进制转换错误"
    ],
    "detailedAnalysis": "分页解决了内存碎片问题。逻辑地址 = 页号 + 页内偏移。",
    "examTips": [
      "TLB 命中则不需要访问内存页表，速度极大提升。"
    ],
    "frequency": 5
  },
  {
    "id": "cs29",
    "category": "Operating Systems",
    "subcategory": "Memory Management",
    "title": "页面置换算法",
    "difficulty": "Medium",
    "importance": 4,
    "tags": [
      "OS",
      "虚拟内存",
      "算法"
    ],
    "content": "OPT (最佳), FIFO, LRU (最近最久未使用), Clock (时钟)。",
    "classicProblems": [
      {
        "title": "缺页次数",
        "description": "给定访问序列和物理块数，求 LRU 缺页次数",
        "solution": "模拟堆栈变化。"
      }
    ],
    "mistakes": [
      "LRU 与 FIFO 混淆",
      "Clock 算法指针移动规则"
    ],
    "detailedAnalysis": "页面置换是虚拟内存的核心。OPT 是理论最优但不可实现。LRU 性能好但开销大。Clock 是折中。",
    "examTips": [
      "Belady 异常只出现在 FIFO 算法中。"
    ],
    "frequency": 5
  },
  {
    "id": "cs35",
    "category": "Computer Networks",
    "subcategory": "Network Layer",
    "title": "子网划分与 CIDR",
    "difficulty": "High",
    "importance": 5,
    "tags": [
      "网络",
      "IP",
      "子网"
    ],
    "content": "定长子网掩码 (FLSM)，变长子网掩码 (VLSM)，CIDR 路由聚合。",
    "classicProblems": [
      {
        "title": "路由聚合",
        "description": "聚合 192.168.1.0/24 和 192.168.2.0/24",
        "solution": "找最长公共前缀 -> 192.168.0.0/22 (注意二进制)。"
      }
    ],
    "mistakes": [
      "子网掩码计算错误",
      "广播地址计算错误"
    ],
    "detailedAnalysis": "CIDR 解决了 IP 地址枯竭和路由表膨胀问题。",
    "examTips": [
      "最长前缀匹配原则用于路由选择。"
    ],
    "frequency": 5
  },
  {
    "id": "cs36",
    "category": "Computer Networks",
    "subcategory": "Network Layer",
    "title": "ARP 与 ICMP",
    "difficulty": "Medium",
    "importance": 4,
    "tags": [
      "网络",
      "协议",
      "ARP"
    ],
    "content": "ARP (IP -> MAC)，ICMP (Ping, Traceroute)。",
    "classicProblems": [
      {
        "title": "ARP 过程",
        "description": "主机 A 发送数据给主机 B，ARP 请求是广播还是单播？",
        "solution": "请求是广播，响应是单播。"
      }
    ],
    "mistakes": [
      "ARP 跨网段理解错误",
      "ICMP 报文类型"
    ],
    "detailedAnalysis": "ARP 解决局域网内 IP 到 MAC 的映射。ICMP 用于网络探测和差错报告。",
    "examTips": [
      "跨网段通信时，ARP 请求的是网关的 MAC 地址。"
    ],
    "frequency": 5
  },
  {
    "id": "cs32",
    "category": "Computer Networks",
    "subcategory": "Transport Layer",
    "title": "TCP 三次握手与四次挥手",
    "difficulty": "High",
    "importance": 5,
    "tags": [
      "网络",
      "TCP",
      "连接管理"
    ],
    "content": "SYN, ACK, FIN 标志位，序列号变化，状态变迁。",
    "classicProblems": [
      {
        "title": "握手原因",
        "description": "为什么需要三次握手？",
        "solution": "防止已失效的连接请求报文段突然又传送到了服务端。"
      }
    ],
    "mistakes": [
      "序列号 seq 和确认号 ack 计算错误",
      "TIME_WAIT 状态作用"
    ],
    "detailedAnalysis": "TCP 提供可靠的面向连接服务。三次握手建立连接，四次挥手释放连接。",
    "examTips": [
      "TIME_WAIT 状态需等待 2MSL，确保服务端收到最后的 ACK。"
    ],
    "frequency": 5
  },
  {
    "id": "cs33",
    "category": "Computer Networks",
    "subcategory": "Transport Layer",
    "title": "TCP 拥塞控制",
    "difficulty": "High",
    "importance": 5,
    "tags": [
      "网络",
      "TCP",
      "拥塞控制"
    ],
    "content": "慢开始，拥塞避免，快重传，快恢复。",
    "classicProblems": [
      {
        "title": "拥塞窗口变化",
        "description": "发生超时后，拥塞窗口如何变化？",
        "solution": "ssthresh = cwnd/2, cwnd = 1, 进入慢开始。"
      }
    ],
    "mistakes": [
      "慢开始门限 ssthresh 更新规则",
      "3个重复ACK触发快重传"
    ],
    "detailedAnalysis": "拥塞控制防止过多数据注入网络。",
    "examTips": [
      "发送窗口 = min(接收窗口 rwnd, 拥塞窗口 cwnd)。"
    ],
    "frequency": 5
  },
  {
    "id": "cs38",
    "category": "Computer Networks",
    "subcategory": "Application Layer",
    "title": "DNS 域名解析",
    "difficulty": "Medium",
    "importance": 4,
    "tags": [
      "网络",
      "DNS",
      "应用层"
    ],
    "content": "递归查询与迭代查询，根域名服务器，本地域名服务器。",
    "classicProblems": [
      {
        "title": "查询过程",
        "description": "主机向本地域名服务器查询通常采用什么方式？",
        "solution": "递归查询。本地域名服务器向根/顶级域名服务器查询通常用迭代查询。"
      }
    ],
    "mistakes": [
      "递归与迭代混淆",
      "DNS 使用 UDP/TCP"
    ],
    "detailedAnalysis": "DNS 将域名转换为 IP 地址。",
    "examTips": [
      "DNS 主要使用 UDP 53 端口，但在区域传送时使用 TCP。"
    ],
    "frequency": 5
  },
  {
    "id": "cs40",
    "category": "Data Structures",
    "subcategory": "Graph Applications",
    "title": "拓扑排序",
    "difficulty": "Medium",
    "importance": 5,
    "tags": [
      "数据结构",
      "图",
      "拓扑排序"
    ],
    "content": "AOV 网，检测环，时间复杂度 O(V+E)。",
    "classicProblems": [
      {
        "title": "排序结果",
        "description": "一个图的拓扑排序序列是否唯一？",
        "solution": "不一定。若存在多个入度为 0 的节点，顺序可变。"
      }
    ],
    "mistakes": [
      "有环图无法进行拓扑排序",
      "混淆 AOV 和 AOE 网"
    ],
    "detailedAnalysis": "拓扑排序是对有向无环图 (DAG) 顶点的一种线性排序。",
    "examTips": [
      "拓扑排序常用于检测图是否有环。"
    ],
    "frequency": 5
  },
  {
    "id": "cs41",
    "category": "Data Structures",
    "subcategory": "Graph Applications",
    "title": "关键路径",
    "difficulty": "High",
    "importance": 5,
    "tags": [
      "数据结构",
      "图",
      "关键路径"
    ],
    "content": "AOE 网，最早/最迟发生时间，关键活动。",
    "classicProblems": [
      {
        "title": "工期压缩",
        "description": "缩短非关键活动的工期能否缩短整个工期？",
        "solution": "不能。只有缩短关键活动的工期才有效。"
      }
    ],
    "mistakes": [
      "关键路径可能不止一条",
      "计算时间参数出错"
    ],
    "detailedAnalysis": "关键路径是 AOE 网中路径长度最长的路径，决定了整个工程的工期。",
    "examTips": [
      "所有关键活动提前完成，工期才会提前。"
    ],
    "frequency": 5
  },
  {
    "id": "cs45",
    "category": "Operating Systems",
    "subcategory": "File Management",
    "title": "文件目录结构",
    "difficulty": "Medium",
    "importance": 4,
    "tags": [
      "OS",
      "文件",
      "目录"
    ],
    "content": "单级、两级、树形目录（多级），无环图目录。",
    "classicProblems": [
      {
        "title": "路径名",
        "description": "绝对路径与相对路径的区别？",
        "solution": "绝对路径从根目录开始，相对路径从当前目录开始。"
      }
    ],
    "mistakes": [
      "树形目录不便于文件共享",
      "无环图目录实现共享"
    ],
    "detailedAnalysis": "目录结构决定了文件的组织方式。现代 OS 多采用树形目录。",
    "examTips": [
      "硬链接和软链接（符号链接）在文件共享中的区别。"
    ],
    "frequency": 5
  },
  {
    "id": "cs46",
    "category": "Operating Systems",
    "subcategory": "File Management",
    "title": "文件物理结构",
    "difficulty": "High",
    "importance": 5,
    "tags": [
      "OS",
      "文件",
      "分配"
    ],
    "content": "连续分配，链接分配（隐式/显式 FAT），索引分配。",
    "classicProblems": [
      {
        "title": "最大文件大小",
        "description": "混合索引分配（直接、一级、二级...）下最大文件大小计算",
        "solution": "根据块号地址位数和块大小计算。"
      }
    ],
    "mistakes": [
      "FAT 需调入内存",
      "索引表过大处理"
    ],
    "detailedAnalysis": "物理结构决定了文件在磁盘上的存储方式，影响存取速度。",
    "examTips": [
      "索引分配支持随机访问，且无外部碎片。"
    ],
    "frequency": 5
  },
  {
    "id": "cs50",
    "category": "Computer Organization",
    "subcategory": "Pipeline",
    "title": "CPI 计算与气泡",
    "difficulty": "Medium",
    "importance": 4,
    "frequency": 8,
    "tags": [
      "流水线",
      "CPI",
      "气泡"
    ],
    "content": "理想 CPI≈1；气泡导致 CPI = 1 + 气泡/指令。分支失败代价≈流水线深度或给定气泡数。",
    "classicProblems": [
      {
        "title": "CPI 快算",
        "description": "5 级流水，分支失败 10%，代价 2 气泡",
        "solution": "CPI=1+0.1*2=1.2。"
      }
    ],
    "memoryTips": [
      "公式：CPI=1+气泡/条；分支气泡≈深度。"
    ],
    "examTips": [
      "先算气泡再除指令；区分结构/数据/控制冒险。"
    ]
  },
  {
    "id": "cs51",
    "category": "Computer Network",
    "subcategory": "Link",
    "title": "以太网退避与最小帧长",
    "difficulty": "Low",
    "importance": 3,
    "frequency": 7,
    "tags": [
      "CSMA/CD",
      "退避",
      "帧长"
    ],
    "prerequisites": [
      "cs33"
    ],
    "content": "最小帧长 ≥ 2τ·带宽；二进制指数退避，第 k 次冲突窗口 0..2^k-1（k≤10）。",
    "memoryTips": [
      "口诀：最短帧=2τB；退避窗口指数增大封顶 2^10。"
    ],
    "examTips": [
      "先算传播时延 τ，再乘带宽得最小帧比特数。"
    ]
  },
  {
    "id": "cs52",
    "category": "Data Structure",
    "subcategory": "Hash",
    "title": "装载因子与再散列",
    "difficulty": "Medium",
    "importance": 4,
    "frequency": 7,
    "tags": [
      "哈希",
      "开放定址",
      "再散列"
    ],
    "content": "装载因子 α=元素数/表长；开放定址 α<0.75 较佳；再散列=扩容+重算地址（常取 2 倍）。",
    "memoryTips": [
      "记 α≈0.75 触发扩容；开放定址期望探测≈1/(1-α)。"
    ],
    "examTips": [
      "给 α 让算探测/冲突，开放定址用 1/(1-α) 近似。"
    ]
  },
  {
    "id": "cs53",
    "category": "Operating Systems",
    "subcategory": "Process Management",
    "title": "进程调度算法",
    "difficulty": "Medium",
    "importance": 5,
    "frequency": 9,
    "tags": [
      "OS",
      "调度",
      "算法"
    ],
    "content": "FCFS (先来先服务), SJF (短作业优先), RR (时间片轮转), 优先级调度。",
    "classicProblems": [
      {
        "title": "周转时间计算",
        "description": "给定进程到达和服务时间，求平均周转时间",
        "solution": "画甘特图，周转时间 = 完成时间 - 到达时间。"
      }
    ],
    "mistakes": [
      "SJF 抢占式与非抢占式混淆",
      "响应比计算错误"
    ],
    "detailedAnalysis": "调度算法的目标是公平性和效率。SJF 平均等待时间最短，但可能导致饥饿。RR 适合分时系统。",
    "examTips": [
      "高响应比优先 = (等待+服务)/服务。"
    ],
    "secondaryConclusions": [
      "SJF/SPF 算法能获得最小的平均等待时间。",
      "时间片 q 过大退化为 FCFS，过小导致上下文切换开销大。"
    ]
  },
  {
    "id": "cs54",
    "category": "Computer Networks",
    "subcategory": "Application Layer",
    "title": "HTTP 协议详解",
    "difficulty": "Medium",
    "importance": 5,
    "frequency": 9,
    "tags": [
      "网络",
      "HTTP",
      "Web"
    ],
    "content": "HTTP/1.0 (短连接), 1.1 (长连接), 2.0 (多路复用), 3.0 (QUIC)。状态码 (200, 301, 404, 500)。",
    "classicProblems": [
      {
        "title": "状态码含义",
        "description": "301 和 302 的区别？",
        "solution": "301 永久重定向，302 临时重定向。"
      }
    ],
    "mistakes": [
      "GET 与 POST 区别",
      "Cookie 与 Session 区别"
    ],
    "detailedAnalysis": "HTTP 是无状态协议。HTTPS = HTTP + SSL/TLS，保证传输安全。",
    "examTips": [
      "HTTP/1.1 默认开启 Keep-Alive。"
    ],
    "secondaryConclusions": [
      "HTTP 默认端口 80，HTTPS 默认端口 443。",
      "GET 参数在 URL 中，POST 参数在请求体中（相对安全）。"
    ]
  },
  {
    "id": "cs55",
    "category": "Computer Networks",
    "subcategory": "Application Layer",
    "title": "电子邮件协议",
    "difficulty": "Low",
    "importance": 4,
    "frequency": 6,
    "tags": [
      "网络",
      "邮件",
      "SMTP"
    ],
    "content": "SMTP (发送), POP3 (读取, 下载并删除), IMAP (读取, 交互式)。",
    "classicProblems": [
      {
        "title": "协议选择",
        "description": "从邮件服务器读取邮件用什么协议？",
        "solution": "POP3 或 IMAP。SMTP 仅用于发送（推）。"
      }
    ],
    "mistakes": [
      "SMTP 只能发纯文本（MIME 扩展支持多媒体）",
      "POP3 与 IMAP 混淆"
    ],
    "detailedAnalysis": "邮件系统采用客户/服务器模式。用户代理 (UA) <-> 邮件服务器。",
    "examTips": [
      "SMTP 使用 TCP 25 端口，POP3 使用 TCP 110 端口。"
    ],
    "secondaryConclusions": [
      "SMTP 是“推”协议，POP3/IMAP 是“拉”协议。",
      "MIME 扩展了 SMTP，使其支持多媒体附件。"
    ]
  },
  {
    "id": "cs2021",
    "category": "Exam Year",
    "subcategory": "2021",
    "title": "2021 真题高频考点",
    "difficulty": "Medium",
    "importance": 5,
    "frequency": 8,
    "tags": [
      "拓扑排序",
      "LRU",
      "流水线",
      "三次握手"
    ],
    "content": "数据结构考拓扑排序、图最短路；OS 侧重 LRU/页面置换；计组 CPI/流水线；计网 TCP 建连挥手。",
    "secondaryConclusions": [
      "拓扑排序仅适用于 DAG；存在环则无拓扑序。",
      "TIME_WAIT=2MSL 保证最后 ACK 可重传。"
    ],
    "examTips": [
      "先判图是否有环；置换算法注意 Belady 仅出现在 FIFO；TCP 报文序号记得+1。"
    ]
  },
  {
    "id": "cs2022",
    "category": "Exam Year",
    "subcategory": "2022",
    "title": "2022 真题重心",
    "difficulty": "Medium",
    "importance": 5,
    "frequency": 9,
    "tags": [
      "最短路",
      "信号量",
      "CIDR",
      "Cache"
    ],
    "content": "算法考最短路/并查集；OS 生产者-消费者信号量；计网 CIDR 聚合；计组 Cache 映射与命中率。",
    "secondaryConclusions": [
      "Dijkstra 不适用负权边；负权用 Bellman-Ford。",
      "直接映射 Cache：组号由块号低位取模。"
    ],
    "examTips": [
      "信号量先 P 同步再 P 互斥；CIDR 取最长公共前缀；Cache 计算先分字段位数。"
    ]
  },
  {
    "id": "cs2023",
    "category": "Exam Year",
    "subcategory": "2023",
    "title": "2023 真题脉络",
    "difficulty": "Medium",
    "importance": 5,
    "frequency": 9,
    "tags": [
      "红黑树",
      "进程调度",
      "TLB",
      "TCP 可靠传输"
    ],
    "content": "数据结构红黑树性质与旋转；OS 调度（高响应比、RR）；存储管理 TLB 与分页；TCP 重传/滑动窗口。",
    "secondaryConclusions": [
      "红黑树黑高一致，最长路径≤2×最短路径。",
      "TLB 命中时仅需一次主存访问。"
    ],
    "examTips": [
      "红黑树插入先染色后旋转；调度题画甘特图；TCP 快重传触发 3 个重复 ACK。"
    ]
  },
  {
    "id": "cs2024",
    "category": "Exam Year",
    "subcategory": "2024",
    "title": "2024 真题侧重点",
    "difficulty": "High",
    "importance": 5,
    "frequency": 10,
    "tags": [
      "AVL/B+树",
      "死锁",
      "浮点表示",
      "子网划分"
    ],
    "content": "AVL/B+树插入与高度；OS 死锁银行家、安全序列；计组 IEEE754/流水线冒险；计网 子网/CIDR/ARP/ICMP。",
    "secondaryConclusions": [
      "B+树所有关键字在叶子，叶子链表便于范围查询。",
      "银行家算法：Need=Max-Alloc，Work+Alloc 检查安全序列。"
    ],
    "examTips": [
      "AVL 失衡类型 LR/RL 先内再外旋；死锁题先算 Need；浮点阶码偏置单 127 双 1023。"
    ]
  },
  {
    "id": "cs2025",
    "category": "Exam Year",
    "subcategory": "2025",
    "title": "2025 真题趋势预判",
    "difficulty": "High",
    "importance": 5,
    "frequency": 10,
    "tags": [
      "排序复杂度",
      "并发",
      "Cache 一致性",
      "QUIC"
    ],
    "content": "预计继续考快速/堆排序边界；OS 线程同步与锁；计组 Cache 写策略/一致性；计网 HTTP/3 (QUIC)、拥塞控制细节。",
    "secondaryConclusions": [
      "快速排序最坏 O(n^2)，随机化或三数取中可减轻退化。",
      "QUIC 基于 UDP，0-RTT，集成 TLS1.3。"
    ],
    "examTips": [
      "并发题写出临界区+互斥；Cache 写回配合一致性协议；拥塞控制注意慢开始阈值更新。"
    ]
  },
  {
    "id": "cs_sec_proofs",
    "category": "Toolkit",
    "subcategory": "Secondary Conclusions",
    "title": "高频二级结论与证明思路（20 条）",
    "difficulty": "Medium",
    "importance": 5,
    "frequency": 10,
    "tags": [
      "秒杀",
      "证明",
      "408"
    ],
    "content": "打包 408 常考二级结论 20 条，并给出一句验证/证明思路，便于答题展开。",
    "secondaryConclusions": [
      "AVL 失衡 LL/RR 单旋，LR/RL 先内后外双旋；证：画高度差方向示意。",
      "红黑树最长路径 ≤ 2×最短路径；证：红点不能相连且黑高一致。",
      "并查集压缩+按秩合并均摊 ~α(n)；证：Tarjan 反阿克曼复杂度。",
      "快速排序最坏 O(n^2)（已/逆序），随机化期望 O(n log n)；证：递归树高度退化解释。",
      "堆排序空间 O(1) 且不稳定；证：原地建堆交换破坏相对次序。",
      "Dijkstra 不支持负权；负权用 Bellman-Ford；证：贪心前缀最优在负权下失效。",
      "Prim 适稠密 O(V^2)，Kruskal 适稀疏 O(E log E)；证：边/点优先策略复杂度对比。",
      "拓扑排序仅适 DAG；有环则无拓扑序；证：入度法删除若卡住则有环。",
      "B+ 树关键字全在叶子且叶子链表便于范围查询；证：非叶存索引，叶顺序指针。",
      "Cache 直接映射地址=tag|index|offset；证：块号模组数取 index，余下为 tag。",
      "写回需脏位，写直达不需；证：写回仅替换时回写内存，需标记脏页。",
      "OPT 最优，FIFO 可 Belady；证：给 1,2,3,4,1,2,5... 反例说明缺页反直觉增加。",
      "LRU 近似 OPT（局部性），栈式实现无 Belady；证：栈性质保证最近使用页留在栈顶。",
      "信号量顺序：先 P 同步再 P 互斥，释放互斥再释放同步；证：换序会死锁/饥饿。",
      "银行家算法安全性：Need=Max-Alloc，Work+Alloc 满足 Need 即安全；证：构造安全序列。",
      "IEEE754 偏置：单 127 双 1023，尾数隐藏 1；证：写 -0.75 二进制示例。",
      "流水线 CPI≈1+气泡/指令；证：吞吐率=指令/周期，气泡增加周期数。",
      "TCP 快重传 3 重复 ACK 触发，快恢复减半 cwnd 进拥塞避免；证：RFC 状态机。",
      "TIME_WAIT=2MSL 保证 ACK 可重传并清除旧报文；证：报文最大生存期推导。",
      "QUIC 基于 UDP，0-RTT，集成 TLS1.3；证：去掉 TCP+TLS 两次握手，握手报文合并。"
    ],
    "examTips": [
      "写题时先抛结论再一句证明/原因，必要时画一行示意（红黑树、Cache 字段、流水线时序）。"
    ]
  },
  {
    "id": "cs40",
    "category": "Computer Network",
    "subcategory": "Application Layer",
    "title": "一致性哈希与分布式负载均衡",
    "difficulty": "Medium",
    "importance": 4,
    "frequency": 2,
    "tags": [
      "分布式",
      "一致性哈希",
      "负载均衡"
    ],
    "content": "一致性哈希通过环和虚拟节点让节点增删时仅影响相邻数据，降低重分布成本；常用于分布式缓存/存储。",
    "classicProblems": [
      {
        "title": "节点扩容影响范围",
        "description": "原有 4 节点加入 1 节点，哪些 key 会迁移？",
        "solution": "仅落在新节点顺时针前驱与新节点之间的 key 需要迁移；虚拟节点可平衡倾斜。"
      }
    ],
    "examTips": [
      "画环形示意；记住“仅相邻区间迁移”；虚拟节点数≈100-200 提升均衡性；对比取模方案全量迁移劣势。"
    ]
  },
  {
    "id": "cs41",
    "category": "Operating Systems",
    "subcategory": "Memory Management",
    "title": "分页 vs 段式 vs 段页式对比",
    "difficulty": "Medium",
    "importance": 4,
    "frequency": 4,
    "tags": [
      "内存管理",
      "分页",
      "分段"
    ],
    "content": "分页按等长页框，分段按逻辑分段变长；段页式综合：先段再页。考点：内外碎片、地址转换、共享、保护。分页无外碎片但有内碎片；分段相反。",
    "classicProblems": [
      {
        "title": "地址转换示例",
        "description": "给出段表/页表，线性地址求物理地址",
        "solution": "段页式：线性地址=段号|段内页号|页内偏移；先查段表得基址+界限检查，再查页表得帧号拼偏移。"
      }
    ],
    "examTips": [
      "比较三者：碎片、共享、扩展、实现复杂度；画三栏对比表快速背诵。"
    ]
  },
  {
    "id": "cs42",
    "category": "Operating Systems",
    "subcategory": "Process Management",
    "title": "进程同步经典模型（生产者消费者/读者写者/哲学家）",
    "difficulty": "Medium",
    "importance": 4,
    "frequency": 4,
    "tags": [
      "同步",
      "信号量",
      "并发"
    ],
    "content": "三大模型考察信号量或监视器写法：生产者消费者用 empty/full+互斥；读写锁读共享写独占；哲学家避免死锁可奇偶抢叉或限制同时进餐人数。",
    "examTips": [
      "写伪代码时“P 同步→P 互斥→临界区→V 互斥→V 同步”，顺序不要反；给出避免死锁策略。"
    ]
  },
  {
    "id": "cs43",
    "category": "Operating Systems",
    "subcategory": "CPU",
    "title": "进程调度算法对比",
    "difficulty": "Low",
    "importance": 3,
    "frequency": 4,
    "tags": [
      "调度",
      "周转时间"
    ],
    "content": "FCFS、SJF、HRRN、RR、优先级、多级反馈队列：响应时间/周转时间/饥饿风险不同。多级反馈常考思路：时间片递减、低级可被高级抢占。",
    "examTips": [
      "给平均周转/带权周转计算；说明 RR 时间片过大趋 FCFS，过小开销大。"
    ]
  },
  {
    "id": "cs44",
    "category": "Operating Systems",
    "subcategory": "Memory Management",
    "title": "页面置换算法速记",
    "difficulty": "Low",
    "importance": 3,
    "frequency": 4,
    "tags": [
      "置换",
      "缺页"
    ],
    "content": "OPT 理论最优；FIFO 可能 Belady；LRU 近似 OPT；Clock 近似 LRU；LFU 记录访问次数易被偶发访问污染。",
    "examTips": [
      "给引用串快速判缺页：画栈式 LRU/FIFO；说明 Belady 只在 FIFO 可能出现。"
    ]
  },
  {
    "id": "cs45",
    "category": "Computer Organization",
    "subcategory": "Pipeline",
    "title": "流水线冒险与解决方案",
    "difficulty": "Medium",
    "importance": 4,
    "frequency": 4,
    "tags": [
      "流水线",
      "冒险"
    ],
    "content": "结构/数据/控制冒险；解决：前递、插入气泡、分支预测、延迟槽；多发射需同时考虑端口冲突。",
    "examTips": [
      "记 CPI≈理想 CPI + 冒险开销；分支预测失误率影响性能；画时间线找气泡。"
    ]
  },
  {
    "id": "cs46",
    "category": "Computer Organization",
    "subcategory": "Memory",
    "title": "Cache 映射与一致性",
    "difficulty": "Medium",
    "importance": 4,
    "frequency": 4,
    "tags": [
      "Cache",
      "一致性",
      "多核"
    ],
    "content": "直接映射/全相联/组相联地址格式；写策略写回+脏位/写直达+写缓冲；多核一致性 MESI 基本思路。",
    "examTips": [
      "给地址拆 tag/index/offset；一致性写出 MESI 状态与总线事务。"
    ]
  },
  {
    "id": "cs47",
    "category": "Data Structures",
    "subcategory": "Graphs",
    "title": "最短路算法选型",
    "difficulty": "Low",
    "importance": 3,
    "frequency": 3,
    "tags": [
      "Dijkstra",
      "Bellman-Ford",
      "SPFA"
    ],
    "content": "无负权：Dijkstra（堆 O(E log V)）；有负权边无负环：Bellman-Ford O(VE)；多源或稀疏图可 SPFA 但最坏 O(VE)；全源 Floyd O(V^3)。",
    "examTips": [
      "先检查负边；输出路径需前驱数组；Dijkstra 不能处理负权。"
    ]
  },
  {
    "id": "cs48",
    "category": "Data Structures",
    "subcategory": "Trees",
    "title": "并查集与 Kruskal 最小生成树",
    "difficulty": "Low",
    "importance": 3,
    "frequency": 3,
    "tags": [
      "并查集",
      "MST"
    ],
    "content": "Kruskal 按边权排序+并查集合并；路径压缩+按秩合并均摊几乎 O(1)。",
    "examTips": [
      "实现时注意边排序、判环 find(u)!=find(v)；稠密图 Prim+堆可能更优。"
    ]
  },
  {
    "id": "cs49",
    "category": "Data Structures",
    "subcategory": "Hash",
    "title": "哈希冲突解决与装载因子",
    "difficulty": "Low",
    "importance": 3,
    "frequency": 3,
    "tags": [
      "哈希",
      "冲突"
    ],
    "content": "开放定址（线性/二次/双重哈希）与链地址；装载因子 α 过高冲突剧增；再散列扩容。",
    "examTips": [
      "线性探测易主聚集；二次探测需表长素数；链地址支持删除简单。"
    ]
  },
  {
    "id": "cs50",
    "category": "Computer Networks",
    "subcategory": "Transport Layer",
    "title": "TCP 拥塞控制速记",
    "difficulty": "Medium",
    "importance": 4,
    "frequency": 4,
    "tags": [
      "TCP",
      "拥塞控制"
    ],
    "content": "慢开始 cwnd=1 MSS 指数涨到 ssthresh，再线性加；超时阈值减半回慢开始；快重传/快恢复 3ACK 触发，cwnd 减半进入拥塞避免。",
    "examTips": [
      "画 cwnd 曲线；记 ssthresh 更新：超时=阈值减半，快重传=阈值减半+进入避免。"
    ]
  },
  {
    "id": "cs51",
    "category": "Computer Networks",
    "subcategory": "Network Layer",
    "title": "路由算法对比",
    "difficulty": "Medium",
    "importance": 3,
    "frequency": 3,
    "tags": [
      "路由",
      "距离向量",
      "链路状态"
    ],
    "content": "距离向量：Bellman-Ford 迭代，慢收敛有计数到无穷；链路状态：Dijkstra，全局视图，需洪泛同步。",
    "examTips": [
      "距离向量加毒性逆转/水平分割缓解环路；OSPF 属链路状态，RIP 属距离向量。"
    ]
  },
  {
    "id": "cs52",
    "category": "Computer Networks",
    "subcategory": "Application Layer",
    "title": "HTTP/1.1 vs HTTP/2 vs HTTP/3",
    "difficulty": "Medium",
    "importance": 3,
    "frequency": 2,
    "tags": [
      "HTTP",
      "QUIC"
    ],
    "content": "HTTP/1.1 管线易队头阻塞；HTTP/2 多路复用+头部压缩；HTTP/3 基于 QUIC(UDP)+TLS1.3，解决 TCP 队头阻塞。",
    "examTips": [
      "记“1.1 keep-alive，2 多路复用，3 QUIC”口诀；可能考端口/握手差异。"
    ]
  },
  {
    "id": "cs53",
    "category": "Exam Year",
    "subcategory": "2026",
    "title": "2026 408 预测卷命题趋势",
    "difficulty": "Medium",
    "importance": 3,
    "frequency": 2,
    "tags": [
      "预测",
      "真题趋势"
    ],
    "content": "预计加强 OS 与网络应用题，关注同步/虚拟化/一致性；数据结构偏工程场景（哈希+链表混合）；计组关注流水线与 Cache。",
    "examTips": [
      "按权重复习：数据结构45/计组45/OS35/网络25；每周一套综合卷计时。"
    ]
  },
  {
    "id": "cs42",
    "category": "Operating Systems",
    "subcategory": "Process Management",
    "title": "进程同步经典模型（生产者/读者写者/哲学家）",
    "difficulty": "Medium",
    "importance": 4,
    "frequency": 4,
    "tags": [
      "同步",
      "信号量",
      "并发"
    ],
    "content": "生产者-消费者：empty/full + mutex；读写锁：读共享写独占；哲学家：限制进餐人数或奇偶抢叉避免死锁。",
    "examTips": [
      "信号量顺序 P 同步→P 互斥→临界区→V 互斥→V 同步；写死锁避免策略。"
    ]
  },
  {
    "id": "cs43",
    "category": "Operating Systems",
    "subcategory": "CPU",
    "title": "进程调度算法对比",
    "difficulty": "Low",
    "importance": 3,
    "frequency": 4,
    "tags": [
      "调度",
      "周转"
    ],
    "content": "FCFS 简单但响应差；SJF/HRRN 平均周转最优但可能饥饿；RR 兼顾响应，时间片过小开销大；多级反馈兼顾长短作业。",
    "examTips": [
      "计算平均周转/带权周转；RR 时间片→FCFS/开销权衡。"
    ]
  },
  {
    "id": "cs44",
    "category": "Operating Systems",
    "subcategory": "Memory Management",
    "title": "页面置换算法速记",
    "difficulty": "Low",
    "importance": 3,
    "frequency": 4,
    "tags": [
      "置换",
      "缺页"
    ],
    "content": "OPT 理论最优；FIFO 可能 Belady；LRU 近似 OPT；Clock 近似 LRU；LFU 受偶发访问干扰。",
    "examTips": [
      "画栈式演示；Belady 仅 FIFO 可能发生。"
    ]
  },
  {
    "id": "cs45",
    "category": "Operating Systems",
    "subcategory": "Memory Management",
    "title": "工作集模型与抖动",
    "difficulty": "Medium",
    "importance": 3,
    "frequency": 3,
    "tags": [
      "工作集",
      "抖动"
    ],
    "content": "工作集 W(t,Δ) 反映近期访问页集合，过小易缺页，过大浪费；频繁缺页导致抖动。",
    "examTips": [
      "调 Δ 与帧数控制缺页率；LRU 近似工作集。"
    ]
  },
  {
    "id": "cs46",
    "category": "Operating Systems",
    "subcategory": "File Management",
    "title": "文件分配方式对比",
    "difficulty": "Low",
    "importance": 3,
    "frequency": 3,
    "tags": [
      "文件系统"
    ],
    "content": "连续分配顺序好但易外碎；链接分配顺序/随机差；索引分配随机好但索引开销。",
    "examTips": [
      "顺序访问选连续/索引；随机选索引。"
    ]
  },
  {
    "id": "cs47",
    "category": "Operating Systems",
    "subcategory": "Process Management",
    "title": "死锁必要条件与预防",
    "difficulty": "Medium",
    "importance": 3,
    "frequency": 3,
    "tags": [
      "死锁"
    ],
    "content": "互斥、占有且等待、不可抢占、循环等待；预防破坏任一条件。",
    "examTips": [
      "银行家避免、资源有序分配破循环等待。"
    ]
  },
  {
    "id": "cs48",
    "category": "Operating Systems",
    "subcategory": "Process Management",
    "title": "线程 vs 进程",
    "difficulty": "Low",
    "importance": 3,
    "frequency": 3,
    "tags": [
      "线程",
      "进程"
    ],
    "content": "线程是最小调度单位，共享地址空间；进程是资源分配单位。",
    "examTips": [
      "多线程提升并发但需同步；线程切换开销小于进程。"
    ]
  },
  {
    "id": "cs49",
    "category": "Computer Organization",
    "subcategory": "Pipeline",
    "title": "流水线冒险与解决",
    "difficulty": "Medium",
    "importance": 4,
    "frequency": 4,
    "tags": [
      "流水线",
      "冒险"
    ],
    "content": "结构/数据/控制冒险；前递、插泡、分支预测、延迟槽。",
    "examTips": [
      "画时间表定位气泡；分支预测失误率影响 CPI。"
    ]
  },
  {
    "id": "cs50",
    "category": "Computer Organization",
    "subcategory": "Memory",
    "title": "Cache 映射与写策略",
    "difficulty": "Medium",
    "importance": 4,
    "frequency": 4,
    "tags": [
      "Cache"
    ],
    "content": "直接/全/组相联；写回+脏位，写直达+写缓冲。",
    "examTips": [
      "地址分解 tag/index/offset；命中/未命中路径要清楚。"
    ]
  },
  {
    "id": "cs51",
    "category": "Computer Organization",
    "subcategory": "CPU",
    "title": "指令级并行与超标量",
    "difficulty": "Medium",
    "importance": 3,
    "frequency": 3,
    "tags": [
      "ILP",
      "超标量"
    ],
    "content": "多发射、动态调度、乱序执行、寄存器重命名消除 WAR/WAW。",
    "examTips": [
      "区分 RAW vs WAR/WAW。"
    ]
  },
  {
    "id": "cs52",
    "category": "Computer Organization",
    "subcategory": "CPU",
    "title": "RISC vs CISC",
    "difficulty": "Low",
    "importance": 3,
    "frequency": 2,
    "tags": [
      "RISC",
      "CISC"
    ],
    "content": "RISC 精简指令、单周期、硬布线、流水线友好；CISC 指令复杂、微程序控制。",
    "examTips": [
      "考点：指令长度、寻址方式、执行周期。"
    ]
  },
  {
    "id": "cs53b",
    "category": "Computer Organization",
    "subcategory": "Memory",
    "title": "主存与虚存层次",
    "difficulty": "Low",
    "importance": 2,
    "frequency": 2,
    "tags": [
      "存储层次"
    ],
    "content": "寄存器-Cache-主存-辅存；局部性原理支撑分层。",
    "examTips": [
      "命中率提高等效访存时间下降。"
    ]
  },
  {
    "id": "cs54",
    "category": "Data Structures",
    "subcategory": "Linear Lists",
    "title": "顺序表与链表性能对比",
    "difficulty": "Low",
    "importance": 3,
    "frequency": 3,
    "tags": [
      "表",
      "复杂度"
    ],
    "content": "顺序表随机访问 O(1) 插删 O(n)；链表随机 O(n) 插删 O(1)。",
    "examTips": [
      "考试会让你选结构或给复杂度。"
    ]
  },
  {
    "id": "cs55",
    "category": "Data Structures",
    "subcategory": "Stack & Queue",
    "title": "单调栈与单调队列",
    "difficulty": "Medium",
    "importance": 4,
    "frequency": 3,
    "tags": [
      "单调栈",
      "滑动窗口"
    ],
    "content": "单调栈求下一个更大/小；单调队列维护滑动窗口极值 O(n)。",
    "examTips": [
      "入队前弹出破坏单调性的元素。"
    ]
  },
  {
    "id": "cs56",
    "category": "Data Structures",
    "subcategory": "Trees",
    "title": "AVL 与红黑树对比",
    "difficulty": "Medium",
    "importance": 4,
    "frequency": 3,
    "tags": [
      "平衡树"
    ],
    "content": "AVL 更平衡查询快，插删旋转多；红黑树旋转少插删快。",
    "examTips": [
      "记红黑性质、最长路径 ≤2×最短。"
    ]
  },
  {
    "id": "cs57",
    "category": "Data Structures",
    "subcategory": "Trees",
    "title": "B 树与 B+ 树",
    "difficulty": "Medium",
    "importance": 4,
    "frequency": 3,
    "tags": [
      "B树",
      "索引"
    ],
    "content": "B 树键值分布在内/叶；B+ 树键全在叶子且有链表，范围查询快。",
    "examTips": [
      "数据库索引用 B+；非叶仅存索引。"
    ]
  },
  {
    "id": "cs58",
    "category": "Data Structures",
    "subcategory": "Graphs",
    "title": "并查集路径压缩与按秩合并",
    "difficulty": "Low",
    "importance": 3,
    "frequency": 3,
    "tags": [
      "并查集"
    ],
    "content": "两优化让均摊近乎 O(1)；用于 Kruskal、联通分量。",
    "examTips": [
      "初始化 parent[i]=i；合并按秩。"
    ]
  },
  {
    "id": "cs59",
    "category": "Data Structures",
    "subcategory": "Search & Sort",
    "title": "快速排序与三数取中",
    "difficulty": "Low",
    "importance": 3,
    "frequency": 3,
    "tags": [
      "排序"
    ],
    "content": "快排期望 O(n log n)，最坏 O(n^2)；三数取中和随机化降低退化。",
    "examTips": [
      "分区写法；尾递归优化。"
    ]
  },
  {
    "id": "cs60",
    "category": "Data Structures",
    "subcategory": "Search & Sort",
    "title": "堆排序与优先队列",
    "difficulty": "Low",
    "importance": 3,
    "frequency": 3,
    "tags": [
      "堆"
    ],
    "content": "建堆 O(n)，每次弹出 O(log n)；不稳定，空间 O(1)。",
    "examTips": [
      "下滤建堆比上滤快；1/0 基索引。"
    ]
  },
  {
    "id": "cs61",
    "category": "Data Structures",
    "subcategory": "Graphs",
    "title": "拓扑排序与环检测",
    "difficulty": "Low",
    "importance": 3,
    "frequency": 3,
    "tags": [
      "拓扑"
    ],
    "content": "入度为 0 队列逐个出队；剩余顶点不空则有环。",
    "examTips": [
      "关键路径、课程表题常用。"
    ]
  },
  {
    "id": "cs62",
    "category": "Data Structures",
    "subcategory": "Graphs",
    "title": "最小生成树 Prim vs Kruskal",
    "difficulty": "Low",
    "importance": 3,
    "frequency": 3,
    "tags": [
      "MST"
    ],
    "content": "Prim 适稠密 O(V^2)/堆版 O(E log V)；Kruskal 适稀疏 O(E log E)。",
    "examTips": [
      "Kruskal 先排序边；Prim 任一点起。"
    ]
  },
  {
    "id": "cs63",
    "category": "Data Structures",
    "subcategory": "Hash",
    "title": "哈希表装载因子与再散列",
    "difficulty": "Low",
    "importance": 3,
    "frequency": 3,
    "tags": [
      "哈希"
    ],
    "content": "装载因子 α 过高冲突增；开放定址需素数表长；α 达阈值扩容再散列。",
    "examTips": [
      "链地址删除简单；开放定址需伪删除。"
    ]
  },
  {
    "id": "cs64",
    "category": "Data Structures",
    "subcategory": "Graph Applications",
    "title": "关键路径法（AOE网）",
    "difficulty": "Medium",
    "importance": 3,
    "frequency": 2,
    "tags": [
      "关键路径"
    ],
    "content": "最早/最晚事件时间求关键路径；松弛度 0 的活动在关键路径。",
    "examTips": [
      "拓扑序 + ve/vl；多条路径写全。"
    ]
  },
  {
    "id": "cs65",
    "category": "Data Structures",
    "subcategory": "Trees",
    "title": "线段树与懒惰标记",
    "difficulty": "Medium",
    "importance": 3,
    "frequency": 2,
    "tags": [
      "线段树"
    ],
    "content": "区间查询修改 O(log n)；懒标记延迟更新子节点。",
    "examTips": [
      "pushdown 顺序；建树 4n。"
    ]
  },
  {
    "id": "cs66",
    "category": "Computer Networks",
    "subcategory": "Transport Layer",
    "title": "TCP 三次握手与四次挥手",
    "difficulty": "Low",
    "importance": 3,
    "frequency": 4,
    "tags": [
      "TCP",
      "握手"
    ],
    "content": "三握确认收发能力；四挥分离半关闭与 TIME_WAIT。",
    "examTips": [
      "TIME_WAIT=2MSL；半关闭一端可收不可发。"
    ]
  },
  {
    "id": "cs67",
    "category": "Computer Networks",
    "subcategory": "Transport Layer",
    "title": "UDP 与 TCP 对比",
    "difficulty": "Low",
    "importance": 3,
    "frequency": 3,
    "tags": [
      "UDP",
      "TCP"
    ],
    "content": "UDP 无连接、不可靠、报文边界；TCP 可靠、字节流。",
    "examTips": [
      "实时/流媒体用 UDP；文件/可靠用 TCP。"
    ]
  },
  {
    "id": "cs68",
    "category": "Computer Networks",
    "subcategory": "Network Layer",
    "title": "IP 分片与 MTU",
    "difficulty": "Low",
    "importance": 2,
    "frequency": 2,
    "tags": [
      "IP",
      "分片"
    ],
    "content": "大包超 MTU 分片，DF=1 禁分片丢弃并回 ICMP；重组在目的端。",
    "examTips": [
      "片偏移单位 8 字节；分片损耗。"
    ]
  },
  {
    "id": "cs69",
    "category": "Computer Networks",
    "subcategory": "Network Layer",
    "title": "CIDR 与最长前缀匹配",
    "difficulty": "Low",
    "importance": 3,
    "frequency": 3,
    "tags": [
      "CIDR",
      "路由"
    ],
    "content": "无类编址前缀聚合；查表用最长前缀匹配。",
    "examTips": [
      "算掩码与主机数；前缀合并需连续位。"
    ]
  },
  {
    "id": "cs70",
    "category": "Computer Networks",
    "subcategory": "Application Layer",
    "title": "DNS 解析流程",
    "difficulty": "Low",
    "importance": 2,
    "frequency": 2,
    "tags": [
      "DNS"
    ],
    "content": "递归/迭代；缓存→根→TLD→权威；记录 A/AAAA/CNAME/MX。",
    "examTips": [
      "TTL 与缓存；CNAME 继续解析。"
    ]
  },
  {
    "id": "cs71",
    "category": "Computer Networks",
    "subcategory": "Network Layer",
    "title": "路由环路与防环",
    "difficulty": "Low",
    "importance": 2,
    "frequency": 2,
    "tags": [
      "RIP",
      "环路"
    ],
    "content": "距离向量计数到无穷；毒性逆转/水平分割/触发更新缓解。",
    "examTips": [
      "RIP 16 为无穷；链路状态无此问题。"
    ]
  },
  {
    "id": "cs72",
    "category": "Operating Systems",
    "subcategory": "Process Management",
    "title": "Linux 进程状态",
    "difficulty": "Low",
    "importance": 2,
    "frequency": 2,
    "tags": [
      "Linux",
      "状态"
    ],
    "content": "R 可运行，S 可中断睡眠，D 不可中断睡眠，Z 僵尸，T 停止。",
    "examTips": [
      "ps STAT；僵尸需父进程 wait。"
    ]
  },
  {
    "id": "cs73",
    "category": "Operating Systems",
    "subcategory": "Process Management",
    "title": "协程与用户级线程",
    "difficulty": "Medium",
    "importance": 2,
    "frequency": 2,
    "tags": [
      "协程",
      "线程"
    ],
    "content": "协程用户态调度，切换小；适 IO 密集；阻塞调用会卡整体。",
    "examTips": [
      "配合异步 IO。"
    ]
  },
  {
    "id": "cs74",
    "category": "Computer Networks",
    "subcategory": "Application Layer",
    "title": "SMTP/POP3/IMAP 区别",
    "difficulty": "Low",
    "importance": 2,
    "frequency": 2,
    "tags": [
      "邮件协议"
    ],
    "content": "SMTP 发送；POP3 下载删；IMAP 服务器同步多端。",
    "examTips": [
      "端口 25/465/587,110,143/993。"
    ]
  },
  {
    "id": "cs75",
    "category": "Computer Networks",
    "subcategory": "Security",
    "title": "对称/非对称/散列",
    "difficulty": "Medium",
    "importance": 3,
    "frequency": 2,
    "tags": [
      "安全"
    ],
    "content": "对称快分发难；非对称慢分发易；散列校验完整性。",
    "examTips": [
      "签名=哈希+私钥；握手用非对称交换会话密钥。"
    ]
  },
  {
    "id": "cs76",
    "category": "Computer Networks",
    "subcategory": "Security",
    "title": "HTTPS/TLS 握手要点",
    "difficulty": "Medium",
    "importance": 3,
    "frequency": 2,
    "tags": [
      "HTTPS",
      "TLS"
    ],
    "content": "客户端问候→证书→密钥交换→完成；TLS1.3 减往返，支持 0-RTT。",
    "examTips": [
      "证书链验证；ECDHE 前向保密。"
    ]
  },
  {
    "id": "cs77",
    "category": "Operating Systems",
    "subcategory": "Memory Management",
    "title": "Buddy 与 slab 分配",
    "difficulty": "Medium",
    "importance": 2,
    "frequency": 2,
    "tags": [
      "内存分配"
    ],
    "content": "伙伴按 2^k 划分合并快；slab 预分配对象减少碎片与初始化。",
    "examTips": [
      "Linux 结合伙伴+slab。"
    ]
  },
  {
    "id": "cs78",
    "category": "Operating Systems",
    "subcategory": "Process Management",
    "title": "信号与中断",
    "difficulty": "Low",
    "importance": 2,
    "frequency": 2,
    "tags": [
      "信号",
      "中断"
    ],
    "content": "中断硬件触发优先级高；信号由内核/进程触发。",
    "examTips": [
      "信号可屏蔽；中断在内核态。"
    ]
  },
  {
    "id": "cs79",
    "category": "Operating Systems",
    "subcategory": "Toolkit",
    "title": "系统调用开销与优化",
    "difficulty": "Low",
    "importance": 2,
    "frequency": 2,
    "tags": [
      "syscall"
    ],
    "content": "syscall 需陷入内核；用批量、异步 IO、mmap/零拷贝降开销。",
    "examTips": [
      "零拷贝 sendfile/mmap；AIO/IO_uring。"
    ]
  },
  {
    "id": "cs80",
    "category": "Computer Organization",
    "subcategory": "CPU",
    "title": "流水线 CPI 估算",
    "difficulty": "Medium",
    "importance": 2,
    "frequency": 2,
    "tags": [
      "CPI"
    ],
    "content": "CPI≈理想CPI+冒险代价；分支预测失误率×罚周期计入。",
    "examTips": [
      "代入 miss rate 与 penalty。"
    ]
  },
  {
    "id": "cs81",
    "category": "Computer Organization",
    "subcategory": "Memory",
    "title": "AMAT 平均访存时间",
    "difficulty": "Low",
    "importance": 2,
    "frequency": 2,
    "tags": [
      "AMAT"
    ],
    "content": "AMAT = 命中时间 + 未命中率×未命中代价；多级 Cache 累加。",
    "examTips": [
      "用未命中率。"
    ]
  },
  {
    "id": "cs82",
    "category": "Operating Systems",
    "subcategory": "File Management",
    "title": "inode 与目录项",
    "difficulty": "Low",
    "importance": 2,
    "frequency": 2,
    "tags": [
      "inode",
      "目录"
    ],
    "content": "inode 存元数据和块指针；目录项映射名到 inode。",
    "examTips": [
      "硬链接同 inode；软链接不同。"
    ]
  },
  {
    "id": "cs83",
    "category": "Computer Networks",
    "subcategory": "Transport Layer",
    "title": "流量控制 vs 拥塞控制",
    "difficulty": "Low",
    "importance": 2,
    "frequency": 2,
    "tags": [
      "TCP"
    ],
    "content": "流控管 rwnd，拥塞管 cwnd；实际窗口=min(rwnd,cwnd)。",
    "examTips": [
      "区分端到端/网络层面。"
    ]
  },
  {
    "id": "cs84",
    "category": "Computer Networks",
    "subcategory": "Transport Layer",
    "title": "选择重传 SR 与回退 N GBN",
    "difficulty": "Low",
    "importance": 2,
    "frequency": 2,
    "tags": [
      "可靠传输"
    ],
    "content": "GBN 累计确认回退窗口；SR 独立确认需缓存乱序。",
    "examTips": [
      "SR 缓冲/序号空间更大。"
    ]
  },
  {
    "id": "cs85",
    "category": "Computer Networks",
    "subcategory": "Network Layer",
    "title": "ICMP 常见报文",
    "difficulty": "Low",
    "importance": 2,
    "frequency": 2,
    "tags": [
      "ICMP"
    ],
    "content": "目的不可达、超时、重定向、回显请求/应答。",
    "examTips": [
      "traceroute 用超时报文。"
    ]
  },
  {
    "id": "cs86",
    "category": "Data Structures",
    "subcategory": "Toolkit",
    "title": "复杂度主定理速查",
    "difficulty": "Low",
    "importance": 3,
    "frequency": 3,
    "tags": [
      "主定理"
    ],
    "content": "T(n)=aT(n/b)+f(n)，比较 f 与 n^{log_b a}；三种情形。",
    "examTips": [
      "写出 log^k n 边界情况。"
    ]
  },
  {
    "id": "cs87",
    "category": "Data Structures",
    "subcategory": "Search & Sort",
    "title": "稳定排序与不稳定排序",
    "difficulty": "Low",
    "importance": 2,
    "frequency": 2,
    "tags": [
      "排序"
    ],
    "content": "稳定：插排冒泡归并基数；不稳定：快排堆排选择。",
    "examTips": [
      "选算法或解释稳定性。"
    ]
  },
  {
    "id": "cs88",
    "category": "Operating Systems",
    "subcategory": "Memory Management",
    "title": "TLB 与有效访存时间",
    "difficulty": "Low",
    "importance": 2,
    "frequency": 2,
    "tags": [
      "TLB"
    ],
    "content": "TLB 缓存页表项；EAT=命中时间+未命中率×未命中代价。",
    "examTips": [
      "用未命中率而非命中率。"
    ]
  },
  {
    "id": "cs89",
    "category": "Operating Systems",
    "subcategory": "Process Management",
    "title": "进程通信方式",
    "difficulty": "Low",
    "importance": 2,
    "frequency": 2,
    "tags": [
      "IPC"
    ],
    "content": "管道、消息队列、共享内存、信号、socket；共享内存最快但需同步。",
    "examTips": [
      "跨主机用 socket；共享内存+同步。"
    ]
  },
  {
    "id": "cs90",
    "category": "Computer Organization",
    "subcategory": "Pipeline",
    "title": "分支预测基础",
    "difficulty": "Low",
    "importance": 2,
    "frequency": 2,
    "tags": [
      "分支预测"
    ],
    "content": "1 位易抖，2 位饱和计数抗抖；局部/全局历史提高准确率。",
    "examTips": [
      "miss penalty 纳入 CPI。"
    ]
  },
  {
    "id": "cs91",
    "category": "Operating Systems",
    "subcategory": "Memory Management",
    "title": "抖动识别与控制",
    "difficulty": "Medium",
    "importance": 2,
    "frequency": 2,
    "tags": [
      "抖动"
    ],
    "content": "缺页率激增、CPU 利用低、IO 忙→抖动；调工作集/帧数/多道程度。",
    "examTips": [
      "写“降低多道/调整工作集”。"
    ]
  },
  {
    "id": "cs92",
    "category": "Computer Networks",
    "subcategory": "Application Layer",
    "title": "CDN 与缓存命中",
    "difficulty": "Low",
    "importance": 2,
    "frequency": 2,
    "tags": [
      "CDN"
    ],
    "content": "CDN 边缘缓存，就近访问提高命中率，降低回源延迟。",
    "examTips": [
      "提“域名调度/就近”。"
    ]
  },
  {
    "id": "cs93",
    "category": "Computer Networks",
    "subcategory": "Security",
    "title": "对称密钥分发问题",
    "difficulty": "Low",
    "importance": 2,
    "frequency": 2,
    "tags": [
      "安全"
    ],
    "content": "对称密钥分发难；可用 KDC 或非对称握手。",
    "examTips": [
      "KDC 单点；握手耗时但便捷。"
    ]
  },
  {
    "id": "cs94",
    "category": "Computer Networks",
    "subcategory": "Security",
    "title": "数字签名与证书",
    "difficulty": "Medium",
    "importance": 2,
    "frequency": 2,
    "tags": [
      "PKI"
    ],
    "content": "签名=私钥签名+公钥验；证书由 CA 签发绑定公钥身份。",
    "examTips": [
      "撤销 CRL/OCSP。"
    ]
  },
  {
    "id": "cs95",
    "category": "Computer Organization",
    "subcategory": "CPU",
    "title": "微程序控制 vs 硬布线",
    "difficulty": "Low",
    "importance": 2,
    "frequency": 2,
    "tags": [
      "控制器"
    ],
    "content": "硬布线快改难；微程序灵活慢。",
    "examTips": [
      "控制存储器 ROM。"
    ]
  },
  {
    "id": "cs96",
    "category": "Computer Networks",
    "subcategory": "Network Layer",
    "title": "NAT 与端口映射",
    "difficulty": "Low",
    "importance": 2,
    "frequency": 2,
    "tags": [
      "NAT"
    ],
    "content": "私网转公网，端口映射区分会话；破坏端到端。",
    "examTips": [
      "打洞/公网解决对等通信。"
    ]
  },
  {
    "id": "cs97",
    "category": "Operating Systems",
    "subcategory": "File Management",
    "title": "日志型文件系统",
    "difficulty": "Medium",
    "importance": 2,
    "frequency": 2,
    "tags": [
      "日志FS"
    ],
    "content": "写前日志，顺序写提升可靠性；崩溃恢复重放日志。",
    "examTips": [
      "与传统元数据更新对比。"
    ]
  },
  {
    "id": "cs98",
    "category": "Data Structures",
    "subcategory": "Graphs",
    "title": "SPFA 最坏复杂度与优化",
    "difficulty": "Low",
    "importance": 2,
    "frequency": 2,
    "tags": [
      "SPFA"
    ],
    "content": "最坏 O(VE) 可被恶意图卡；优化 SLF/LLL 或用堆 Dijkstra。",
    "examTips": [
      "说明不保证比 BF 快。"
    ]
  },
  {
    "id": "cs99",
    "category": "Computer Networks",
    "subcategory": "Network Layer",
    "title": "OSPF 要点",
    "difficulty": "Medium",
    "importance": 2,
    "frequency": 2,
    "tags": [
      "OSPF"
    ],
    "content": "洪泛 LSA，Dijkstra 求路；区域骨干 0 区；cost=带宽倒数。",
    "examTips": [
      "支持认证；DR/BDR。"
    ]
  },
  {
    "id": "cs100",
    "category": "Computer Networks",
    "subcategory": "Network Layer",
    "title": "RIP 要点",
    "difficulty": "Low",
    "importance": 2,
    "frequency": 2,
    "tags": [
      "RIP"
    ],
    "content": "最大跳 15，16 无穷；周期广播收敛慢。",
    "examTips": [
      "毒性逆转/水平分割防环。"
    ]
  },
  {
    "id": "cs101",
    "category": "Computer Networks",
    "subcategory": "Network Layer",
    "title": "BGP 基础",
    "difficulty": "Medium",
    "importance": 2,
    "frequency": 2,
    "tags": [
      "BGP"
    ],
    "content": "路径向量，策略选路；AS_PATH 防环；TCP 179。",
    "examTips": [
      "不追求最短而是策略。"
    ]
  },
  {
    "id": "cs102",
    "category": "Operating Systems",
    "subcategory": "Memory Management",
    "title": "反置页表与哈希页表",
    "difficulty": "Medium",
    "importance": 2,
    "frequency": 2,
    "tags": [
      "页表"
    ],
    "content": "反置页表按物理帧存虚页映射节省空间；哈希页表用桶查找。",
    "examTips": [
      "定位需 (pid, 虚页号)。"
    ]
  },
  {
    "id": "cs103",
    "category": "Computer Organization",
    "subcategory": "Pipeline",
    "title": "流水线相关冒险与消除",
    "difficulty": "Medium",
    "importance": 4,
    "frequency": 4,
    "tags": ["hazard", "pipeline"],
    "content": "数据冒险 RAW 需前递/暂停；结构冒险靠资源复制或仲裁；控制冒险依赖分支预测与延迟槽。",
    "secondaryConclusions": [
      "前递能解决大多数 RAW，但加载后使用仍需插入气泡。",
      "分支预测失败开销=流水级数×周期。"
    ],
    "examTips": [
      "计算 CPI 时分别统计冒险插入的停顿周期。",
      "画时间表可直观看出哪几拍需要气泡。"
    ]
  },
  {
    "id": "cs104",
    "category": "Computer Organization",
    "subcategory": "Cache",
    "title": "Cache 映射与替换策略",
    "difficulty": "High",
    "importance": 5,
    "frequency": 5,
    "tags": ["cache", "LRU"],
    "content": "直接映射命中快但冲突多；全相联冲突少成本高；组相联折中。替换策略：LRU ≈ 最优，随机/FIFO 性能次之。",
    "secondaryConclusions": [
      "组数越多冲突越少但命中时间增加。",
      "写策略：写直达配合写分配，写回需脏位。"
    ],
    "examTips": [
      "求命中率先算块大小、标记位、组索引位。",
      "注意 CPU/主存地址分解格式，常考换算。"
    ]
  },
  {
    "id": "cs105",
    "category": "Computer Organization",
    "subcategory": "Cache",
    "title": "MESI 缓存一致性协议",
    "difficulty": "Medium",
    "importance": 4,
    "frequency": 3,
    "tags": ["MESI", "coherence"],
    "content": "四状态：Modified、Exclusive、Shared、Invalid。总线监听实现：写操作触发失效或升级，读共享触发降级。",
    "secondaryConclusions": [
      "写命中 Shared 需升级为 Modified（广播无效）。",
      "目录协议可降低总线广播开销。"
    ],
    "examTips": [
      "状态转移图是高频简答，画出触发条件即可得分。",
      "问一致性时区分写失效 vs 写更新。"
    ]
  },
  {
    "id": "cs106",
    "category": "Computer Organization",
    "subcategory": "Pipeline",
    "title": "分支预测与BTB",
    "difficulty": "Medium",
    "importance": 3,
    "frequency": 3,
    "tags": ["branch", "BTB"],
    "content": "静态预测（后向跳转取、前向不取）简单；动态两位饱和计数器抗抖动；BTB 存目标地址减少延迟。",
    "secondaryConclusions": [
      "局部历史 + 全局历史的两级预测准确率更高。",
      "预测失败需清空后续指令并恢复 PC。"
    ],
    "examTips": [
      "CPI 题：额外开销 = 失败率 × 惩罚拍数。",
      "BTB 未命中时仍需顺序取指。"
    ]
  },
  {
    "id": "cs107",
    "category": "Computer Organization",
    "subcategory": "I/O",
    "title": "DMA 与中断对比",
    "difficulty": "Low",
    "importance": 3,
    "frequency": 3,
    "tags": ["DMA", "interrupt"],
    "content": "DMA 由控制器直接搬运数据，CPU 仅发起与结束中断；中断方式每次数据都需 CPU 参与，适合低速设备。",
    "secondaryConclusions": [
      "DMA 需总线仲裁可能引入周期窃取。",
      "块传送结束触发一次中断，减少开销。"
    ],
    "examTips": [
      "问“为何 DMA 更高效”可从 CPU 访存次数解释。",
      "区分可屏蔽中断/不可屏蔽中断。"
    ]
  },
  {
    "id": "cs108",
    "category": "Computer Organization",
    "subcategory": "Storage",
    "title": "RAID 等级与冗余",
    "difficulty": "Low",
    "importance": 2,
    "frequency": 2,
    "tags": ["RAID"],
    "content": "RAID0 条带化无冗余；RAID1 镜像双写；RAID5 条带+奇偶校验分布；RAID6 双奇偶可容忍两盘坏。",
    "secondaryConclusions": [
      "RAID10 读写性能高但代价大。",
      "RAID5 写入存在“写放大”，小写需读改写。"
    ],
    "examTips": [
      "题目常让计算可用容量、容错盘数。",
      "记住 RAID5 奇偶分布避免单一瓶颈。"
    ]
  },
  {
    "id": "cs109",
    "category": "Operating Systems",
    "subcategory": "Process Management",
    "title": "进程状态与切换",
    "difficulty": "Low",
    "importance": 4,
    "frequency": 4,
    "tags": ["PCB", "context switch"],
    "content": "典型五状态：新建、就绪、运行、阻塞、结束。上下文切换保存/恢复 PCB、寄存器、内核栈。",
    "secondaryConclusions": [
      "线程切换成本低于进程切换（共享地址空间）。",
      "系统调用/中断也会触发上下文切换。"
    ],
    "examTips": [
      "画状态转移图，标明“调度/阻塞/唤醒”。",
      "分析开销时要算 TLB 失效和缓存干扰。"
    ]
  },
  {
    "id": "cs110",
    "category": "Operating Systems",
    "subcategory": "Scheduling",
    "title": "经典调度算法对比",
    "difficulty": "Medium",
    "importance": 4,
    "frequency": 4,
    "tags": ["FCFS", "RR", "HRRN", "MLFQ"],
    "content": "FCFS 简单但平均等待长；短作业优先最小化平均周转但可能饥饿；RR 兼顾响应；高响应比优先折中；多级反馈队列实现动态时间片。",
    "secondaryConclusions": [
      "时间片越小，响应更好但开销更大。",
      "多级反馈队列天然支持 I/O 密集型优先。"
    ],
    "examTips": [
      "计算平均等待/周转需列甘特图。",
      "注意抢占与非抢占的区别。"
    ]
  },
  {
    "id": "cs111",
    "category": "Operating Systems",
    "subcategory": "Synchronization",
    "title": "信号量与互斥量区别",
    "difficulty": "Medium",
    "importance": 4,
    "frequency": 4,
    "tags": ["semaphore", "mutex"],
    "content": "互斥量仅二值、拥有者才能解锁；信号量可计数，可由任意线程释放，适合资源计数或条件同步。",
    "secondaryConclusions": [
      "二值信号量可实现互斥，但缺少所有权概念。",
      "条件变量需配合互斥锁，避免竞争。"
    ],
    "examTips": [
      "P/V 原语要么原子实现，要么屏蔽中断。",
      "注意信号量初值代表可用资源数。"
    ]
  },
  {
    "id": "cs112",
    "category": "Operating Systems",
    "subcategory": "Deadlock",
    "title": "死锁预防与避免",
    "difficulty": "Medium",
    "importance": 4,
    "frequency": 4,
    "tags": ["deadlock", "银行家"],
    "content": "预防从四必要条件入手：破坏互斥/占有等待/不可抢占/循环等待。避免代表银行家算法：保持系统处于安全序列。",
    "secondaryConclusions": [
      "资源一次性申请可破坏占有等待但增加浪费。",
      "银行家算法需已知最大需求，适合长期系统。"
    ],
    "examTips": [
      "画资源分配图检查是否存在环。",
      "银行家算法步骤：Need=Max-Alloc → 找安全序列。"
    ]
  },
  {
    "id": "cs113",
    "category": "Operating Systems",
    "subcategory": "Synchronization",
    "title": "生产者-消费者多缓冲区",
    "difficulty": "Low",
    "importance": 3,
    "frequency": 3,
    "tags": ["同步"],
    "content": "用三个信号量：empty(缓冲空位)、full(已有项目)、mutex(互斥)。P(empty)→P(mutex)→写→V(mutex)→V(full)。",
    "secondaryConclusions": [
      "避免死锁：信号量获取顺序一致。",
      "缓冲区为1时退化为单缓冲问题。"
    ],
    "examTips": [
      "写伪代码时对应好 P/V 顺序。",
      "遇到多生产者/多消费者，仍只需一个互斥即可。"
    ]
  },
  {
    "id": "cs114",
    "category": "Operating Systems",
    "subcategory": "Synchronization",
    "title": "读者-写者问题变种",
    "difficulty": "Medium",
    "importance": 3,
    "frequency": 3,
    "tags": ["读者写者"],
    "content": "读优先可能饿死写者；写优先保证写不饿但读延迟；公平策略用“门卫”信号量按到达顺序排队。",
    "secondaryConclusions": [
      "读计数为0 才允许写者进入。",
      "写优先实现：写者到来阻止后续读者进场。"
    ],
    "examTips": [
      "用信号量 queue 实现先来先服务最稳妥。",
      "别忘记读者退出时计数减到0再释放 writer。"
    ]
  },
  {
    "id": "cs115",
    "category": "Operating Systems",
    "subcategory": "Deadlock",
    "title": "银行家算法安全性检查",
    "difficulty": "Medium",
    "importance": 3,
    "frequency": 3,
    "tags": ["安全序列"],
    "content": "工作向量 Work 初始化为可用资源；寻找 Need≤Work 的进程，假设其完成并释放资源；若能遍历所有进程则安全。",
    "secondaryConclusions": [
      "找不到可满足的进程即处于不安全状态。",
      "检测算法与避免算法类似但输入是当前分配。"
    ],
    "examTips": [
      "表格法写清 Need/Work/Allocation 更不易错。",
      "安全状态≠无死锁，但死锁必为不安全。"
    ]
  },
  {
    "id": "cs116",
    "category": "Operating Systems",
    "subcategory": "Memory Management",
    "title": "页面置换：LRU / Clock / LFU",
    "difficulty": "High",
    "importance": 4,
    "frequency": 4,
    "tags": ["置换"],
    "content": "LRU 接近最优但需硬件支持；Clock 用引用位近似；LFU 容易被“一次性大数组”干扰，需老化。",
    "secondaryConclusions": [
      "Belady 异常仅出现在 FIFO，不在 LRU/OPT。",
      "工作集模型通过活跃页集动态调整分配。"
    ],
    "examTips": [
      "手算缺页率：按置换策略模拟，记录引用位。",
      "Clock 有单指针与双指针（改进型）两种。"
    ]
  },
  {
    "id": "cs117",
    "category": "Operating Systems",
    "subcategory": "Memory Management",
    "title": "工作集与抖动",
    "difficulty": "Medium",
    "importance": 3,
    "frequency": 3,
    "tags": ["工作集"],
    "content": "工作集 W(t,Δ) 是过去 Δ 时间窗口访问的页集合。缺页率飙升且 CPU 利用率下降是抖动信号，可减少并发进程或增大分配。",
    "secondaryConclusions": [
      "PFF（缺页率控制）与工作集策略常结合。",
      "Δ 过大浪费内存，过小频繁抖动。"
    ],
    "examTips": [
      "解释抖动成因：驻留集太小 + 频繁换出常用页。",
      "调参题：逐步增大驻留集直至缺页率稳定。"
    ]
  },
  {
    "id": "cs118",
    "category": "Operating Systems",
    "subcategory": "Memory Management",
    "title": "TLB 与多级页表性能",
    "difficulty": "Medium",
    "importance": 4,
    "frequency": 4,
    "tags": ["TLB"],
    "content": "TLB 命中直接得到物理帧；未命中需访问多级页表。多级页表节省空间但增加访存层数，TLB 可抵消开销。",
    "secondaryConclusions": [
      "有效访存时间 EAT=命中率×1+(1-命中率)×(页表层数+1)。",
      "大页能提高 TLB 命中但可能产生内部碎片。"
    ],
    "examTips": [
      "计算 EAT 时别忘记缺页中断的服务时间。",
      "TLB 命中率题常结合局部性给估计值。"
    ]
  },
  {
    "id": "cs119",
    "category": "Operating Systems",
    "subcategory": "Memory Management",
    "title": "伙伴算法与内存碎片",
    "difficulty": "Low",
    "importance": 3,
    "frequency": 2,
    "tags": ["allocator"],
    "content": "块大小为 2^k，对应伙伴地址通过按位异或最高可拆级。释放时若伙伴空闲可合并减少外碎片。",
    "secondaryConclusions": [
      "内部碎片来自分配大于需求；外碎片来自空洞难以合并。",
      "SLAB 在伙伴之上缓存对象，降低碎片与分配成本。"
    ],
    "examTips": [
      "给出分配/释放序列让你算剩余空闲布局，是高频小题。",
      "记得伙伴地址求法：addr xor 2^k。"
    ]
  },
  {
    "id": "cs120",
    "category": "Operating Systems",
    "subcategory": "Threads",
    "title": "内核线程与用户线程",
    "difficulty": "Low",
    "importance": 3,
    "frequency": 3,
    "tags": ["thread"],
    "content": "用户级线程切换快但一次阻塞会阻塞整个进程；内核线程由内核调度，能利用多核但切换成本高。",
    "secondaryConclusions": [
      "1:1、N:1、M:N 三种映射模型；M:N 需两级调度。",
      "混合模型能兼顾多核与轻量切换。"
    ],
    "examTips": [
      "解释阻塞问题：系统调用在用户线程模型会阻塞整个 LWP。",
      "性能分析写明切换发生在用户态或内核态。"
    ]
  },
  {
    "id": "cs121",
    "category": "Operating Systems",
    "subcategory": "File Systems",
    "title": "索引节点与块地址",
    "difficulty": "Medium",
    "importance": 4,
    "frequency": 4,
    "tags": ["inode"],
    "content": "i-node 存权限、时间戳、指向数据块的直接/一次间接/二次间接/三次间接地址，支持大文件扩展。",
    "secondaryConclusions": [
      "软链接只保存路径，不增加 i-node 引用计数。",
      "硬链接共享 i-node，删除需计数为0才释放。"
    ],
    "examTips": [
      "计算最大文件大小：直接块+间接块容量求和。",
      "别把目录项与 i-node 搞混，目录文件本身也有 i-node。"
    ]
  },
  {
    "id": "cs122",
    "category": "Operating Systems",
    "subcategory": "File Systems",
    "title": "日志文件系统与写放大",
    "difficulty": "Medium",
    "importance": 3,
    "frequency": 2,
    "tags": ["journal"],
    "content": "写前日志：先写日志再落盘数据，崩溃后回放保证一致性。顺序写减少寻道但会产生写放大。",
    "secondaryConclusions": [
      "元数据日记模式只记录元数据，数据写放松。",
      "全日记模式最安全但开销最大。"
    ],
    "examTips": [
      "解释崩溃恢复步骤：重放已提交事务、回滚未完成事务。",
      "与 Copy-on-Write（如 ZFS）比较：后者直接写新块。"
    ]
  },
  {
    "id": "cs123",
    "category": "Operating Systems",
    "subcategory": "File Systems",
    "title": "虚拟文件系统 VFS 层",
    "difficulty": "Low",
    "importance": 2,
    "frequency": 2,
    "tags": ["VFS"],
    "content": "VFS 抽象统一接口（超级块、inode、dentry、file），允许不同具体文件系统共存。系统调用通过 VFS 分发到具体实现。",
    "secondaryConclusions": [
      "页缓存由 VFS 统一管理，读写路径共享缓存。",
      "挂载操作将设备与 VFS 树中的目录节点绑定。"
    ],
    "examTips": [
      "画层次结构：应用→VFS→具体 FS→块设备。",
      "问缓存一致性时说明页缓存与磁盘的写回策略。"
    ]
  },
  {
    "id": "cs124",
    "category": "Computer Networks",
    "subcategory": "Overview",
    "title": "OSI 与 TCP/IP 对照",
    "difficulty": "Low",
    "importance": 4,
    "frequency": 5,
    "tags": ["OSI", "TCP/IP"],
    "content": "OSI 七层 vs TCP/IP 四层：应用=应用+表示+会话，运输，对网际，网络接口=数据链路+物理。",
    "secondaryConclusions": [
      "实际实现以 TCP/IP 为主，但分层思想源自 OSI。",
      "层间封装：上层数据变为下层的负载。"
    ],
    "examTips": [
      "画分层图并标注常见协议（HTTP/TCP/IP/以太网）。",
      "考“哪个层处理差错/流量控制”按层记忆即可。"
    ]
  },
  {
    "id": "cs125",
    "category": "Computer Networks",
    "subcategory": "Transport Layer",
    "title": "TCP 三次握手与四次挥手",
    "difficulty": "Medium",
    "importance": 5,
    "frequency": 5,
    "tags": ["TCP"],
    "content": "三次握手：SYN→SYN+ACK→ACK，建立双向初始序列号。四次挥手：FIN/ACK 分离，TIME_WAIT 保证旧报文消逝。",
    "secondaryConclusions": [
      "握手三次足够防止旧连接误触发。",
      "TIME_WAIT 持续 2MSL，避免延迟报文影响新连接。"
    ],
    "examTips": [
      "序号与确认号计算题要明确“下一字节序号”。",
      "服务器崩溃重启导致半开连接，可用保活探测。"
    ]
  },
  {
    "id": "cs126",
    "category": "Computer Networks",
    "subcategory": "Transport Layer",
    "title": "滑动窗口与流量控制",
    "difficulty": "Medium",
    "importance": 4,
    "frequency": 4,
    "tags": ["window"],
    "content": "发送窗口限制未确认的数据量，接收窗口通告可用缓存，双方取最小值。超时重传基于 RTT 估计。",
    "secondaryConclusions": [
      "快速重传需 3 个冗余 ACK，配合快速恢复。",
      "零窗口会导致死锁，TCP 用持续计时器与零窗口探测。"
    ],
    "examTips": [
      "窗口移动示意图需标清 SND.UNA/SND.NXT。",
      "拥塞控制与流量控制同时生效，取更小窗口。"
    ]
  },
  {
    "id": "cs127",
    "category": "Computer Networks",
    "subcategory": "Transport Layer",
    "title": "TCP 拥塞控制四阶段",
    "difficulty": "High",
    "importance": 5,
    "frequency": 5,
    "tags": ["拥塞控制"],
    "content": "慢启动指数增长到阈值；拥塞避免线性增长；快重传+快恢复遇到 3 重 ACK 将阈值减半并进入拥塞避免；超时则阈值减半并重回慢启动。",
    "secondaryConclusions": [
      "ssthresh 是分界；cwnd 不会小于 1 MSS。",
      "Reno 与 NewReno、CUBIC 的恢复细节不同。"
    ],
    "examTips": [
      "画 cwnd 随时间曲线；标注事件点（超时/3ACK）。",
      "吞吐估算：吞吐≈MSS/RTT × √(3/2p)。"
    ]
  },
  {
    "id": "cs128",
    "category": "Computer Networks",
    "subcategory": "Data Link",
    "title": "ARQ 协议对比：停等、GBN、SR",
    "difficulty": "Medium",
    "importance": 3,
    "frequency": 3,
    "tags": ["ARQ"],
    "content": "停等吞吐=1/(1+2a)；GBN 在错误时回退到出错帧；SR 仅重传出错帧但需更多缓存和序号空间。",
    "secondaryConclusions": [
      "GBN 窗口≤序号空间-1；SR 窗口≤(序号空间+1)/2。",
      "效率受信道往返时延 a 影响明显。"
    ],
    "examTips": [
      "吞吐率计算要代入差错概率和往返时延。",
      "序号循环问题常考 SR 窗口大小上界。"
    ]
  },
  {
    "id": "cs129",
    "category": "Computer Networks",
    "subcategory": "Network Layer",
    "title": "IP 分片与 MTU",
    "difficulty": "Low",
    "importance": 3,
    "frequency": 3,
    "tags": ["IP"],
    "content": "分片字段：标识、标志位 DF/MF、片偏移(8B 单位)。DF=1 不允许分片；MTU 决定最大 IP 数据报长度。",
    "secondaryConclusions": [
      "路径 MTU 发现用于避免中途分片。",
      "片偏移需对齐 8B，最后一片 MF=0。"
    ],
    "examTips": [
      "计算片长时记得每片含首部 20B。",
      "题目常让写出各片偏移与 MF 位。"
    ]
  },
  {
    "id": "cs130",
    "category": "Computer Networks",
    "subcategory": "Network Layer",
    "title": "NAT 与端口映射",
    "difficulty": "Low",
    "importance": 2,
    "frequency": 2,
    "tags": ["NAT"],
    "content": "地址私有化通过 NAT，将内部地址+端口映射到公网。静态映射固定，NAPT 端口复用提高利用率。",
    "secondaryConclusions": [
      "NAT 破坏端到端原则，P2P 需打洞。",
      "IPv6 去除 NAT，更依赖防火墙策略。"
    ],
    "examTips": [
      "端口耗尽可能造成连接失败，写答题时提到资源限制。",
      "静态/动态/NAPT 三者的应用场景要分清。"
    ]
  },
  {
    "id": "cs131",
    "category": "Computer Networks",
    "subcategory": "Application Layer",
    "title": "DNS 迭代与递归查询",
    "difficulty": "Medium",
    "importance": 3,
    "frequency": 3,
    "tags": ["DNS"],
    "content": "递归：上级服务器代为查询；迭代：客户端逐级询问。缓存减少查询延迟，TTL 控制失效。",
    "secondaryConclusions": [
      "根、顶级、权威三级层次；本地域名服务器负责递归。",
      "DNS 劫持可通过 DNSSEC 签名防护。"
    ],
    "examTips": [
      "画出迭代/递归时序，标明返回的提示信息。",
      "别把递归/迭代与缓存搞混。"
    ]
  },
  {
    "id": "cs132",
    "category": "Computer Networks",
    "subcategory": "Application Layer",
    "title": "HTTP/2 关键特性",
    "difficulty": "Medium",
    "importance": 2,
    "frequency": 2,
    "tags": ["HTTP2"],
    "content": "二进制分帧、首部压缩（HPACK）、多路复用、服务器推送。解决队头阻塞并降低首部冗余。",
    "secondaryConclusions": [
      "多路复用在同一 TCP 连接内并行流。",
      "首部压缩需静态/动态字典，防侧信道需注入填充。"
    ],
    "examTips": [
      "区分 HTTP/1.1 的长连接+管线化与 HTTP/2 的多路复用。",
      "推送资源需客户端缓存验证，防止浪费带宽。"
    ]
  },
  {
    "id": "cs133",
    "category": "Computer Networks",
    "subcategory": "Application Layer",
    "title": "HTTPS 握手与证书校验",
    "difficulty": "High",
    "importance": 4,
    "frequency": 3,
    "tags": ["TLS"],
    "content": "TLS1.2：ClientHello→ServerHello+证书→密钥交换→Finished。服务器证书包含公钥，由 CA 签名验证身份。",
    "secondaryConclusions": [
      "握手后使用对称密钥加密，提升性能。",
      "中间人攻击防范依赖证书链与主机名校验。"
    ],
    "examTips": [
      "写出握手报文字段：随机数、套件、证书、公钥交换参数。",
      "TLS1.3 合并握手往返，使用前向安全的DH密钥交换。"
    ]
  },
  {
    "id": "cs134",
    "category": "Computer Networks",
    "subcategory": "Application Layer",
    "title": "CDN 工作流程",
    "difficulty": "Low",
    "importance": 2,
    "frequency": 2,
    "tags": ["CDN"],
    "content": "DNS 调度将用户请求解析到最近的边缘节点；若缓存未命中，回源拉取后再缓存。常用一致性哈希做负载均衡。",
    "secondaryConclusions": [
      "多级缓存可降低回源压力。",
      "命中率与缓存替换策略（LRU/LFU）相关。"
    ],
    "examTips": [
      "回答“如何提高命中率”可提分级缓存+预热。",
      "CDN 与代理/反向代理概念区分。"
    ]
  },
  {
    "id": "cs135",
    "category": "Computer Networks",
    "subcategory": "Routing",
    "title": "Dijkstra 与 Bellman-Ford 对比",
    "difficulty": "Medium",
    "importance": 3,
    "frequency": 3,
    "tags": ["shortest path"],
    "content": "Dijkstra 需非负权，时间复杂度 O(E logV)；Bellman-Ford 处理负权并能检测负环，复杂度 O(VE)。",
    "secondaryConclusions": [
      "链路状态路由协议（OSPF）用 Dijkstra。",
      "距离矢量（RIP）用 Bellman-Ford 易出现计数到无穷。"
    ],
    "examTips": [
      "算法题：先写初始化，再迭代松弛/选最小距离节点。",
      "检测负环：若第 V 次迭代仍可松弛则存在负环。"
    ]
  },
  {
    "id": "cs150_ocrtcp",
    "category": "Computer Networks",
    "subcategory": "Transport Layer",
    "title": "TCP 高频考点汇总（OCR 模拟卷）",
    "source": "OCR 模拟卷",
    "difficulty": "Medium",
    "importance": 4,
    "frequency": 9,
    "tags": ["TCP", "三次握手", "滑动窗口", "拥塞控制", "模拟卷"],
    "content": "模拟卷出现频率最高的 TCP 知识点：三次握手/四次挥手时序，滑动窗口与吞吐率估算，拥塞控制四阶段（慢启动、拥塞避免、快重传、快恢复），TIME_WAIT 含义。",
    "examTips": [
      "计算题先写出 cwnd 演变表；注意超时与 3 重 ACK 的分界。",
      "时序题画出 seq/ack 轨迹，强调“第二次握手携带 ACK”。"
    ]
  },
  {
    "id": "cs151_ocrcache",
    "category": "Computer Organization",
    "subcategory": "Cache",
    "title": "Cache 与 TLB 高频考点（OCR 模拟卷）",
    "source": "OCR 模拟卷",
    "difficulty": "Medium",
    "importance": 4,
    "frequency": 8,
    "tags": ["Cache", "TLB", "替换算法", "模拟卷"],
    "content": "模拟卷中反复出现的考点：映射方式与标记位/组索引位计算；命中率估算；写策略（写直达/写回）；TLB 命中与有效访存时间；LRU 与 FIFO 对比。",
    "examTips": [
      "题目要求计算命中率时先写出块大小、组数、tag 位，再逐访存模拟。",
      "TLB EAT 公式：命中率×1 + (1-命中率)×(页表层数+1)，遇到缺页需加上换页开销。"
    ]
  },
  {
    "id": "cs152_ocrds",
    "category": "Data Structures",
    "subcategory": "Search & Sort",
    "title": "排序与查找高频点（OCR 模拟卷）",
    "source": "OCR 模拟卷",
    "difficulty": "Low",
    "importance": 3,
    "frequency": 7,
    "tags": ["排序", "查找", "堆", "红黑树", "B树", "模拟卷"],
    "content": "出现频率较高的 DS 知识点：堆排序/优先队列、快速排序/稳定性、查找表性能；红黑树性质与插入删除旋转；B 树/B+ 树阶与磁盘块计算。",
    "examTips": [
      "红黑树记住“五性质”和双旋修复；B 树计算阶数时按“指针数=关键字数+1”。",
      "排序题常问“是否稳定、时间/空间复杂度、最佳/最坏情况”。"
    ]
  },
  {
    "id": "cs136",
    "category": "Computer Networks",
    "subcategory": "Routing",
    "title": "OSPF 分区与DR/BDR 选举",
    "difficulty": "Medium",
    "importance": 3,
    "frequency": 2,
    "tags": ["OSPF"],
    "content": "OSPF 分为骨干区与多区域，减少 LSA 泛洪。广播网络选举 DR/BDR 降低邻接数量。",
    "secondaryConclusions": [
      "DR/BDR 选举基于优先级与 Router ID。",
      "区域内链路状态数据库一致性靠泛洪同步。"
    ],
    "examTips": [
      "写出 LSA 类型：1 路由、2 网络、3 汇总等。",
      "邻接建立需 Hello 包参数匹配。"
    ]
  },
  {
    "id": "cs137",
    "category": "Computer Networks",
    "subcategory": "Network Layer",
    "title": "ICMP 诊断：Ping 与 Traceroute",
    "difficulty": "Low",
    "importance": 2,
    "frequency": 2,
    "tags": ["ICMP"],
    "content": "Ping 用 Echo Request/Reply 测 RTT；Traceroute 利用 TTL 递增触发“时间超时”报文记录路径。",
    "secondaryConclusions": [
      "ICMP 不保证可靠，可能被防火墙丢弃。",
      "Traceroute 在不同 OS 上使用 UDP/ICMP/UDP+大端口。"
    ],
    "examTips": [
      "解释“Ping 不通但能上网”可能是过滤 ICMP。",
      "Traceroute 路径不唯一，与负载均衡相关。"
    ]
  },
  {
    "id": "cs138",
    "category": "Computer Networks",
    "subcategory": "Security",
    "title": "XSS / CSRF 核心差异",
    "difficulty": "Medium",
    "importance": 3,
    "frequency": 2,
    "tags": ["security"],
    "content": "XSS 注入脚本在受害页面执行；CSRF 利用受害者已登录态跨站请求。防御：输入输出过滤、Content-Security-Policy、SameSite Cookie、双重提交。",
    "secondaryConclusions": [
      "CSRF 需受害者处于登录状态。",
      "反射型/存储型/DOM 型是 XSS 三类。"
    ],
    "examTips": [
      "写防御措施时区分前端与服务端责任。",
      "题目常问“SameSite=Lax/Strict”效果。"
    ]
  },
  {
    "id": "cs139",
    "category": "Data Structures",
    "subcategory": "Trees",
    "title": "AVL 与红黑树对比",
    "difficulty": "High",
    "importance": 5,
    "frequency": 5,
    "tags": ["balance"],
    "content": "AVL 更严格平衡，查询快但插入/删除旋转多；红黑树相对宽松，保证最长路径不超过最短的2倍，插入删除更快。",
    "secondaryConclusions": [
      "红黑树性质：根黑、叶黑、红节点黑父、每路径黑高相等。",
      "AVL 平衡因子 ∈{-1,0,1}，四种旋转修复。"
    ],
    "examTips": [
      "手写插入删除时画出旋转步骤，标明颜色。",
      "选择哪种树要结合读写比例。"
    ]
  },
  {
    "id": "cs140",
    "category": "Data Structures",
    "subcategory": "Trees",
    "title": "B 树与 B+ 树的差异",
    "difficulty": "High",
    "importance": 5,
    "frequency": 4,
    "tags": ["B-tree"],
    "content": "B 树关键字和数据都在内部节点；B+ 树数据只在叶子，叶子链表便于范围查询，内部仅存索引。",
    "secondaryConclusions": [
      "B+ 树非叶节点度数 = 指针数，便于磁盘顺序访问。",
      "B 树查找可在内部节点结束，B+ 必到叶子。"
    ],
    "examTips": [
      "数据库索引、文件系统多用 B+ 树。",
      "分裂/合并时注意最小度 t 的约束。"
    ]
  },
  {
    "id": "cs141",
    "category": "Data Structures",
    "subcategory": "Disjoint Set",
    "title": "并查集的按秩合并与路径压缩",
    "difficulty": "Medium",
    "importance": 4,
    "frequency": 4,
    "tags": ["union-find"],
    "content": "按秩/按大小合并保持树浅；路径压缩在查找时将节点直接挂到根，均摊近似 O(α(n))。",
    "secondaryConclusions": [
      "两优化同时使用效果最好。",
      "可用于 Kruskal 算法检测成环。"
    ],
    "examTips": [
      "写 find 时使用递归压缩路径。",
      "不要把秩当高度，它是上界。"
    ]
  },
  {
    "id": "cs142",
    "category": "Data Structures",
    "subcategory": "Strings",
    "title": "KMP 与前缀函数",
    "difficulty": "Medium",
    "importance": 4,
    "frequency": 4,
    "tags": ["KMP"],
    "content": "前缀函数 π[i] 代表最长真前后缀长度。失配时跳到 π[i-1]，整体 O(n+m)。",
    "secondaryConclusions": [
      "next 数组通常右移一位，注意不同教材定义。",
      "KMP 保证文本指针不回溯。"
    ],
    "examTips": [
      "手推 π 表时画出前后缀对齐更快。",
      "代码题小心数组下标，先写模板再改。"
    ]
  },
  {
    "id": "cs143",
    "category": "Data Structures",
    "subcategory": "Graph",
    "title": "拓扑排序与环检测",
    "difficulty": "Low",
    "importance": 3,
    "frequency": 3,
    "tags": ["topo"],
    "content": "入度为0队列法或 DFS 逆后序皆可。拓扑序存在 ⇔ 有向图无环。",
    "secondaryConclusions": [
      "Kahn 算法中队列弹出顺序即拓扑序。",
      "若弹出节点数 < 总节点数，则存在环。"
    ],
    "examTips": [
      "题目让找“可行计划顺序”多半是拓扑排序。",
      "DFS 法要标记三色避免重复访问。"
    ]
  },
  {
    "id": "cs144",
    "category": "Data Structures",
    "subcategory": "Graph",
    "title": "最小生成树：Kruskal 与 Prim",
    "difficulty": "Medium",
    "importance": 4,
    "frequency": 4,
    "tags": ["MST"],
    "content": "Kruskal 先排序边，按权值小到大选且避免成环；Prim 从任意点扩展，使用堆 O(E logV)。",
    "secondaryConclusions": [
      "MST 适用于无向连通带权图；不唯一时可给多解。",
      "Kruskal 依赖并查集快速判环。"
    ],
    "examTips": [
      "手算 Kruskal 先排边列表，画并查集合并过程。",
      "Prim 在稠密图用邻接矩阵 + O(V^2) 版本足够。"
    ]
  },
  {
    "id": "cs145",
    "category": "Data Structures",
    "subcategory": "Graph",
    "title": "单源最短路：Dijkstra / Bellman-Ford / SPFA",
    "difficulty": "High",
    "importance": 4,
    "frequency": 4,
    "tags": ["shortest path"],
    "content": "Dijkstra 处理非负边；Bellman-Ford 支持负权并检测负环；SPFA 是队列优化版，最坏仍 O(VE)。",
    "secondaryConclusions": [
      "若存在负环，最短路不存在；算法需报告。",
      "多源最短路可加超级源连接所有节点。"
    ],
    "examTips": [
      "写伪代码时标注初始化 dist=∞、源点0。",
      "避免在含负边图上使用 Dijkstra。"
    ]
  },
  {
    "id": "cs146",
    "category": "Data Structures",
    "subcategory": "Hash",
    "title": "哈希冲突解决：开放定址 vs 链地址",
    "difficulty": "Medium",
    "importance": 3,
    "frequency": 3,
    "tags": ["hash"],
    "content": "开放定址探查（线性/二次/双重散列）简单但装载因子需 <0.75；链地址用链表或桶，扩容灵活。",
    "secondaryConclusions": [
      "线性探查易产生堆积，双重散列分布更均匀。",
      "链地址查找期望 O(1+α)，扩容重新散列。"
    ],
    "examTips": [
      "给定哈希表状态，按探查序列插入最安全。",
      "装载因子 α=元素数/桶数，题目常要求计算。"
    ]
  },
  {
    "id": "cs147",
    "category": "Data Structures",
    "subcategory": "Heap",
    "title": "堆与优先队列操作复杂度",
    "difficulty": "Low",
    "importance": 3,
    "frequency": 3,
    "tags": ["heap"],
    "content": "二叉堆支持插入/删顶 O(log n)，建堆 O(n)。d 叉堆降低高度但每次调整比较更多。",
    "secondaryConclusions": [
      "堆排序不稳定但原地；时间 O(n log n)。",
      "使用向下调整/向上调整的边界要清楚。"
    ],
    "examTips": [
      "写数组堆时左右孩子索引 2i+1/2i+2（0 基）。",
      "大顶/小顶堆别弄反。"
    ]
  },
  {
    "id": "cs148",
    "category": "Data Structures",
    "subcategory": "Strings",
    "title": "滚动哈希与字符串匹配",
    "difficulty": "Low",
    "importance": 2,
    "frequency": 2,
    "tags": ["hash"],
    "content": "选择基数 B 和模 M，hash[i]= (hash[i-1]·B + s[i]) mod M。可 O(1) 比较子串哈希。",
    "secondaryConclusions": [
      "双模或 64 位自然溢出降低碰撞概率。",
      "需预计算 B 的幂以支持区间查询。"
    ],
    "examTips": [
      "小心整型溢出，可用 long long 或 __int128。",
      "碰撞时仍需额外比较以确保正确。"
    ]
  },
  {
    "id": "cs149",
    "category": "Compiler",
    "subcategory": "Lexical Analysis",
    "title": "正则表达式到 NFA/DFA",
    "difficulty": "Medium",
    "importance": 3,
    "frequency": 3,
    "tags": ["automata"],
    "content": "Thompson 构造将正则变为 ε-NFA，再子集构造到 DFA，最小化 DFA 降低状态数。",
    "secondaryConclusions": [
      "ε-闭包是子集构造关键。",
      "最小化可用分割算法（Hopcroft）。"
    ],
    "examTips": [
      "画状态图时明确初态/终态和 ε 边。",
      "最小化题常给等价类划分，照算法迭代即可。"
    ]
  },
  {
    "id": "cs150",
    "category": "Compiler",
    "subcategory": "Syntax Analysis",
    "title": "LL(1) 与 LR(1) 文法区别",
    "difficulty": "High",
    "importance": 4,
    "frequency": 3,
    "tags": ["parser"],
    "content": "LL(1) 自顶向下预测分析需无左递归、无左因子；LR(1) 自底向上，接受更广文法，核心是项目集规范族。",
    "secondaryConclusions": [
      "FIRST/FOLLOW 决定 LL(1) 选择表。",
      "LR(1) 项含展望符，可合并为 LALR(1) 减少状态。"
    ],
    "examTips": [
      "消除左递归、提取左因子是构造 LL(1) 必备步骤。",
      "LR 分析表冲突（移进/规约）要给出解决策略。"
    ]
  },
  {
    "id": "cs151",
    "category": "Compiler",
    "subcategory": "Intermediate Code",
    "title": "三地址码与基本块",
    "difficulty": "Low",
    "importance": 3,
    "frequency": 2,
    "tags": ["IR"],
    "content": "三地址码形如 x = y op z。基本块入口无前驱跳入、出口无内部跳转，利于局部优化。",
    "secondaryConclusions": [
      "四元式/三元式/间接三元式是常见存储形式。",
      "控制流图由基本块节点和转移边组成。"
    ],
    "examTips": [
      "划分基本块：以入口、分支/跳转目标为界。",
      "公共子表达式消除等优化在块内实现。"
    ]
  },
  {
    "id": "cs152",
    "category": "Compiler",
    "subcategory": "Code Generation",
    "title": "寄存器分配与图着色",
    "difficulty": "Medium",
    "importance": 3,
    "frequency": 2,
    "tags": ["register allocation"],
    "content": "冲突图节点为活跃变量，边表示同时活跃。K 着色成功表示可用 K 个寄存器分配；溢出变量需访存。",
    "secondaryConclusions": [
      "活跃区间来自活跃性分析，线性扫描适合实时编译。",
      "合并（coalescing）可减少移动指令但可能增加度数。"
    ],
    "examTips": [
      "考试常要求画冲突图并给出着色顺序。",
      "若无法着色，说明需要溢出并重新构图。"
    ]
  }
];
