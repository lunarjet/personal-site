/* ============================================================
   罗娇个人主页 — 江南水墨风动效
   🏔️ 水墨晕染 + 飘落花瓣 + 滚动渐入 + 导航高亮
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initInkBackground();
  initPetals();
  initNavHighlight();
  initScrollReveal();
  initSmoothScroll();
  initMessageForm();
  loadMessages();
  loadSiteInfo();
});

// 后端接口地址（开发时后端跑在 8081 端口）
const API_BASE = 'http://localhost:9090/api';

/* ========== 1. 水墨晕染背景 ========== */
function initInkBackground() {
  const canvas = document.getElementById('inkCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let blobs = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // 水墨晕染点
  for (let i = 0; i < 12; i++) {
    blobs.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 80 + Math.random() * 160,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      alpha: 0.03 + Math.random() * 0.06
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    blobs.forEach(b => {
      const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
      grad.addColorStop(0, `rgba(26, 36, 48, ${b.alpha})`);
      grad.addColorStop(0.5, `rgba(58, 74, 92, ${b.alpha * 0.4})`);
      grad.addColorStop(1, 'rgba(26, 36, 48, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();

      // 缓慢漂移
      b.x += b.vx;
      b.y += b.vy;
      if (b.x < -b.r) b.x = canvas.width + b.r;
      if (b.x > canvas.width + b.r) b.x = -b.r;
      if (b.y < -b.r) b.y = canvas.height + b.r;
      if (b.y > canvas.height + b.r) b.y = -b.r;
    });
    requestAnimationFrame(draw);
  }
  draw();
}

/* ========== 2. 飘落花瓣 ========== */
function initPetals() {
  const canvas = document.getElementById('petalCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let petals = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // 花瓣（淡粉色）
  function createPetal() {
    return {
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 100,
      size: 6 + Math.random() * 8,
      speed: 0.5 + Math.random() * 1.2,
      drift: (Math.random() - 0.5) * 0.8,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.04,
      alpha: 0.3 + Math.random() * 0.4
    };
  }

  for (let i = 0; i < 25; i++) {
    const p = createPetal();
    p.y = Math.random() * canvas.height;
    petals.push(p);
  }

  function drawPetal(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.globalAlpha = p.alpha;
    // 花瓣形状（椭圆 + 尖端）
    ctx.beginPath();
    ctx.ellipse(0, 0, p.size * 0.6, p.size, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#e8a5c0';
    ctx.fill();
    // 花瓣尖端
    ctx.beginPath();
    ctx.moveTo(-p.size * 0.3, -p.size * 0.8);
    ctx.quadraticCurveTo(0, -p.size * 1.4, p.size * 0.3, -p.size * 0.8);
    ctx.fill();
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    petals.forEach(p => {
      drawPetal(p);
      p.y += p.speed;
      p.x += Math.sin(p.y * 0.02) * p.drift;
      p.rotation += p.rotSpeed;
      if (p.y > canvas.height + 20) {
        Object.assign(p, createPetal());
      }
    });
    requestAnimationFrame(animate);
  }
  animate();
}

/* ========== 3. 导航高亮 ========== */
function initNavHighlight() {
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.main');

  window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) cur = s.id;
    });
    navItems.forEach(n => {
      n.classList.remove('active');
      if (n.getAttribute('href') === '#' + cur) n.classList.add('active');
    });
  }, { passive: true });
}

