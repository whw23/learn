/* 首页 */
window.SECTIONS = window.SECTIONS || [];
window.SECTIONS.push({
    id: 'home',
    title: '🏠 首页 · 全景导航',
    icon: 'fa-home',
    intro: `
        <div class="tip-box success">
            <span class="tip-title"><i class="fa fa-lightbulb-o"></i> 关于本站</span>
            本站系统整理 <b>编程范式 → 数据库范式 → 设计模式 → 架构模式 → 分层架构 → 数据对象 → 其他核心概念</b>，
            通过图、表、代码三位一体的方式帮你建立完整的认知图谱。
        </div>

        <h2>📌 知识体系总览</h2>
        <div class="mermaid">
flowchart TB
    A[编程世界的抽象层次]
    A --> B[编程范式 Paradigm<br/>怎么思考代码]
    A --> C[设计模式 Design Pattern<br/>怎么解决重复问题]
    A --> D[架构模式 Architecture<br/>怎么组织系统]
    A --> E[分层架构 Layered<br/>怎么划分模块]
    A --> F[数据对象 DTO/VO/PO<br/>怎么传递数据]
    A --> G[数据库范式 Normal Form<br/>怎么设计表]
    A --> AI[🤖 AI 时代编程<br/>SDD/MCP/Skill/Agent]
    B --> H[OOP/FP/PP/逻辑式/响应式/...]
    C --> I[GoF 23种 + 现代模式]
    D --> J[MVC/MVVM/微服务/事件驱动]
    E --> K[Controller/Service/Repository]
    AI --> AI1[XDD 方法论 + Function Call + MCP]

    style AI fill:#e8f5e9
        </div>

        <h2>🧭 推荐学习路径</h2>
        <div class="card-grid">
            <div class="card">
                <div class="card-icon"><i class="fa fa-graduation-cap"></i></div>
                <div class="card-title">新手路径</div>
                <div class="card-desc">编程范式 → 设计模式（常见5个）→ MVC → 分层架构</div>
            </div>
            <div class="card">
                <div class="card-icon"><i class="fa fa-rocket"></i></div>
                <div class="card-title">进阶路径</div>
                <div class="card-desc">23 种设计模式 → 架构模式 → DDD → 微服务</div>
            </div>
            <div class="card">
                <div class="card-icon"><i class="fa fa-database"></i></div>
                <div class="card-title">数据库</div>
                <div class="card-desc">1NF → 2NF → 3NF → BCNF → 反范式实战</div>
            </div>
            <div class="card">
                <div class="card-icon"><i class="fa fa-cubes"></i></div>
                <div class="card-title">系统设计</div>
                <div class="card-desc">SOLID → 整洁架构 → 六边形 → 事件驱动</div>
            </div>
            <div class="card" style="border: 2px solid #4CAF50;">
                <div class="card-icon"><i class="fa fa-magic"></i></div>
                <div class="card-title">🤖 AI 时代</div>
                <div class="card-desc">SDD → MCP → Agent Skill → Function Call → Vibe Coding</div>
            </div>
        </div>

        <div class="tip-box">
            <span class="tip-title"><i class="fa fa-info-circle"></i> 阅读建议</span>
            ① 左侧目录可折叠/搜索；② 顶部导航跳转大章节；③ 每节都有代码示例 + Mermaid 图；④ 右下"返回顶部"快速回到页首。
        </div>
    `,
    subs: []
});
