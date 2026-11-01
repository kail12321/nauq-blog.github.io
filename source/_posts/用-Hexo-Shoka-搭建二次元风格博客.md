---
title: 用 Hexo + Shoka 搭建二次元风格博客
date: 2025-01-06 10:00:00
updated: 2025-01-06 10:00:00
description: 从安装 Node.js 到换上 Shoka 主题，一步步记录这套二次元博客的搭建过程。
cover: /assets/cover-1.jpg
categories:
  - 建站笔记
tags:
  - Hexo
  - Shoka
  - 教程
---

一直想有个自己的地方放笔记，平台虽然方便，但总觉得少了点归属感。趁着周末，用 Hexo + Shoka 搭了这套二次元风格的博客。

这篇把整个过程记下来，下次换电脑的时候能照着做一遍。

<!-- more -->

## 一、准备环境

需要三样东西：**Git**、**Node.js**、一个 GitHub 账号（用来放仓库）。

### 安装 Git

Windows 上直接去官网下载安装包，一路下一步即可。装完在终端里验证：

```bash
git --version
```

### 安装 Node.js

> 注意：不要装最新的奇数版本，容易出现各种奇怪的问题，建议选 LTS 版本。

```bash
node -v
npm -v
```

### 换一个国内镜像

npm 官方源在国内经常卡住，换成 npmmirror 会快很多：

```bash
npm config set registry https://registry.npmmirror.com
npm config get registry
```

## 二、安装 Hexo

```bash
npm install hexo-cli -g
```

然后初始化一个博客目录：

```bash
hexo init blog
cd blog
```

此时目录结构大致如下：

| 目录 / 文件 | 作用 |
| --- | --- |
| `source/_posts` | 文章源文件（Markdown） |
| `themes` | 主题目录 |
| `_config.yml` | 站点配置 |
| `public` | 生成的静态文件 |
| `scaffolds` | 新建文章的模板 |

启动本地服务看看，默认在 4000 端口：

```bash
hexo s
```

浏览器打开 `http://localhost:4000`，能看到默认主题就说明成功了。

## 三、换上 Shoka

把主题放进 `themes` 目录：

```bash
git clone https://github.com/amehime/hexo-theme-shoka.git themes/shoka
```

> 如果 `git clone` 卡在 TLS 握手，可以改用 GitHub 的 tarball 下载再解压，效果一样。

Shoka 依赖几个插件，缺一个都可能白屏或样式错乱：

```bash
npm install hexo-renderer-multi-markdown-it hexo-autoprefixer hexo-symbols-count-time --save
```

改站点配置里的主题名：

```yaml
theme: shoka
```

## 四、Shoka 必改的几处配置

这是最容易踩坑的地方，Shoka 有几项和默认配置冲突，必须改。

### 1. 关闭 Hexo 自带高亮

代码高亮交给 `hexo-renderer-multi-markdown-it`，否则代码块会重复处理：

```yaml
highlight:
  enable: false
prismjs:
  enable: false
```

### 2. 固定链接改成 `:title/`

Shoka 的样式与链接结构强相关，建议：

```yaml
permalink: :title/
```

### 3. 启用 markdown-it 插件

目录和锚点的 class 名必须是 `toc` 和 `anchor`，否则右侧文章目录不会生效：

```yaml
markdown:
  render:
    html: false
    breaks: true
    linkify: true
  plugins:
    - plugin:
        name: markdown-it-toc-and-anchor
        enable: true
        options:
          tocClassName: 'toc'
          anchorClassName: 'anchor'
    - plugin:
        name: markdown-it-multimd-table
        enable: true
        options:
          multiline: true
          rowspan: true
          headerless: true
```

## 五、换成自己的背景图

Shoka 的随机背景图来自 `source/_data/images.yml`，图片本体放在 `source/_data/images/`。

这里有个隐藏规则：**列表条目要超过 6 张**才会覆盖主题自带的图库，否则你放的图不会显示。

```yaml
- anime-sky-01.jpg
- anime-sky-02.jpg
- anime-sky-03.jpg
- anime-sky-04.jpg
- anime-sky-01.jpg
- anime-sky-02.jpg
- anime-sky-03.jpg
```

头像是 `sidebar.avatar`，默认取主题目录下的 `avatar.jpg`。

## 六、写第一篇文章

```bash
hexo new "我的第一篇博客"
```

front-matter 里用 `cover` 指定封面：

```yaml
---
title: 我的第一篇博客
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

常用命令就这几条：

```bash
hexo cl      # 清除缓存和 public
hexo g       # 生成静态文件
hexo s       # 本地预览
hexo d       # 部署
```

## 七、踩过的坑

1. `hexo s` 打不开，多半是端口被占用，加 `-p 5000` 换个端口试试。
2. 主题样式不生效，先 `hexo cl` 再 `hexo s`，缓存有时候很顽固。
3. 背景图配了没反应，检查 `images.yml` 的条目是不是不足 7 条。
4. Shoka 用 Nunjucks 模板，遇到 `.njk` 报错说明主题没装完整。

## 小结

搭博客本身并不难，难的是坚持写下去。工具搭好了，剩下的就交给时间。

下一步把 GitHub Pages 的自动部署接上，写完 push 一下就上线。
