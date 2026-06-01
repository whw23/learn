/* AI 时代的编程范式与方法论 */
window.SECTIONS.push({
    id: 'ai-era',
    title: '🤖 AI 时代的编程',
    icon: 'fa-magic',
    intro: `
        <p>LLM 的出现正在重塑软件开发的方方面面。本章系统梳理 <b>AI Agent 时代</b>独有的新范式、新方法论与新工具链。</p>

        <h2>🌌 AI 时代的三大趋势</h2>
        <div class="mermaid">
flowchart LR
    T1[趋势1: 自然语言成为新源代码<br/>SDD / Spec / Prompt]
    T2[趋势2: 文档成为可执行插件<br/>Agent Skill / Rules]
    T3[趋势3: AI 成为系统的一等公民<br/>Function Call / MCP / Agent]

    T1 --> Sum[新编程范式]
    T2 --> Sum
    T3 --> Sum
        </div>

        <h2>📊 全景知识地图</h2>
        <div class="mermaid">
flowchart TB
    POP[传统 POP 面向插件编程]
    POP --> FC[Function Call<br/>函数即插件]
    POP --> MCP[MCP 协议<br/>跨进程标准化]
    POP --> Skill[Agent Skill<br/>文档即插件]

    XDD[XDD 方法论家族] --> TDD
    XDD --> BDD
    XDD --> DDD
    XDD --> SDD[SDD ⭐<br/>规约驱动]
    XDD --> MDD
    XDD --> EDD

    AI[AI Agent 生态]
    FC --> AI
    MCP --> AI
    Skill --> AI
    SDD --> AI
    Vibe[Vibe Coding] --> AI

    style SDD fill:#e8f5e9
        </div>

        <div class="tip-box success">
            <span class="tip-title"><i class="fa fa-lightbulb-o"></i> 本章学习路径</span>
            ① XDD 家族对比 → ② SDD 详解 → ③ POP 在 AI 时代的演进 → ④ Function Call → ⑤ MCP → ⑥ Agent Skill → ⑦ Vibe Coding → ⑧ 推送模式全家桶 → ⑨ AI 时代术语速查
        </div>
    `,
    subs: [
        {
            id: 'ai-xdd',
            title: '1. XDD 方法论家族：TDD / BDD / DDD / SDD / MDD / EDD',
            html: `
                <p>所有以 <b>"X-Driven Development"</b> 命名的开发方法论。每个都强调"用 X 来驱动开发流程"。</p>

                <h3>🌳 家族总览</h3>
                <div class="mermaid">
flowchart TB
    XDD[XDD 家族]
    XDD --> TDD[Test-Driven<br/>测试驱动]
    XDD --> BDD[Behavior-Driven<br/>行为驱动]
    XDD --> DDD[Domain-Driven<br/>领域驱动]
    XDD --> SDD[Spec-Driven ⭐<br/>规约驱动]
    XDD --> MDD[Model-Driven<br/>模型驱动]
    XDD --> EDD[Example-Driven<br/>示例驱动]
    XDD --> ATDD[Acceptance-TDD<br/>验收测试驱动]
    XDD --> FDD[Feature-Driven<br/>特性驱动]
    XDD --> DocDD[Documentation-Driven<br/>文档驱动]
                </div>

                <h3>📋 一表看清各家</h3>
                <table>
                    <tr><th>方法</th><th>核心产物</th><th>谁先写</th><th>谁写</th><th>何时流行</th></tr>
                    <tr><td><b>TDD</b></td><td>单元测试</td><td>测试 → 代码</td><td>程序员</td><td>2000s（Kent Beck）</td></tr>
                    <tr><td><b>BDD</b></td><td>Given-When-Then 场景</td><td>场景 → 测试 → 代码</td><td>产品+程序员</td><td>2010s（Dan North）</td></tr>
                    <tr><td><b>DDD</b></td><td>领域模型</td><td>领域 → 架构 → 代码</td><td>架构师+领域专家</td><td>2015s（Eric Evans）</td></tr>
                    <tr><td><b>SDD</b> ⭐</td><td>Spec 文档</td><td>Spec → AI → 代码</td><td>产品+AI</td><td><b>2024+</b></td></tr>
                    <tr><td><b>MDD</b></td><td>UML/形式化模型</td><td>模型 → 代码生成</td><td>架构师</td><td>1990s（OMG）</td></tr>
                    <tr><td><b>EDD</b></td><td>具体示例</td><td>示例 → 规约</td><td>程序员</td><td>2010s</td></tr>
                    <tr><td><b>ATDD</b></td><td>验收测试</td><td>验收 → 实现</td><td>产品+QA</td><td>2010s</td></tr>
                    <tr><td><b>FDD</b></td><td>功能列表</td><td>特性清单 → 迭代</td><td>团队</td><td>1990s</td></tr>
                    <tr><td><b>DocDD</b></td><td>API/用户文档</td><td>文档 → 实现</td><td>架构师</td><td>2010s</td></tr>
                </table>

                <h3>🔍 深度对比：TDD vs BDD vs DDD vs SDD</h3>

                <h4>1️⃣ TDD（Test-Driven Development）</h4>
                <p><b>口诀</b>：Red → Green → Refactor</p>
                <pre><code class="language-python"># 1. 先写失败测试（Red）
def test_add():
    assert add(2, 3) == 5      # add 还不存在，会失败

# 2. 写最小实现让它通过（Green）
def add(a, b):
    return a + b

# 3. 重构（Refactor）
# 增加类型注解、错误处理等</code></pre>
                <div class="tip-box">
                    <b>核心信念</b>：测试不是事后补的，而是"用测试逼出设计"。
                </div>

                <h4>2️⃣ BDD（Behavior-Driven Development）</h4>
                <p>用自然语言描述"用户行为"，所有人（含产品/QA）能读懂。</p>
                <pre><code class="language-gherkin">Feature: 用户登录
  Scenario: 正确密码登录成功
    Given 用户已注册邮箱 "alice@example.com"
    When 输入密码 "correct123" 并提交
    Then 应跳转到首页
    And 显示欢迎信息 "Hi Alice"</code></pre>
                <ul>
                    <li>工具：Cucumber、Behave、SpecFlow</li>
                    <li>本质：可执行的"产品需求"</li>
                </ul>

                <h4>3️⃣ DDD（Domain-Driven Design）</h4>
                <p>以"业务领域"为中心建模，与领域专家用"<b>统一语言（Ubiquitous Language）</b>"沟通。</p>
                <pre><code class="language-python">class Account:                       # 领域实体（Entity）
    def withdraw(self, amount: Money):
        if amount > self._balance:
            raise InsufficientFunds   # 领域异常
        self._balance -= amount
        return WithdrewEvent(self.id, amount)  # 领域事件</code></pre>
                <p>关键概念：Entity、Value Object、Aggregate、Repository、Bounded Context、Domain Event。</p>

                <h4>4️⃣ SDD（Spec-Driven Development）⭐ AI 时代新星</h4>
                <p>先写结构化规约（Spec），让 <b>AI</b>（或人）按 Spec 实现代码。</p>
                <pre><code class="language-markdown"># spec.md
## Feature: 用户搜索
### User Story
作为购物者，我希望按关键词搜索商品，以便快速找到我想要的。

### Functional Requirements
- FR1: 支持中文 + 英文关键词
- FR2: 结果按相关度排序
- FR3: 分页 20 条/页

### Acceptance Criteria
- [ ] 搜索"苹果"返回相关产品
- [ ] 空结果显示推荐
- [ ] 响应时间 < 200ms

### Out of Scope
- 不支持语音搜索
- 不做图片搜索</code></pre>
                <div class="tip-box success">
                    <b>把这份 spec 丢给 Cursor/Claude/Copilot</b>：</br>
                    "按这份 spec 实现" → AI 自动生成代码。
                </div>

                <h3>🔗 它们的协作关系</h3>
                <div class="mermaid">
flowchart LR
    SDD[SDD Spec] -->|拆分| BDD[BDD 场景]
    BDD -->|转化| TDD[TDD 单元测试]
    TDD -->|实现| Code[代码]
    Code -->|对应| DDD[DDD 领域模型]
    DDD -.指导.-> SDD
                </div>
                <p><b>它们不是互斥的</b>：用 SDD 写规约 → 用 BDD 表达场景 → 用 TDD 写测试 → 用 DDD 建模 → 写代码。</p>

                <h3>🆚 一句话区分</h3>
                <table>
                    <tr><th>方法</th><th>关注点</th></tr>
                    <tr><td>TDD</td><td>"它<b>怎么测</b>？"</td></tr>
                    <tr><td>BDD</td><td>"用户<b>怎么用</b>？"</td></tr>
                    <tr><td>DDD</td><td>"业务<b>是什么</b>？"</td></tr>
                    <tr><td><b>SDD</b></td><td>"需求<b>是什么</b>？"</td></tr>
                    <tr><td>MDD</td><td>"模型<b>长啥样</b>？"</td></tr>
                </table>
            `
        },
        {
            id: 'ai-sdd-detail',
            title: '2. SDD（Spec-Driven Development）详解',
            html: `
                <p>SDD 是 <b>AI 时代最有代表性的新方法论</b>。它的革命性在于：<b>第一次让"自然语言规约"成为真正的"源代码"</b>。</p>

                <h3>💡 SDD 的核心信念</h3>
                <div class="tip-box success">
                    <b>"Spec 是真理，代码是 Spec 的可执行投影。"</b><br/>
                    改需求 → 改 Spec → 重新生成代码（而非反向）。
                </div>

                <h3>📊 SDD vs 传统开发</h3>
                <table>
                    <tr><th></th><th>传统开发</th><th>SDD</th></tr>
                    <tr><td>真理来源</td><td>代码</td><td><b>Spec</b></td></tr>
                    <tr><td>需求 → 代码</td><td>人工翻译</td><td><b>AI 生成</b></td></tr>
                    <tr><td>文档</td><td>常常过时</td><td><b>始终最新</b>（代码从它生成）</td></tr>
                    <tr><td>改需求</td><td>改代码 + 改文档</td><td><b>只改 Spec</b></td></tr>
                    <tr><td>跨角色协作</td><td>需求 → PRD → 代码（多次翻译）</td><td><b>所有人看同一份 Spec</b></td></tr>
                </table>

                <h3>⚙️ SDD 工作流（以 GitHub Spec Kit 为例）</h3>
                <div class="mermaid">
flowchart TB
    Start["specify 命令<br/>描述需求"] --> Spec[生成 spec.md]
    Spec --> Plan["plan 命令"]
    Plan --> PlanMD[生成 plan.md<br/>架构 + 技术选型]
    PlanMD --> Tasks["tasks 命令"]
    Tasks --> TasksMD[生成 tasks.md<br/>可执行任务]
    TasksMD --> Impl["implement 命令"]
    Impl --> Code[AI 实现代码]
    Code --> Verify[验证]
    Verify -->|不符| Spec
    Verify -->|通过| Done[交付]
                </div>

                <h3>📝 Spec 的三要素</h3>
                <div class="mermaid">
flowchart LR
    Spec[Spec 三要素]
    Spec --> What[做什么 What<br/>功能描述]
    Spec --> Why[为什么 Why<br/>用户故事 价值]
    Spec --> AC[验收标准<br/>怎么算做对]
                </div>

                <h3>🚀 SDD 工具生态</h3>
                <div class="card-grid">
                    <div class="card">
                        <div class="card-icon"><i class="fa fa-github"></i></div>
                        <div class="card-title">GitHub Spec Kit</div>
                        <div class="card-desc">官方 SDD 工具链，<code>/specify → /plan → /tasks → /implement</code></div>
                    </div>
                    <div class="card">
                        <div class="card-icon"><i class="fa fa-code"></i></div>
                        <div class="card-title">Cursor Rules</div>
                        <div class="card-desc"><code>.cursorrules</code> 项目级 Spec/约束</div>
                    </div>
                    <div class="card">
                        <div class="card-icon"><i class="fa fa-cogs"></i></div>
                        <div class="card-title">Cline Plan Mode</div>
                        <div class="card-desc">先规划后执行，类 SDD 流程</div>
                    </div>
                    <div class="card">
                        <div class="card-icon"><i class="fa fa-comment"></i></div>
                        <div class="card-title">Claude Projects</div>
                        <div class="card-desc">知识库 + 项目 Spec</div>
                    </div>
                    <div class="card">
                        <div class="card-icon"><i class="fa fa-terminal"></i></div>
                        <div class="card-title">Aider /architect</div>
                        <div class="card-desc">架构设计先行</div>
                    </div>
                    <div class="card">
                        <div class="card-icon"><i class="fa fa-robot"></i></div>
                        <div class="card-title">Devin / Cognition</div>
                        <div class="card-desc">全自主 SDD Agent</div>
                    </div>
                </div>

                <h3>✅ SDD 的优势</h3>
                <ul>
                    <li><b>意图清晰</b>：Spec 强制你想清楚再动手</li>
                    <li><b>可迭代</b>：改 Spec 比改代码容易</li>
                    <li><b>AI 友好</b>：LLM 天生擅长读 Markdown</li>
                    <li><b>跨角色协作</b>：产品/设计/开发同看 Spec</li>
                    <li><b>文档不再过时</b>：Spec 就是事实来源</li>
                </ul>

                <h3>❌ SDD 的挑战</h3>
                <ul>
                    <li><b>Spec 难写好</b>：模糊的 Spec → 模糊的代码</li>
                    <li><b>LLM 不确定性</b>：同一 Spec 可能生成不同代码</li>
                    <li><b>不适合探索性开发</b>：试错时 Spec 反而是负担</li>
                    <li><b>验证难</b>：如何确保代码真符合 Spec？</li>
                </ul>

                <h3>🎯 SDD 在你项目里的最小实践</h3>
                <pre><code class="language-markdown"># project-spec.md

## 我要做什么
一个文档管理系统，支持上传/搜索/分享。

## 技术约束
- Python + FastAPI 后端
- Vue 3 前端
- PostgreSQL + Redis

## 核心功能
1. 用户上传文档（支持 PDF/Word/MD）
2. 全文搜索（中文友好）
3. 生成分享链接（带过期时间）

## 不做
- 不做协同编辑
- 不做版本控制</code></pre>
                <div class="tip-box">
                    把这份丢给 AI："<b>按这份 spec 实现</b>"。<br/>
                    → 这就是最简单的 SDD。
                </div>

                <h3>📐 SDD 算"编程范式"吗？</h3>
                <table>
                    <tr><th>立场</th><th>观点</th></tr>
                    <tr><td><b>学术派</b></td><td>❌ 不算范式（范式指 OOP/FP/LP 那类代码组织）</td></tr>
                    <tr><td><b>实用派</b></td><td>✅ 算"新编程哲学"——当 Spec 成为源代码，SDD 就是新范式</td></tr>
                </table>
            `
        },
        {
            id: 'ai-sdd-tools',
            title: '3. SDD 工具谱系：Spec Kit / OpenSpec / Superpowers',
            html: `
                <p>SDD 不止一种实现。市面上的工具走着<b>三条完全不同的路线</b>，理解它们的差异能帮你选对武器。</p>

                <div class="tip-box success">
                    <span class="tip-title"><i class="fa fa-lightbulb"></i> 一句话区分</span>
                    <ul style="margin:8px 0;">
                        <li><b>Spec Kit</b> = 🏗️ 标准化脚手架（GitHub 官方）</li>
                        <li><b>OpenSpec</b> = 📝 轻量级流畅迭代（社区，52k⭐）</li>
                        <li><b>Superpowers</b> = 🛡️ 强制纪律 + 全流程开发 OS</li>
                    </ul>
                </div>

                <h3>🎯 三者的核心定位</h3>
                <div class="mermaid">
flowchart TB
    Q["AI 写代码不靠谱怎么办?"]

    Q --> A["OpenSpec<br/>📝 让 spec 流畅迭代<br/>'轻装上阵'"]
    Q --> B["Spec Kit<br/>🏗️ 用标准流程出 spec<br/>'按部就班'"]
    Q --> C["Superpowers<br/>🛡️ 强制纪律 + 全流程<br/>'监工押着干'"]

    A --> A1["每个变更一个文件夹<br/>proposal/spec/design/tasks<br/>可随时改任意一个"]
    B --> B1["7 个标准阶段<br/>constitution → ... → implement<br/>每阶段一个命令"]
    C --> C1["14 个 skill 工作流<br/>brainstorming/TDD/debugging<br/>code-review/verification..."]
                </div>

                <h3>📊 全景对比表</h3>
                <table>
                    <tr><th>维度</th><th>OpenSpec</th><th>Spec Kit</th><th>Superpowers</th></tr>
                    <tr><td>出品方</td><td>Fission-AI（社区）</td><td>GitHub（官方）</td><td>obra（社区）</td></tr>
                    <tr><td>语言/形态</td><td>TypeScript CLI</td><td>Python CLI</td><td>Markdown Skills</tr>
                    <tr><td>核心抽象</td><td><b>变更</b>（Change）</td><td><b>阶段</b>（Phase）</td><td><b>技能</b>（Skill）</td></tr>
                    <tr><td>流程刚性</td><td>🟢 柔性</td><td>🟡 半刚性</td><td>🔴 强制（HARD-GATE）</td></tr>
                    <tr><td>覆盖范围</td><td>propose → apply → archive</td><td>constitution → ... → implement</td><td><b>全生命周期</b></td></tr>
                    <tr><td>触发方式</td><td>显式 <code>/opsx:propose</code></td><td>显式 <code>/speckit.specify</code></td><td><b>AI 自动按场景</b></td></tr>
                    <tr><td>Brownfield</td><td>✅ 专门设计</td><td>⚠️ 偏 greenfield</td><td>✅ 全场景</td></tr>
                    <tr><td>变更归档</td><td>✅ 内置</td><td>❌</td><td>❌</td></tr>
                    <tr><td>TDD / Debug</td><td>❌</td><td>❌</td><td>✅ 内置</td></tr>
                    <tr><td>代码评审</td><td>❌</td><td>extension</td><td>✅ 内置</td></tr>
                    <tr><td>子代理编排</td><td>❌</td><td>❌</td><td>✅ 内置</td></tr>
                </table>

                <h3>🎬 同一需求三种风格："给应用加暗黑模式"</h3>

                <h4>① OpenSpec —— 流畅迭代（像 git commit）</h4>
                <pre><code>你: /opsx:propose add-dark-mode

AI: 创建 openspec/changes/add-dark-mode/
    ✓ proposal.md  —— 为什么做、改什么
    ✓ specs/       —— 需求和场景
    ✓ design.md    —— 技术方案
    ✓ tasks.md     —— 实施清单

你: （直接改 design.md，不需要"返回上一阶段"）

你: /opsx:apply
AI: 执行 tasks...

你: /opsx:archive
AI: 归档到 archive/2026-06-01-add-dark-mode/</code></pre>
                <p>👉 <b>变更 = 一个文件夹</b>，做完归档，自然像 git commit。</p>

                <h4>② Spec Kit —— 阶段化命令（像瀑布流）</h4>
                <pre><code>/speckit.constitution    # 先立项目"宪法"
/speckit.specify         # 写 What/Why → spec.md
/speckit.clarify         # 模糊点澄清
/speckit.plan            # 写 How → plan.md
/speckit.tasks           # 拆任务 → tasks.md
/speckit.analyze         # 跨文档一致性检查
/speckit.implement       # AI 执行</code></pre>
                <p>👉 <b>每个阶段产出独立文档</b>，流程正式，适合团队治理。</p>

                <h4>③ Superpowers —— 行为约束（像 CI/CD 流水线）</h4>
                <pre><code>用户: "给应用加暗黑模式"
  ↓
AI 自动判定 = creative work
  → 触发 brainstorming (HARD-GATE 未批准不许写代码)
  → 探需求 → 提 2-3 方案 → 写设计文档 → 用户批准
  ↓
触发 writing-plans → docs/superpowers/plans/<date>-dark-mode.md
  ↓
触发 executing-plans + test-driven-development
  → 先写失败测试 → 实现 → 验证
  ↓
触发 verification-before-completion (强制跑完测试)
  ↓
触发 requesting-code-review
  ↓
触发 finishing-a-development-branch</code></pre>
                <p>👉 你只需要提需求，<b>整套纪律 AI 自动跑</b>。</p>

                <h3>📁 三种产物结构对比</h3>
                <div class="card-grid">
                    <div class="card">
                        <div class="card-title">OpenSpec：以"变更"为单位</div>
                        <pre style="font-size:11px;background:#f6f8fa;padding:8px;border-radius:4px;">openspec/
├── changes/
│   ├── add-dark-mode/
│   │   ├── proposal.md
│   │   ├── specs/
│   │   ├── design.md
│   │   └── tasks.md
│   └── archive/
└── specs/</pre>
                        <div class="card-desc">像 migration 文件夹</div>
                    </div>
                    <div class="card">
                        <div class="card-title">Spec Kit：以"功能"为单位</div>
                        <pre style="font-size:11px;background:#f6f8fa;padding:8px;border-radius:4px;">specs/
├── 001-photo-album/
│   ├── spec.md
│   ├── plan.md
│   └── tasks.md
.specify/
├── templates/
├── extensions/
└── presets/</pre>
                        <div class="card-desc">像 JIRA epic</div>
                    </div>
                    <div class="card">
                        <div class="card-title">Superpowers：以"技能"为单位</div>
                        <pre style="font-size:11px;background:#f6f8fa;padding:8px;border-radius:4px;">skills/
├── brainstorming/
├── writing-plans/
├── test-driven-development/
├── systematic-debugging/
└── ...
# 产物:
docs/superpowers/{specs,plans}/</pre>
                        <div class="card-desc">像 SOP 工作流库</div>
                    </div>
                </div>

                <h3>🧭 选型决策树</h3>
                <div class="mermaid">
flowchart TB
    Start{你的痛点是什么?} --> P1{需要快速迭代<br/>已有项目?}
    Start --> P2{需要标准化流程<br/>团队协作?}
    Start --> P3{AI 总不守规矩<br/>偷懒/瞎写?}

    P1 -->|是| O[选 OpenSpec 📝]
    P2 -->|是| S[选 Spec Kit 🏗️]
    P3 -->|是| SP[选 Superpowers 🛡️]

    O --> Mix[三者可以叠加]
    S --> Mix
    SP --> Mix
                </div>

                <table>
                    <tr><th>场景</th><th>推荐</th></tr>
                    <tr><td>个人项目，快速试错</td><td>OpenSpec</td></tr>
                    <tr><td>小团队，brownfield 维护</td><td>OpenSpec</td></tr>
                    <tr><td>大团队，需要文档治理</td><td>Spec Kit</td></tr>
                    <tr><td>企业级、合规要求高</td><td>Spec Kit + 自定义 presets</td></tr>
                    <tr><td>AI 老出戏、想要"自动纪律"</td><td>Superpowers</td></tr>
                    <tr><td>既要规范又要 AI 不偷懒</td><td><b>Spec Kit + Superpowers 叠加</b></td></tr>
                </table>

                <h3>💎 最本质的区别</h3>
                <table>
                    <tr><th>维度</th><th>OpenSpec</th><th>Spec Kit</th><th>Superpowers</th></tr>
                    <tr><td>抽象单位</td><td>变更 Change</td><td>阶段 Phase</td><td>技能 Skill</td></tr>
                    <tr><td>隐喻</td><td>Git commit</td><td>瀑布流</td><td>CI/CD pipeline</td></tr>
                    <tr><td>优势</td><td>自由灵活</td><td>标准规范</td><td>行为可控</td></tr>
                    <tr><td>代价</td><td>容易跑偏</td><td>流程偏重</td><td>学习曲线陡</td></tr>
                    <tr><td>不擅长</td><td>大团队治理</td><td>快速迭代</td><td>一次性小任务</td></tr>
                </table>

                <div class="tip-box success">
                    <span class="tip-title"><i class="fa fa-quote-left"></i> 类比记忆</span>
                    <ul style="margin:8px 0;">
                        <li><b>OpenSpec</b> 像 <b>Git</b>——每个变更一个 commit，轻巧灵活</li>
                        <li><b>Spec Kit</b> 像 <b>Maven / Gradle</b>——标准化的构建生命周期</li>
                        <li><b>Superpowers</b> 像 <b>ESLint + Husky + CI</b>——强制纪律自动跑</li>
                    </ul>
                </div>

                <h3>🤝 三者其实可以叠加使用</h3>
                <div class="mermaid">
flowchart LR
    A[Spec Kit / OpenSpec<br/>产出规格] --> B[Superpowers<br/>约束 AI 实现行为]
    B --> C[OpenSpec<br/>归档变更]
                </div>

                <div class="tip-box warning">
                    <span class="tip-title"><i class="fa fa-exclamation-triangle"></i> 注意</span>
                    工具只是把方法论"运行时化"。真正决定质量的还是<b>你能否写出清晰的 Spec</b>——模糊的 Spec → 模糊的代码，再强的工具也救不了。
                </div>
            `
        },
        {
            id: 'ai-governance',
            title: '4. AI 治理与约束：Rules / Hook / Constitution / .agents 标准',
            html: `
                <p>有了 Spec 工具，下一个问题就是<b>"怎么让 AI 真的按规矩做事"</b>。这一节讲清楚 5 个核心机制和它们的强制力等级。</p>

                <h3>🏗️ 约束机制的 5 个层级（从弱到强）</h3>
                <div class="mermaid">
flowchart TB
    L1["① Rules<br/>(CLAUDE.md / AGENTS.md)<br/>⭐ 提示词,AI 可忽略"]
    L2["② Skills<br/>(.claude/skills, .agents/skills)<br/>⭐⭐ 按场景触发"]
    L3["③ Constitution<br/>(Spec Kit memory/constitution.md)<br/>⭐⭐⭐ 结构化审计 + 人类必读报告"]
    L4["④ Hook<br/>(SessionStart / PreToolUse / Stop)<br/>⭐⭐⭐⭐ OS 层硬注入"]
    L5["⑤ Code Validation<br/>(OpenSpec validate / ESLint / 测试)<br/>⭐⭐⭐⭐⭐ 代码硬校验"]

    L1 --> L2 --> L3 --> L4 --> L5

    style L1 fill:#f8d7da
    style L3 fill:#fff3cd
    style L5 fill:#d4edda
                </div>

                <div class="tip-box">
                    <span class="tip-title"><i class="fa fa-lightbulb"></i> 核心洞察</span>
                    所有<b>"AI 自己审 AI"的机制</b>都是概率游戏。真正消除 "AI 装看不见" 只有两种：<br/>
                    1. <b>代码硬校验</b>（OpenSpec validate / 测试 / CI）<br/>
                    2. <b>Hook 拦截</b>（OS 层 / 退出码 / 阻断完成）
                </div>

                <h3>📜 ① Rules 文件：所有 AI 工具的"基础提示"</h3>
                <p>市面上每个 AI 编程工具都有自己的 rules 文件，本质都是<b>每次会话自动注入系统提示</b>的 markdown。</p>

                <h4>跨工具的 Rules 文件全景</h4>
                <table>
                    <tr><th>工具</th><th>主规则文件</th><th>高级规则目录</th><th>全局位置</th></tr>
                    <tr><td><b>Claude Code</b></td><td><code>CLAUDE.md</code> 或 <code>.claude/CLAUDE.md</code></td><td>✅ <code>.claude/rules/*.md</code>（支持 paths frontmatter）</td><td><code>~/.claude/CLAUDE.md</code> + <code>~/.claude/rules/</code></td></tr>
                    <tr><td><b>Codex</b></td><td><code>AGENTS.md</code></td><td>❌ 无（用嵌套 AGENTS.md）</td><td><code>~/.codex/AGENTS.md</code></td></tr>
                    <tr><td><b>Cursor</b></td><td><code>.cursorrules</code>（旧）</td><td>✅ <code>.cursor/rules/*.mdc</code>（新）</td><td>❌ 无全局</td></tr>
                    <tr><td><b>Cline</b></td><td><code>.clinerules</code></td><td>✅ <code>.clinerules/</code></td><td>—</td></tr>
                    <tr><td><b>Windsurf</b></td><td><code>.windsurfrules</code></td><td>✅ <code>.windsurf/rules/</code></td><td>—</td></tr>
                    <tr><td><b>Copilot</b></td><td><code>.github/copilot-instructions.md</code></td><td><code>.github/instructions/*.md</code></td><td>—</td></tr>
                    <tr><td><b>Gemini CLI</b></td><td><code>GEMINI.md</code></td><td>—</td><td>—</td></tr>
                </table>

                <h4>🌟 AGENTS.md：跨工具开放标准</h4>
                <div class="tip-box success">
                    <span class="tip-title"><i class="fa fa-handshake"></i> Linux Foundation 标准</span>
                    <b>AGENTS.md</b> 由 <b>Agentic AI Foundation</b>（OpenAI、Cursor、Google Jules、Factory、Amp 等创立）维护，<b>60k+ 开源项目在用</b>，被 30+ AI 工具支持（包括 Codex、Cursor、Windsurf、Aider、Gemini、Roo 等）。
                </div>

                <table>
                    <tr><th>AGENTS.md 特性</th><th>说明</th></tr>
                    <tr><td>位置</td><td>项目根 + 任意嵌套子目录</td></tr>
                    <tr><td>冲突解决</td><td><b>距离编辑文件最近的 AGENTS.md 胜出</b></td></tr>
                    <tr><td>格式</td><td>普通 Markdown，无强制字段</td></tr>
                    <tr><td>Claude Code 兼容</td><td>不直接读，需用 <code>@AGENTS.md</code> 在 CLAUDE.md 里引用</td></tr>
                    <tr><td>多家 AI 共享</td><td>✅ 一份多用，最大公约数</td></tr>
                </table>

                <h4>📌 Claude 的 .claude/rules/：唯一支持"路径作用域"的 rules 目录</h4>
                <pre><code>---
paths:
  - "src/api/**/*.ts"
  - "tests/**/*.test.ts"
---

# API 开发规则
- 所有 endpoint 必须做输入校验
- 用标准错误响应格式</code></pre>
                <p>→ <b>只在 AI 操作匹配文件时加载</b>，节省 context。其他工具大多没这个能力（Codex 靠嵌套 AGENTS.md，Cursor 的 <code>.cursor/rules/*.mdc</code> 也支持类似机制）。</p>

                <h3>📦 ② .agents/ 标准：跨工具的 Plugins + Skills 容器</h3>
                <p>这是 <b>OpenAI 推动的跨工具开放标准</b>（Codex 源码 <code>AGENTS_DIR_NAME = ".agents"</code> 写死），目标是让 plugins 和 skills 跨多个 AI 工具复用。</p>

                <div class="tip-box warning">
                    <span class="tip-title"><i class="fa fa-shield-alt"></i> 受保护目录</span>
                    Codex 把 <code>.agents/</code> 设为<b>沙箱保护目录，等同 <code>.git/</code></b>——AI 默认不能修改这里的文件。
                </div>

                <h4>完整目录结构（官方约定）</h4>
                <pre><code>.agents/                              ← 受保护根目录（≈ .git/）
├── plugins/                          ← 插件容器
│   ├── marketplace.json              ← 插件市场清单（必需）
│   └── &lt;plugin-name&gt;/
│       ├── .codex-plugin/
│       │   └── plugin.json           ← 插件清单（必需）
│       ├── skills/                   ← 插件附带 skills
│       ├── hooks/
│       ├── scripts/
│       ├── assets/
│       ├── .mcp.json                 ← MCP 服务器配置
│       └── .app.json
│
└── skills/                           ← 独立 skills
    └── &lt;skill-name&gt;/
        ├── SKILL.md                  ← 必需（YAML frontmatter: name + description）
        ├── agents/
        │   └── openai.yaml           ← UI 元数据
        ├── scripts/                  ← 可执行代码
        ├── references/               ← 参考文档
        └── assets/                   ← 模板/图片</code></pre>

                <table>
                    <tr><th>作用域</th><th>路径</th></tr>
                    <tr><td>用户级（个人）</td><td><code>~/.agents/plugins/</code> 和 <code>~/.agents/skills/</code></td></tr>
                    <tr><td>项目级（团队）</td><td><code>&lt;project&gt;/.agents/plugins/</code> 和 <code>&lt;project&gt;/.agents/skills/</code></td></tr>
                </table>

                <div class="tip-box warning">
                    <span class="tip-title"><i class="fa fa-exclamation-triangle"></i> 常见误区</span>
                    <ul style="margin:8px 0;">
                        <li><b><code>.agents/rules/</code> ❌ 不存在</b>——规则永远走 <code>AGENTS.md</code></li>
                        <li><b><code>.agents/</code> ≠ <code>.codex/</code></b>——前者是开放标准，后者是 Codex 私有</li>
                        <li>skill 内部的 <code>agents/</code>（不带点）≠ 顶层 <code>.agents/</code>（带点）</li>
                    </ul>
                </div>

                <h3>🏛️ ③ Constitution：Spec Kit 的"宪法"机制</h3>
                <p><b>Spec Kit 独有</b>的概念（OpenSpec / Superpowers 都没有）。constitution.md 是项目级原则文件，被 <b>4 层联动机制</b>强制约束所有产物。</p>

                <h4>4 层约束机制</h4>
                <div class="mermaid">
flowchart TB
    C[memory/constitution.md<br/>项目宪法]

    C --> L1[① 加载层<br/>8 个命令都强制 load]
    C --> L2[② 检查层<br/>plan-template 内置<br/>Constitution Check 章节]
    C --> L3[③ 门禁层<br/>analyze 把违宪自动定为 CRITICAL]
    C --> L4[④ 例外层<br/>Complexity Tracking 强制申报]

    L2 --> Gate[Phase 0 前必须过<br/>Phase 1 后必须再过]
    L3 --> Auth["Constitution Authority:<br/>不许稀释 / 重新解释 / 装看不见"]
    L4 --> Table["违例必填表:<br/>Violation + Why + Simpler Alternative Rejected"]

    style C fill:#fff3cd
    style L3 fill:#f8d7da
                </div>

                <h4>Constitution vs Rules 的关键差异</h4>
                <table>
                    <tr><th>维度</th><th>Rules（CLAUDE.md 等）</th><th>Constitution（Spec Kit）</th></tr>
                    <tr><td>作用范围</td><td>任何任务</td><td>仅 SDD 流程内</td></tr>
                    <tr><td>违反检查</td><td>❌ 无机制</td><td>✅ analyze 自动定 CRITICAL</td></tr>
                    <tr><td>违反例外</td><td>❌ 没概念</td><td>✅ Complexity Tracking 表格申报</td></tr>
                    <tr><td>结构化</td><td>⭐⭐ 自由文本</td><td>⭐⭐⭐⭐ Core Principles + Governance</td></tr>
                    <tr><td>修改流程</td><td><code>vim CLAUDE.md</code> 就完事</td><td>修宪流程 + 跨模板自动同步</td></tr>
                    <tr><td>谁审查</td><td>AI 自觉</td><td><b>AI 检察官 + 人类法官</b></td></tr>
                </table>

                <h4>审查流程：AI 当检察官，人类当法官</h4>
                <div class="mermaid">
flowchart LR
    A[constitution.md<br/>📜 法律] --> B[AI = 检察官<br/>必须发现违例]
    B --> C[审查报告<br/>📋 起诉书<br/>READ-ONLY]
    C --> D[人类 = 法官<br/>最终决策]
    D --> E{判决}
    E -->|有罪| F[改 spec/plan/tasks]
    E -->|法律需修订| G[修宪流程]
    E -->|起诉不成立| H[驳回]
                </div>

                <h3>🪝 ④ Hook：唯一能"强制注入"的机制</h3>
                <p>Hook 是<b>真正在 OS 层执行的脚本</b>，在 AI 工具调用前/后自动触发。这是 Rules / Constitution 都做不到的硬约束。</p>

                <h4>Claude Code / Codex 支持的 Hook 类型</h4>
                <table>
                    <tr><th>Hook</th><th>时机</th><th>典型用途</th></tr>
                    <tr><td><b>SessionStart</b></td><td>会话开始 / clear / compact</td><td>强制注入项目规则（Superpowers 用这个）</td></tr>
                    <tr><td><b>PreToolUse</b></td><td>AI 调用工具前</td><td>拦截危险命令、保护敏感文件</td></tr>
                    <tr><td><b>PostToolUse</b></td><td>AI 调用工具后</td><td>自动格式化、自动 lint</td></tr>
                    <tr><td><b>Stop</b></td><td>AI 准备结束回复</td><td>强制跑测试，没过就不许说"完成"</td></tr>
                    <tr><td><b>UserPromptSubmit</b></td><td>用户提交消息</td><td>注入额外上下文</td></tr>
                </table>

                <h4>Superpowers 的 SessionStart Hook 实战</h4>
                <pre><code>// hooks/hooks.json
{
  "hooks": {
    "SessionStart": [{
      "matcher": "startup|clear|compact",
      "hooks": [{
        "type": "command",
        "command": "\${CLAUDE_PLUGIN_ROOT}/hooks/run-hook.cmd session-start",
        "async": false
      }]
    }]
  }
}</code></pre>
                <p>这个 hook 在每次会话启动时，<b>强制把 using-superpowers/SKILL.md 全文塞进 AI 系统提示</b>——AI 跑不掉。这就是为什么 Superpowers 比纯 skill 系统强势。</p>

                <h4>Stop Hook 拦截"假装完成"</h4>
                <pre><code>// .claude/settings.json
{
  "hooks": {
    "Stop": [{
      "hooks": [{
        "type": "command",
        "command": ".ai/scripts/verify-stop.sh"
      }]
    }]
  }
}

// verify-stop.sh
#!/bin/bash
pnpm test || {
  echo '{"decision":"block","reason":"测试未通过,不许说完成"}'
  exit 0
}
echo '{"decision":"approve"}'</code></pre>

                <h3>🔒 ⑤ 三家"反 AI 偷懒"机制实测对比</h3>
                <p>同样面对"AI 装看不见规则"的问题，三家工具走了<b>完全不同的路线</b>：</p>

                <table>
                    <tr><th>工具</th><th>核心机制</th><th>真硬约束?</th></tr>
                    <tr><td><b>Spec Kit</b></td><td>结构化审计提示 + 人类必读报告</td><td>⚠️ AI 可糊弄,但你能发现</td></tr>
                    <tr><td><b>OpenSpec</b></td><td><b>TypeScript 代码硬校验</b><br/>(<code>openspec validate --strict</code>)</td><td>✅ <b>是</b>（代码层 zod schema）</td></tr>
                    <tr><td><b>Superpowers</b></td><td><b>SessionStart Hook 强注入</b><br/>+ "Iron Law" 极端语气压制</td><td>✅ <b>半是</b>（hook 是真,语气是软）</td></tr>
                </table>

                <h4>Superpowers 的 "Iron Law" 提示词工程（值得学习）</h4>
                <pre><code># verification-before-completion/SKILL.md

## The Iron Law
NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE

If you haven't run the verification command in this message,
you cannot claim it passes.

## Red Flags - STOP
- Using "should", "probably", "seems to"
- Expressing "Great!", "Perfect!", "Done!" before verification
- Thinking "just this once"

## Rationalization Prevention
| Excuse | Reality |
|--------|---------|
| "Should work now" | RUN the verification |
| "I'm tired" | Exhaustion ≠ excuse |
| "Different words so rule doesn't apply" | Spirit over letter |

**Violating the letter of this rule is violating the spirit of this rule.**</code></pre>

                <p>这是<b>教科书级别的"反偷懒提示词工程"</b>：</p>
                <ul>
                    <li>起名 <b>"Iron Law"</b>——LLM 训练数据里这种词权重高</li>
                    <li>预先列出 AI 常用的偷懒话术（"Great!" "Done!" "should"）→ 触发自我审查</li>
                    <li>预先驳斥 AI 想找的所有借口（"I'm tired" "Just this once"）</li>
                    <li>堵死"字面游戏"：<b>违反精神 = 违反规则</b></li>
                </ul>

                <h3>🎯 实战推荐：纵深防御组合</h3>
                <p>没有银弹——真正可靠的方案是<b>多层叠加</b>，每层都让"AI 装看不见"难度 +1：</p>

                <div class="mermaid">
flowchart TB
    A[Constitution 定原则<br/>📜 规则定义] --> B[OpenSpec validate<br/>🔒 代码硬校验产物]
    B --> C[Superpowers Hook<br/>🛡️ 强注入元规则]
    C --> D[Stop Hook<br/>🚪 完成前跑测试 exit 1]
    D --> E[CI 兜底<br/>🤖 PR 自动审]

    style B fill:#d4edda
    style D fill:#d4edda
    style E fill:#d4edda
                </div>

                <table>
                    <tr><th>层</th><th>作用</th><th>AI 偷懒难度</th></tr>
                    <tr><td>Constitution 定义</td><td>让 AI 知道规则</td><td>低</td></tr>
                    <tr><td>Iron Law / 红旗词</td><td>心理施压</td><td>中</td></tr>
                    <tr><td>Stop Hook 拦截</td><td>完成前强制校验</td><td>高</td></tr>
                    <tr><td>OpenSpec validate</td><td>产物结构代码校验</td><td>极高</td></tr>
                    <tr><td>CI 兜底</td><td>PR 自动审</td><td><b>不可能装看不见</b></td></tr>
                </table>

                <h3>📂 跨工具规则共享最佳实践</h3>
                <p>如果你同时用 Claude Code + Codex + Cursor，怎么做到"一份规则多家用"？</p>

                <pre><code>your-project/
├── AGENTS.md                          ← 主规则（Linux Foundation 标准）
│                                       Codex 直接读 / Cursor 也读
│
├── CLAUDE.md                          ← 内容: @AGENTS.md + Claude 专属补充
│
├── .claude/
│   └── rules/                         ← Claude 路径作用域规则
│       ├── python.md                  ← paths: ["**/*.py"]
│       └── typescript.md              ← paths: ["**/*.ts"]
│
├── .cursor/
│   └── rules/                         ← Cursor 专属
│       └── api.mdc
│
├── .github/
│   └── copilot-instructions.md        ← Copilot 专属
│
├── .agents/                           ← 跨工具 plugins + skills
│   ├── plugins/
│   │   └── marketplace.json
│   └── skills/
│       └── my-workflow/SKILL.md
│
├── .codex/                            ← Codex 私有配置
│   └── config.toml
│
└── .claude/
    └── settings.local.json            ← Hook 配置（SessionStart / Stop）</code></pre>

                <p><code>CLAUDE.md</code> 的内容：</p>
                <pre><code>@AGENTS.md

## Claude Code 专属补充
- 大改动用 plan 模式
- 优先用 .claude/skills/ 里的工作流</code></pre>

                <div class="tip-box success">
                    <span class="tip-title"><i class="fa fa-quote-left"></i> 终极一句话</span>
                    <b>AGENTS.md</b> 是宪法（跨工具）；<b>.claude/rules/</b> 等是细则（工具专属）；<b>Hook</b> 是法警（强制执行）；<b>代码校验</b> 是终极防线（AI 装不了看不见）。
                </div>

                <h3>📊 5 个层级能力矩阵</h3>
                <table>
                    <tr><th>能力</th><th>Rules</th><th>Skills</th><th>Constitution</th><th>Hook</th><th>Code Validation</th></tr>
                    <tr><td>声明规则</td><td>✅</td><td>✅</td><td>✅</td><td>—</td><td>—</td></tr>
                    <tr><td>按场景触发</td><td>❌</td><td>✅</td><td>—</td><td>✅</td><td>—</td></tr>
                    <tr><td>跨产物一致性</td><td>❌</td><td>❌</td><td>✅</td><td>—</td><td>—</td></tr>
                    <tr><td>违反必申报</td><td>❌</td><td>❌</td><td>✅</td><td>—</td><td>—</td></tr>
                    <tr><td>OS 层强制</td><td>❌</td><td>❌</td><td>❌</td><td>✅</td><td>✅</td></tr>
                    <tr><td>AI 无法绕过</td><td>❌</td><td>❌</td><td>⚠️</td><td>✅</td><td>✅</td></tr>
                    <tr><td>零成本</td><td>✅</td><td>✅</td><td>⭐⭐</td><td>⭐⭐⭐</td><td>⭐⭐⭐</td></tr>
                </table>
            `
        },
        {
            id: 'ai-vibe',
            title: '5. Vibe Coding：与 SDD 相对的另一极',
            html: `
                <p><b>Vibe Coding</b>（氛围编程）是 Andrej Karpathy 2025 年提出的概念，描述一种<b>"凭感觉用 AI 写代码"</b>的开发方式。</p>

                <h3>🌊 什么是 Vibe Coding</h3>
                <div class="tip-box">
                    <b>定义</b>：开发者用自然语言告诉 AI 想要什么，<b>不深究 AI 生成的代码细节</b>，只看效果。出了 bug 就描述给 AI 修。
                </div>

                <h3>⚖️ Vibe Coding vs SDD</h3>
                <table>
                    <tr><th></th><th>Vibe Coding</th><th>SDD</th></tr>
                    <tr><td>规约</td><td>口语化、零散</td><td>结构化、完整</td></tr>
                    <tr><td>纪律</td><td>松散</td><td>严格</td></tr>
                    <tr><td>速度</td><td>极快</td><td>较慢</td></tr>
                    <tr><td>可维护性</td><td>低</td><td>高</td></tr>
                    <tr><td>适用</td><td>原型、Demo、个人小工具</td><td>团队项目、生产系统</td></tr>
                    <tr><td>典型场景</td><td>"帮我做个 todo app"</td><td>"按 spec.md 实现登录模块"</td></tr>
                </table>

                <h3>📊 AI 编程的"纪律光谱"</h3>
                <div class="mermaid">
flowchart LR
    A[Vibe Coding<br/>纯凭感觉] --> B[Prompt 工程<br/>有套路]
    B --> C[Plan Mode<br/>先列计划]
    C --> D[SDD<br/>结构化 Spec]
    D --> E[形式化规约<br/>Z Notation/TLA+]

    style A fill:#ffebee
    style E fill:#e8f5e9
                </div>

                <h3>🎯 何时选哪个</h3>
                <table>
                    <tr><th>场景</th><th>推荐方式</th></tr>
                    <tr><td>5 分钟做个 Demo</td><td>Vibe Coding</td></tr>
                    <tr><td>个人小工具</td><td>Vibe Coding + Plan Mode</td></tr>
                    <tr><td>新项目原型</td><td>Plan Mode</td></tr>
                    <tr><td>团队协作项目</td><td><b>SDD</b></td></tr>
                    <tr><td>生产系统</td><td><b>SDD + 严格测试</b></td></tr>
                    <tr><td>关键基础设施</td><td>形式化规约</td></tr>
                </table>

                <div class="tip-box warn">
                    <span class="tip-title"><i class="fa fa-exclamation-triangle"></i> Karpathy 原话</span>
                    Vibe Coding 的代码<b>你不该用于生产</b>——它适合周末玩具项目。一旦严肃就应该升级到 SDD。
                </div>
            `
        },
        {
            id: 'ai-pop-evolution',
            title: '6. POP 在 AI 时代的演进：从 VS Code 到 AI Agent',
            html: `
                <p>面向插件编程（POP）有 30 多年历史。AI 时代把它推向了新的高度。</p>

                <h3>📜 POP 演进时间线</h3>
                <div class="timeline">
                    <div class="timeline-item">
                        <span class="year">1980s</span> Emacs Lisp Plugin —— <b>代码即插件</b>
                    </div>
                    <div class="timeline-item">
                        <span class="year">1990s</span> Photoshop Filter、Vim Plugin —— 动态库
                    </div>
                    <div class="timeline-item">
                        <span class="year">2000s</span> Eclipse OSGi —— 模块化插件框架
                    </div>
                    <div class="timeline-item">
                        <span class="year">2015</span> VS Code Extension —— <b>JSON-RPC + 独立进程</b>
                    </div>
                    <div class="timeline-item">
                        <span class="year">2023.6</span> OpenAI <b>Function Calling</b> —— 函数即插件
                    </div>
                    <div class="timeline-item">
                        <span class="year">2023.11</span> GPT Builder + Actions —— OpenAPI 插件
                    </div>
                    <div class="timeline-item">
                        <span class="year">2024.3</span> Claude Tool Use
                    </div>
                    <div class="timeline-item">
                        <span class="year">2024.11</span> <b>MCP 协议发布</b> —— 跨厂商标准
                    </div>
                    <div class="timeline-item">
                        <span class="year">2024+</span> <b>Agent Skill</b> —— 文档即插件
                    </div>
                    <div class="timeline-item">
                        <span class="year">2025</span> MCP 生态爆发，VS Code/Cursor/Claude 全支持
                    </div>
                </div>

                <h3>🎭 三种插件形态对比</h3>
                <table>
                    <tr><th>类型</th><th>形式</th><th>执行者</th><th>典型</th></tr>
                    <tr><td>经典插件</td><td>编译后代码</td><td>CPU</td><td>VS Code Extension</td></tr>
                    <tr><td>Function Call</td><td>函数 + JSON Schema</td><td>程序 + LLM 决策</td><td>OpenAI / Claude Tool Use</td></tr>
                    <tr><td>MCP 工具</td><td>独立进程 + JSON-RPC</td><td>独立程序 + LLM</td><td>MCP Server</td></tr>
                    <tr><td><b>Agent Skill</b></td><td><b>Markdown 文档</b></td><td><b>LLM 阅读 + 推理</b></td><td>Claude Code Skill</td></tr>
                </table>

                <h3>🧩 POP 4 大特征 vs AI 实现</h3>
                <div class="mermaid">
flowchart TB
    POP[POP 4 大特征]
    POP --> A[① 接口契约]
    POP --> B[② 按规范实现]
    POP --> C[③ 动态发现加载]
    POP --> D[④ 隔离 + 生命周期]

    A -.映射.-> A2[JSON Schema / YAML Frontmatter]
    B -.映射.-> B2[符合 schema 的 function / Markdown]
    C -.映射.-> C2[tools/list 协议 / skills 目录扫描]
    D -.映射.-> D2[独立进程 / 文件隔离]
                </div>

                <div class="tip-box success">
                    <b>关键洞察</b>：<b>LLM 时代第一次让"Markdown 文档"成为正式的可发现、可加载、可执行的插件</b>。
                    以前插件=代码（机器执行），现在插件可以是文档（AI 阅读后执行）。
                </div>
            `
        },
        {
            id: 'ai-function-call',
            title: '7. Function Call：函数即插件',
            html: `
                <p><b>Function Call</b> = 让 LLM 能调用外部函数的协议。OpenAI 2023.6 提出后成为业界标准。</p>

                <h3>🔄 工作流程</h3>
                <div class="mermaid">
sequenceDiagram
    User->>LLM: 帮我查北京天气
    LLM->>LLM: 看到 tools 列表
    LLM-->>App: tool_call: get_weather(city="北京")
    App->>WeatherAPI: 调用真实 API
    WeatherAPI-->>App: {temp: 22}
    App->>LLM: tool_result: {temp: 22}
    LLM-->>User: 北京今天 22 度
                </div>

                <h3>💻 代码示例</h3>
                <pre><code class="language-python">tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",                # 插件名
            "description": "查询指定城市天气",     # 插件说明
            "parameters": {                        # 接口契约（JSON Schema）
                "type": "object",
                "properties": {
                    "city": {"type": "string", "description": "城市名"}
                },
                "required": ["city"]
            }
        }
    }
]

response = openai.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "北京天气"}],
    tools=tools                                    # 注册插件
)

# LLM 返回的 tool_call，由你执行真实函数
if response.choices[0].message.tool_calls:
    tc = response.choices[0].message.tool_calls[0]
    args = json.loads(tc.function.arguments)
    result = real_get_weather(args["city"])        # 你的真实实现
    # 把结果喂回 LLM 让它生成最终回答</code></pre>

                <h3>🧩 POP 视角看 Function Call</h3>
                <table>
                    <tr><th>POP 概念</th><th>Function Call 对应</th></tr>
                    <tr><td>主程序 Host</td><td>LLM (GPT/Claude)</td></tr>
                    <tr><td>插件接口</td><td>JSON Schema 函数签名</td></tr>
                    <tr><td>插件实现</td><td>你定义的每个 function</td></tr>
                    <tr><td>注册表</td><td><code>tools=[...]</code> 数组</td></tr>
                    <tr><td>加载机制</td><td>把工具 schema 注入 prompt</td></tr>
                    <tr><td>调用机制</td><td>LLM 返回 <code>tool_call</code></td></tr>
                </table>

                <h3>🌟 各家实现对比</h3>
                <table>
                    <tr><th>厂商</th><th>名称</th><th>协议</th></tr>
                    <tr><td>OpenAI</td><td>Function Calling / Tools</td><td>JSON Schema</td></tr>
                    <tr><td>Anthropic</td><td>Tool Use</td><td>JSON Schema</td></tr>
                    <tr><td>Google</td><td>Function Calling (Gemini)</td><td>JSON Schema</td></tr>
                    <tr><td>Meta</td><td>Llama Tool Use</td><td>JSON Schema</td></tr>
                </table>
                <p>→ 业界已形成<b>"JSON Schema 描述工具"</b>的事实标准。</p>
            `
        },
        {
            id: 'ai-mcp',
            title: '8. MCP：AI 的 USB-C 标准',
            html: `
                <p><b>MCP（Model Context Protocol）</b> = Anthropic 2024.11 提出的<b>跨厂商插件协议</b>。把 Function Call 升级成"<b>标准化、跨语言、跨进程、可发现</b>"的生态。</p>

                <h3>🏗 MCP 架构</h3>
                <div class="mermaid">
flowchart LR
    subgraph Host[Host: Claude/VS Code/Cursor]
        LLM[LLM]
        Client[MCP Client<br/>插件管理器]
    end
    subgraph Servers[MCP Servers - 独立进程]
        S1[GitHub Server]
        S2[Filesystem Server]
        S3[Slack Server]
        S4[你自己写的 Server]
    end
    LLM <--> Client
    Client <-->|JSON-RPC<br/>stdio/SSE| S1
    Client <-->|JSON-RPC| S2
    Client <-->|JSON-RPC| S3
    Client <-->|JSON-RPC| S4
                </div>

                <h3>🆚 Function Call vs MCP</h3>
                <table>
                    <tr><th>维度</th><th>Function Call</th><th>MCP</th></tr>
                    <tr><td>作用域</td><td>单进程</td><td>跨进程/跨网络</td></tr>
                    <tr><td>传输</td><td>内存调用</td><td>JSON-RPC over stdio/SSE/WS</td></tr>
                    <tr><td>标准化</td><td>各家不同</td><td><b>统一标准</b></td></tr>
                    <tr><td>生态</td><td>自己写自己用</td><td><b>像 npm 一样可分享</b></td></tr>
                    <tr><td>能力</td><td>仅函数</td><td>函数 + 资源 + Prompt 模板 + Sampling</td></tr>
                    <tr><td>发现</td><td>硬编码</td><td>动态 <code>tools/list</code></td></tr>
                    <tr><td>隔离</td><td>同进程</td><td>独立进程，崩了不影响</td></tr>
                </table>

                <h3>📝 写一个 MCP Server</h3>
                <pre><code class="language-python">from mcp import Server

server = Server("my-tools")

@server.tool()                          # 注册插件函数
async def search_web(query: str) -> str:
    """搜索网络"""
    return await google_search(query)

@server.tool()
async def get_time() -> str:
    """获取当前时间"""
    return datetime.now().isoformat()

server.run(transport="stdio")</code></pre>

                <pre><code class="language-json">// Claude Desktop 配置：声明用哪些 MCP Server
{
    "mcpServers": {
        "my-tools": {
            "command": "python",
            "args": ["my_server.py"]
        }
    }
}</code></pre>

                <h3>🆚 经典插件 vs MCP</h3>
                <table>
                    <tr><th>维度</th><th>VS Code Extension</th><th>MCP</th></tr>
                    <tr><td>主程序</td><td>VS Code</td><td>LLM</td></tr>
                    <tr><td>接口契约</td><td>TypeScript API</td><td>JSON Schema</td></tr>
                    <tr><td>语言限制</td><td>仅 TS/JS</td><td><b>任何语言</b></td></tr>
                    <tr><td>注册方式</td><td>package.json</td><td>mcp config</td></tr>
                    <tr><td>通信</td><td>IPC + JSON</td><td>JSON-RPC</td></tr>
                    <tr><td>隔离</td><td>Extension Host</td><td>独立进程</td></tr>
                </table>

                <h3>🎯 MCP 提供的 4 类原语</h3>
                <ul>
                    <li><b>Tools</b>：可执行函数（对应 Function Call）</li>
                    <li><b>Resources</b>：可读取的资源（文件、API 数据）</li>
                    <li><b>Prompts</b>：预定义 Prompt 模板</li>
                    <li><b>Sampling</b>：让 Server 反向请求 LLM 生成内容</li>
                </ul>

                <div class="tip-box success">
                    <span class="tip-title"><i class="fa fa-star"></i> 一句话定位</span>
                    <b>MCP = LLM 时代的 "VS Code Extension 系统"</b>——目标是让 AI 拥有像编辑器一样丰富的插件生态。
                </div>
            `
        },
        {
            id: 'ai-skill',
            title: '9. Agent Skill：文档即插件',
            html: `
                <p><b>Agent Skill</b> 是 AI Agent 时代<b>最革命性的新形态</b>——让 Markdown 文档成为可被主程序发现、加载、执行的插件。</p>

                <h3>🆚 硬插件 vs 软插件</h3>
                <div class="mermaid">
flowchart LR
    subgraph Hard[硬插件 MCP/FC]
        Code1[代码逻辑]
        Code1 -->|执行| Result1[确定性结果]
    end
    subgraph Soft[软插件 Skill]
        Doc[Markdown 文档]
        Doc -->|被读取| LLM[LLM 大脑]
        LLM -->|按指引行动| Result2[智能化结果]
    end
                </div>

                <table>
                    <tr><th>维度</th><th>MCP / Function Call</th><th>Agent Skill</th></tr>
                    <tr><td>形式</td><td>代码</td><td><b>Markdown 文档</b></td></tr>
                    <tr><td>执行者</td><td>计算机 CPU</td><td><b>LLM 大脑</b></td></tr>
                    <tr><td>提供什么</td><td>确定的能力（函数）</td><td>方法论 + 行动指引</td></tr>
                    <tr><td>触发</td><td>LLM 主动调用</td><td>LLM 阅读后内化</td></tr>
                    <tr><td>粒度</td><td>单个工具</td><td>完整工作流</td></tr>
                    <tr><td>结果</td><td>确定性</td><td>智能化决策</td></tr>
                </table>

                <h3>📝 Skill 文件结构</h3>
                <pre><code class="language-markdown">---
name: testing-skill                        # 插件名
description: Use when writing tests...     # 何时触发（关键！）
---

# Testing Best Practices                   # 详细内容

## Step 1: Understand the codebase
...
## Step 2: Write failing test first
...
## Step 3: Implement minimal code
...</code></pre>

                <h3>🔄 Skill 加载流程</h3>
                <div class="mermaid">
flowchart TB
    Start[会话开始] --> Scan[扫描所有 skills/*.md]
    Scan --> Meta[读取 frontmatter]
    Meta --> Inject[把 name + description 注入系统提示]
    Inject --> LLM[LLM 看到工具清单]
    User[用户提问] --> LLM
    LLM --> Match{描述匹配?}
    Match -->|是| Read[读取完整 SKILL.md]
    Match -->|否| Normal[正常回答]
    Read --> Follow[按 SKILL 内容执行]
                </div>

                <h3>🧩 POP 视角：Skill 完美符合 POP 4 大特征</h3>
                <table>
                    <tr><th>POP 特征</th><th>Skill 实现</th></tr>
                    <tr><td>接口契约</td><td>YAML Frontmatter 规范</td></tr>
                    <tr><td>按规范实现</td><td>Markdown + 特定结构</td></tr>
                    <tr><td>注册表</td><td><code>skills/</code> 目录扫描</td></tr>
                    <tr><td>动态加载</td><td><code>read_file SKILL.md</code></td></tr>
                    <tr><td>生命周期</td><td>会话级（每次启动重新发现）</td></tr>
                </table>

                <h3>📂 多级 Skill 体系（真实案例）</h3>
                <pre><code class="language-text">~/.claude/skills/                       # 用户级（全局）
~/.vscode/agent-plugins/.../skills/     # 工具级（特定 IDE）
/Applications/.../skills/               # 应用级（内置）
.agents/skills/                         # 项目级</code></pre>
                <p>→ <b>跟 VS Code 的多级 extension 体系一模一样</b>。</p>

                <h3>🤝 Skill 与其他能力的协同</h3>
                <div class="mermaid">
flowchart TB
    AI[AI Agent]
    AI --> Hard[硬能力层]
    AI --> Soft[软智慧层]
    Hard --> FC[Function Call<br/>具体函数]
    Hard --> MCP[MCP Server<br/>跨进程工具]
    Soft --> Skill[Skill<br/>方法论/工作流]
    Soft --> Memory[Memory<br/>长期记忆]
    Soft --> Rules[Rules<br/>项目规则]
                </div>

                <p><b>示例</b>：让 AI 写测试时——</p>
                <ul>
                    <li><b>Skill</b>（<code>tdd.md</code>）告诉 AI "TDD 三步法的步骤"</li>
                    <li><b>MCP 工具</b>（<code>pytest-mcp</code>）给 AI <code>run_tests()</code> 能力</li>
                    <li><b>Function Call</b>（<code>create_file</code>）给 AI 写文件能力</li>
                    <li><b>Memory</b> 记得"这个项目用 pytest 不用 unittest"</li>
                </ul>

                <div class="tip-box success">
                    <span class="tip-title"><i class="fa fa-star"></i> 时代意义</span>
                    Agent Skill 第一次让"自然语言写的文档"成为<b>正式的、可发现的、可执行的插件</b>。
                    这是只有 LLM 时代才可能出现的范式。
                </div>
            `
        },
        {
            id: 'ai-push-family',
            title: '10. 推送模式全家桶：响应式 ↔ SSE ↔ MQ',
            html: `
                <p>响应式编程、SSE、WebSocket、消息队列、Observer 模式...它们<b>本质都是"推送模式"的家族成员</b>，只是<b>距离不同</b>。</p>

                <h3>🌐 推送模式家族</h3>
                <div class="mermaid">
flowchart TB
    Push[推送模式 Push Mode<br/>核心: 数据主动找你<br/>不是你主动找数据]
    Push --> Net[网络层]
    Push --> App[应用层]
    Push --> Lang[语言/框架层]

    Net --> SSE[SSE<br/>HTTP 单向推]
    Net --> WS[WebSocket<br/>双向推]
    Net --> Long[长轮询<br/>伪推送]

    App --> MQ[消息队列<br/>Kafka/RabbitMQ]
    App --> Redis[Redis Pub/Sub]
    App --> Event[EventEmitter]

    Lang --> Rx[RxJS/Reactor<br/>响应式流]
    Lang --> Sig[Vue/Solid Signals<br/>响应式信号]
    Lang --> Cb[回调/Promise]
                </div>

                <h3>📏 按"距离"分层</h3>
                <table>
                    <tr><th>距离</th><th>用什么</th></tr>
                    <tr><td>同一函数内</td><td>普通回调</td></tr>
                    <tr><td>同一进程内</td><td>EventEmitter / 响应式编程</td></tr>
                    <tr><td>同一机器内</td><td>Unix Socket、共享内存</td></tr>
                    <tr><td>同一局域网</td><td>TCP / WebSocket</td></tr>
                    <tr><td>跨互联网</td><td>SSE / WebSocket / HTTP</td></tr>
                    <tr><td>跨服务</td><td>Kafka / RabbitMQ / NATS</td></tr>
                    <tr><td>跨硬件</td><td>中断 / DMA</td></tr>
                </table>

                <h3>🔍 关键对应关系</h3>
                <table>
                    <tr><th>概念</th><th>SSE 中叫</th><th>响应式中叫</th><th>MQ 中叫</th></tr>
                    <tr><td>数据源</td><td>Server</td><td><code>ref()</code> / Subject</td><td>Topic / Producer</td></tr>
                    <tr><td>订阅者</td><td>EventSource</td><td>effect / Observer</td><td>Consumer</td></tr>
                    <tr><td>建立订阅</td><td><code>new EventSource()</code></td><td>读取 <code>.value</code></td><td><code>subscribe()</code></td></tr>
                    <tr><td>推送</td><td><code>res.write(...)</code></td><td><code>ref.value = x</code></td><td><code>producer.send()</code></td></tr>
                    <tr><td>断开</td><td><code>es.close()</code></td><td>effect 销毁</td><td><code>consumer.close()</code></td></tr>
                </table>

                <h3>🔗 打通一条响应式链路</h3>
                <div class="mermaid">
flowchart LR
    DB[(数据库变化)] --> Backend[后端响应式]
    Backend -->|SSE 推送| Network[网络]
    Network --> Frontend[前端响应式]
    Frontend --> UI[UI 自动更新]
                </div>

                <pre><code class="language-typescript">// 后端：数据库变化 → 响应式流
const userStream$ = new Subject&lt;User&gt;();
db.watchCollection('users').on('change', u => userStream$.next(u));

// 通过 SSE 推到前端
app.get('/sse', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    userStream$.subscribe(u => res.write(\`data: \${JSON.stringify(u)}\\n\\n\`));
});

// 前端：把 SSE 接回响应式
const user$ = new Observable(sub => {
    const es = new EventSource('/sse');
    es.onmessage = e => sub.next(JSON.parse(e.data));
});

user$.pipe(
    filter(u => u.active),
    map(u => u.name)
).subscribe(name => uiRef.value = name);</code></pre>

                <h3>🎓 共同祖宗：观察者模式</h3>
                <div class="mermaid">
flowchart LR
    O[观察者模式<br/>1994 GoF]
    O --> EE[EventEmitter]
    O --> Rx[ReactiveX 2009]
    O --> Sig[Signal]
    O --> SSE[SSE 2009]
    O --> WS[WebSocket 2011]
    O --> MQ[消息队列]
                </div>

                <div class="tip-box success">
                    <b>所有"推送系统"都是观察者模式的延伸</b>——只是在不同距离、不同协议、不同抽象层上。
                </div>
            `
        },
        {
            id: 'ai-glossary',
            title: '11. AI 时代术语速查',
            html: `
                <h3>🤖 LLM / Agent 核心术语</h3>
                <table>
                    <tr><th>术语</th><th>说明</th></tr>
                    <tr><td><b>LLM</b></td><td>Large Language Model 大语言模型</td></tr>
                    <tr><td><b>Token</b></td><td>LLM 处理的最小单元，约等于"半个汉字 / 1 个英文单词"</td></tr>
                    <tr><td><b>Context Window</b></td><td>上下文窗口，LLM 一次能读的 token 数</td></tr>
                    <tr><td><b>Prompt</b></td><td>给 LLM 的输入指令</td></tr>
                    <tr><td><b>System Prompt</b></td><td>系统级指令，定义 LLM 角色与规则</td></tr>
                    <tr><td><b>Few-Shot</b></td><td>给几个示例让 LLM 学会模式</td></tr>
                    <tr><td><b>Chain-of-Thought (CoT)</b></td><td>让 LLM 一步步推理</td></tr>
                    <tr><td><b>ReAct</b></td><td>Reasoning + Acting，思考-行动循环</td></tr>
                    <tr><td><b>RAG</b></td><td>Retrieval-Augmented Generation 检索增强生成</td></tr>
                    <tr><td><b>Embedding</b></td><td>把文本转成向量，用于语义搜索</td></tr>
                    <tr><td><b>Vector DB</b></td><td>向量数据库：Pinecone、Weaviate、Qdrant、Milvus</td></tr>
                    <tr><td><b>Fine-tuning</b></td><td>微调，用专门数据再训练 LLM</td></tr>
                    <tr><td><b>LoRA</b></td><td>Low-Rank Adaptation 轻量微调</td></tr>
                    <tr><td><b>Quantization</b></td><td>量化，减小模型大小（4bit/8bit）</td></tr>
                    <tr><td><b>Hallucination</b></td><td>幻觉，LLM 编造看似合理的错误信息</td></tr>
                </table>

                <h3>🛠 Agent 框架与工具</h3>
                <table>
                    <tr><th>名称</th><th>用途</th></tr>
                    <tr><td><b>LangChain</b></td><td>LLM 应用开发框架</td></tr>
                    <tr><td><b>LlamaIndex</b></td><td>专注 RAG 的框架</td></tr>
                    <tr><td><b>LangGraph</b></td><td>有状态 Agent 工作流</td></tr>
                    <tr><td><b>AutoGen</b></td><td>Microsoft 多 Agent 协作</td></tr>
                    <tr><td><b>CrewAI</b></td><td>角色扮演式多 Agent</td></tr>
                    <tr><td><b>Cursor</b></td><td>AI 优先 IDE</td></tr>
                    <tr><td><b>Cline</b></td><td>VS Code 内的 AI Agent</td></tr>
                    <tr><td><b>Aider</b></td><td>命令行 AI 编程助手</td></tr>
                    <tr><td><b>Devin</b></td><td>全自主 AI 工程师</td></tr>
                    <tr><td><b>GitHub Copilot</b></td><td>代码补全 + Chat + Agent</td></tr>
                    <tr><td><b>Claude Code</b></td><td>Anthropic 的命令行 Agent</td></tr>
                </table>

                <h3>📡 协议与标准</h3>
                <table>
                    <tr><th>协议</th><th>用途</th></tr>
                    <tr><td><b>MCP</b></td><td>Model Context Protocol，跨厂商插件协议</td></tr>
                    <tr><td><b>OpenAI Function Calling</b></td><td>事实标准的工具调用协议</td></tr>
                    <tr><td><b>SSE</b></td><td>Server-Sent Events，LLM 流式输出常用</td></tr>
                    <tr><td><b>JSON-RPC 2.0</b></td><td>MCP 的底层传输</td></tr>
                    <tr><td><b>OpenAPI</b></td><td>API 描述标准，GPT Actions 用它</td></tr>
                </table>

                <h3>📝 配置文件家族</h3>
                <table>
                    <tr><th>文件</th><th>用途</th></tr>
                    <tr><td><code>.cursorrules</code></td><td>Cursor 项目规则</td></tr>
                    <tr><td><code>CLAUDE.md</code></td><td>Claude Code 项目说明</td></tr>
                    <tr><td><code>AGENTS.md</code></td><td>Aider/通用 Agent 说明</td></tr>
                    <tr><td><code>.github/copilot-instructions.md</code></td><td>Copilot 项目级指令</td></tr>
                    <tr><td><code>.vscode/mcp.json</code></td><td>VS Code MCP 配置</td></tr>
                    <tr><td><code>skills/SKILL.md</code></td><td>Agent Skill 定义</td></tr>
                    <tr><td><code>.instructions.md</code></td><td>VS Code 自定义指令</td></tr>
                </table>

                <h3>🎯 关键概念速查</h3>
                <table>
                    <tr><th>概念</th><th>一句话定义</th></tr>
                    <tr><td><b>AI Agent</b></td><td>能感知-决策-行动的智能体（LLM + 工具 + 记忆）</td></tr>
                    <tr><td><b>Multi-Agent</b></td><td>多个 Agent 协作完成任务</td></tr>
                    <tr><td><b>Tool Use / Function Call</b></td><td>LLM 调用外部函数的能力</td></tr>
                    <tr><td><b>Sub-Agent</b></td><td>主 Agent 委托给的下属 Agent</td></tr>
                    <tr><td><b>Memory</b></td><td>长期/短期记忆，跨会话保留</td></tr>
                    <tr><td><b>Context Engineering</b></td><td>上下文工程：管理给 LLM 的输入</td></tr>
                    <tr><td><b>Prompt Engineering</b></td><td>提示工程：精心设计指令</td></tr>
                    <tr><td><b>Vibe Coding</b></td><td>凭感觉用 AI 写代码（Karpathy 2025）</td></tr>
                    <tr><td><b>SDD</b></td><td>Spec-Driven Development 规约驱动开发</td></tr>
                    <tr><td><b>Knowledge Cutoff</b></td><td>知识截止日期，LLM 不知之后的事</td></tr>
                    <tr><td><b>Streaming</b></td><td>流式输出，LLM 一个 token 一个 token 吐</td></tr>
                    <tr><td><b>Sampling</b></td><td>采样策略：temperature / top-p / top-k</td></tr>
                </table>

                <h3>🏁 最终图：AI 时代编程的完整脉络</h3>
                <div class="mermaid">
mindmap
    root((AI 时代编程))
        新方法论
            SDD 规约驱动
            Vibe Coding 氛围编程
            Prompt 工程
            Context 工程
        新插件形态
            Function Call
            MCP 协议
            Agent Skill
            Cursor Rules
            CLAUDE.md
        新协议标准
            JSON Schema
            JSON-RPC
            SSE/WebSocket
            MCP
        新工具链
            Cursor/Cline
            Aider/Devin
            LangChain/LangGraph
            Claude Code
        新能力
            RAG
            Multi-Agent
            Tool Use
            Long Context
        新挑战
            幻觉控制
            上下文管理
            成本优化
            可解释性
                </div>

                <div class="tip-box success" style="margin-top: 30px;">
                    <span class="tip-title"><i class="fa fa-trophy"></i> 总结</span>
                    <b>AI 时代编程的本质</b>：
                    <ol>
                        <li><b>自然语言成为新的源代码</b>（SDD / Prompt）</li>
                        <li><b>文档成为可执行插件</b>（Agent Skill / Rules）</li>
                        <li><b>AI 成为系统一等公民</b>（Function Call / MCP / Agent）</li>
                    </ol>
                    程序员的核心能力正在从"写代码"转向"<b>设计意图 + 编排 AI</b>"。
                </div>
            `
        }
    ]
});
