# AGENTS.md — AI 开发规范

> 本文件为 AI 编程助手提供项目上下文和开发约束，确保生成代码符合项目规范。

---

## 一、项目基础信息

| 项 | 值 |
|----|----|
| 项目名称 | AI 开发实战作品集 |
| 项目类型 | 纯静态单页网站 |
| 技术栈 | HTML5 + CSS3 + 原生 JavaScript（ES6+） |
| 构建工具 | 无（零依赖，直接部署） |
| 部署目标 | Cloudflare Pages / GitHub Pages |
| 目标用户 | 招聘方、同行开发者、自己回顾 |

---

## 二、目录约定

```
personal-site/
├── PRD.md                  ← 产品需求（只读，开发前必读）
├── TECH.md                 ← 技术设计（只读，开发前必读）
├── AGENTS.md               ← 本文件
├── index.html              ← 唯一 HTML 文件（单页应用）
├── css/style.css           ← 全部样式（唯一 CSS 文件）
├── js/main.js              ← 全部逻辑（唯一 JS 文件）
└── assets/                 ← 图片、SVG 等静态资源（可选）
```

**约束：只有一个 HTML 文件、一个 CSS 文件、一个 JS 文件。不拆分。**

---

## 三、代码风格

### 3.1 HTML
- 使用语义化标签：`<nav>` `<section>` `<article>` `<footer>`
- 所有可交互元素有 `aria-label`
- 图片必须有 `alt` 属性
- 缩进：2 空格
- 属性顺序：`class` → `id` → `data-*` → `src/href` → `alt/aria-*`

### 3.2 CSS
- 使用 CSS 变量（见 TECH.md 主题变量表），不要硬编码颜色值
- 优先使用 Grid 和 Flexbox 布局
- 响应式 Mobile First：先写手机样式，再用 `@media (min-width: ...)` 扩展
- 动画优先 CSS transition/keyframes，复杂效果用 Canvas
- 避免 `!important`，通过提高选择器优先级解决冲突
- 类名使用 kebab-case：`.project-card` `.fade-in`

### 3.3 JavaScript
- 严格 ES6+：`const`/`let`、箭头函数、模板字符串
- 单文件内用 IIFE 或 DOMContentLoaded 隔离作用域，避免全局污染
- 不引入任何第三方库（无 jQuery、无 lodash、无框架）
- API 使用：原生 DOM API、IntersectionObserver、Canvas 2D、requestAnimationFrame
- 注释：每个模块前写一段功能说明
- 命名：函数 camelCase，常量 UPPER_SNAKE_CASE

---

## 四、硬性约束（不可违反）

1. **禁止引入 npm 依赖**：项目保持零依赖
2. **禁止使用外部 CDN**：字体、图标、库全部使用本地或系统内置
3. **禁止使用 TypeScript**：纯 JavaScript
4. **单文件约束**：index.html / style.css / main.js 各只有一个
5. **性能红线**：首屏资源总量 < 500KB，Lighthouse Performance > 90
6. **个性化要求**：视觉风格必须与通用模板（如 Bootstrap demo、Tailwind 官方示例）有明显差异

---

## 五、开发流程约定

### 5.1 开发前
- **必须先读 PRD.md 和 TECH.md**，理解需求和设计方案
- 如有疑问，先提问再动手

### 5.2 开发中
- 每次完成一个区块（如 Hero 区、技术栈区），立即在本地浏览器打开验证
- 修改前如果代码已跑通，先让 AI 输出 diff 预览，确认后再执行
- 遇到样式问题，优先检查 CSS 变量和选择器优先级

### 5.3 开发后
- 在 Chrome DevTools 的 3 个断点（375px / 768px / 1440px）验证响应式
- Console 面板确认零红色报错
- 用 Lighthouse 跑一次，Performance 和 Accessibility 都要 > 90
- 完成后生成 Git 提交，commit message 格式：`feat: <简述>`

### 5.4 部署
- 推送到 GitHub 后，在 Cloudflare Pages 导入仓库
- Build command：留空
- Output directory：`/`
- 部署完成后验证 HTTPS 访问

---

## 六、个人偏好

| 偏好 | 说明 |
|------|------|
| 开发工具 | VS Code / IntelliJ IDEA |
| 运行环境 | 本地直接打开 index.html 预览，不用本地服务器 |
| 测试工具 | Chrome DevTools + Lighthouse |
| 提交习惯 | 每完成一个功能区块提交一次，commit message 写清楚改动 |
| 回滚策略 | Git reset 到上一个稳定版本，新开对话重新生成 |

---

## 七、AI 协作提示

- 如果需要新增动画效果，先描述效果再让 AI 写代码
- 如果页面出现意外样式，截图 + Console 报错一起发给 AI
- 让 AI 优化性能时，先说「目标是 Lighthouse > 90」
- 不要一次性让 AI 生成完整文件，按区块逐块实现、逐块验证
