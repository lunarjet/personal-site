CREATE DATABASE IF NOT EXISTS personal_site DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE personal_site;

CREATE TABLE IF NOT EXISTS t_message (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    gender VARCHAR(10),
    phone VARCHAR(30),
    email VARCHAR(100),
    content VARCHAR(1000) NOT NULL,
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS t_site_info (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    field_key VARCHAR(100) UNIQUE NOT NULL,
    field_value TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========== Banner ==========
INSERT IGNORE INTO t_site_info (field_key, field_value) VALUES
('banner_seal', '罗娇'),
('banner_title', '罗娇の个人主页'),
('banner_subtitle', '大连民族大学 · 物联网工程');

-- ========== 技术栈（6张卡: seal/title/desc） ==========
INSERT IGNORE INTO t_site_info (field_key, field_value) VALUES
('skill_seal_1', '前'),
('skill_title_1', '前端'),
('skill_desc_1', 'Vue 3 · HTML5 · CSS3 · JavaScript'),
('skill_seal_2', '智'),
('skill_title_2', 'AI / 大模型'),
('skill_desc_2', 'PyTorch · Transformer · RLHF · Prompt Engineering'),
('skill_seal_3', '后'),
('skill_title_3', '后端'),
('skill_desc_3', 'Spring Boot · MyBatis-Plus · JDK 17 · MySQL'),
('skill_seal_4', '器'),
('skill_title_4', '开发工具'),
('skill_desc_4', 'VS Code · Git · GitHub · Trae AI'),
('skill_seal_5', '硬'),
('skill_title_5', '硬件工具'),
('skill_desc_5', 'Keil5 · Proteus · Arduino IDE'),
('skill_seal_6', '云'),
('skill_title_6', '云部署'),
('skill_desc_6', 'GitHub Pages · Cloudflare Pages · bolt.new · 百度秒搭');

-- ========== 项目展示（4个: no/icon/title/desc/tag1/tag2） ==========
INSERT IGNORE INTO t_site_info (field_key, field_value) VALUES
('project_no_1', '01'), ('project_icon_1', '🧠'), ('project_title_1', 'GPT 自回归大模型'),
('project_desc_1', '6 层 Transformer，512 维 embedding，单文件训练脚本。'),
('project_tag1_1', 'PyTorch'), ('project_tag2_1', 'Transformer'),
('project_no_2', '02'), ('project_icon_2', '📚'), ('project_title_2', '图书管理系统'),
('project_desc_2', 'Vue + Spring Boot + MyBatis-Plus，完整 CRUD。'),
('project_tag1_2', 'Vue 3'), ('project_tag2_2', 'Spring Boot'),
('project_no_3', '03'), ('project_icon_3', '🎯'), ('project_title_3', '图猎电商图片插件'),
('project_desc_3', 'Chrome 扩展，自动识别商品页图片，批量打包 ZIP。'),
('project_tag1_3', 'Chrome MV3'), ('project_tag2_3', 'JS'),
('project_no_4', '04'), ('project_icon_4', '⚡'), ('project_title_4', '零代码双平台应用'),
('project_desc_4', '国内秒搭 + 国外 bolt.new，双平台部署实战。'),
('project_tag1_4', '秒搭'), ('project_tag2_4', 'bolt.new');

-- ========== 开发日志（4条: date/title/desc） ==========
INSERT IGNORE INTO t_site_info (field_key, field_value) VALUES
('log_date_1', '2026.10'), ('log_title_1', '🎓 大模型预训练与 SFT'),
('log_desc_1', '完成 Transformer 自回归模型预训练，实现聊天模板、Loss 遮盖、Attention Padding Mask 全链路。'),
('log_date_2', '2026.10'), ('log_title_2', '🔌 AI 编程环境搭建'),
('log_desc_2', '配置 Python 3.14 / Node.js 24 / Git / Cursor / Trae，完成 DeepSeek API 集成。'),
('log_date_3', '2026.10'), ('log_title_3', '⚡ 零代码平台实战'),
('log_desc_3', '对比百度秒搭 vs bolt.new，中英文双平台各生成一个应用并成功部署。'),
('log_date_4', '2026.10'), ('log_title_4', '🛠️ 从插件到作品集'),
('log_desc_4', '开发 Chrome 电商图片下载插件 → 静态官网 → Pages 部署，完整走完 AI 开发流程。');

-- ========== 人物志 ==========
INSERT IGNORE INTO t_site_info (field_key, field_value) VALUES
('prose_1', '你好，我是<strong>罗娇</strong>，目前就读于<strong>大连民族大学</strong>物联网工程专业。'),
('prose_2', '与编程结缘，已是三年前的事。最初拿起的第一门语言是<strong>C++</strong>——从变量、循环到指针与内存管理，敲着敲着便一发不可收拾，算是那枚推开技术世界大门的石子。'),
('prose_3', '此后一路辗转，工具链越磨越长：用<strong>Java</strong> 搭后端、<strong>MySQL</strong> 存数据、<strong>Python</strong> 做算法与脚本。代码编辑器最常用的是<strong>VS Code</strong>，轻量、插件全、启动快。硬件也不曾落下——用 <strong>Keil5</strong> 写单片机程序，<strong>Proteus</strong> 搭电路仿真，Arduino IDE 烧固件，把代码烧进芯片里看着它真的动起来，那种喜悦是纯软件体会不到的。'),
('prose_4', '如今又搭上了 AI 辅助开发的快车。写代码前先让 AI 出方案，遇到 Bug 直接把报错甩过去，连文档都让 AI 帮忙起草再手动核对。效率翻倍的同时，也逼着自己思考：怎么提问、怎么验证、怎么把 AI 变成真正的副驾驶而非驾驶员。'),
('quote', '从 C++ 起步，软硬兼修，AI 加持——永远在学习的路上。'),
('info_major', '物联网工程'), ('info_grade', '大三在读'), ('info_language', 'C++ · Java · Python'),
('info_direction', 'AI 辅助开发 + 硬件'), ('info_github', '@lunarjet'), ('info_email', '780265887@qq.com');

-- ========== 个人信息 ==========
INSERT IGNORE INTO t_site_info (field_key, field_value) VALUES
('personal_avatar', '🌸'),
('personal_name', '罗娇'),
('personal_tagline', '物联网工程 · 大三在读 · AI 辅助开发爱好者'),
('personal_gender', '女'),
('personal_ethnic', '汉族'),
('personal_birthday', '2004.06'),
('personal_hometown', '辽宁 大连'),
('personal_school', '大连民族大学'),
('personal_major', '物联网工程'),
('personal_grade', '大三在读'),
('personal_email', '780265887@qq.com'),
('personal_github', '@lunarjet'),
('personal_direction', 'AI 辅助开发 + 硬件'),
('personal_motto', '永远在学习的路上。');

-- ========== 页脚 ==========
INSERT IGNORE INTO t_site_info (field_key, field_value) VALUES
('footer_left', '© 2026 罗娇 · Made with ❤ and AI'),
('footer_right', '// Deployed on Cloudflare Pages');
