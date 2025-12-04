import fs from 'node:fs'
import path from 'node:path'

const dist = path.resolve('dist')
const indexHtml = path.join(dist, 'index.html')

const ensure = (cond, msg) => {
  if (!cond) {
    console.error(`✗ ${msg}`)
    process.exit(1)
  } else {
    console.log(`✔ ${msg}`)
  }
}

ensure(fs.existsSync(dist), 'dist 目录已生成（先运行 npm run build）')
ensure(fs.existsSync(indexHtml), 'index.html 已生成')

const assetsDir = path.join(dist, 'assets')
ensure(fs.existsSync(assetsDir), 'assets 目录存在')

const files = fs.readdirSync(assetsDir)
const jsBundles = files.filter((f) => f.endsWith('.js'))
const cssBundles = files.filter((f) => f.endsWith('.css'))

ensure(jsBundles.length > 0, '存在 JS 产物')
ensure(cssBundles.length > 0, '存在 CSS 产物')

// 读取 HTML 检查根容器
const html = fs.readFileSync(indexHtml, 'utf8')
ensure(html.includes('id=\"root\"'), 'HTML 中包含 #root 容器')

console.log('Smoke test passed.')
