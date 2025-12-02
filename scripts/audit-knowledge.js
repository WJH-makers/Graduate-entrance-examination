/* eslint-env node */
/* global process */
import fs from "fs";
import path from "path";
import url from "url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..", "src", "data", "knowledge");

const files = ["math.js", "cs408.js", "english.js", "politics.js"];
const requiredFields = ["id", "category", "title", "difficulty", "importance", "content"];
const allowedDifficulties = ["High", "Medium", "Low"];

const load = (file) => {
  const mod = fs.readFileSync(path.join(root, file), "utf8");
  // quick-and-dirty: eval module export array
  const matched = mod.match(/export const .*?=\s*(\[\s*[\s\S]*\]);/);
  if (!matched) return [];
  const arr = Function(`"use strict"; return (${matched[1]});`)();
  return arr;
};

const summarize = (arr, label) => {
  const byCat = {};
  const problems = [];
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
    // category stats
    const cat = item.category || "Uncategorized";
    byCat[cat] = (byCat[cat] || 0) + 1;
  });
  return { label, count: arr.length, byCat, problems };
};

const reports = files.map((f) => {
  const data = load(f);
  return summarize(data, f.replace(".js", ""));
});

console.log("=== 考点覆盖快照 ===");
reports.forEach((r) => {
  console.log(`\n${r.label}: ${r.count} 条`);
  Object.entries(r.byCat)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, n]) => console.log(`  - ${cat}: ${n}`));
  if (r.problems.length) {
    console.log("  * 问题:");
    r.problems.slice(0, 20).forEach((p) => console.log(`    ${p.id}: ${p.issue}`));
    if (r.problems.length > 20) console.log(`    ... ${r.problems.length - 20} more`);
  }
});

// exit with non-zero if problems exist (for CI)
const totalErrors = reports.reduce(
  (s, r) => s + r.problems.filter((p) => !p.issue.includes("warning")).length,
  0
);
if (totalErrors) {
  process.exitCode = 1;
}