/* ========== 4. 滚动渐入 ========== */
function initScrollReveal() {
  const cards = document.querySelectorAll('.ink-card, .skill-card, .log-item');
  cards.forEach((c, i) => {
    c.style.opacity = '0';
    c.style.transform = 'translateY(30px)';
    c.style.transition = `opacity 0.8s ease ${i * 0.05}s, transform 0.8s ease ${i * 0.05}s`;
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(c => observer.observe(c));
}

/* ========== 5. 平滑滚动 ========== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (!t) return;
      e.preventDefault();
      const top = t.getBoundingClientRect().top + window.scrollY - 54;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ========== 6. 留言板表单提交 ========== */
function initMessageForm() {
  const form = document.getElementById('messageForm');
  if (!form) return;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.textContent;
    submitBtn.textContent = '提交中...';
    submitBtn.disabled = true;

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // 必填校验
    if (!data.name.trim() || !data.content.trim()) {
      alert('姓名和留言内容不能为空哦～');
      submitBtn.textContent = btnText;
      submitBtn.disabled = false;
      return;
    }

    try {
      const resp = await fetch(API_BASE + '/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await resp.json();
      if (result.success) {
        alert('留言已收到，多谢～');
        form.reset();
        loadMessages(); // 刷新留言列表
      } else {
        alert('提交失败：' + (result.message || '未知错误'));
      }
    } catch (err) {
      alert('无法连接后端服务，请确认后端已启动（端口 9090）');
    } finally {
      submitBtn.textContent = btnText;
      submitBtn.disabled = false;
    }
  });
}

/* ========== 7. 加载留言列表 ========== */
async function loadMessages() {
  const listEl = document.getElementById('messageList');
  if (!listEl) return;

  try {
    const resp = await fetch(API_BASE + '/messages');
    const result = await resp.json();
    if (!result.success || !result.data || result.data.length === 0) {
      listEl.innerHTML = '<h3 class="content-subtitle">// 留言墙</h3><p class="empty-tip">暂无留言，来做第一个吧～</p>';
      return;
    }
    listEl.innerHTML = '<h3 class="content-subtitle">// 留言墙</h3>' +
      result.data.map(m => `
        <div class="message-item ink-card">
          <div class="msg-header">
            <strong>${escapeHtml(m.name)}</strong>
            ${m.gender ? `<span class="msg-gender">${escapeHtml(m.gender)}</span>` : ''}
            <span class="msg-time">${formatTime(m.createTime)}</span>
          </div>
          <p class="msg-content">${escapeHtml(m.content)}</p>
        </div>
      `).join('');
  } catch (err) {
    // 后端没启动时静默跳过
  }
}

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function formatTime(t) {
  if (!t) return '';
  return t.replace('T', ' ').substring(0, 19);
}

/* ========== 8. 全站内容：从后端加载渲染 ========== */

// 各模块对应的容器选择器
const SECTION_CONTAINERS = {
  banner: '#bannerSection',
  skills: '#home',
  projects: '#projects',
  timeline: '#timeline',
  personal: '#personal',
  about: '#about',
  footer: '#footerSection'
};

// 需要用 textarea（多行）编辑的字段
const LONG_TEXT_KEYS = new Set([
  'prose_1', 'prose_2', 'prose_3', 'prose_4', 'quote',
  'skill_desc_1', 'skill_desc_2', 'skill_desc_3', 'skill_desc_4', 'skill_desc_5', 'skill_desc_6',
  'project_desc_1', 'project_desc_2', 'project_desc_3', 'project_desc_4',
  'log_desc_1', 'log_desc_2', 'log_desc_3', 'log_desc_4',
  'personal_tagline', 'personal_motto'
]);

// 内容含 HTML 标签（如 prose 段落里的 <strong>），用 innerHTML 存取
const HTML_KEYS = new Set(['prose_1', 'prose_2', 'prose_3', 'prose_4']);

// quote 字段：展示时带引号，存储时不带
const QUOTE_KEYS = new Set(['quote']);

// 当前编辑状态
let _currentSection = null;          // 正在编辑的模块 id
let _sectionElements = {};           // key -> { original, input }

/** 页面加载时：后端拉取所有 key → 渲染到 [data-editable] 元素 */
async function loadSiteInfo() {
  try {
    const resp = await fetch(API_BASE + '/site-info');
    const result = await resp.json();
    if (!result.success || !result.data) return;
    applySiteData(result.data);
  } catch (e) { /* 后端没启动则跳过 */ }
}

/** 将 data 对象应用到所有 data-editable 元素 */
function applySiteData(data) {
  document.querySelectorAll('[data-editable]').forEach(el => {
    const key = el.dataset.editable;
    if (data[key] !== undefined && data[key] !== null) {
      const v = String(data[key]);
      // 头像：若是图片路径/dataURL 则渲染为图片
      if (key === 'personal_avatar' && /^(data:image|\/|https?:)/.test(v)) {
        el.innerHTML = `<img src="${v}" alt="头像" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`;
        return;
      }
      if (QUOTE_KEYS.has(key)) {
        el.textContent = '"' + v + '"';
      } else if (v.includes('<')) {
        el.innerHTML = v;
      } else {
        el.textContent = v;
      }
    }
  });
}

/* ========== 9. 按模块独立编辑 ========== */

function getSectionContainer(sectionId) {
  const sel = SECTION_CONTAINERS[sectionId];
  return sel ? document.querySelector(sel) : null;
}

/** 取展示态元素的值（用于放入编辑框） */
function getDisplayValue(el, key) {
  if (QUOTE_KEYS.has(key)) {
    return (el.textContent || '').replace(/^"|"$/g, '');
  }
  if (HTML_KEYS.has(key)) {
    return el.innerHTML;
  }
  return el.textContent || el.innerText || '';
}

/** 把值写回展示态元素 */
function setDisplayValue(el, key, value) {
  if (QUOTE_KEYS.has(key)) {
    el.textContent = '"' + value + '"';
  } else if (HTML_KEYS.has(key)) {
    el.innerHTML = value;
  } else {
    el.textContent = value;
  }
}

/** 进入某模块的编辑态 */
window.startSectionEdit = function (sectionId) {
  // 若已有别的模块在编辑，先静默取消
  if (_currentSection && _currentSection !== sectionId) {
    cancelSectionEdit(_currentSection, true);
  }
  if (_currentSection === sectionId) return;

  const container = getSectionContainer(sectionId);
  if (!container) return;

  _currentSection = sectionId;
  _sectionElements = {};

  container.querySelectorAll('[data-editable]').forEach(el => {
    const key = el.dataset.editable;
    const val = getDisplayValue(el, key);

    let input;
    if (LONG_TEXT_KEYS.has(key)) {
      input = document.createElement('textarea');
      input.className = 'inline-input inline-textarea ' + el.className;
    } else {
      input = document.createElement('input');
      input.type = 'text';
      input.className = 'inline-input ' + el.className;
    }
    input.dataset.editable = key;
    input.value = val;

    _sectionElements[key] = { original: el, input };
    el.replaceWith(input);
  });

  // 高亮模块 + 切换按钮显示
  container.classList.add('section-editing');
  const editBtn = container.querySelector('.section-edit-btn');
  const controls = container.querySelector('.section-edit-controls');
  if (editBtn) editBtn.style.display = 'none';
  if (controls) controls.classList.add('show');
};

/** 保存某模块：提交后端 → 直接用新值恢复展示元素（无需刷新页面） */
window.saveSection = async function (sectionId) {
  if (_currentSection !== sectionId) return;
  const container = getSectionContainer(sectionId);
  if (!container) return;

  const data = {};
  for (const [key, { input }] of Object.entries(_sectionElements)) {
    data[key] = input.value.trim();
  }

  const saveBtn = container.querySelector('.sec-save-btn');
  const origText = saveBtn ? saveBtn.textContent : '';
  if (saveBtn) { saveBtn.disabled = true; saveBtn.textContent = '保存中...'; }

  try {
    const resp = await fetch(API_BASE + '/site-info', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(data)
    });
    const result = await resp.json();
    if (result.success) {
      // 关键：把新值写回原始元素并替换回 DOM，实现自动刷新
      for (const [key, { original, input }] of Object.entries(_sectionElements)) {
        setDisplayValue(original, key, data[key]);
        input.replaceWith(original);
      }
      exitEditMode(sectionId);
      showToast('✅ 已保存');
    } else {
      alert('保存失败：' + (result.message || '未知错误'));
    }
  } catch (e) {
    alert('保存失败：无法连接后端（端口 9090）');
  } finally {
    if (saveBtn) { saveBtn.disabled = false; saveBtn.textContent = origText; }
  }
};

