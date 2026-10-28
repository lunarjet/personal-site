/* ============================================================
   AI 开发实战作品集 — 交互逻辑
   粒子背景 / 打字机 / 导航栏 / 滚动渐入 / 项目 Modal
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initTypewriter();
  initNavbar();
  initScrollFade();
  initModal();
  initSmoothScroll();
});

/* ---------- 1. 粒子背景（Canvas） ---------- */
function initParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let particles = [];
  let mouse = { x: -1000, y: -1000 };
  let width, height;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createParticles();
  }

  function createParticles() {
    const count = Math.min(80, Math.floor((width * height) / 18000));
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5 + 0.5
      });
    }
  }

  function update() {
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // 画粒子
    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 240, 255, 0.6)';
      ctx.fill();
    }

    // 粒子间连线
    const maxDist = 120;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          const opacity = (1 - dist / maxDist) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      // 鼠标连线
      const dx = particles[i].x - mouse.x;
      const dy = particles[i].y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150) {
        const opacity = (1 - dist / 150) * 0.5;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(255, 60, 172, ${opacity})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }
  }

  function animate() {
    update();
    draw();
    requestAnimationFrame(animate);
  }

  resize();
  animate();

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener('mouseout', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });
}

/* ---------- 2. 打字机效果 ---------- */
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const phrases = [
    'AI 辅助开发实践者',
    '大模型预训练玩家',
    '全栈工程师 · 终身学习者',
    '用 AI 让代码飞起来 🚀'
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let deleting = false;

  function tick() {
    const current = phrases[phraseIdx];

    if (deleting) {
      el.textContent = current.substring(0, charIdx--);
    } else {
      el.textContent = current.substring(0, charIdx++);
    }

    let delay = deleting ? 50 : 100;

    if (!deleting && charIdx === current.length) {
      delay = 2000; // 打完停顿
      deleting = true;
    } else if (deleting && charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      delay = 500; // 换句停顿
    }

    setTimeout(tick, delay);
  }

  tick();
}

/* ---------- 3. 导航栏滚动效果 ---------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ---------- 4. 滚动渐入 ---------- */
function initScrollFade() {
  const els = document.querySelectorAll('.fade-in');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  els.forEach(el => observer.observe(el));
}

/* ---------- 5. 项目详情 Modal ---------- */
const PROJECT_DATA = {
  llm: {
    icon: '🧠',
    title: 'GPT 风格自回归大模型',
    tags: ['PyTorch', 'Transformer', '预训练'],
    desc: '从零实现的 GPT 风格自回归语言模型，覆盖 Transformer 解码器、Warmup + 余弦退火学习率调度、bf16 混合精度训练、梯度裁剪、输入标签偏移、检查点管理、TensorBoard 日志等核心技术点。',
    highlights: [
      '6 层 Transformer Decoder，512 维 embedding，8 头注意力',
      'n_layer=6 / n_embd=512 / n_head=8 / vocab_size=1000',
      '单文件 pretrain.py 实现，零外部依赖，魔搭社区直接运行',
      '内置推理续写 + 乱码修复逻辑',
      '支持 .pth → Hugging Face 格式转换'
    ]
  },
  library: {
    icon: '📚',
    title: '图书管理系统（Vue + Spring Boot）',
    tags: ['Vue 3', 'Spring Boot', 'MyBatis-Plus'],
    desc: '前后端分离的图书管理系统。前端使用 Vue 3 单页应用，后端基于 Spring Boot + MyBatis-Plus，完整 CRUD + 分页查询 + 接口测试。',
    highlights: [
      'Vue 3 + Element Plus 前端，响应式布局',
      'Spring Boot 后端，MyBatis-Plus 持久层',
      'Apipost 接口测试 + Swagger 文档',
      'JDK 17 + MySQL，标准三层架构',
      'properties 配置文件（非 yml）'
    ]
  },
  plugin: {
    icon: '🎯',
    title: '图猎 EcomHunter 电商图片下载插件',
    tags: ['Chrome MV3', 'JavaScript', '官网已部署'],
    desc: 'Chrome 扩展，自动识别淘宝、京东、拼多多、亚马逊商品详情页所有展示图片，支持批量打包 ZIP 下载，替换缩略图为原始分辨率高清大图。',
    highlights: [
      'Manifest V3 架构，安全合规',
      'Content Script 自动识别图片资源',
      'ZIP 打包一键下载，按商品 ID 命名',
      'Popup 界面显示识别统计 + 勾选下载',
      '官网已部署：lunarjet.github.io/ecommerce-image-downloader'
    ]
  },
  nocode: {
    icon: '⚡',
    title: '零代码平台双应用',
    tags: ['百度秒搭', 'bolt.new', '双平台'],
    desc: '国内百度秒搭平台生成「每日随机名言」应用 + 国外 bolt.new 平台生成「中国非遗知识答题」小游戏，完整对比国内外零代码 AI 工具链的差异。',
    highlights: [
      '国内平台：秒搭 miaoda.online',
      '国外平台：bolt.new（Vercel 部署）',
      '双应用均已部署并获取访问域名',
      'AI 编辑器工作流完整演练',
      '从需求到上线 < 30 分钟'
    ]
  }
};

function initModal() {
  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');
  if (!modal || !modalBody) return;

  const cards = document.querySelectorAll('.project-card');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const key = card.dataset.project;
      const data = PROJECT_DATA[key];
      if (!data) return;

      modalBody.innerHTML = `
        <div style="font-size:48px;margin-bottom:12px;">${data.icon}</div>
        <h2 style="font-size:22px;font-weight:700;margin-bottom:12px;color:var(--text-primary);">${data.title}</h2>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px;">
          ${data.tags.map(t => `<span style="font-family:var(--font-mono);font-size:11px;padding:4px 10px;background:rgba(0,240,255,0.1);border:1px solid rgba(0,240,255,0.25);border-radius:4px;color:var(--accent-cyan);">${t}</span>`).join('')}
        </div>
        <p style="font-size:14px;color:var(--text-secondary);line-height:1.8;margin-bottom:20px;">${data.desc}</p>
        <h3 style="font-size:14px;font-weight:600;color:var(--accent-pink);margin-bottom:10px;font-family:var(--font-mono);">// 核心亮点</h3>
        <ul style="list-style:none;padding:0;">
          ${data.highlights.map(h => `
            <li style="font-size:14px;color:var(--text-secondary);padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.05);display:flex;gap:8px;">
              <span style="color:var(--accent-cyan);">▸</span><span>${h}</span>
            </li>
          `).join('')}
        </ul>
      `;

      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  // 关闭事件
  modal.querySelectorAll('[data-close]').forEach(el => {
    el.addEventListener('click', closeModal);
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

/* ---------- 6. 平滑滚动（补强） ---------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}
