# 技术设计文档：AI 开发实战作品集网站

## 一、技术栈选型

| 层级 | 技术 | 选型理由 |
|------|------|----------|
| 结构 | HTML5 语义化标签 | 无需框架，SEO 友好，加载最快 |
| 样式 | 原生 CSS3（变量 + Grid + Flexbox） | 无构建依赖，CSS 变量支持主题切换，Grid 适合卡片布局 |
| 交互 | 原生 JavaScript（ES6+） | 无 jQuery，API 原生支持足够，体积小 |
| 动画 | CSS @keyframes + Canvas API | CSS 处理过渡动画，Canvas 处理粒子背景 |
| 部署 | 静态托管（Cloudflare Pages / GitHub Pages） | 零配置，自动 HTTPS，全球 CDN |
| 图标 | 内联 SVG | 无图标库依赖，可变色，体积小 |

**不选框架的原因**：单页静态内容 < 10 屏，引入 Vue/React 会增加 30-50KB 框架体积和构建复杂度，收益不明显。

---

## 二、项目结构

```
personal-site/
├── PRD.md                    ← 产品需求文档
├── TECH.md                   ← 技术设计文档（本文件）
├── AGENTS.md                 ← AI 开发规范
├── index.html                ← 主页面（单页应用）
├── css/
│   └── style.css             ← 全部样式（含响应式、动画）
├── js/
│   └── main.js               ← 全部交互逻辑
└── assets/                   ← （如需要图片则放这里，无外部依赖）
```

---

## 三、HTML 结构设计

```html
<body>
  <!-- 粒子背景 Canvas -->
  <canvas id="particles"></canvas>
  
  <!-- 导航栏 -->
  <nav class="navbar">...</nav>
  
  <!-- Hero 区 -->
  <section id="hero" class="hero">
    <h1 class="glitch-text">Lunarjet</h1>
    <p class="typewriter" data-phrases="[...]"></p>
    <a href="#projects" class="cta-btn">查看项目 →</a>
  </section>
  
  <!-- 技术栈 -->
  <section id="skills" class="skills">...</section>
  
  <!-- 项目展示 -->
  <section id="projects" class="projects">...</section>
  
  <!-- 开发日志 -->
  <section id="timeline" class="timeline">...</section>
  
  <!-- 关于我 -->
  <section id="about" class="about">...</section>
  
  <!-- 页脚 -->
  <footer class="footer">...</footer>
  
  <!-- 项目详情 Modal -->
  <div class="modal" id="project-modal">...</div>
  
  <!-- 脚本 -->
  <script src="js/main.js"></script>
</body>
```

---

## 四、CSS 架构

### 4.1 CSS 变量（主题系统）
```css
:root {
  --bg-primary: #0a0a1a;
  --bg-card: #12122a;
  --bg-nav: rgba(10, 10, 26, 0.85);
  --text-primary: #e0e0ff;
  --text-secondary: #8888cc;
  --accent-cyan: #00f0ff;
  --accent-pink: #ff3cac;
  --gradient-main: linear-gradient(135deg, #00f0ff 0%, #ff3cac 100%);
  --glow-cyan: 0 0 20px rgba(0, 240, 255, 0.4);
  --glow-pink: 0 0 20px rgba(255, 60, 172, 0.4);
  --radius: 12px;
  --font-title: 'Space Grotesk', 'Segoe UI', sans-serif;
  --font-body: 'Inter', 'Segoe UI', sans-serif;
  --font-mono: 'JetBrains Mono', 'Consolas', monospace;
}
```

### 4.2 布局策略
- 全局：`max-width: 1200px` 居中，`margin: 0 auto`
- 区块间距：`padding: 100px 24px`
- 技术栈：CSS Grid `repeat(4, 1fr)` → 平板 `repeat(2, 1fr)` → 手机 `1fr`
- 项目卡片：CSS Grid `repeat(2, 1fr)` → 手机 `1fr`
- 响应式断点：`1024px`（平板）、`640px`（手机）

### 4.3 关键动画
```css
/* 霓虹发光 */
.neon-border { box-shadow: var(--glow-cyan); border: 1px solid var(--accent-cyan); }

/* 渐变文字 */
.gradient-text { background: var(--gradient-main); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

/* 卡片悬浮 3D */
.project-card { transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1); }
.project-card:hover { transform: translateY(-8px) rotateX(4deg); }

/* 滚动渐入 */
.fade-in { opacity: 0; transform: translateY(30px); transition: opacity 0.8s, transform 0.8s; }
.fade-in.visible { opacity: 1; transform: translateY(0); }
```

---

## 五、JavaScript 模块设计

### 5.1 模块划分（单文件内按 IIFE 隔离）

```javascript
// main.js 结构
document.addEventListener('DOMContentLoaded', () => {
  initParticles();      // 粒子背景
  initTypewriter();     // 打字机效果
  initNavbar();         // 导航栏滚动效果
  initScrollFade();     // 滚动渐入
  initModal();          // 项目详情弹窗
  initSmoothScroll();   // 平滑滚动
});
```

### 5.2 核心算法

**粒子系统**（Canvas）：
```
粒子对象：{ x, y, vx, vy, radius }
每帧：位置 += 速度，边界反弹
鼠标交互：粒子与鼠标距离 < 120px 时连线
连线条件：两粒子距离 < 150px 时画 line
```

**打字机效果**：
```
遍历 phrases 数组 → 逐字追加 → 停顿 → 逐字删除 → 下一条
使用 setInterval + cursor 字符动画
```

**滚动渐入**：
```
使用 IntersectionObserver
目标元素进入视口 20% 时添加 .visible 类
```

---

## 六、部署方案

### 6.1 Cloudflare Pages（推荐）
1. git init + 提交代码到 GitHub
2. Cloudflare Dashboard → Pages → Create → Connect to Git
3. 选择仓库，Build command 留空，Output directory 填 `/`
4. 自动部署，获取 `*.pages.dev` 域名

### 6.2 GitHub Pages（备选）
1. 推送到 `gh-pages` 分支或 `main` 分支根目录
2. Settings → Pages → Source: main / root
3. 域名：`https://<user>.github.io/<repo>/`

### 6.3 Vercel（备选）
1. `npm i -g vercel` → `vercel --prod`
2. 或 Dashboard 导入 Git 仓库，自动识别为静态站

---

## 七、性能优化清单

| 项 | 措施 |
|----|------|
| CSS | 单文件压缩，关键 CSS 内联 |
| JS | 单文件，IIFE 隔离，无外部库 |
| Canvas |粒子数 < 80，requestAnimationFrame + resize 自适应 |
| 图片 | 仅 SVG 图标，无位图；如加位图用 WebP + lazy loading |
| 字体 | 用系统字体栈，无 @font-face 外部加载 |
| 缓存 | HTML 加 `<meta http-equiv="Cache-Control">` |

---

## 八、验收标准

| 检查项 | 通过条件 |
|--------|----------|
| Lighthouse | Performance > 90, Accessibility > 90 |
| 首屏时间 | < 1.5s（本地网络） |
| 响应式 | 375px / 768px / 1440px 均无横向滚动 |
| 交互完整 | 粒子、打字机、弹窗、平滑滚动全部正常 |
| 无报错 | DevTools Console 零红色错误 |
| 部署可访问 | 托管平台域名 HTTPS 正常打开 |