/** 取消某模块编辑：恢复原始展示元素 */
window.cancelSectionEdit = function (sectionId, silent) {
  if (_currentSection !== sectionId) return;
  if (!silent && !confirm('确定放弃本次修改？')) return;

  for (const { original, input } of Object.values(_sectionElements)) {
    input.replaceWith(original);
  }
  exitEditMode(sectionId);
};

/** 退出编辑态 UI */
function exitEditMode(sectionId) {
  const container = getSectionContainer(sectionId);
  if (container) {
    container.classList.remove('section-editing');
    const editBtn = container.querySelector('.section-edit-btn');
    const controls = container.querySelector('.section-edit-controls');
    if (editBtn) editBtn.style.display = '';
    if (controls) controls.classList.remove('show');
  }
  _currentSection = null;
  _sectionElements = {};
}

/** 顶部轻提示 */
function showToast(msg) {
  let toast = document.getElementById('siteToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'siteToast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 1800);
}

/* ========== 10. 管理后台 ========== */
const ADMIN_PAGES = ['dashboard', 'personal', 'skills', 'projects', 'timeline', 'about', 'site'];
let _adminAvatarBound = false;

/** 打开管理后台 */
window.openAdmin = function () {
  document.getElementById('adminPanel').classList.add('open');
  document.body.style.overflow = 'hidden';
  // 让花瓣飘到后台之上
  const petalCanvas = document.getElementById('petalCanvas');
  if (petalCanvas) petalCanvas.style.zIndex = '100001';
  updateDashboardStats();
  bindAvatarInput();
  switchAdminPage('dashboard');
  loadAdminData();
};

