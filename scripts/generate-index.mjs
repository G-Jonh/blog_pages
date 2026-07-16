import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, relative, basename } from 'node:path'

const source = join(process.cwd(), 'source')
const postsRoot = join(source, 'posts')
const categories = [
  { id: 'tech', title: '技术日志', description: '技术探索与编程笔记，归纳学习路线' },
  { id: 'projects', title: '造物手记', description: '个人项目的构建过程' },
  { id: 'thoughts', title: '思考碎念', description: '对生活与成长的思考与记录' }
]

function files(dir) {
  if (!existsSync(dir)) return []
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const path = join(dir, entry.name)
    return entry.isDirectory() ? files(path) : entry.name.endsWith('.md') && entry.name !== 'index.md' ? [path] : []
  })
}

function title(path) {
  const content = readFileSync(path, 'utf8')
  return content.match(/^title:\s*(.+)$/m)?.[1].trim() || content.match(/^#\s+(.+)$/m)?.[1].trim() || basename(path, '.md').replace(/[-_]/g, ' ')
}

function markdownLink(post) {
  return `- [${post.title.replace(/[\[\]]/g, '\\$&')}](${post.url})`
}

const grouped = categories.map(category => {
  const folder = join(postsRoot, category.id)
  mkdirSync(folder, { recursive: true })
  const articles = files(folder).map(path => ({
    title: title(path),
    url: `/posts/${category.id}/${relative(folder, path).replace(/\\/g, '/').replace(/\.md$/, '')}`
  })).sort((a, b) => a.title.localeCompare(b.title, 'zh-CN'))
  return { ...category, articles }
})

for (const category of grouped) {
  const content = [`# ${category.title}`, '', category.description, '', '## 文章', '', category.articles.length ? category.articles.map(markdownLink).join('\n') : '暂无文章。'].join('\n') + '\n'
  writeFileSync(join(postsRoot, category.id, 'index.md'), content)
}

const cards = grouped.map(category => `  <a class="blog-card" href="./posts/${category.id}/">\n    <h3>${category.title}</h3>\n    <p>${category.description}</p>\n  </a>`).join('\n')
const categoryLinks = grouped.map(category => `- [${category.title}（${category.articles.length} 篇）](/posts/${category.id}/)`).join('\n')

writeFileSync(join(source, 'index.md'), `# 冬雪\n\n## 无限进步！\n\n<div class="blog-cards">\n${cards}\n</div>\n`)
writeFileSync(join(postsRoot, 'index.md'), `# 文章\n\n${categoryLinks}\n`)
writeFileSync(join(source, 'categories', 'index.md'), `# 分类\n\n${categoryLinks}\n`)
