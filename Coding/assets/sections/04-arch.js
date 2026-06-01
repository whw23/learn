/* 架构模式 */
window.SECTIONS.push({
    id: 'arch',
    title: '🏛️ 架构模式',
    icon: 'fa-building',
    intro: `
        <p><b>架构模式（Architectural Pattern）</b>是对整个系统结构的高层组织方案。比设计模式粒度更大、影响更深远。</p>

        <h2>📊 架构演进图</h2>
        <div class="mermaid">
flowchart LR
    A[单体 Monolith] --> B[分层 Layered]
    B --> C[MVC]
    C --> D[MVP/MVVM]
    B --> E[六边形/整洁架构]
    A --> F[SOA 面向服务]
    F --> G[微服务 Microservices]
    G --> H[Serverless]
    G --> I[Service Mesh]
    A --> J[事件驱动 EDA]
    A --> K[管道-过滤器]
        </div>
    `,
    subs: [
        {
            id: 'arch-mvc-family',
            title: '1. MVC / MVP / MVVM 家族',
            html: `
                <h3>MVC（Model-View-Controller）</h3>
                <p>把应用拆三层：数据、视图、控制器。<b>Controller 是主导</b>。</p>
                <div class="mermaid">
flowchart LR
    User -->|操作| V[View]
    V -->|事件| C[Controller]
    C -->|更新| M[Model]
    M -->|数据变化| V
                </div>

                <h3>MVP（Model-View-Presenter）</h3>
                <p>View 完全被动，Presenter 通过接口操作 View。<b>易测试</b>。Android 早期常用。</p>

                <h3>MVVM（Model-View-ViewModel）</h3>
                <p>ViewModel 与 View <b>双向绑定</b>，开发者只关注数据。Vue/WPF/SwiftUI。</p>
                <div class="mermaid">
flowchart LR
    V[View] <-->|双向绑定| VM[ViewModel]
    VM --> M[Model]
                </div>

                <table>
                    <tr><th></th><th>MVC</th><th>MVP</th><th>MVVM</th></tr>
                    <tr><td>View 与 Model</td><td>可以通信</td><td>完全隔离</td><td>通过 VM 绑定</td></tr>
                    <tr><td>主导者</td><td>Controller</td><td>Presenter</td><td>数据驱动</td></tr>
                    <tr><td>典型框架</td><td>Spring MVC</td><td>Android MVP</td><td>Vue/React+Redux</td></tr>
                </table>
            `
        },

        // ============================================================
        // 跨领域思想类比：镜像同步家族
        // ============================================================
        {
            id: 'arch-mirror-family',
            title: '2. 跨领域类比 · 镜像同步思想家族（MVVM ↔ 数字孪生）',
            html: `
                <p><b>"给真实对象建一个数字镜像，两者实时双向同步"</b>——这个思想骨架在多个领域反复出现，
                看似无关的概念其实是同一棵知识树上的不同叶子。</p>

                <h3>🌳 镜像/代理思想家族全景</h3>
                <div class="mermaid">
flowchart TB
    Common[共同思想: 镜像 + 代理 + 同步]
    Common --> MVVM[MVVM<br/>UI ↔ 业务数据]
    Common --> DT[数字孪生 Digital Twin<br/>物理 ↔ 虚拟]
    Common --> VDOM[Virtual DOM<br/>真实 DOM ↔ 内存镜像]
    Common --> Shadow[Shadow DOM<br/>Web Components]
    Common --> AWS[AWS IoT Device Shadow<br/>设备 ↔ 云端镜像]
    Common --> Proxy[代理模式 Proxy<br/>真实对象 ↔ 代理]
    Common --> Reflect[反射 / 元对象<br/>对象 ↔ 元描述]
    Common --> CQRS[CQRS<br/>写模型 ↔ 读模型]
    Common --> CDC[CDC 变更数据捕获<br/>DB ↔ 下游镜像]
                </div>

                <h3>🤝 MVVM ↔ 数字孪生：本质完全一致</h3>
                <table>
                    <tr><th>维度</th><th>MVVM</th><th>数字孪生</th></tr>
                    <tr><td>真实方</td><td>Model（业务数据）</td><td>物理实体（设备/工厂）</td></tr>
                    <tr><td>镜像方</td><td>ViewModel</td><td>Digital Twin</td></tr>
                    <tr><td>同步机制</td><td>数据绑定（响应式）</td><td>传感器 + 实时通信</td></tr>
                    <tr><td>方向</td><td>双向（View ↔ VM ↔ M）</td><td>双向（物理 ↔ 数字）</td></tr>
                    <tr><td>目的</td><td>解耦 UI 与业务</td><td>解耦物理与分析/仿真</td></tr>
                    <tr><td>代表</td><td>Vue / Knockout / WPF</td><td>Azure Digital Twins / Unity Industrial</td></tr>
                </table>

                <div class="tip-box success">
                    <span class="tip-title"><i class="fa fa-lightbulb-o"></i> 核心哲学一致</span>
                    <b>"复杂对象不要直接暴露给上层，给它做一个可观测、可操作的代理镜像"</b>。
                </div>

                <h3>🔍 关键差别：规模和距离</h3>
                <table>
                    <tr><th>维度</th><th>MVVM</th><th>数字孪生</th></tr>
                    <tr><td>作用域</td><td>单进程 / 同一台机器</td><td>跨地域分布式</td></tr>
                    <tr><td>同步介质</td><td>内存中的函数调用</td><td>MQTT / Kafka / 5G</td></tr>
                    <tr><td>延迟容忍</td><td>毫秒级</td><td>秒级也接受</td></tr>
                    <tr><td>故障代价</td><td>UI 不刷新</td><td>工厂停机、生命危险</td></tr>
                    <tr><td>核心目的</td><td>UI 渲染解耦</td><td>仿真、预测、远程操控</td></tr>
                    <tr><td>典型规模</td><td>几十~几百个字段</td><td>几万~几百万个数据点</td></tr>
                </table>

                <h3>🌐 共同的底层：响应式 + 推送</h3>
                <p>所有"镜像同步"思想都建立在<b>响应式 + 推送模式</b>之上：</p>
                <div class="mermaid">
flowchart LR
    R[响应式编程核心] --> A[推送模式: 变化时主动通知]
    R --> B[依赖追踪: 谁依赖谁]
    R --> C[自动同步: 源头变 镜像变]
    A --> MVVM2[MVVM]
    A --> DT2[数字孪生]
    A --> VDOM2[Virtual DOM]
                </div>

                <h3>💻 完整例子：风电监控系统（接力赛式镜像链）</h3>
                <pre><code class="language-python"># 1️⃣ 数据孪生层：远距离物理镜像
class WindTurbineTwin:
    def __init__(self):
        self.rpm = 0
        self.temp = 0
        self.power = 0
    def on_sensor_data(self, data):
        self.rpm = data['rpm']; self.temp = data['temp']
    def set_pitch(self, angle):
        send_command_to_turbine(self.id, 'pitch', angle)</code></pre>

                <pre><code class="language-javascript">// 2️⃣ MVVM 层：近距离 UI 镜像
const turbineVM = reactive({
    rpm: 0, temp: 0, power: 0,
    isAlarmRed: computed(() => turbineVM.temp > 80),
})

// 数据孪生 → ViewModel 自动同步
twinClient.subscribe(data => {
    turbineVM.rpm = data.rpm
    turbineVM.temp = data.temp
})

// 用户点击 → ViewModel → 数据孪生 → 物理设备
function emergencyStop() {
    turbineTwin.setStatus('stop')
}</code></pre>

                <div class="mermaid">
flowchart LR
    Phy[物理风机] <-->|传感器/指令| Twin[数据孪生]
    Twin <-->|响应式订阅| VM[ViewModel]
    VM <-->|双向绑定| UI[操作员界面]
                </div>
                <p><b>整个链路就是镜像的"接力赛"</b>：物理 → 数字孪生 → ViewModel → View。</p>

                <h3>🎯 你天天用的"数据孪生"</h3>
                <table>
                    <tr><th>看起来是普通功能</th><th>其实是数字孪生</th></tr>
                    <tr><td>微信"位置共享"</td><td>手机 ↔ 朋友看到的位置点</td></tr>
                    <tr><td>iPhone "查找"</td><td>设备 ↔ 云端位置镜像</td></tr>
                    <tr><td>滴滴司机地图</td><td>司机车辆 ↔ 乘客看到的小车</td></tr>
                    <tr><td>手机银行余额</td><td>账户 ↔ 你看到的数字</td></tr>
                    <tr><td>智能家居 App</td><td>真实灯泡 ↔ App 里的开关</td></tr>
                    <tr><td>Google Docs 协同编辑</td><td>你的输入 ↔ 别人看到的字</td></tr>
                    <tr><td>飞行模拟器</td><td>真飞机数据 ↔ 训练舱</td></tr>
                </table>
                <p>→ <b>任何"远程显示真实状态 + 远程操控"的应用 = 数字孪生</b>。</p>

                <h3>🏭 数字孪生主流平台</h3>
                <ul>
                    <li><b>Azure Digital Twins</b>（微软）</li>
                    <li><b>AWS IoT Device Shadow</b>（亚马逊）</li>
                    <li><b>NVIDIA Omniverse</b>（图形孪生）</li>
                    <li><b>Siemens MindSphere / Xcelerator</b>（工业）</li>
                    <li><b>达索 3DEXPERIENCE</b></li>
                    <li><b>Unity Industrial / Unreal Twinmotion</b></li>
                </ul>

                <h3>🤖 AI 时代的延伸</h3>
                <p>同一思想在 AI 领域继续演化：</p>
                <div class="mermaid">
flowchart LR
    R[真实世界状态] --> Agent[AI Agent]
    Agent --> Mem[Memory<br/>世界模型镜像]
    Mem -->|推理| Action[行动决策]
    Action -.->|改变| R
                </div>
                <ul>
                    <li><b>Memory</b> = AI 对世界的"孪生认知"</li>
                    <li><b>World Model</b> = AI 内部的世界模拟</li>
                    <li><b>RAG 知识库</b> = 业务系统的"数字镜像"</li>
                </ul>

                <h3>📝 一句话总结</h3>
                <div class="tip-box success">
                    <b>MVVM ↔ 数字孪生本质完全相同</b>：都是"给真实对象建数字镜像 + 实时双向同步"。<br/>
                    区别只是<b>规模和距离</b>：
                    <ul>
                        <li><b>MVVM</b> = UI 层的"微型孪生"（一个进程内、几个字段）</li>
                        <li><b>数据孪生</b> = 跨地域的"宏观孪生"（跨网络、百万数据点）</li>
                    </ul>
                    共同祖先：观察者模式 + 代理模式 + 响应式编程 + 推送/订阅。<br/>
                    <b>这是"理解抽象本质"的能力体现</b>——发现不同领域共享同一思想骨架。
                </div>
            `
        },

        {
            id: 'arch-layered',
            title: '3. 分层架构（Layered）',
            html: `
                <p>系统分为多层，每层只依赖下一层。是最经典、最广泛使用的架构。</p>
                <p>详细内容见下一大章 <a href="#layer">后端分层架构</a>。</p>
            `
        },
        {
            id: 'arch-hexagonal',
            title: '4. 六边形架构 / 整洁架构 / 洋葱架构',
            html: `
                <p>三者思想一致：<b>业务核心独立，外部细节（DB/UI/框架）都通过适配器接入</b>。</p>

                <div class="mermaid">
flowchart TB
    subgraph Outer[外层 - 框架/DB/UI]
        UI[Web UI]
        DB[(Database)]
        MQ[消息队列]
    end
    subgraph Middle[适配器层 Adapter]
        WebCtrl[Web Controller]
        Repo[Repository Impl]
        Pub[Publisher]
    end
    subgraph Core[内核 - 业务领域]
        UseCase[用例 UseCase]
        Domain[领域模型 + 规则]
    end
    UI --> WebCtrl --> UseCase --> Domain
    UseCase --> Repo --> DB
    UseCase --> Pub --> MQ
                </div>

                <h3>核心理念</h3>
                <ul>
                    <li><b>依赖方向永远向内</b>：外层依赖内层，内层不知道外层</li>
                    <li><b>端口与适配器</b>（Ports & Adapters）：内层定义接口（端口），外层实现（适配器）</li>
                    <li><b>业务核心可独立测试</b>，无需启动数据库或 Web 服务器</li>
                </ul>

                <div class="tip-box success">
                    <span class="tip-title"><i class="fa fa-star"></i> 优势</span>
                    替换 ORM、换 Web 框架、加新通道（CLI/MQ）都只动外层。
                </div>
            `
        },
        {
            id: 'arch-ddd',
            title: '5. DDD（领域驱动设计）',
            html: `
                <p><b>Domain-Driven Design</b>：以"业务领域"为中心组织代码，与业务专家用<b>统一语言</b>沟通。</p>

                <h3>🎯 核心 3 句话</h3>
                <ol>
                    <li><b>统一语言</b>：业务说啥，代码就叫啥</li>
                    <li><b>充血模型</b>：业务规则在 Entity 里，不在 Service</li>
                    <li><b>领域为王</b>：先建领域模型，再考虑数据库/UI/API</li>
                </ol>

                <h3>📦 6 大核心概念</h3>
                <div class="card-grid">
                    <div class="card"><div class="card-title">① 统一语言 Ubiquitous Language ⭐</div>
                        <div class="card-desc">业务专家、产品、开发用同一套词汇</div></div>
                    <div class="card"><div class="card-title">② Entity 实体</div>
                        <div class="card-desc">有唯一 ID，状态可变。如 User、Order</div></div>
                    <div class="card"><div class="card-title">③ Value Object 值对象</div>
                        <div class="card-desc">无 ID 不可变。如 Money、Address</div></div>
                    <div class="card"><div class="card-title">④ Aggregate 聚合（根）</div>
                        <div class="card-desc">一组对象的边界，外部只能通过聚合根访问</div></div>
                    <div class="card"><div class="card-title">⑤ Repository 仓储</div>
                        <div class="card-desc">装聚合根的"集合"，隐藏 DB 细节</div></div>
                    <div class="card"><div class="card-title">⑥ Bounded Context 限界上下文</div>
                        <div class="card-desc">业务边界，同名不同义</div></div>
                </div>

                <hr style="margin: 30px 0; border: 0; border-top: 2px dashed #4CAF50;"/>

                <h3>😩 痛点：没用 DDD 的代码</h3>
                <pre><code class="language-python">@app.post("/transfer")
def transfer(from_id, to_id, amount):
    from_acc = db.execute("SELECT * FROM accounts WHERE id=%s", from_id)
    to_acc = db.execute("SELECT * FROM accounts WHERE id=%s", to_id)

    # 业务规则散落在 Controller 里
    if from_acc['balance'] < amount: return {"error": "余额不足"}
    if amount <= 0: return {"error": "金额错误"}
    if from_acc['status'] == 'frozen': return {"error": "账户冻结"}
    if from_acc['daily_transfer'] + amount > 50000: return {"error": "超日限"}

    db.execute("UPDATE accounts SET balance=balance-%s WHERE id=%s", amount, from_id)
    db.execute("UPDATE accounts SET balance=balance+%s WHERE id=%s", amount, to_id)
    return {"ok": True}</code></pre>
                <p><b>问题</b>：业务规则散落、Account 概念被肢解成 SQL、加新规则到处改、业务专家看不懂。</p>

                <h3>✅ 用 DDD 重写</h3>
                <pre><code class="language-python"># 1️⃣ 领域层：业务核心
class Account:                      # Entity（充血）
    def __init__(self, id, balance, status, daily_used):
        self.id = id
        self._balance = balance
        self._status = status
        self._daily_used = daily_used

    # 业务规则就在 Entity 里 —— 用业务语言表达
    def can_withdraw(self, amount: "Money") -> bool:
        if amount.value <= 0: return False
        if self._status == "frozen": return False
        if self._balance < amount.value: return False
        if self._daily_used + amount.value > 50000: return False
        return True

    def withdraw(self, amount: "Money") -> "WithdrewEvent":
        if not self.can_withdraw(amount):
            raise InsufficientFundsError()    # 领域异常
        self._balance -= amount.value
        self._daily_used += amount.value
        return WithdrewEvent(self.id, amount)  # 领域事件

    def deposit(self, amount: "Money"):
        self._balance += amount.value

# 2️⃣ 值对象
@dataclass(frozen=True)
class Money:
    value: int
    currency: str = "CNY"

# 3️⃣ 仓储：隐藏 DB
class AccountRepository:
    def find_by_id(self, id) -> Account: ...
    def save(self, account: Account): ...

# 4️⃣ 应用服务：薄薄一层，只做编排
class TransferService:
    @transactional
    def transfer(self, from_id, to_id, amount: Money):
        from_acc = self.repo.find_by_id(from_id)
        to_acc = self.repo.find_by_id(to_id)
        event = from_acc.withdraw(amount)   # 领域对象自己负责业务
        to_acc.deposit(amount)
        self.repo.save(from_acc)
        self.repo.save(to_acc)
        return event

# 5️⃣ Controller：极薄
@app.post("/transfer")
def transfer(req: TransferDTO):
    event = transfer_service.transfer(req.from_id, req.to_id, Money(req.amount))
    return {"ok": True, "txn_id": event.id}</code></pre>

                <h3>🥊 贫血模型 vs 充血模型（DDD 灵魂）</h3>
                <table>
                    <tr><th></th><th>贫血模型（传统）</th><th>充血模型（DDD）</th></tr>
                    <tr><td>Entity</td><td>只有数据（getter/setter）</td><td>数据 + 行为</td></tr>
                    <tr><td>业务规则</td><td>散在 Service 里</td><td>集中在 Entity 里</td></tr>
                    <tr><td>读起来像</td><td>"程序员操作数据库"</td><td>"业务专家讲故事"</td></tr>
                    <tr><td>测试</td><td>必须 Mock DB</td><td>领域层纯单测</td></tr>
                    <tr><td>典型</td><td>Spring MVC + 三层架构</td><td>DDD</td></tr>
                </table>

                <hr style="margin: 30px 0; border: 0; border-top: 2px dashed #4CAF50;"/>

                <h3>❌ 常见误解：DDD = 文件夹嵌套？</h3>
                <p>很多人以为"按业务模块分目录"就是 DDD：</p>
                <pre><code class="language-text">project/
├── user/        ← 看起来很 DDD？
├── order/
└── product/</code></pre>
                <div class="tip-box warn">
                    <b>这只是普通的"按业务分包"，任何讲究的项目都这么做</b>。
                    DDD 真正的灵魂是<b>充血对象 + 业务规则在 Entity</b>。
                </div>

                <h3>🧪 真假 DDD 测试</h3>
                <p>同样的目录，看 Entity 里有没有业务方法：</p>
                <pre><code class="language-python"># A 段：❌ 不是 DDD（贫血）
@dataclass
class User:
    id: int; name: str; age: int; is_vip: bool
    # 没有任何方法，只是数据袋子

def upgrade_to_vip(user_id):       # 业务规则在外面
    u = repo.get(user_id)
    if u.age < 18: raise ...
    if get_total_spent(u) < 10000: raise ...
    u.is_vip = True

# B 段：✅ 是 DDD（充血）
class User:
    def can_upgrade_to_vip(self) -> bool:
        return self._age >= 18 and self._total_spent >= 10000
    def upgrade_to_vip(self):       # 业务规则在 Entity 自己
        if not self.can_upgrade_to_vip():
            raise NotEligibleError()
        self._is_vip = True</code></pre>

                <h3>🏛 DDD 的 3 个层次</h3>
                <div class="mermaid">
flowchart TB
    L1[L1 按业务分目录<br/>= 限界上下文的外在]
    L2[L2 战略 DDD<br/>限界上下文 + 子域划分]
    L3[L3 战术 DDD ⭐<br/>Entity/VO/Aggregate 建模]

    L1 -.->|✅ 容易| Easy[任何项目都该做]
    L2 -.->|进阶| Mid[业务理解 = 微服务边界]
    L3 -.->|核心| Hard[真正的 DDD 难点]

    style L3 fill:#e8f5e9
                </div>

                <table>
                    <tr><th>层次</th><th>类比文件夹</th><th>是 DDD 灵魂吗</th></tr>
                    <tr><td>L1 按目录分</td><td>✅ 是</td><td>❌ 否，只是结构</td></tr>
                    <tr><td>L2 限界上下文</td><td>✅ 部分类似</td><td>✅ 战略 DDD</td></tr>
                    <tr><td>L3 充血对象建模</td><td>❌ 不像</td><td>⭐ DDD 灵魂</td></tr>
                </table>

                <h3>🏗 完整 DDD 分层 + 目录结构</h3>
                <div class="mermaid">
flowchart TB
    UI[① 用户接口层<br/>Controller/API]
    App[② 应用层<br/>Application Service<br/>编排 不含业务规则]
    Domain[③ 领域层 ★ 核心<br/>Entity / VO / Domain Service / Domain Event]
    Infra[④ 基础设施层<br/>Repository 实现/外部服务/消息]
    UI --> App
    App --> Domain
    App --> Infra
    Infra -.实现接口.-> Domain
                </div>

                <pre><code class="language-text">src/
└── modules/
    ├── order/                          ← 限界上下文 (= 文件夹分区)
    │   ├── domain/                     ← ⭐ 领域层 (DDD 灵魂)
    │   │   ├── order.py                  ← Entity（充血）
    │   │   ├── order_item.py
    │   │   ├── money.py                  ← Value Object
    │   │   ├── order_repository.py       ← 接口
    │   │   └── events.py                 ← Domain Events
    │   ├── application/                 ← 编排层（薄）
    │   │   └── place_order_use_case.py
    │   ├── infrastructure/              ← 技术细节
    │   │   └── order_repository_impl.py  ← 接口实现
    │   └── interfaces/                  ← 对外接口
    │       └── rest/order_controller.py
    ├── product/                          ← 另一个限界上下文
    └── customer/                         ← 另一个限界上下文</code></pre>

                <h3>🌍 限界上下文：同名不同义</h3>
                <div class="mermaid">
flowchart LR
    subgraph 电商系统
        Sales[销售上下文<br/>客户=买家]
        Logistics[物流上下文<br/>客户=收货人]
        Service[客服上下文<br/>客户=投诉人]
    end
                </div>
                <p>同一个"客户"在不同上下文有不同含义和字段——<b>分别建模，不强求统一</b>。
                这就是为什么<b>微服务天然契合 DDD</b>：每个服务 = 一个限界上下文。</p>

                <h3>📣 领域事件（Domain Event）</h3>
                <pre><code class="language-python">class Order:
    def confirm_payment(self):
        self.status = "paid"
        return OrderPaidEvent(order_id=self.id, amount=self.total)

# 其他地方订阅
@on_event(OrderPaidEvent)
def send_invoice_email(event): ...
@on_event(OrderPaidEvent)
def update_inventory(event): ...
@on_event(OrderPaidEvent)
def trigger_logistics(event): ...</code></pre>
                <p><b>解耦</b>：订单服务不用知道还有谁关心"付款成功"这件事。</p>

                <h3>🎯 何时用 DDD？何时不用？</h3>
                <div class="mermaid">
flowchart TD
    Q{你的项目?}
    Q -->|CRUD 简单系统| No1[❌ 别用 DDD 太重]
    Q -->|脚本/工具/原型| No2[❌ 别用]
    Q -->|个人小项目| No3[❌ 别用]
    Q -->|业务复杂 规则多变| Yes1[✅ 强烈推荐]
    Q -->|长期维护 团队多人| Yes2[✅ 推荐]
    Q -->|微服务架构| Yes3[✅ 天然契合]
    Q -->|业务专家深度参与| Yes4[✅ 必用]
                </div>

                <table>
                    <tr><th>✅ 适合 DDD</th><th>❌ 不适合 DDD</th></tr>
                    <tr><td>银行/金融/保险</td><td>后台管理系统（增删改查）</td></tr>
                    <tr><td>电商核心交易</td><td>简单 CMS</td></tr>
                    <tr><td>ERP/CRM</td><td>一次性脚本</td></tr>
                    <tr><td>物流调度</td><td>数据导入工具</td></tr>
                    <tr><td>长生命周期核心系统</td><td>一两周做完的项目</td></tr>
                </table>

                <h3>🤝 DDD 的进阶搭档</h3>
                <div class="mermaid">
flowchart LR
    DDD2[DDD] --> Hex[六边形架构<br/>领域核心独立]
    DDD2 --> CQRS[CQRS<br/>命令/查询分离]
    DDD2 --> ES[Event Sourcing<br/>事件溯源]
    DDD2 --> EDA[事件驱动架构<br/>领域事件传播]
    DDD2 --> Micro[微服务<br/>限界上下文 = 服务]
                </div>

                <h3>⚠️ 初学者常见误区</h3>
                <table>
                    <tr><th>误区</th><th>真相</th></tr>
                    <tr><td>DDD 就是分层</td><td>核心是统一语言 + 充血模型</td></tr>
                    <tr><td>DDD 就是文件夹嵌套</td><td>那只是表面，灵魂在 Entity 建模</td></tr>
                    <tr><td>所有项目都用 DDD</td><td>简单 CRUD 别用</td></tr>
                    <tr><td>一开始就追求完美建模</td><td>持续演化，边做边改</td></tr>
                    <tr><td>把 DB 表 1:1 映射成 Entity</td><td>Entity 是业务概念，不是表</td></tr>
                    <tr><td>Service 写一堆业务</td><td>业务规则放 Entity</td></tr>
                    <tr><td>Repository 写复杂 SQL</td><td>Repo 暴露领域语义</td></tr>
                </table>

                <div class="tip-box success">
                    <span class="tip-title"><i class="fa fa-trophy"></i> 一句话总结</span>
                    <b>DDD = 用代码精确反映业务领域，让业务概念成为代码的一等公民</b>。<br/>
                    判断你的代码是不是 DDD：<b>看 Entity 里有没有业务方法</b>。
                    只有字段 = 贫血 = 不是 DDD；有 <code>can_xxx()</code>/<code>xxx_action()</code> 业务方法 = 充血 = 真 DDD。
                </div>
            `
        },
        {
            id: 'arch-microservice',
            title: '6. SOA / 微服务 / Serverless',
            html: `
                <h3>SOA（面向服务架构）</h3>
                <p>把系统拆成多个粗粒度服务，通过 ESB（企业服务总线）通信。重协议、重治理。</p>

                <h3>微服务（Microservices）</h3>
                <p>SOA 的轻量化升级：<b>小</b>、<b>独立部署</b>、<b>独立技术栈</b>、<b>独立数据库</b>。</p>
                <div class="mermaid">
flowchart LR
    Client --> GW[API Gateway]
    GW --> S1[用户服务<br/>独立DB]
    GW --> S2[订单服务<br/>独立DB]
    GW --> S3[支付服务<br/>独立DB]
    S1 -.事件.-> MQ[消息队列]
    S2 -.事件.-> MQ
    S3 -.事件.-> MQ
                </div>

                <table>
                    <tr><th>优点</th><th>缺点</th></tr>
                    <tr><td>独立部署、技术多样、易扩展</td><td>分布式复杂、网络开销、运维成本高</td></tr>
                </table>

                <h3>Serverless / FaaS</h3>
                <p>把"函数"作为部署单元，按调用次数计费。AWS Lambda、阿里云函数计算。</p>

                <h3>Service Mesh</h3>
                <p>把服务治理（重试/熔断/链路追踪）下沉到 Sidecar（如 Istio + Envoy），业务代码零侵入。</p>
            `
        },
        {
            id: 'arch-event',
            title: '7. 事件驱动架构（EDA）',
            html: `
                <p>组件之间通过<b>事件</b>异步通信，<b>极致解耦</b>。
                与"<a href="#paradigm-event">EDP 编程范式</a>"是同一思想的<b>跨进程/跨服务</b>放大版。</p>

                <div class="mermaid">
flowchart LR
    P1[生产者 订单服务] -->|OrderCreated| B[(Event Bus<br/>Kafka/RabbitMQ)]
    B --> C1[库存服务]
    B --> C2[通知服务]
    B --> C3[积分服务]
                </div>

                <h3>🎯 EDA 三要素</h3>
                <table>
                    <tr><th>要素</th><th>说明</th></tr>
                    <tr><td><b>Event 事件</b></td><td>发生了什么（过去时：OrderCreated/UserRegistered）</td></tr>
                    <tr><td><b>Producer 生产者</b></td><td>发出事件的组件</td></tr>
                    <tr><td><b>Consumer 消费者</b></td><td>响应事件的组件</td></tr>
                </table>

                <hr style="margin: 30px 0; border: 0; border-top: 2px dashed #4CAF50;"/>

                <h3>📊 EDA 三种典型模式</h3>
                <div class="mermaid">
flowchart TB
    EDA2[EDA 三种模式]
    EDA2 --> M1[Work Queue<br/>任务分发<br/>一对一消费]
    EDA2 --> M2[Pub/Sub<br/>事件广播<br/>一对多消费]
    EDA2 --> M3[Event Streaming<br/>事件流持久化<br/>可回放]
                </div>

                <h4>① Work Queue（任务队列）</h4>
                <p>一个任务<b>只被一个 worker 消费</b>（竞争消费），用于分发任务。</p>
                <div class="mermaid">
flowchart LR
    P[生产者] -->|任务| Q[(队列)]
    Q -->|每个任务只被1个 worker 消费| W1[Worker 1]
    Q --> W2[Worker 2]
    Q --> W3[Worker 3]
                </div>
                <ul>
                    <li><b>典型工具</b>：Celery、Sidekiq、RQ、BullMQ、AWS SQS</li>
                    <li><b>场景</b>：图片处理、邮件发送、报表生成</li>
                </ul>

                <h4>② Pub/Sub（发布订阅）</h4>
                <p>一个事件<b>被所有订阅者都收到</b>（广播），用于通知多个下游。</p>
                <div class="mermaid">
flowchart LR
    P[生产者] -->|事件| Topic[(Topic/Exchange)]
    Topic -->|广播| C1[订阅者1: 库存服务]
    Topic -->|广播| C2[订阅者2: 通知服务]
    Topic -->|广播| C3[订阅者3: 积分服务]
                </div>
                <ul>
                    <li><b>典型工具</b>：RabbitMQ、Redis Pub/Sub、NATS、Kafka</li>
                    <li><b>场景</b>：订单付款成功 → 库存扣减 + 发短信 + 加积分</li>
                </ul>

                <h4>③ Event Streaming（事件流）</h4>
                <p>事件<b>持久化保存</b>，支持<b>回放</b>和<b>重新消费</b>。</p>
                <div class="mermaid">
flowchart LR
    P[生产者] -->|连续事件| Stream[(持久化事件流)]
    Stream --> RT[实时消费者: 大屏]
    Stream --> ETL[批处理消费者: 数仓]
    Stream --> AI[AI 消费者: 推荐]
                </div>
                <ul>
                    <li><b>典型工具</b>：Apache Kafka、Apache Pulsar、AWS Kinesis</li>
                    <li><b>场景</b>：用户行为日志、IoT 传感器数据、事件溯源</li>
                </ul>

                <h3>🆚 三模式对比</h3>
                <table>
                    <tr><th></th><th>Work Queue</th><th>Pub/Sub</th><th>Event Streaming</th></tr>
                    <tr><td>核心目的</td><td>任务分发</td><td>事件通知</td><td>事件流持久化</td></tr>
                    <tr><td>消费模式</td><td>一对一（抢占）</td><td>一对多（广播）</td><td>一对多 + 回放</td></tr>
                    <tr><td>消息留存</td><td>消费完即删</td><td>消费完即删</td><td><b>永久保存</b></td></tr>
                    <tr><td>可回放</td><td>❌</td><td>❌</td><td>✅</td></tr>
                    <tr><td>代表</td><td>Celery / SQS</td><td>RabbitMQ / Redis</td><td>Kafka / Pulsar</td></tr>
                </table>

                <hr style="margin: 30px 0; border: 0; border-top: 2px dashed #4CAF50;"/>

                <h3>🏊 Worker 池：Work Queue 的执行单元</h3>
                <p>"消息队列 + Worker 池"是 EDA 最经典也最广泛使用的实现：</p>

                <h4>Worker 池形态</h4>
                <table>
                    <tr><th>形态</th><th>例子</th></tr>
                    <tr><td>多线程</td><td>Celery worker <code>--concurrency=10</code></td></tr>
                    <tr><td>多进程</td><td>Gunicorn / uWSGI workers</td></tr>
                    <tr><td>多容器</td><td>K8s Deployment replicas=20</td></tr>
                    <tr><td>Serverless</td><td>AWS Lambda 自动按事件数启动</td></tr>
                </table>

                <h4>💻 完整 Celery 例子</h4>
                <pre><code class="language-python"># tasks.py - 定义任务
from celery import Celery
app = Celery('myapp', broker='redis://localhost:6379')

@app.task
def process_image(image_url):
    img = download(image_url); img = resize(img); upload(img)

# producer.py - 生产者
@app.post("/upload")
def upload(file):
    save(file)
    process_image.delay(file.url)   # ← 入队，立刻返回
    return {"ok": True}</code></pre>

                <pre><code class="language-bash"># 启动 worker 池：10 个并发 worker
$ celery -A tasks worker --concurrency=10</code></pre>

                <div class="mermaid">
sequenceDiagram
    User->>Web: POST /upload
    Web->>Redis: process_image 入队（不等结果）
    Web-->>User: 1ms 返回 ok
    par 并发处理
        Worker1->>Redis: 拉取任务
        Worker1->>Worker1: 处理图片 10s
    and
        Worker2->>Redis: 拉取任务
        Worker2->>Worker2: 处理图片 10s
    end
                </div>

                <h3>🚀 Work Queue 为什么这么流行？</h3>
                <div class="mermaid">
flowchart TD
    Why{为什么这么流行?}
    Why --> R1[① 异步解耦<br/>生产者不等消费者]
    Why --> R2[② 削峰填谷<br/>队列缓冲突发流量]
    Why --> R3[③ 弹性扩展<br/>慢就加 worker]
    Why --> R4[④ 失败重试<br/>消息可重新消费]
    Why --> R5[⑤ 优先级分级<br/>不同队列不同 worker 池]
                </div>

                <h3>⚙️ Work Queue 关键参数</h3>
                <table>
                    <tr><th>参数</th><th>含义</th></tr>
                    <tr><td><code>concurrency</code></td><td>每个 worker 的并发度</td></tr>
                    <tr><td><code>prefetch</code></td><td>一次拉几个任务</td></tr>
                    <tr><td><code>ack 机制</code></td><td>处理完才确认（防丢）</td></tr>
                    <tr><td><code>重试策略</code></td><td>失败几次 + 退避</td></tr>
                    <tr><td><code>死信队列</code></td><td>处理失败的任务</td></tr>
                    <tr><td><code>优先级</code></td><td>不同队列不同优先级</td></tr>
                </table>

                <hr style="margin: 30px 0; border: 0; border-top: 2px dashed #4CAF50;"/>

                <h3>🌟 EDA 的高级变体</h3>
                <table>
                    <tr><th>变体</th><th>说明</th></tr>
                    <tr><td><b>事件通知</b></td><td>只通知"发生了什么"</td></tr>
                    <tr><td><b>事件溯源 Event Sourcing</b></td><td>所有变更存为事件流，状态由事件回放得到</td></tr>
                    <tr><td><b>CQRS</b></td><td>命令（写）与查询（读）分离，常配合事件溯源</td></tr>
                    <tr><td><b>Saga</b></td><td>用事件序列管理跨服务长事务（补偿模式）</td></tr>
                    <tr><td><b>事件存储 EventStore</b></td><td>专门存事件的数据库（EventStoreDB）</td></tr>
                </table>

                <h3>🛠 EDA 工具生态</h3>
                <div class="mermaid">
flowchart TB
    Tools[EDA 工具]
    Tools --> MQ[消息队列]
    MQ --> RMQ[RabbitMQ - 轻量级]
    MQ --> ROCK[RocketMQ - 阿里]
    MQ --> ZMQ[ZeroMQ - 嵌入式]
    Tools --> Stream2[事件流]
    Stream2 --> Kafka[Apache Kafka ⭐]
    Stream2 --> Pulsar[Apache Pulsar]
    Stream2 --> Kinesis[AWS Kinesis]
    Stream2 --> NATS2[NATS JetStream]
    Tools --> Task[任务队列]
    Task --> Celery[Celery - Python]
    Task --> Sidekiq[Sidekiq - Ruby]
    Task --> Bull[BullMQ - Node]
    Task --> SQS[AWS SQS]
    Tools --> Cloud[云服务]
    Cloud --> EventBridge[AWS EventBridge]
    Cloud --> PubSub2[Google Pub/Sub]
    Cloud --> ServiceBus[Azure Service Bus]
                </div>

                <h3>🆚 EDA vs 同步 RPC</h3>
                <table>
                    <tr><th></th><th>同步 RPC</th><th>EDA</th></tr>
                    <tr><td>调用方式</td><td>A 直接调 B</td><td>A 发事件，B 订阅</td></tr>
                    <tr><td>耦合</td><td>紧（A 知道 B 存在）</td><td>松（A 不知 B 存在）</td></tr>
                    <tr><td>等待</td><td>等 B 返回</td><td>不等</td></tr>
                    <tr><td>B 挂了</td><td>A 也失败</td><td>A 不受影响</td></tr>
                    <tr><td>加新订阅者</td><td>需要改 A</td><td>只加新订阅者</td></tr>
                </table>

                <div class="tip-box success">
                    <span class="tip-title"><i class="fa fa-trophy"></i> 一句话</span>
                    <b>EDA = 组件通过"事件"异步通信，极致解耦</b>。<br/>
                    <b>三种模式</b>：Work Queue（任务分发）/ Pub-Sub（事件广播）/ Streaming（持久流）。<br/>
                    <b>核心信念</b>：生产者不需要知道有谁在听，消费者随时可加入或退出。<br/>
                    与 <a href="#paradigm-event">EDP 编程范式</a> 是同一思想的两个层次（进程内 vs 跨服务）。
                </div>
            `
        },
        {
            id: 'arch-others',
            title: '8. 其他架构模式',
            html: `
                <table>
                    <tr><th>模式</th><th>说明</th><th>典型应用</th></tr>
                    <tr><td>管道-过滤器 Pipe-Filter</td><td>数据流经一连串过滤器</td><td>Unix 管道、流处理</td></tr>
                    <tr><td>客户端-服务器 C/S</td><td>请求-响应模型</td><td>所有 Web 应用</td></tr>
                    <tr><td>P2P</td><td>对等节点直连</td><td>BitTorrent、区块链</td></tr>
                    <tr><td>主从架构 Master-Slave</td><td>主写从读</td><td>MySQL 主从、Redis</td></tr>
                    <tr><td>黑板架构 Blackboard</td><td>多专家共享数据求解</td><td>AI、语音识别</td></tr>
                    <tr><td>插件式 Microkernel</td><td>核心 + 插件</td><td>VS Code、Eclipse</td></tr>
                    <tr><td>BFF</td><td>Backend For Frontend，按端定制后端</td><td>移动 App + Web</td></tr>
                    <tr><td>Lambda / Kappa</td><td>大数据批+流 / 纯流</td><td>实时数仓</td></tr>
                </table>
            `
        }
    ]
});
