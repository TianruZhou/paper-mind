# Paper Mind Map 🗺️

交互式论文思维导图，基于 React + ReactFlow，支持拖拽/缩放、搜索筛选、侧边详情面板。

## 快速开始

```bash
npm install
npm run dev
```

## 🚀 部署到 GitHub + Vercel（永久免费在线）

### 第一步：上传到 GitHub

1. 在 GitHub 创建一个新仓库（比如 `paper-mindmap`）
2. 在本地项目目录执行：

```bash
git init
git add .
git commit -m "init"
git remote add origin https://github.com/你的用户名/paper-mindmap.git
git push -u origin main
```

### 第二步：Vercel 一键部署

1. 打开 [vercel.com](https://vercel.com) → 用 GitHub 账号登录
2. 点击 **New Project** → 选择你刚上传的仓库
3. Framework 选 **Vite**，其他默认 → 点击 **Deploy**
4. 约 30 秒后你就有了一个永久在线的网址，比如 `https://paper-mindmap-xxx.vercel.app`

### 之后更新

每次你本地改了文件，push 到 GitHub 后 Vercel 自动重新部署：

```bash
git add .
git commit -m "add new paper: xxx"
git push
```

---

## ➕ 如何添加新论文

只需要编辑 `src/data/papers.json` 这一个文件。

### 在现有分支下加一篇论文

找到对应的 `branch`（或 `subBranch`），在其 `papers` 数组里加一个对象：

```json
{
  "id": "唯一id，小写字母加连字符",
  "name": "论文简称",
  "conf": "会议名 年份",
  "title": "论文全名",
  "link": "https://arxiv.org/abs/xxxx",
  "contributions": [
    "贡献点1",
    "贡献点2"
  ],
  "diff": "区别于前人工作的描述",
  "tags": ["tag1", "tag2"]
}
```

### 添加一个全新的顶层分支

在 `branches` 数组末尾添加：

```json
{
  "id": "新分支唯一id",
  "label": "分支显示名称",
  "color": "#颜色16进制",
  "description": "分支描述",
  "papers": []
}
```

### 添加一个有子分支的分支

```json
{
  "id": "新分支id",
  "label": "分支名",
  "color": "#颜色",
  "description": "描述",
  "subBranches": [
    {
      "id": "子分支id",
      "label": "子分支名",
      "color": "#颜色",
      "papers": []
    }
  ]
}
```

---

## 技术栈

- [React 18](https://react.dev)
- [ReactFlow](https://reactflow.dev) — 交互式节点图
- [Dagre](https://github.com/dagrejs/dagre) — 自动层次布局
- [Vite](https://vitejs.dev) — 构建工具