/** 关闭管理后台 */
window.closeAdmin = function () {
  document.getElementById('adminPanel').classList.remove('open');
  document.body.style.overflow = '';
  const petalCanvas = document.getElementById('petalCanvas');
  if (petalCanvas) petalCanvas.style.zIndex = '';
};

/** 仪表盘统计数字：按主页实际卡片数动态更新 */
function updateDashboardStats() {
  const nums = document.querySelectorAll('#adminPage-dashboard .admin-card-num');
  if (nums.length < 3) return;
  nums[0].textContent = document.querySelectorAll('.skill-masonry .skill-card').length;
  nums[1].textContent = document.querySelectorAll('.projects-flow .project-card').length;
  nums[2].textContent = document.querySelectorAll('.timeline .tl-item').length;
}

/** 切换管理后台页面 */
window.switchAdminPage = function (pageId) {
  document.querySelectorAll('.admin-page').forEach(p => p.classList.remove('show'));
  const target = document.getElementById('adminPage-' + pageId);
  if (target) target.classList.add('show');
  document.querySelectorAll('.admin-nav-item').forEach(n => {
    n.classList.toggle('active', n.dataset.adminPage === pageId);
  });
};

/** 加载管理后台数据（优先后端，失败则从当前 DOM 取） */
window.loadAdminData = async function () {
  let data = {};
  try {
    const resp = await fetch(API_BASE + '/site-info');
    const result = await resp.json();
    if (result.success && result.data) data = result.data;
  } catch (e) { /* 后端未启动，走 DOM 兜底 */ }

  document.querySelectorAll('#adminPanel [data-admin-key]').forEach(inp => {
    const key = inp.dataset.adminKey;
    let v = data[key];
    if (v === undefined || v === null) {
      const dom = document.querySelector(`[data-editable="${key}"]`);
      v = dom ? getDisplayValue(dom, key) : '';
    }
    inp.value = String(v);
    if (key === 'personal_avatar') renderAvatarPreview(inp.value);
  });
};

/** 头像预览渲染 */
function renderAvatarPreview(v) {
  const preview = document.getElementById('avatarPreview');
  if (v && /^(data:image|\/|https?:)/.test(v)) {
    preview.innerHTML = `<img src="${v}" alt="头像">`;
  } else {
    preview.textContent = v || '🌸';
  }
}

/** 绑定头像上传 */
function bindAvatarInput() {
  if (_adminAvatarBound) return;
  const fileInput = document.getElementById('avatarFile');
  if (!fileInput) return;
  _adminAvatarBound = true;
  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert('图片不能超过 2MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      document.getElementById('avatarValue').value = dataUrl;
      renderAvatarPreview(dataUrl);
    };
    reader.readAsDataURL(file);
  });
}

/** 移除头像 */
window.removeAvatar = function () {
  document.getElementById('avatarValue').value = '';
  renderAvatarPreview('');
};

/** 保存某个管理页：收集本页 data-admin-key → 提交后端 → 同步更新主页展示 */
window.saveAdminPage = async function (pageId) {
  const page = document.getElementById('adminPage-' + pageId);
  if (!page) return;

  const data = {};
  page.querySelectorAll('[data-admin-key]').forEach(i => {
    data[i.dataset.adminKey] = i.value.trim();
  });

  if (pageId === 'personal' && !data.personal_name) {
    alert('姓名不能为空');
    return;
  }

  try {
    const resp = await fetch(API_BASE + '/site-info', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(data)
    });
    const result = await resp.json();
    if (result.success) {
      applySiteData(data);
      showToast('✅ 已保存');
    } else {
      alert('保存失败：' + (result.message || '未知错误'));
    }
  } catch (e) {
    // 后端未启动时，仅本地更新展示
    applySiteData(data);
    showToast('✅ 已更新（后端未连接，暂存于本地）');
  }
};
