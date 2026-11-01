# 星河梦瑾的博客

基于 **Hexo 8 + Shoka** 搭建的二次元风格静态博客，可直接部署到 GitHub Pages。

## 快速开始

```bash
cd D:\系统管理区域\blog

hexo s              # 本地预览，打开 http://localhost:4000
hexo s -p 5000      # 端口被占用时换一个
```

常用命令：

| 命令 | 说明 |
| --- | --- |
| `hexo cl` | 清除缓存与 `public` 目录 |
| `hexo g` | 生成静态文件到 `public` |
| `hexo s` | 启动本地预览服务 |
| `hexo new "标题"` | 新建一篇文章 |
| `hexo new page 名称` | 新建一个独立页面 |
| `hexo d` | 部署（需配置 `deploy`） |

> 注意：Shoka 对配置要求比较严格，改完配置请 **先 `hexo cl` 再 `hexo g`**，否则容易看到旧缓存。

## 目录结构

```text
blog/
├─ source/
│  ├─ _posts/              文章（Markdown）
│  ├─ _data/
│  │  ├─ images.yml        随机背景图清单（必须 > 6 条且写完整 URL）
│  │  ├─ images/           背景图本体
│  │  └─ custom.styl       自定义样式
│  ├─ assets/              文章封面、头像
│  ├─ friends/             友链页 + _data.yml
│  ├─ about/               关于页
│  ├─ tags/ categories/    标签页、分类页
│  └─ music/ movies/       音乐、电影页
├─ themes/shoka/           Shoka 主题
├─ scripts/shoka-asset-fix.js   资源路径修正（重要）
├─ .github/workflows/deploy.yml GitHub Pages 自动部署
├─ _config.yml             站点配置
├─ _config.shoka.yml       主题配置
└─ public/                 生成的静态站点
```

## 已做的主要配置

- **主题**：Shoka 0.2.5（二次元风），配置放在 `_config.shoka.yml`
- **渲染器**：`hexo-renderer-multi-markdown-it`，已关闭 Hexo 自带的 `highlight` 与 `prismjs`
- **固定链接**：`:title/`
- **菜单**：首页 / 关于 / 文章（归档、分类、标签二级）/ 友链
- **随机背景**：4 张自绘二次元壁纸，每次刷新随机切换
- **头像**：`/images/avatar.jpg`
- **字数统计**：`hexo-symbols-count-time`
- **订阅**：`hexo-generator-feed` 生成 `/atom.xml`
- **特效**：点击烟花、加载猫、深色模式按钮

## 新增文章

```bash
hexo new "文章标题"
```

front-matter 示例：

```yaml
---
title: 文章标题
date: 2025-01-12 22:40:00
description: 首页显示的一句话摘要
cover: /assets/cover-1.jpg
categories:
  - 随笔
tags:
  - 生活
---
```

正文里用 `<!-- more -->` 控制首页摘要的截断位置。

## Shoka 的几个坑（都已处理）

| 问题 | 说明 |
| --- | --- |
| 标签语法 | Shoka 只认 `links` / `linksfile` / `media` 三个标签，Butterfly 的 `{% note %}`、`{% btn %}` 会直接报错 |
| 背景图不生效 | `images.yml` 条目必须 **超过 6 条**，且值必须是 **http 开头的完整 URL** |
| 资源路径 | 主题用 `statics + path` 拼路径，填 `/` 会得到 `//css/app.css`。已用 `scripts/shoka-asset-fix.js` 覆盖 `_css` `_js` `_image_url` `_cover` |
| 目录不显示 | `markdown.plugins` 里必须把 `tocClassName` 设为 `toc`、`anchorClassName` 设为 `anchor` |
| 代码高亮 | 必须关掉 Hexo 自带的 `highlight` / `prismjs`，否则与主题冲突 |

## 部署到 GitHub Pages

仓库里已经带了 `.github/workflows/deploy.yml`，用 GitHub Actions 构建并发布：

1. 新建仓库，把本项目推上去（`node_modules`、`public` 已被忽略）：

   ```bash
   git add .
   git commit -m "init: Hexo + Shoka 二次元博客"
   git remote add origin https://github.com/<你的用户名>/<仓库名>.git
   git push -u origin main
   ```

2. 打开仓库 **Settings → Pages**，把 **Source** 选成 **GitHub Actions**。

3. 等 Actions 跑完，访问 `https://<用户名>.github.io/<仓库名>/`。

4. **部署前必须改这三处**，否则背景图和站内链接会指向 localhost：

   ```yaml
   # _config.yml
   url: https://<用户名>.github.io/<仓库名>
   root: /<仓库名>/
   ```

   ```yaml
   # source/_data/images.yml —— 把 localhost:4000 换成上面的地址
   - https://<用户名>.github.io/<仓库名>/images/anime-sky-01.jpg
   ```

   如果仓库名就是 `<用户名>.github.io`，则 `root` 保持 `/`，地址不带子路径。

### 或者用 hexo d 推 gh-pages 分支

```yaml
deploy:
  type: git
  repo: https://github.com/<用户名>/<仓库名>.git
  branch: gh-pages
```

然后在 Pages 里把 Source 选成 `gh-pages` 分支。

## 待办

- [ ] 填入 Valine 的 `appId` / `appKey` 开启评论
- [ ] 把 `social` 里的 GitHub、邮箱换成自己的真实地址
- [ ] 把 `_config.yml` 的 `url` / `root` 与 `images.yml` 改成正式域名
