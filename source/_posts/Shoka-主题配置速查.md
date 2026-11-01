---
title: Shoka 主题配置速查
date: 2025-01-08 20:30:00
description: 菜单、社交图标、背景图、头像、字数统计……把 Shoka 的常用配置整理成一份清单。
cover: /assets/cover-2.jpg
categories:
  - 建站笔记
tags:
  - Shoka
  - 配置
---

Shoka 的配置项不算多，但有几处和别的主题不一样，第一次容易懵。这里把常用的几块整理一下，方便以后回查。

<!-- more -->

## 菜单

`menu` 支持二级菜单，格式是 `名称: 路径 || 图标名`。图标名不是 Font Awesome，而是主题内置的 iconfont：

```yaml
menu:
  home: / || home
  about: /about/ || user
  posts:
    default: / || feather
    archives: /archives/ || list-alt
    categories: /categories/ || th
    tags: /tags/ || tags
  friends: /friends/ || heart
```

## 社交图标

格式：`键名: 链接 || 图标 || 颜色`。键名会作为悬停提示显示：

```yaml
social:
  github: https://github.com/ || github || "#191717"
  email: mailto:hello@example.com || envelope || "#55acd5"
  music: https://music.163.com/ || cloud-music || "#e60026"
```

## 背景图

这是 Shoka 最有特色的一块：每次刷新随机换一张背景。

图片放在 `source/_data/images/`，文件名列在 `source/_data/images.yml`：

```yaml
- anime-sky-01.jpg
- anime-sky-02.jpg
- anime-sky-03.jpg
- anime-sky-04.jpg
```

> 注意一个隐藏规则：这个列表**必须超过 6 条**才会生效，少于等于 6 条时会回退到主题自带的图库。重复列几次也算数。

## 头像

```yaml
sidebar:
  position: left
  avatar: avatar.jpg
```

头像文件放主题的 `source/images/` 下，或者直接换掉 `avatar.jpg`。

## 加载动画与特效

```yaml
loader:
  start: true     # 进站时的加载猫
  switch: true    # 切页时的加载动画

fireworks:
  enable: true    # 点击放烟花
```

## 代码块与高亮

Shoka 自己接管了代码高亮，所以站点配置里必须关掉 Hexo 的：

```yaml
highlight:
  enable: false
prismjs:
  enable: false
```

代码块主题（深色/浅色）由 `source/_data/colors.styl` 控制，想深度定制就改这个文件。

## 字数统计

依赖 `hexo-symbols-count-time`，装上后打开开关：

```yaml
footer:
  count: true
post:
  count: true
```

站点配置里还要加：

```yaml
symbols_count_time:
  symbols: true
  time: true
  total_symbols: true
  total_time: true
```

## 自定义样式

想改配色或微调排版，不用改主题源码，在 `source/_data/custom.styl` 里写就行：

```stylus
:root {
  --color-pink: #f28ab2;
}

#site-title {
  text-shadow: 0 2px 8px rgba(0, 0, 0, .35);
}
```

## 常用开关一览

| 配置项 | 说明 |
| --- | --- |
| `darkmode` | 默认深色模式 |
| `auto_scroll` | 自动回到上次阅读位置 |
| `pangu` | 中英文之间自动加空格 |
| `quicklink` | 预加载链接，切页更快 |
| `valine` | 评论系统，需填 appId 和 appKey |
| `reward` | 打赏按钮 |

## 小提醒

YAML 对格式很敏感，**每个冒号后面都要有空格**。改完发现页面没变化，先怀疑是不是缩进错了，再 `hexo cl` 清一次缓存。
