import { existsSync, readFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import assert from 'node:assert/strict'

execFileSync(process.execPath, ['scripts/generate-index.mjs'], { stdio: 'inherit' })
const config = readFileSync('source/.vitepress/config.mts', 'utf8')
const sidebar = readFileSync('source/.vitepress/generated-sidebar.ts', 'utf8')
assert.match(config, /base:\s*'\/blog_pages\/'/)
assert.match(config, /logo:\s*'\/logo\.svg'/)
for (const folder of ['tech', 'projects', 'thoughts']) assert.ok(existsSync(`source/posts/${folder}/index.md`))
assert.match(sidebar, /技术日志/)
assert.match(sidebar, /造物手记/)
assert.match(sidebar, /思考碎念/)
console.log('Category generation and deployment paths are correct.')