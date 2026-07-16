import { defineConfig } from 'vitepress'
import sidebar from './generated-sidebar.ts'

export default defineConfig({
  title: '冬雪的博客',
  description: '无限进步 - 记录自己的成长',
  base: '/blog_pages/',
  cleanUrls: false,
  outDir: '../docs',
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/posts/' },
      { text: '分类', link: '/categories/' },
      { text: '关于', link: '/about/' }
    ],
    sidebar,
    socialLinks: [{ icon: 'github', link: 'https://github.com/G-Jonh' }],
    footer: { copyright: '© 2026 冬雪的博客' }
  }
})