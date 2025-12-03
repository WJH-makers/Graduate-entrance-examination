import { pathToFileURL } from "url";
import fs from "fs";

const subjects = [
  { key: "math", name: "数学一", file: "./src/data/knowledge/math.js" },
  { key: "cs", name: "计算机408", file: "./src/data/knowledge/cs408.js" },
  { key: "english", name: "英语一", file: "./src/data/knowledge/english.js" },
  { key: "politics", name: "政治", file: "./src/data/knowledge/politics.js" }
];

const alias = {
  math: {
    Calculus: "高等数学",
    "高等数学": "高等数学",
    Integral: "高等数学",
    Integrals: "高等数学",
    "Limits & Continuity": "高等数学",
    "Mean Value Theorems": "高等数学",
    "Multivariable Calculus": "高等数学",
    "Linear Algebra": "线性代数",
    "Matrices": "线性代数",
    "Eigenvalues": "线性代数",
    Probability: "概率与统计",
    "概率与统计": "概率与统计",
    "Differential Equations": "常微分方程",
    "Exam Summary": "冲刺总结",
    "Exam Year": "真题年份",
    Toolkit: "解题工具"
  },
  cs: {
    "Operating Systems": "操作系统",
    "Process Management": "操作系统",
    "Memory Management": "操作系统",
    "File Management": "操作系统",
    "Computer Networks": "计算机网络",
    "Computer Network": "计算机网络",
    "Application Layer": "计算机网络",
    "Transport Layer": "计算机网络",
    "Network Layer": "计算机网络",
    "Data Link": "计算机网络",
    Routing: "计算机网络",
    Security: "计算机网络",
    "Data Structures": "数据结构",
    "Data Structure": "数据结构",
    "Linear Lists": "数据结构",
    "Stack & Queue": "数据结构",
    Trees: "数据结构",
    Graphs: "数据结构",
    Graph: "数据结构",
    "Search & Sort": "数据结构",
    Hash: "数据结构",
    "Graph Applications": "数据结构",
    Heap: "数据结构",
    "Disjoint Set": "数据结构",
    Strings: "数据结构",
    "Computer Organization": "计算机组成原理",
    Compiler: "编译原理",
    Toolkit: "解题工具",
    "Exam Year": "真题年份"
  },
  english: {
    Writing: "写作",
    Reading: "阅读",
    Grammar: "语法",
    Vocabulary: "词汇",
    Translation: "翻译",
    Cloze: "完形",
    Listening: "听力",
    Toolkit: "解题工具",
    "Exam Year": "真题年份"
  },
  politics: {
    "Mao Zhong Te": "毛中特",
    "毛中特": "毛中特",
    "Mao Zedong Thought": "毛中特",
    "Xi Thought": "思想",
    Ideology: "思想",
    "Ma Yuan": "马原",
    "马原": "马原",
    Marxism: "马原",
    "Current Affairs": "时政",
    "时政": "时政",
    History: "史纲",
    "史纲": "史纲",
    "Shi Gang": "史纲",
    "思修": "思修",
    "Exam Summary": "冲刺总结",
    "Exam Year": "真题年份",
    Toolkit: "解题工具"
  }
};

const score = (item) =>
  (item.frequency || 0) * 2 + (item.importance || 3) * 3 + (item.difficulty === "High" ? 2 : 0);

const load = async (p) => import(pathToFileURL(p));

const summaryLines = ["# 知识点精简导览", ""];
const shortlistLines = ["# 冲刺优先清单（按科目前 30 条）", ""];

for (const s of subjects) {
  const mod = await load(s.file);
  const arr = mod[Object.keys(mod)[0]];

  arr.forEach((item) => {
    const map = alias[s.key] || {};
    item.normCategory = map[item.category] || item.category;
  });

  const catCount = arr.reduce((acc, x) => {
    acc[x.normCategory] = (acc[x.normCategory] || 0) + 1;
    return acc;
  }, {});
  const topCats = Object.entries(catCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([c, n]) => `- ${c}：${n} 条`);

  summaryLines.push(`## ${s.name}  (共 ${arr.length} 条)`);
  summaryLines.push("**高频分类（统一命名）**");
  summaryLines.push(topCats.join("\n"));
  const topItems = [...arr].sort((a, b) => score(b) - score(a)).slice(0, 12);
  summaryLines.push("\n**优先掌握（Top 12）**");
  summaryLines.push(
    topItems
      .map(
        (it) =>
          `- ${it.title} (${it.normCategory}${it.subcategory ? " / " + it.subcategory : ""}) · 频次${
            it.frequency || 0
          }`
      )
      .join("\n")
  );
  summaryLines.push("");

  const top30 = [...arr].sort((a, b) => score(b) - score(a)).slice(0, 30);
  shortlistLines.push(`## ${s.name} 优先 30 条`);
  shortlistLines.push(
    top30
      .map((it, idx) => {
        const tip = Array.isArray(it.examTips) ? it.examTips[0] : "";
        return `${idx + 1}. ${it.title} — ${it.normCategory}${
          it.subcategory ? " / " + it.subcategory : ""
        } · 频次${it.frequency || 0}${tip ? " · 提示：" + tip : ""}`;
      })
      .join("\n")
  );
  shortlistLines.push("");
}

fs.writeFileSync("public/knowledge_summary.md", summaryLines.join("\n"));
fs.writeFileSync("public/knowledge_shortlist.md", shortlistLines.join("\n"));
console.log("✅ 已生成 public/knowledge_summary.md 与 public/knowledge_shortlist.md");
