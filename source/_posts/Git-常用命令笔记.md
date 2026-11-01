---
title: Git 常用命令笔记
date: 2025-01-10 09:15:00
description: 把平时用得最多的 Git 命令按场景整理一遍，当成随手翻的手册。
cover: /assets/cover-3.jpg
categories:
  - 工具手册
tags:
  - Git
  - 版本控制
---

Git 的命令多，但日常真正常用的就那么十几个。这篇按场景归类，忘了就回来翻一翻。

<!-- more -->

## 初始化与克隆

```bash
git init                      # 在当前目录初始化仓库
git clone <url>               # 克隆远程仓库
git clone -b dev <url>        # 只拉某个分支
```

## 查看状态

```bash
git status                    # 工作区状态
git log --oneline --graph     # 简洁的提交历史图
git diff                      # 未暂存的改动
git diff --staged             # 已暂存的改动
```

## 提交

```bash
git add .                     # 暂存所有改动
git add src/main.js           # 只暂存某个文件
git commit -m "feat: 新增登录页" # 提交
git commit --amend            # 修改最近一次提交
```

> 提交信息建议遵循 `type: 描述` 的格式，`feat` / `fix` / `docs` / `refactor` / `chore` 这几个前缀足够用了。

## 分支

```bash
git branch                    # 查看本地分支
git branch -a                 # 包含远程分支
git switch -c feature/login   # 新建并切换分支
git switch main               # 切换分支
git merge feature/login       # 合并分支
git branch -d feature/login   # 删除已合并的分支
```

## 撤销

这是最容易搞混的部分，按「改动在哪儿」来选命令：

| 场景 | 命令 |
| --- | --- |
| 丢弃工作区某个文件的改动 | `git restore <file>` |
| 取消暂存，保留改动 | `git restore --staged <file>` |
| 撤销最近一次提交，保留改动 | `git reset --soft HEAD~1` |
| 撤销最近一次提交，丢弃改动 | `git reset --hard HEAD~1` |
| 反做某次提交（生成新提交） | `git revert <commit>` |

> **小心 `--hard`**：`git reset --hard` 会直接丢掉未提交的改动，执行前确认一下 `git status`。

## 远程

```bash
git remote -v                 # 查看远程地址
git remote add origin <url>   # 添加远程
git fetch origin              # 拉取但不合并
git pull --rebase             # 拉取并变基
git push -u origin main       # 首次推送并建立追踪
```

## 储藏

临时要切分支，但手头的活还没写完：

```bash
git stash          # 存起来
git stash list     # 看看存了哪些
git stash pop      # 取出来并删除记录
```

## 一个常见流程

```bash
git switch -c feature/xxx
# ... 写代码 ...
git add .
git commit -m "feat: xxx"
git switch main
git pull --rebase
git merge feature/xxx
git push
```

命令记不住没关系，`git help <command>` 一直都在。
