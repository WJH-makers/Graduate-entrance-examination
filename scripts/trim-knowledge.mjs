import fs from 'fs'
import path from 'path'
import { pathToFileURL } from 'url'

const diff = { High: 3, Medium: 2, Low: 1 }
const pick = (arr) =>
  arr
    .slice()
    .sort(
      (a, b) =>
        (b.frequency || 0) - (a.frequency || 0) ||
        (diff[b.difficulty] || 0) - (diff[a.difficulty] || 0) ||
        (b.importance || 0) - (a.importance || 0),
    )
    .slice(0, 50)

const run = async (file, varName) => {
  const mod = await import(pathToFileURL(path.join('src/data/knowledge', file)).href)
  const arr = mod[varName] || mod[Object.keys(mod)[0]]
  const sel = pick(arr)
  const out = `export const ${varName} = ${JSON.stringify(sel, null, 2)}\n`
  fs.writeFileSync(path.join('src/data/knowledge', file), out, 'utf8')
  console.log(file, arr.length, '->', sel.length)
}

await run('math.js', 'mathKnowledge')
await run('cs408.js', 'cs408Knowledge')
await run('english.js', 'englishKnowledge')
await run('politics.js', 'politicsKnowledge')
