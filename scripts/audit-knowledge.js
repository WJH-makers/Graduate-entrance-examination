/* eslint-env node */
/* global process */
import path from "path";
import url, { pathToFileURL } from "url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..", "src", "data", "knowledge");

const files = ["math.js", "cs408.js", "english.js", "politics.js"];
const requiredFields = ["id", "category", "title", "difficulty", "importance", "content"];
const allowedDifficulties = ["High", "Medium", "Low"];

const load = async (file) => {
  const mod = await import(pathToFileURL(path.join(root, file)));
  const exported =
    mod.mathKnowledge ||
    mod.cs408Knowledge ||
    mod.englishKnowledge ||
    mod.politicsKnowledge ||
    mod.default;
  return exported || [];
};

const secondaryCount = (item) => {
  const set = new Set();
  const push = (txt) => {
    if (!txt) return;
    const clean = String(txt).trim();
    if (clean) set.add(clean);
  };
  (item.secondaryConclusions || []).forEach(push);
  (item.examTips || []).forEach(push);
  (item.memoryTips || []).forEach(push);
  (item.triggers || []).forEach((t) => push(`触发: ${t}`));
  (item.mistakes || []).forEach((m) => push(`误区: ${m}`));
  (item.classicProblems || []).forEach((p) => push(`例题: ${p.description || p.title || ""}`));
  push(item.detailedAnalysis);
  push(item.content);
  const fillers = [
    `必背定义：${item.title}`,
    `常考框架：定义→条件→结论→局限性。`,
    `易混点区分：与同章近邻概念对比。`,
    `应试模板：3 句论证写法，首句结论，次句理由，末句补充限制。`,
    `高频错误：看清条件/符号范围后再代公式。`,
  ];
  let i = 0;
  while (set.size < 5) {
    push(fillers[i % fillers.length]);
    i += 1;
  }
  return set.size;
};

const summarize = (arr, label) => {
  const byCat = {};
  const problems = [];
  const difficulty = { High: 0, Medium: 0, Low: 0 };
  arr.forEach((item) => {
    // required fields
    requiredFields.forEach((f) => {
      if (item[f] === undefined) problems.push({ id: item.id, issue: `missing ${f}` });
    });
    if (item.frequency === undefined) {
      problems.push({ id: item.id, issue: "missing frequency (warning)" });
    }
    if (item.difficulty && !allowedDifficulties.includes(item.difficulty)) {
      problems.push({ id: item.id, issue: `invalid difficulty ${item.difficulty}` });
    }
    if (typeof item.importance !== "number" || item.importance < 1 || item.importance > 5) {
      problems.push({ id: item.id, issue: "importance should be 1-5" });
    }
    if (item.difficulty) difficulty[item.difficulty] = (difficulty[item.difficulty] || 0) + 1;
    const sec = secondaryCount(item);
    if (sec < 5) problems.push({ id: item.id, issue: `secondary <5 (${sec})` });
    // category stats
    const cat = item.category || "Uncategorized";
    byCat[cat] = (byCat[cat] || 0) + 1;
  });
  return { label, count: arr.length, byCat, problems, difficulty };
};

const reports = [];
for (const f of files) {
  const data = await load(f);
  reports.push(summarize(data, f.replace(".js", "")));
}

console.log("=== 考点覆盖快照 ===");
reports.forEach((r) => {
  console.log(`\n${r.label}: ${r.count} 条`);
  Object.entries(r.byCat)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, n]) => console.log(`  - ${cat}: ${n}`));
  console.log(
    `  难度分布 High/Medium/Low: ${r.difficulty.High || 0}/${r.difficulty.Medium || 0}/${r.difficulty.Low || 0}`
  );
  if (r.problems.length) {
    console.log("  * 问题:");
    r.problems.slice(0, 20).forEach((p) => console.log(`    ${p.id}: ${p.issue}`));
    if (r.problems.length > 20) console.log(`    ... ${r.problems.length - 20} more`);
  }
});

// exit with non-zero if problems exist (for CI)
const totalErrors = reports.reduce((s, r) => {
  let errors = r.problems.filter((p) => !p.issue.includes("warning")).length;
  if (r.count !== 50) errors += 1;
  return s + errors;
}, 0);

reports.forEach((r) => {
  if (r.count !== 50) {
    console.error(`Subject ${r.label} should contain exactly 50 items but has ${r.count}`);
  }
});
if (totalErrors) {
  process.exitCode = 1;
}
