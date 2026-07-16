# 博客源码

文章源码在 `source/`，GitHub Pages 发布目录仍是当前 `docs/`。

## 写新文章

1. 在 `source/posts/` 新建一个 `.md` 文件，例如 `my-first-post.md`。
2. 在 `source/.vitepress/config.mts` 的 `sidebar` 中加入文章标题和路径 `/posts/my-first-post`。
3. 在`G:\front-end\blog_pages`终端 执行 `npm run check`和`npm run build`。
4. 再提交并推送生成的 `docs` 内容。

