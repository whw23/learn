/**
 * Programming Concepts SPA
 * - 渲染章节、构建侧边导航、搜索、Mermaid 渲染
 */
(function () {
    // 全部章节按顺序注册（由各 section JS 推入 window.SECTIONS）
    const SECTIONS = window.SECTIONS || [];

    const contentEl = document.getElementById('content');
    const sideNavEl = document.getElementById('sideNav');

    // ---------- 渲染章节 ----------
    function renderSections() {
        const html = SECTIONS.map(group => {
            const subs = (group.subs || []).map(sub => `
                <section id="${sub.id}">
                    <h2>${sub.title}</h2>
                    ${sub.html}
                </section>
            `).join('');
            return `
                <section id="${group.id}">
                    <h1>${group.title}</h1>
                    ${group.intro || ''}
                    ${subs}
                </section>
            `;
        }).join('');
        contentEl.innerHTML = html;
    }

    // ---------- 构建侧边目录 ----------
    function buildSideNav() {
        const html = `<ul>${SECTIONS.map(group => `
            <li>
                <div class="nav-group-title">
                    ${group.icon ? `<i class="fa ${group.icon}"></i> ` : ''}${group.title}
                    <span class="arrow">▼</span>
                </div>
                <ul>
                    <li><a href="#${group.id}">📌 概览</a></li>
                    ${(group.subs || []).map(sub => `
                        <li><a href="#${sub.id}">${sub.title}</a></li>
                    `).join('')}
                </ul>
            </li>
        `).join('')}</ul>`;
        sideNavEl.innerHTML = html;

        // 折叠/展开
        sideNavEl.querySelectorAll('.nav-group-title').forEach(t => {
            t.addEventListener('click', e => {
                if (e.target.tagName === 'A') return;
                t.parentElement.classList.toggle('collapsed');
            });
        });
    }

    // ---------- 滚动监听高亮 ----------
    function setupScrollSpy() {
        const links = sideNavEl.querySelectorAll('a[href^="#"]');
        const sections = Array.from(document.querySelectorAll('.content section[id]'));

        function onScroll() {
            const scrollY = window.scrollY + 100;
            let current = sections[0];
            for (const sec of sections) {
                if (sec.offsetTop <= scrollY) current = sec;
            }
            if (!current) return;
            links.forEach(a => {
                a.classList.toggle('active', a.getAttribute('href') === '#' + current.id);
            });
        }
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    // ---------- 搜索 ----------
    function setupSearch() {
        const input = document.getElementById('searchInput');
        const links = Array.from(sideNavEl.querySelectorAll('ul ul li'));
        input.addEventListener('input', () => {
            const q = input.value.trim().toLowerCase();
            links.forEach(li => {
                const txt = li.textContent.toLowerCase();
                li.style.display = (!q || txt.includes(q)) ? '' : 'none';
            });
            // 自动展开命中的分组
            if (q) {
                sideNavEl.querySelectorAll('li').forEach(li => li.classList.remove('collapsed'));
            }
        });
    }

    // ---------- 返回顶部 ----------
    function setupBackToTop() {
        const btn = document.getElementById('backToTop');
        window.addEventListener('scroll', () => {
            btn.classList.toggle('show', window.scrollY > 300);
        });
        btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // ---------- 移动端菜单 ----------
    function setupMobileMenu() {
        const btn = document.getElementById('menuToggle');
        const sidebar = document.getElementById('sidebar');
        btn.addEventListener('click', () => sidebar.classList.toggle('open'));
        sidebar.addEventListener('click', e => {
            if (e.target.tagName === 'A') sidebar.classList.remove('open');
        });
    }

    // ---------- Mermaid ----------
    function setupMermaid() {
        if (window.mermaid) {
            mermaid.initialize({
                startOnLoad: false,
                theme: 'default',
                themeVariables: {
                    primaryColor: '#e8f5e9',
                    primaryBorderColor: '#4CAF50',
                    primaryTextColor: '#333',
                    lineColor: '#4CAF50',
                    fontSize: '14px',
                }
            });
            mermaid.run({ querySelector: '.mermaid' });
        }
    }

    // ---------- 平滑滚动锚点 ----------
    function setupSmoothAnchor() {
        document.addEventListener('click', e => {
            const a = e.target.closest('a[href^="#"]');
            if (!a) return;
            const href = a.getAttribute('href');
            if (href.length <= 1) return;
            const target = document.getElementById(href.slice(1));
            if (target) {
                e.preventDefault();
                const top = target.getBoundingClientRect().top + window.scrollY - 70;
                window.scrollTo({ top, behavior: 'smooth' });
                history.replaceState(null, '', href);
            }
        });
    }

    // ---------- 初始化 ----------
    function init() {
        renderSections();
        buildSideNav();
        setupScrollSpy();
        setupSearch();
        setupBackToTop();
        setupMobileMenu();
        setupSmoothAnchor();
        setupMermaid();
        // 触发 Prism 高亮
        if (window.Prism) Prism.highlightAll();
    }

    document.addEventListener('DOMContentLoaded', init);
})();
