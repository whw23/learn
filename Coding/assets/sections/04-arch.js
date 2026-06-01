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
            title: '6. SOA / 微服务 / Serverless（云原生全家桶）',
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

                <div class="tip-box warn">
                    <span class="tip-title"><i class="fa fa-exclamation"></i> 警告</span>
                    <b>微服务不是免费午餐</b>。团队 &lt; 50 人，<b>不建议盲目上微服务</b>。<br/>
                    建议路径：<b>单体 → 模块化单体 → 少量微服务 → 完全微服务</b>。
                </div>

                <hr style="margin: 30px 0; border: 0; border-top: 2px dashed #4CAF50;"/>

                <h3>🌍 现代云原生全家桶：微服务 × Docker × K8s × K3s</h3>
                <p>4 个东西在现代后端栈里<b>经常一起出现</b>，本质是层层递进解决问题：</p>

                <div class="mermaid">
flowchart TB
    L1[L1 架构思想: 微服务<br/>把单体拆成多个独立服务]
    L1 --> L2[L2 部署单元: Docker 容器<br/>把每个服务打包成镜像]
    L2 --> L3[L3 编排平台: Kubernetes/K3s<br/>管理一堆容器的运行]
    L3 --> L4[L4 服务治理: Istio/Linkerd<br/>服务间通信/监控/限流]
                </div>

                <p><b>演进逻辑</b>：每一层解决上一层带来的新问题。</p>

                <h4>① Docker（容器化层）</h4>
                <p>核心思想：把"应用 + 所有依赖 + 操作系统库"打包成一个镜像，<b>在哪都能跑</b>。</p>
                <pre><code class="language-dockerfile">FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]</code></pre>

                <h4>② Kubernetes（编排层）</h4>
                <p>核心能力：自动调度、自动重启、自动扩缩、滚动升级、服务发现、负载均衡。</p>
                <pre><code class="language-yaml">apiVersion: apps/v1
kind: Deployment
metadata: { name: user-service }
spec:
  replicas: 3
  selector: { matchLabels: { app: user-service } }
  template:
    metadata: { labels: { app: user-service } }
    spec:
      containers:
        - name: user-service
          image: myregistry/user-service:v1
          ports: [{ containerPort: 8000 }]
          resources:
            requests: { cpu: 100m, memory: 128Mi }
            limits: { cpu: 500m, memory: 512Mi }</code></pre>

                <h4>③ K3s（轻量 K8s）</h4>
                <p>把 K8s 精简到 <b>&lt;100MB + 512MB 内存</b>，单二进制一行命令安装：</p>
                <pre><code class="language-bash">curl -sfL https://get.k3s.io | sh -    # 5 秒装好</code></pre>
                <ul>
                    <li>沃尔玛在每家店部署 K3s</li>
                    <li>特斯拉超级充电桩用 K3s</li>
                    <li>工厂车间 IoT 边缘节点首选</li>
                </ul>

                <h4>📊 K8s vs K3s 对比</h4>
                <table>
                    <tr><th>维度</th><th>K8s</th><th>K3s</th></tr>
                    <tr><td>大小</td><td>2GB+</td><td><b>&lt;100MB</b></td></tr>
                    <tr><td>内存需求</td><td>8GB+</td><td><b>512MB</b></td></tr>
                    <tr><td>API 兼容</td><td>100%</td><td><b>100%</b>（kubectl 直接用）</td></tr>
                    <tr><td>典型场景</td><td>大规模生产 云上</td><td><b>边缘/IoT/开发/Homelab</b></td></tr>
                    <tr><td>维护方</td><td>CNCF</td><td>Rancher / SUSE</td></tr>
                </table>

                <h4>🛠 K8s 核心对象速查</h4>
                <table>
                    <tr><th>对象</th><th>作用</th></tr>
                    <tr><td><b>Pod</b></td><td>最小调度单元 = 1+ 容器</td></tr>
                    <tr><td><b>Deployment</b></td><td>管理 Pod 副本数、滚动升级</td></tr>
                    <tr><td><b>Service</b></td><td>给一组 Pod 稳定 IP/DNS = 内部负载均衡</td></tr>
                    <tr><td><b>Ingress</b></td><td>对外暴露 = 集群级路由</td></tr>
                    <tr><td><b>ConfigMap / Secret</b></td><td>配置注入</td></tr>
                    <tr><td><b>PV / PVC</b></td><td>持久存储</td></tr>
                </table>

                <hr style="margin: 30px 0; border: 0; border-top: 2px dashed #4CAF50;"/>

                <h3>⚡ Serverless / FaaS —— "只写函数 不管部署"</h3>
                <p>把"函数"作为部署单元，按调用次数计费。<b>4 大类方案</b>：</p>

                <div class="mermaid">
flowchart TB
    Want[我只想写函数]
    Want --> A[① 云厂商 FaaS<br/>零运维]
    Want --> B[② 边缘 FaaS<br/>全球分发 极速]
    Want --> C[③ 自建 FaaS on K8s<br/>私有云]
    Want --> D[④ 现代 PaaS<br/>git push 即部署]

    A --> A1[AWS Lambda]
    A --> A2[Azure Functions]
    A --> A3[阿里云 FC / 腾讯云 SCF]

    B --> B1[Cloudflare Workers ⭐ 冷启动 &lt; 5ms]
    B --> B2[Vercel Edge Functions]
    B --> B3[Deno Deploy]

    C --> C1[Knative K8s 标准]
    C --> C2[OpenFaaS ⭐ 最像 Lambda]
    C --> C3[Fission / Nuclio]

    D --> D1[Vercel / Netlify]
    D --> D2[Railway / Render / Fly.io]
                </div>

                <h4>📊 FaaS 平台对比</h4>
                <table>
                    <tr><th>平台</th><th>免费额度</th><th>冷启动</th><th>特点</th></tr>
                    <tr><td><b>AWS Lambda</b></td><td>100 万/月</td><td>100-500ms</td><td>鼻祖 生态全</td></tr>
                    <tr><td><b>Cloudflare Workers</b> ⭐</td><td>10 万/天</td><td><b>&lt; 5ms</b></td><td>边缘 + AI 集成</td></tr>
                    <tr><td>Vercel Functions</td><td>100GB 带宽</td><td>100ms+</td><td>前端友好</td></tr>
                    <tr><td>阿里云 FC</td><td>100 万/月</td><td>中等</td><td>国内首选</td></tr>
                    <tr><td>OpenFaaS（自建）</td><td>无</td><td>100~500ms</td><td>私有云最像 Lambda</td></tr>
                    <tr><td>Knative（K8s）</td><td>无</td><td>100~500ms</td><td>缩容到 0</td></tr>
                    <tr><td>Modal/Replicate</td><td>按 GPU 用量</td><td>—</td><td><b>GPU 函数 AI 推理</b></td></tr>
                </table>

                <h4>FaaS 不适合的场景</h4>
                <ul>
                    <li>❌ 长时间运行的任务（视频转码 1 小时）</li>
                    <li>❌ 高吞吐的 WebSocket</li>
                    <li>❌ 高频小请求（成本反而高）</li>
                    <li>❌ 需要保持连接的（数据库连接池）</li>
                </ul>

                <hr style="margin: 30px 0; border: 0; border-top: 2px dashed #4CAF50;"/>

                <h3>🌊 边缘函数（Edge Function）</h3>
                <p>"边缘"两层含义：<b>① 跑在靠近用户的地方</b>（CDN/工厂/IoT），<b>② 函数粒度部署</b>。</p>

                <div class="mermaid">
flowchart TB
    K8sEdge[K8s 边缘方案]
    K8sEdge --> L[轻量级 K8s]
    K8sEdge --> Native[原生边缘扩展]
    L --> L1[K3s ⭐ 最流行]
    L --> L2[MicroK8s / k0s]
    Native --> N1[KubeEdge ⭐ 云边协同<br/>支持 MQTT/Modbus 等 IoT 协议]
    Native --> N2[OpenYurt 阿里]
    Native --> N3[SuperEdge 腾讯]
                </div>

                <h4>边缘函数的现代方案对比</h4>
                <table>
                    <tr><th>方案</th><th>特点</th></tr>
                    <tr><td><b>Cloudflare Workers</b> ⭐⭐⭐</td><td>300+ 节点 V8 isolate 冷启动 &lt; 5ms</td></tr>
                    <tr><td>AWS Lambda@Edge</td><td>基于 CloudFront</td></tr>
                    <tr><td>K3s + Knative 自建</td><td>完全可控 部署在自己边缘节点</td></tr>
                    <tr><td>KubeEdge 工业级</td><td>断网可运行 支持设备协议</td></tr>
                    <tr><td><b>WASM 容器</b>（未来方向）</td><td>启动毫秒级 跨平台 沙箱安全</td></tr>
                </table>

                <hr style="margin: 30px 0; border: 0; border-top: 2px dashed #4CAF50;"/>

                <h3>💰 Cloudflare 生态：个人开发者的"免费乐园"</h3>
                <p>Cloudflare 是当前对个人开发者最慷慨的云平台——<b>大部分项目可以永久免费</b>。</p>

                <div class="mermaid">
flowchart TB
    CFStack[Cloudflare 全栈]
    CFStack --> W[Workers 边缘函数<br/>10 万/天]
    CFStack --> Pa[Pages 静态站<br/>无限带宽 ⭐]
    CFStack --> R2[R2 对象存储<br/>10GB 无出网费]
    CFStack --> D1c[D1 SQL 数据库<br/>5GB]
    CFStack --> KVc[KV 缓存<br/>10万次读/天]
    CFStack --> Vec[Vectorize 向量库<br/>3000万查询/月]
    CFStack --> AI[Workers AI<br/>10000 次推理/天]
    CFStack --> Gate[AI Gateway<br/>100 万次/月]
    CFStack --> CDN[CDN 完全无限带宽 ⭐]
                </div>

                <h4>个人开发者必看的福利</h4>
                <ul>
                    <li>✅ <b>CDN 完全无限带宽</b>（AWS/Vercel 都做不到）</li>
                    <li>✅ <b>超额自动 fail，不偷收费</b>（最安全）</li>
                    <li>✅ <b>R2 无出网费</b>（取代 AWS S3 神器）</li>
                    <li>✅ <b>自动 DDoS 防护 + SSL</b></li>
                    <li>✅ <b>付费仅 $5/月 起含 1000 万次 Workers</b></li>
                </ul>

                <h4>🤖 Cloudflare AI Gateway（LLM 统一代理）</h4>
                <pre><code class="language-python"># 把 OpenAI URL 换成 AI Gateway URL —— 立刻得到缓存/监控/限流
from openai import OpenAI
client = OpenAI(
    base_url="https://gateway.ai.cloudflare.com/v1/{account}/{gateway}/openai",
    api_key="sk-...",
)
# 调用代码完全不变，但拥有：
# - 自动缓存（同 prompt 不重复扣费，可省 80%）
# - 多模型回退（OpenAI 挂了自动切 Claude）
# - 完整日志 + 成本追踪
# - 支持 60+ LLM 供应商
# - 完全免费（100 万次/月）</code></pre>

                <h4>🔧 协议转换（OpenAI ↔ Claude/Gemini）</h4>
                <table>
                    <tr><th>方案</th><th>用法</th></tr>
                    <tr><td><b>Anthropic 官方兼容</b></td><td>OpenAI SDK 直接调 Claude 改 base_url 即可</td></tr>
                    <tr><td><b>OpenRouter</b></td><td>200+ 模型统一 OpenAI 格式（商用）</td></tr>
                    <tr><td><b>LiteLLM</b> ⭐ 开源</td><td>100+ 模型统一接口 自部署完全免费</td></tr>
                    <tr><td><b>Vercel AI SDK</b></td><td>统一各家 SDK 适合 Workers</td></tr>
                </table>

                <hr style="margin: 30px 0; border: 0; border-top: 2px dashed #4CAF50;"/>

                <h3>🏗 Cloudflare 内部架构哲学：Pingora vs Workers 分层</h3>
                <p>有趣的问题：<b>Cloudflare AI Gateway 为什么不直接用 Pingora 写</b>？</p>

                <div class="mermaid">
flowchart TB
    L1c[L1 网络层: TCP/HTTP]
    L1c --> L2c[L2 代理层: Pingora 替代 Nginx<br/>每秒 4000 万请求]
    L2c --> L3c[L3 计算层: Workers Runtime V8 Isolates]
    L3c --> L4c[L4 应用层: AI Gateway 业务逻辑]
    L4c --> L5c[L5 外部: OpenAI/Claude/Gemini]
                </div>

                <p><b>核心哲学</b>：</p>
                <table>
                    <tr><th>层</th><th>工具</th><th>原则</th></tr>
                    <tr><td>基础设施</td><td><b>Pingora</b>（Rust）</td><td>极致性能 + 稳定 + 谨慎迭代</td></tr>
                    <tr><td>平台</td><td><b>Workers</b>（V8）</td><td>通用计算 + 用户可扩展</td></tr>
                    <tr><td>产品</td><td><b>AI Gateway</b>（TS on Workers）</td><td>业务复杂 + 快速迭代</td></tr>
                </table>

                <div class="tip-box">
                    <b>类比</b>：就像 Linux Kernel 不会直接写 Web 服务一样，
                    <b>Pingora 不会直接做 AI Gateway</b>——这是健康的分层设计：
                    <b>"基础设施用稳定语言，业务逻辑用敏捷语言"</b>。
                </div>

                <hr style="margin: 30px 0; border: 0; border-top: 2px dashed #4CAF50;"/>

                <h3>🛡 Service Mesh —— 服务治理下沉</h3>
                <p>把服务治理（重试/熔断/链路追踪/mTLS）下沉到 <b>Sidecar</b>，业务代码零侵入。</p>
                <div class="mermaid">
flowchart LR
    subgraph Pod1[Pod 1]
        App1[业务应用] <--> Side1[Sidecar Proxy<br/>Envoy/Linkerd]
    end
    subgraph Pod2[Pod 2]
        Side2[Sidecar Proxy] <--> App2[业务应用]
    end
    Side1 <-->|mTLS/重试/熔断| Side2
                </div>
                <table>
                    <tr><th>产品</th><th>特点</th></tr>
                    <tr><td><b>Istio</b></td><td>功能最全 配置复杂</td></tr>
                    <tr><td><b>Linkerd</b></td><td>轻量 性能好</td></tr>
                    <tr><td><b>Cilium</b></td><td>eBPF 内核级 新势力 ⭐</td></tr>
                </table>

                <hr style="margin: 30px 0; border: 0; border-top: 2px dashed #4CAF50;"/>

                <h3>🛒 完整电商微服务架构（云原生范例）</h3>
                <div class="mermaid">
flowchart TB
    Client2[客户端]
    Client2 --> Ing[K8s Ingress]
    Ing --> GW2[API Gateway APISIX/Kong]

    GW2 --> US[用户服务 3 副本]
    GW2 --> OS[订单服务 5 副本]
    GW2 --> PS[商品服务 10 副本]
    GW2 --> PayS[支付服务 3 副本]

    US --> UDB[(MySQL)]
    OS --> ODB[(MySQL)]
    PS --> PDB[(MySQL)]
    PS --> Redis2[(Redis 缓存)]
    PS --> ES2[(Elasticsearch)]

    OS -.事件.-> Kaf[(Kafka)]
    Kaf -.订阅.-> Inv[库存服务]
    Kaf -.订阅.-> Mail[通知服务]
    Kaf -.订阅.-> Ana[分析服务]

    All2[所有服务] -.指标.-> Prom[(Prometheus)]
    All2 -.日志.-> Loki[(Loki)]
    All2 -.链路.-> Jae[(Jaeger)]
                </div>

                <p><b>对应关系</b>：每个方框 = 一个微服务 = 一个 Docker 镜像 = 多个 K8s Pod。</p>

                <h3>🎯 选型决策树</h3>
                <div class="mermaid">
flowchart TD
    Q1{团队规模?}
    Q1 -->|3-5 人| S1[单体应用 + Docker]
    Q1 -->|10-30 人| S2[模块化单体]
    Q1 -->|50+ 人| S3[微服务]

    Q2{部署目标?}
    Q2 -->|生产 + 云上| K8sP[K8s + 云服务 EKS/GKE]
    Q2 -->|边缘 IoT| K3sE[K3s 或 KubeEdge]
    Q2 -->|开发/Homelab| K3sH[K3s 或 minikube]
    Q2 -->|个人项目想极便宜| CF[Cloudflare Workers]
    Q2 -->|纯后台 API/事件触发| FaaS2[FaaS Lambda/Cloudflare]
                </div>

                <div class="tip-box success">
                    <span class="tip-title"><i class="fa fa-trophy"></i> 总结</span>
                    <b>微服务 × Docker × K8s × K3s × FaaS</b> 是现代云原生全家桶：
                    <ul>
                        <li>① <b>微服务</b>：架构思想（怎么拆）</li>
                        <li>② <b>Docker</b>：打包单元（怎么打包）</li>
                        <li>③ <b>K8s/K3s</b>：编排平台（怎么调度）</li>
                        <li>④ <b>Service Mesh</b>：服务治理（通信/监控）</li>
                        <li>⑤ <b>FaaS</b>：函数粒度（只写函数）</li>
                    </ul>
                    <b>个人开发者最佳起点：Cloudflare Workers + Pages</b>（99% 永久免费）。<br/>
                    <b>企业起步：单体 + Docker → 模块化 → K3s/K8s → 微服务</b>，不要一步登天。
                </div>
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

        // ============================================================
        // 黑板架构 + AI 时代复活（专家协作家族）
        // ============================================================
        {
            id: 'arch-blackboard',
            title: '8. 黑板架构（Blackboard）+ AI 时代复活',
            html: `
                <p><b>黑板架构</b> = 多个独立的"专家"组件共享一块"黑板"（共享数据区），
                各自看黑板上的状态做出贡献，逐步把问题解出来。
                特别适合<b>没有确定解法、需要多种知识协作</b>的复杂问题。</p>

                <h3>🏥 最直观的类比：医院会诊</h3>
                <div class="mermaid">
flowchart TB
    BB[黑板<br/>病人状态 + 已知信息]

    E1[影像科医生<br/>看 CT 报告] <-.读写.-> BB
    E2[内科医生<br/>分析症状] <-.读写.-> BB
    E3[外科医生<br/>判断手术方案] <-.读写.-> BB
    E4[病理医生<br/>分析活检] <-.读写.-> BB
    E5[心理医生<br/>评估情绪] <-.读写.-> BB

    Ctrl[控制器<br/>决定谁先发言]
                </div>

                <ul>
                    <li>🖼️ <b>黑板</b>：所有信息汇聚的共享数据区</li>
                    <li>👨‍⚕️ <b>专家（Knowledge Source）</b>：独立的处理模块，各有专长</li>
                    <li>🎯 <b>控制器</b>：决定下一步该让哪个专家发言</li>
                </ul>

                <h3>🏗 架构图</h3>
                <div class="mermaid">
flowchart TB
    subgraph KSs[一群知识源 Knowledge Sources]
        KS1[专家1]
        KS2[专家2]
        KS3[专家3]
        KSn[专家N]
    end
    BB2[(黑板 Blackboard<br/>共享状态空间)]
    Control[控制器 Control<br/>调度/优先级]
    KS1 <-->|读/写| BB2
    KS2 <-->|读/写| BB2
    KS3 <-->|读/写| BB2
    KSn <-->|读/写| BB2
    BB2 --> Control
    Control -->|激活| KSs
                </div>

                <h3>🎙️ 经典案例：Hearsay-II 语音识别（1970s）</h3>
                <div class="mermaid">
sequenceDiagram
    participant Audio as 音频
    participant BB as 黑板
    participant E1 as 信号专家
    participant E2 as 音素专家
    participant E3 as 单词专家
    participant E4 as 语法专家
    participant E5 as 语义专家
    Audio->>BB: 原始波形
    E1->>BB: 读波形 → 写 音频特征
    E2->>BB: 读特征 → 写 候选音素
    E3->>BB: 读音素 → 写 候选单词
    E4->>BB: 读单词 → 写 候选句子
    E5->>BB: 读句子 → 写 语义解释
    E5->>BB: 发现矛盾 → 反馈给 E3
    E3->>BB: 修正候选单词
    Note over BB: 逐步收敛到最终结果
                </div>

                <p><b>关键特点</b>：解题过程<b>多次反复</b>，不是一次性流水线。每个专家可以"否决"或"修正"前面的结果。</p>

                <h3>💻 简化代码骨架</h3>
                <pre><code class="language-python">class Blackboard:
    def __init__(self):
        self.data = {}; self.subscribers = []
    def write(self, key, value):
        self.data[key] = value
        for ks in self.subscribers:
            if ks.can_contribute(self):
                ks.contribute(self)        # 状态变就触发专家
    def read(self, key): return self.data.get(key)

class PhonemeExpert:
    def can_contribute(self, bb):
        return bb.read('audio_features') and not bb.read('phonemes')
    def contribute(self, bb):
        bb.write('phonemes', recognize(bb.read('audio_features')))

class WordExpert:
    def can_contribute(self, bb):
        return bb.read('phonemes') and not bb.read('words')
    def contribute(self, bb):
        bb.write('words', match_words(bb.read('phonemes')))

bb = Blackboard()
bb.subscribers = [PhonemeExpert(), WordExpert(), GrammarExpert()]
bb.write('audio_features', extract(audio))   # 链式反应自动开始</code></pre>

                <h3>📍 适用场景</h3>
                <table>
                    <tr><th>场景</th><th>说明</th></tr>
                    <tr><td>语音识别</td><td>Hearsay-II（祖宗级案例）</td></tr>
                    <tr><td>AI 专家系统</td><td>1980s 黄金期</td></tr>
                    <tr><td>计算机视觉</td><td>多算法融合</td></tr>
                    <tr><td>自动驾驶感知融合</td><td>相机/雷达/激光雷达/GPS 协同</td></tr>
                    <tr><td>机器人规划</td><td>感知+决策+控制</td></tr>
                    <tr><td>医疗诊断系统</td><td>多专家协作</td></tr>
                    <tr><td>军事情报融合</td><td>C4I 系统</td></tr>
                </table>

                <hr style="margin: 30px 0; border: 0; border-top: 2px dashed #4CAF50;"/>

                <h3>🤖 AI 时代复活：Multi-Agent 系统就是新版黑板架构</h3>
                <p>大语言模型时代，<b>Multi-Agent 系统本质就是黑板架构的现代实现</b>：</p>

                <div class="mermaid">
flowchart TB
    BB3[(共享上下文/Memory<br/>= 黑板)]
    A1[Agent: 搜索专家] <-.读写.-> BB3
    A2[Agent: 代码专家] <-.读写.-> BB3
    A3[Agent: 分析专家] <-.读写.-> BB3
    A4[Agent: 写作专家] <-.读写.-> BB3
    Orch[Orchestrator<br/>编排器 = 控制器]
                </div>

                <table>
                    <tr><th>经典黑板架构</th><th>AI Multi-Agent</th></tr>
                    <tr><td>黑板 Blackboard</td><td><b>Shared Memory / Context</b></td></tr>
                    <tr><td>知识源 KS</td><td><b>AI Agent</b>（专业 LLM）</td></tr>
                    <tr><td>控制器 Control</td><td><b>Orchestrator</b>（如 LangGraph）</td></tr>
                    <tr><td>调度策略</td><td>LLM 自主决策</td></tr>
                </table>

                <h4>典型 Multi-Agent 框架</h4>
                <ul>
                    <li><b>AutoGen</b>（Microsoft 多 Agent 框架）</li>
                    <li><b>CrewAI</b>（角色扮演式多 Agent）</li>
                    <li><b>MetaGPT</b>（多角色软件工程师协作）</li>
                    <li><b>AutoGPT</b>（自主任务分解）</li>
                    <li><b>LangGraph</b>（状态化 Agent 工作流）</li>
                </ul>

                <hr style="margin: 30px 0; border: 0; border-top: 2px dashed #4CAF50;"/>

                <h3>⚡ 三方对比：黑板架构 vs Multi-Agent vs MoE（混合专家模型）</h3>

                <p>三者<b>核心哲学都是"分而治之 + 专家协作"</b>，但<b>层次完全不同</b>：</p>

                <div class="mermaid">
flowchart TB
    Core[共同思想: 分而治之 + 专家分工]
    Core --> S[系统架构层]
    Core --> M[神经网络结构层]
    S --> BB4[黑板架构<br/>程序模块协作]
    S --> MA[Multi-Agent<br/>LLM 协作]
    M --> MoE[MoE 神经网络<br/>FFN 子网络协作]
                </div>

                <table>
                    <tr><th>维度</th><th>黑板架构</th><th>Multi-Agent</th><th>MoE 神经网络</th></tr>
                    <tr><td><b>层次</b></td><td>系统架构</td><td>系统架构</td><td>神经网络结构</td></tr>
                    <tr><td><b>专家是什么</b></td><td>代码模块</td><td>AI Agent（LLM）</td><td>FFN 子网络（矩阵权重）</td></tr>
                    <tr><td><b>专家来源</b></td><td>程序员<b>手写</b></td><td>人类配置 + LLM 能力</td><td>训练<b>自动学出</b></td></tr>
                    <tr><td><b>有自我意识</b></td><td>是（主动看黑板）</td><td>是（LLM 自主决策）</td><td>否（被路由器选）</td></tr>
                    <tr><td><b>协调者</b></td><td>控制器</td><td>Orchestrator</td><td>Router/Gate</td></tr>
                    <tr><td><b>共享空间</b></td><td>黑板</td><td>Memory/Context</td><td>无（专家间不通信）</td></tr>
                    <tr><td><b>解题过程</b></td><td>多次迭代</td><td>多轮对话</td><td>一次前向传播</td></tr>
                    <tr><td><b>可解释</b></td><td>✅ 完全透明</td><td>⚠️ 部分（看对话）</td><td>❌ 黑盒</td></tr>
                    <tr><td><b>专家是否专精</b></td><td>人指定</td><td>人配置 prompt</td><td><b>自发涌现</b></td></tr>
                    <tr><td><b>代表</b></td><td>Hearsay-II / 自动驾驶</td><td>AutoGen / CrewAI</td><td>Mixtral / GPT-4 / DeepSeek-V3</td></tr>
                </table>

                <h4>💡 关键差别：专家的"物理形态"不同</h4>
                <div class="mermaid">
flowchart LR
    subgraph s1[黑板架构的专家]
        BE[1000 行 Python 代码<br/>有 if/else 逻辑<br/>程序员设计]
    end
    subgraph s2[Multi-Agent 的专家]
        AE[LLM + Prompt<br/>角色定义<br/>人配置]
    end
    subgraph s3[MoE 的专家]
        ME[一组矩阵权重<br/>FFN 的 W1 W2<br/>训练学出来]
    end
                </div>

                <h4>🆚 MoE 是什么？</h4>
                <p><b>MoE（Mixture of Experts）</b>= 大模型节省算力的<b>神经网络结构</b>，
                把 FFN 拆成多个"专家"子网络，每个 token <b>只激活 top-k 个</b>专家。</p>

                <div class="mermaid">
flowchart LR
    Input2[输入 token] --> Router2[Router/Gate]
    Router2 -->|选 top-2| E1[专家1]
    Router2 -->|选 top-2| E2[专家2]
    Router2 -.其他不参与.-x E3[E3~E8]
    E1 --> Sum[加权求和]
    E2 --> Sum
    Sum --> Output2[输出]
                </div>

                <table>
                    <tr><th>MoE 模型</th><th>参数规模</th></tr>
                    <tr><td>1991 Jacobs et al.</td><td>最早提出</td></tr>
                    <tr><td>2017 Google Sparsely-Gated MoE</td><td>1370 亿</td></tr>
                    <tr><td>2021 Switch Transformer</td><td>万亿</td></tr>
                    <tr><td>2023 GPT-4（推测）</td><td>1.8T 总 / 220B 激活</td></tr>
                    <tr><td>2023 Mixtral 8x7B</td><td>47B 总 / 13B 激活</td></tr>
                    <tr><td>2024 DeepSeek-V3</td><td>671B 总 / 37B 激活</td></tr>
                </table>
                <p>→ <b>2024 几乎所有顶级大模型都用 MoE</b>——大模型容量 + 小模型速度。</p>

                <h3>🌳 完整"专家协作家族"</h3>
                <div class="mermaid">
flowchart TB
    Family[AI 时代的专家协作家族]
    Family --> A[模型内部协作]
    Family --> B[模型之间协作]
    Family --> C[系统之间协作]
    A --> A1[MoE 神经网络<br/>子网络协作]
    A --> A2[Multi-Head Attention<br/>多头协作]
    B --> B1[Multi-Agent LLM<br/>AutoGen/CrewAI]
    B --> B2[Ensemble 模型集成]
    B --> B3[Router LLM<br/>选不同模型]
    C --> C1[黑板架构<br/>传统系统]
    C --> C2[微服务协作]
    C --> C3[Multi-Agent 工作流<br/>LangGraph]
                </div>

                <h3>🎯 类比</h3>
                <ul>
                    <li>🏥 <b>黑板架构</b> = <b>医院会诊</b>（人类医生开会）</li>
                    <li>👥 <b>Multi-Agent</b> = <b>公司团队</b>（每人独立但目标一致）</li>
                    <li>🧠 <b>MoE</b> = <b>大脑分工</b>（不同脑区处理不同信号，自动协调）</li>
                </ul>

                <div class="tip-box success">
                    <span class="tip-title"><i class="fa fa-trophy"></i> 一句话总结</span>
                    <b>黑板架构、Multi-Agent、MoE 是"分而治之 + 专家协作"思想在不同层次的实现</b>：
                    <ul>
                        <li><b>黑板架构</b>：1970s 经典，程序模块协作，可解释</li>
                        <li><b>Multi-Agent</b>：黑板架构的 AI 复活，LLM 协作</li>
                        <li><b>MoE</b>：神经网络内部的"专家"，训练学出，黑盒</li>
                    </ul>
                    <b>同一信念</b>：<b>"一群专才 > 一个全才"</b>——这是从软件工程到深度学习一以贯之的智慧。
                </div>
            `
        },

        // ============================================================
        // 插件式架构 Microkernel：覆盖 VS Code / Chrome / Webpack / Pytest / Superset / Nginx / Pingora / Envoy / MCP
        // ============================================================
        {
            id: 'arch-microkernel',
            title: '9. 插件式架构（Microkernel）· 全栈实战',
            html: `
                <p><b>插件式架构（Microkernel / Plug-in Architecture）</b>是现代软件最重要的扩展模式之一。
                与 <a href="#paradigm-plugin">面向插件编程 POP</a>（编程范式）是<b>同一思想的架构层放大</b>。</p>

                <h3>💡 核心思想</h3>
                <div class="tip-box success">
                    <b>"主程序保持精简，所有扩展能力都交给插件"</b>。<br/>
                    主程序 = Microkernel（微内核）+ Plugin API；插件 = 实现这套 API 的独立模块。
                </div>

                <div class="mermaid">
flowchart TB
    Core[微内核 Core<br/>基础能力 + 插件管理]
    Core -->|定义接口| API[Plugin API]
    P1[插件 A] -->|实现 API| API
    P2[插件 B] -->|实现 API| API
    P3[插件 C] -->|实现 API| API
    Pn[...]
    Core -->|加载/激活/隔离| P1
    Core -->|加载/激活/隔离| P2
    Core -->|加载/激活/隔离| P3
                </div>

                <h3>🧩 6 大核心机制（任何插件系统都必须解决）</h3>
                <div class="mermaid">
flowchart TB
    Plug[插件系统 6 大机制]
    Plug --> M1[① 接口契约<br/>插件必须实现什么]
    Plug --> M2[② 注册发现<br/>主程序怎么找到插件]
    Plug --> M3[③ 生命周期<br/>load/activate/deactivate/unload]
    Plug --> M4[④ 通信机制<br/>插件↔主程序 / 插件↔插件]
    Plug --> M5[⑤ 隔离沙箱<br/>插件出错不影响主程序]
    Plug --> M6[⑥ 扩展点 Extension Points<br/>插件能改/加什么]
                </div>
                <p>💡 <b>学懂任何插件系统，都问这 6 个问题就行</b>。</p>

                <hr style="margin: 30px 0; border: 0; border-top: 2px dashed #4CAF50;"/>

                <h3>🎨 应用层插件（你能"看到"的）</h3>

                <h4>① VS Code Extension（最经典）</h4>
                <p>VS Code 把"扩展"作为一等公民。<b>每个扩展跑在独立子进程（Extension Host）</b>，一个崩了不影响主程序。</p>
                <pre><code class="language-typescript">// extension.ts
import * as vscode from 'vscode';
export function activate(context: vscode.ExtensionContext) {
    const cmd = vscode.commands.registerCommand('hello.sayHi', () => {
        vscode.window.showInformationMessage('Hello!');
    });
    context.subscriptions.push(cmd);
}
export function deactivate() {}</code></pre>
                <pre><code class="language-json">// package.json - manifest
{
    "name": "my-extension",
    "main": "./out/extension.js",
    "activationEvents": ["onCommand:hello.sayHi"],
    "contributes": {
        "commands": [{ "command": "hello.sayHi", "title": "Say Hi" }]
    }
}</code></pre>
                <p><b>扩展点举例</b>：commands / menus / keybindings / languages / grammars / snippets / themes / views / debuggers / taskDefinitions...</p>

                <h4>② Chrome 扩展</h4>
                <p>Chrome 扩展有 4 种"角色"，<b>每种角色都在不同沙箱</b>：</p>
                <div class="mermaid">
flowchart TB
    subgraph Ext[Chrome 扩展]
        BG[Service Worker<br/>后台脚本]
        Pop[Popup<br/>点击图标弹出]
        CS[Content Script<br/>注入到网页]
        Opt[Options Page<br/>设置页]
    end
    Tab[网页 Tab] <-.注入.-> CS
    CS <-.message.-> BG
    Pop <-.message.-> BG
    BG <-->|Chrome API| Browser[Chrome 浏览器]
                </div>
                <pre><code class="language-json">// manifest.json (v3)
{
    "manifest_version": 3,
    "name": "My Extension",
    "permissions": ["activeTab", "storage"],
    "action": { "default_popup": "popup.html" },
    "content_scripts": [{ "matches": ["https://*/*"], "js": ["content.js"] }],
    "background": { "service_worker": "background.js" }
}</code></pre>

                <hr style="margin: 30px 0; border: 0; border-top: 2px dashed #4CAF50;"/>

                <h3>🔧 构建/开发工具插件</h3>
                <table>
                    <tr><th>工具</th><th>插件机制</th></tr>
                    <tr><td>Webpack</td><td>Loader（转换文件）+ Plugin（钩子事件）</td></tr>
                    <tr><td>Vite</td><td>Plugin（兼容 Rollup 风格）</td></tr>
                    <tr><td>Rollup</td><td>Plugin（最早的 build hook 标准）</td></tr>
                    <tr><td>Babel</td><td>Plugin（AST 转换）</td></tr>
                    <tr><td>ESLint</td><td>Plugin + Rule</td></tr>
                    <tr><td>Pytest</td><td><code>entry_points</code> 自动发现</td></tr>
                </table>

                <hr style="margin: 30px 0; border: 0; border-top: 2px dashed #4CAF50;"/>

                <h3>📊 数据/可视化平台插件</h3>

                <h4>Superset 插件</h4>
                <pre><code class="language-typescript">// 自定义图表 Viz Plugin
import { ChartPlugin } from '@superset-ui/core';
export default class MyChartPlugin extends ChartPlugin {
    constructor() {
        super({
            buildQuery, controlPanel, transformProps, Chart: MyChart,
            metadata: { name: 'My Chart', category: 'Custom' },
        });
    }
}</code></pre>
                <pre><code class="language-python"># 自定义数据源
from superset.db_engine_specs.base import BaseEngineSpec
class MyCustomEngineSpec(BaseEngineSpec):
    engine = "mydb"
    engine_name = "My Custom Database"</code></pre>
                <p>→ <code>pip install</code> 即装，主程序自动发现注册。</p>

                <p>同类工具：<b>Grafana Plugin</b>、<b>Jupyter Extension</b>、<b>Notion Integration</b>、<b>Figma Plugin</b>、<b>Obsidian Plugin</b>。</p>

                <hr style="margin: 30px 0; border: 0; border-top: 2px dashed #4CAF50;"/>

                <h3>🌐 基础设施级插件：Nginx / OpenResty / Pingora / Envoy</h3>
                <p>这是<b>性能要求最严苛</b>的插件场景——决定全球 30%+ 网站怎么工作。</p>

                <h4>① Nginx Module（传统 C 模块）</h4>
                <p>Nginx 处理请求有 <b>11 个 phase</b>，模块挂在任意阶段：</p>
                <div class="mermaid">
flowchart TB
    Req[请求进入]
    Req --> P1[POST_READ]
    P1 --> P2[SERVER_REWRITE]
    P2 --> P3[FIND_CONFIG]
    P3 --> P4[REWRITE]
    P4 --> P5[POST_REWRITE]
    P5 --> P6[PREACCESS]
    P6 --> P7[ACCESS 鉴权 ⭐]
    P7 --> P8[POST_ACCESS]
    P8 --> P9[PRECONTENT]
    P9 --> P10[CONTENT 生成内容 ⭐]
    P10 --> P11[LOG ⭐]
                </div>

                <pre><code class="language-bash"># 编译时静态加入
./configure --add-module=/path/to/my-module
# 或动态模块 1.9.11+
./configure --add-dynamic-module=/path/to/my-module
make modules</code></pre>
                <pre><code class="language-nginx"># nginx.conf 加载动态模块
load_module modules/ngx_http_my_module.so;</code></pre>

                <h4>② OpenResty + Lua（实战首选 ⭐）</h4>
                <p>把 Nginx 变成"高性能 Web 应用平台"，<b>修改即生效（reload）</b>。阿里、字节、Cloudflare 早期都用。</p>
                <pre><code class="language-nginx">location /api {
    content_by_lua_block {
        local cjson = require "cjson"
        local res = ngx.location.capture("/backend")
        ngx.say(cjson.encode({status = "ok", data = res.body}))
    }
}

location /protected {
    access_by_lua_block {
        local token = ngx.var.http_authorization
        if not token then ngx.exit(401) end
        local redis = require "resty.redis"
        local red = redis:new()
        red:connect("127.0.0.1", 6379)
        if not red:get("token:" .. token) then ngx.exit(403) end
    }
    proxy_pass http://backend;
}</code></pre>

                <h4>③ Pingora（Cloudflare Rust 重写版 ⭐）</h4>
                <p>Cloudflare 用 Rust 重写 Nginx，处理 <b>每秒 4000 万</b> 请求。插件 = <b>实现 trait</b>。</p>
                <pre><code class="language-rust">use pingora::prelude::*;
use async_trait::async_trait;

pub struct MyProxy;

#[async_trait]
impl ProxyHttp for MyProxy {
    type CTX = ();
    fn new_ctx(&amp;self) -&gt; () { () }

    // ⭐ 选上游
    async fn upstream_peer(&amp;self, _session: &amp;mut Session, _ctx: &amp;mut ())
        -&gt; Result&lt;Box&lt;HttpPeer&gt;&gt; {
        let addr = ("backend.example.com", 443);
        Ok(Box::new(HttpPeer::new(addr, true, "backend.example.com".into())))
    }

    // ⭐ 请求过滤：鉴权
    async fn request_filter(&amp;self, session: &amp;mut Session, _ctx: &amp;mut ())
        -&gt; Result&lt;bool&gt; {
        if session.req_header().headers.get("authorization").is_none() {
            session.respond_error(401).await;
            return Ok(true);
        }
        Ok(false)
    }

    // ⭐ 改响应
    async fn response_filter(&amp;self, _s: &amp;mut Session,
        response: &amp;mut ResponseHeader, _ctx: &amp;mut ()) -&gt; Result&lt;()&gt; {
        response.insert_header("x-server", "Pingora")?;
        Ok(())
    }
}</code></pre>
                <p>每个 <b>trait method = 一个 Phase 钩子</b>，你 override 哪个就是你的"插件"。</p>

                <h4>④ Envoy WASM（未来方向 ⭐）</h4>
                <p>Envoy 用 <b>WASM 沙箱</b> 加载插件——<b>跨语言 + 热加载 + 沙箱安全</b>。</p>
                <pre><code class="language-rust">use proxy_wasm::traits::*;
use proxy_wasm::types::*;

struct MyFilter;
impl HttpContext for MyFilter {
    fn on_http_request_headers(&amp;mut self, _: usize, _: bool) -&gt; Action {
        self.set_http_request_header("x-my-plugin", Some("hello"));
        Action::Continue
    }
}</code></pre>

                <h4>📊 4 大代理插件机制对比</h4>
                <table>
                    <tr><th>维度</th><th>Nginx C 模块</th><th>OpenResty Lua</th><th>Pingora Trait</th><th>Envoy WASM</th></tr>
                    <tr><td>语言</td><td>C</td><td>Lua</td><td>Rust</td><td>Rust/Go/JS</td></tr>
                    <tr><td>开发难度</td><td>⭐⭐⭐⭐⭐ 难</td><td>⭐⭐ 易</td><td>⭐⭐⭐ 中</td><td>⭐⭐⭐ 中</td></tr>
                    <tr><td>性能</td><td>⭐⭐⭐⭐⭐</td><td>⭐⭐⭐⭐</td><td>⭐⭐⭐⭐⭐</td><td>⭐⭐⭐⭐</td></tr>
                    <tr><td>内存安全</td><td>❌ 手动</td><td>✅ Lua</td><td>✅✅ Rust</td><td>✅✅ WASM</td></tr>
                    <tr><td>热更新</td><td>❌ 重启</td><td>✅ reload</td><td>⚠️ 需设计</td><td>✅ 运行时</td></tr>
                    <tr><td>代表用户</td><td>各大网站</td><td>OpenResty/APISIX</td><td><b>Cloudflare 已全平台迁移</b></td><td>Envoy/Istio</td></tr>
                </table>

                <h4>🚪 API 网关产品（基于 Nginx + Lua）</h4>
                <table>
                    <tr><th>产品</th><th>说明</th></tr>
                    <tr><td><b>Kong</b></td><td>基于 OpenResty 的老牌 API 网关</td></tr>
                    <tr><td><b>Apache APISIX</b> ⭐</td><td>新一代云原生网关，内置 80+ 插件（auth/限流/WAF/AI 代理）</td></tr>
                    <tr><td><b>Tengine</b></td><td>阿里开源的 Nginx 分支</td></tr>
                </table>
                <pre><code class="language-yaml"># APISIX 配置：给路由加插件就这么简单
routes:
  - uri: /api/users
    plugins:
      jwt-auth: {}
      limit-req: { rate: 100, burst: 50 }
      prometheus: {}
    upstream:
      nodes: { "127.0.0.1:8080": 1 }</code></pre>

                <hr style="margin: 30px 0; border: 0; border-top: 2px dashed #4CAF50;"/>

                <h3>🤖 AI 时代的插件：MCP / Function Call / Agent Skill</h3>
                <p>详见 <a href="#ai-era">🤖 AI 时代的编程</a> 章节。简言之：</p>
                <table>
                    <tr><th>形态</th><th>插件是什么</th><th>执行者</th></tr>
                    <tr><td><b>Function Call</b></td><td>JSON Schema 描述的函数</td><td>程序 + LLM 决策</td></tr>
                    <tr><td><b>MCP</b></td><td>独立进程的工具集</td><td>独立 Server</td></tr>
                    <tr><td><b>Agent Skill</b></td><td>Markdown 文档</td><td>LLM 阅读 + 推理</td></tr>
                </table>
                <p>→ <b>MCP = LLM 时代的 "VS Code Extension 系统"</b>。</p>

                <hr style="margin: 30px 0; border: 0; border-top: 2px dashed #4CAF50;"/>

                <h3>🌳 插件系统全景图</h3>
                <div class="mermaid">
flowchart TB
    All[插件式架构家族]

    All --> App[应用级]
    All --> Build[构建工具]
    All --> Data[数据/可视化]
    All --> Infra[基础设施级]
    All --> AI[AI 时代]

    App --> A1[VS Code]
    App --> A2[Chrome/Firefox]
    App --> A3[Figma/Notion]
    App --> A4[Obsidian]

    Build --> B1[Webpack/Vite]
    Build --> B2[Babel/ESLint]
    Build --> B3[Pytest/Jest]

    Data --> D1[Superset]
    Data --> D2[Grafana]
    Data --> D3[Jupyter]

    Infra --> I1[Nginx Module]
    Infra --> I2[OpenResty Lua ⭐]
    Infra --> I3[Pingora Trait]
    Infra --> I4[Envoy WASM]
    Infra --> I5[APISIX/Kong]

    AI --> AI1[MCP]
    AI --> AI2[Function Call]
    AI --> AI3[Agent Skill]
                </div>

                <h3>📊 4 大类插件对比</h3>
                <table>
                    <tr><th>类型</th><th>用户感知</th><th>性能要求</th><th>典型语言</th></tr>
                    <tr><td>应用插件</td><td>用户能选装</td><td>中</td><td>TS/JS</td></tr>
                    <tr><td>构建插件</td><td>开发者用</td><td>高</td><td>TS/JS</td></tr>
                    <tr><td>基础设施插件</td><td>透明</td><td><b>极高</b></td><td>C/Lua/Rust</td></tr>
                    <tr><td>AI 插件</td><td>LLM 调用</td><td>中</td><td>任意</td></tr>
                </table>

                <hr style="margin: 30px 0; border: 0; border-top: 2px dashed #4CAF50;"/>

                <h3>🧰 自己设计插件系统（Python 完整示例）</h3>
                <pre><code class="language-python"># 1. 接口契约
from abc import ABC, abstractmethod

class Plugin(ABC):
    name: str = ""
    version: str = "1.0"
    @abstractmethod
    def activate(self, context): pass
    @abstractmethod
    def deactivate(self): pass

# 2. 插件管理器（用 setuptools entry_points 发现）
import pkg_resources

class PluginManager:
    def __init__(self):
        self.plugins = {}
    def discover(self):
        for ep in pkg_resources.iter_entry_points('myapp.plugins'):
            cls = ep.load()
            self.plugins[cls.name] = cls()
    def activate_all(self, context):
        for p in self.plugins.values():
            p.activate(context)

# 3. 一个插件
class HelloPlugin(Plugin):
    name = "hello"
    def activate(self, context):
        context.register_command('hello', lambda: print("Hello!"))
    def deactivate(self): pass

# 4. 插件包的 setup.py 声明
setup(
    name='myapp-hello-plugin',
    entry_points={
        'myapp.plugins': ['hello = hello_plugin:HelloPlugin'],
    },
)
# 用户: pip install myapp-hello-plugin → 主程序自动发现</code></pre>

                <h3>⚖️ 插件系统设计的关键权衡</h3>
                <table>
                    <tr><th>设计</th><th>优</th><th>劣</th><th>代表</th></tr>
                    <tr><td>同进程加载</td><td>快、简单</td><td>一崩全崩</td><td>Pytest</td></tr>
                    <tr><td>子进程隔离</td><td>安全、稳定</td><td>通信开销</td><td>VS Code</td></tr>
                    <tr><td>WASM 沙箱</td><td>跨语言、安全</td><td>学习曲线</td><td>Envoy / Figma</td></tr>
                    <tr><td>独立服务</td><td>极致解耦</td><td>网络开销</td><td>MCP / 微服务</td></tr>
                </table>

                <h3>🎯 给你的实战建议</h3>
                <div class="mermaid">
flowchart TD
    Q{你的目标?}
    Q -->|学 Nginx 写小功能| OR[OpenResty Lua<br/>1 小时上手]
    Q -->|生产环境网关| APISIX[APISIX 或 Kong]
    Q -->|做云原生网关| Envoy3[Envoy + WASM]
    Q -->|体验 Rust 现代化| Ping[Pingora]
    Q -->|公司用 Nginx 加功能| OR2[OpenResty Lua<br/>避免改 C 模块]
    Q -->|写应用扩展| VSExt[VS Code Extension]
    Q -->|做 AI 工具| MCP3[MCP Server]
                </div>

                <h3>📚 最佳学习资源</h3>
                <table>
                    <tr><th>框架</th><th>入门资源</th></tr>
                    <tr><td>VS Code</td><td><a href="https://code.visualstudio.com/api/get-started/your-first-extension">Your First Extension</a></td></tr>
                    <tr><td>Chrome</td><td><a href="https://developer.chrome.com/docs/extensions/get-started">Chrome Extensions Hello World</a></td></tr>
                    <tr><td>Pytest</td><td><a href="https://docs.pytest.org/en/stable/how-to/writing_plugins.html">Writing plugins</a></td></tr>
                    <tr><td>Webpack</td><td><a href="https://webpack.js.org/contribute/writing-a-plugin/">Writing a Plugin</a></td></tr>
                    <tr><td>OpenResty</td><td><a href="https://openresty.org/en/getting-started.html">Getting Started</a></td></tr>
                    <tr><td>APISIX</td><td><a href="https://apisix.apache.org/docs/apisix/getting-started/">Quickstart</a></td></tr>
                    <tr><td>Pingora</td><td><a href="https://github.com/cloudflare/pingora">GitHub Repo</a></td></tr>
                    <tr><td>MCP</td><td><a href="https://modelcontextprotocol.io/quickstart">MCP Quickstart</a></td></tr>
                </table>

                <div class="tip-box success">
                    <span class="tip-title"><i class="fa fa-trophy"></i> 一句话总结</span>
                    <b>插件式架构 = "主程序保持精简 + 所有扩展通过插件"</b>。<br/>
                    <b>6 大机制</b>：接口/注册/生命周期/通信/隔离/扩展点。<br/>
                    <b>覆盖范围</b>：应用（VS Code/Chrome）→ 构建（Webpack）→ 数据（Superset）→
                    基础设施（Nginx/OpenResty/Pingora/Envoy）→ AI（MCP/Skill）。<br/>
                    <b>理解了一种插件系统就理解了所有</b>——这是工程师最值钱的"元能力"。
                </div>
            `
        },

        // ============================================================
        // 主从架构（Master-Slave）+ 备份/容灾
        // ============================================================
        {
            id: 'arch-master-slave',
            title: '10. 主从架构 + 备份 + 容灾',
            html: `
                <p><b>主从架构（Master-Slave Replication）</b>是数据系统最经典的高可用方案。
                <b>常见误解</b>：主从主要用于备份。<b>真相</b>：备份只是顺带产物，主从有 5 大用途。</p>

                <h3>🆚 先理清概念：主从 ≠ 备份 ≠ 容灾</h3>
                <table>
                    <tr><th></th><th>主从架构</th><th>备份</th><th>容灾</th></tr>
                    <tr><td><b>同步频率</b></td><td>实时（毫秒级）</td><td>定期（小时/天）</td><td>实时或异步</td></tr>
                    <tr><td><b>数据延迟</b></td><td>极低</td><td>可能很久</td><td>中等</td></tr>
                    <tr><td><b>从节点</b></td><td>在线提供服务</td><td>离线存档</td><td>在线但通常不提供服务</td></tr>
                    <tr><td><b>能切换吗</b></td><td>是（自动/手动）</td><td>否（需要恢复）</td><td>是（应急切换）</td></tr>
                    <tr><td><b>主要目的</b></td><td>性能 + 高可用</td><td>防数据丢失</td><td>防机房灾难</td></tr>
                </table>
                <div class="tip-box">
                    <b>三者互补，不可互相替代</b>——生产级数据库架构需要"主从 + 备份 + 容灾"三件套。
                </div>

                <h3>🎯 主从架构 5 大核心用途</h3>
                <div class="mermaid">
flowchart TB
    MS[主从架构核心用途]
    MS --> U1[① 读写分离<br/>性能扩展]
    MS --> U2[② 高可用 HA<br/>主挂从顶上]
    MS --> U3[③ 容灾备份<br/>异地副本]
    MS --> U4[④ 负载分流<br/>报表/分析]
    MS --> U5[⑤ 数据隔离<br/>开发/测试环境]
                </div>

                <hr style="margin: 30px 0; border: 0; border-top: 2px dashed #4CAF50;"/>

                <h3>① 读写分离（最重要）⭐</h3>
                <div class="mermaid">
flowchart LR
    App[应用层]
    App -->|写 INSERT/UPDATE/DELETE| Master[(主库 Master)]
    App -->|读 SELECT| Slave1[(从库 1)]
    App -->|读 SELECT| Slave2[(从库 2)]
    App -->|读 SELECT| Slave3[(从库 3)]
    Master -.异步复制 binlog.-> Slave1
    Master -.异步复制.-> Slave2
    Master -.异步复制.-> Slave3
                </div>
                <ul>
                    <li>大多数业务<b>读:写 ≈ 10:1</b>（电商查商品多、下单少）</li>
                    <li>1 主扛不住读 → <b>加从库横向扩展</b></li>
                    <li>主库专注写入 → 性能稳定</li>
                    <li><b>典型部署</b>：1 主 + 2~5 从，用 ShardingSphere / ProxySQL 自动路由</li>
                </ul>

                <h3>② 高可用 HA（主挂从顶上）</h3>
                <div class="mermaid">
sequenceDiagram
    participant App
    participant Master
    participant Slave
    participant Sentinel as 哨兵/HA 工具
    App->>Master: 写请求
    Master-->>App: OK
    Note over Master: 主库宕机！
    Sentinel->>Master: 心跳检测失败
    Sentinel->>Slave: 提升为新主
    Sentinel->>App: 更新配置 VIP 切换
    App->>Slave: 后续写请求
    Note over Slave: 现在是 Master
                </div>
                <table>
                    <tr><th>数据库</th><th>HA 工具</th></tr>
                    <tr><td>MySQL</td><td>MHA、Orchestrator、MGR</td></tr>
                    <tr><td>Redis</td><td>Sentinel、Cluster</td></tr>
                    <tr><td>PostgreSQL</td><td>Patroni、repmgr</td></tr>
                </table>
                <p><b>RTO</b>（故障恢复时间）：秒级到分钟级。</p>

                <h3>③ 容灾备份（异地从库）</h3>
                <div class="mermaid">
flowchart TB
    subgraph Beijing[北京机房]
        M[主库]
        S1[从库 1]
        S2[从库 2]
    end
    subgraph Shanghai[上海机房 灾备]
        S3[从库 3]
    end
    subgraph Singapore[新加坡 海外]
        S5[从库 5]
    end
    M -.同步.-> S1
    M -.同步.-> S2
    M -.跨区同步.-> S3
    M -.跨国同步.-> S5
                </div>
                <ul>
                    <li>北京机房整体故障 → 切到上海继续服务</li>
                    <li>海外用户就近读取（地理就近）</li>
                </ul>

                <h3>④ 负载分流（重活给从库）</h3>
                <ul>
                    <li>财务跑月度报表 → 在从库跑，不影响主库交易</li>
                    <li>大数据每天 ETL → 从从库读，避免锁主库</li>
                    <li>ES 全文索引同步 → 从从库订阅 binlog</li>
                </ul>

                <h3>⑤ 数据隔离（环境复制）</h3>
                <p>用从库给开发/测试<b>提供真实数据</b>，又不影响生产。</p>

                <hr style="margin: 30px 0; border: 0; border-top: 2px dashed #4CAF50;"/>

                <h3>⚙️ 主从复制的工作原理（MySQL 为例）</h3>
                <div class="mermaid">
sequenceDiagram
    participant App
    participant Master
    participant Binlog as 主库 binlog
    participant Slave as 从库
    App->>Master: INSERT/UPDATE
    Master->>Master: 执行 SQL + 改数据
    Master->>Binlog: 记录变更 binary log
    Binlog-->>Slave: IO 线程拉取
    Slave->>Slave: 写入 relay log
    Slave->>Slave: SQL 线程重放
    Note over Slave: 从库数据与主库一致
                </div>
                <p><b>3 个线程</b>：</p>
                <ol>
                    <li>主库 <b>dump 线程</b>：把 binlog 发给从库</li>
                    <li>从库 <b>IO 线程</b>：接收 binlog 写到 relay log</li>
                    <li>从库 <b>SQL 线程</b>：读 relay log 重放 SQL</li>
                </ol>

                <h3>📊 三种同步模式</h3>
                <table>
                    <tr><th>模式</th><th>工作方式</th><th>优</th><th>劣</th></tr>
                    <tr><td><b>异步 Async</b> ⭐ 最常见</td><td>主库不等从库 ACK</td><td>性能高</td><td>主挂可能丢数据</td></tr>
                    <tr><td><b>全同步 Sync</b></td><td>主库等所有从库 ACK</td><td>数据绝不丢</td><td>性能差，从库挂会卡住主库</td></tr>
                    <tr><td><b>半同步 Semi-Sync</b> ⭐ 折中</td><td>主库等至少 1 个从库 ACK</td><td>兼顾性能和安全</td><td>仍可能少量延迟</td></tr>
                </table>
                <div class="tip-box">
                    <b>生产实践</b>：99% 项目用<b>异步</b>；金融关键业务用<b>半同步</b>；几乎没人用全同步。
                </div>

                <hr style="margin: 30px 0; border: 0; border-top: 2px dashed #4CAF50;"/>

                <h3>🌐 主从架构在不同系统中的形态</h3>
                <div class="mermaid">
flowchart TB
    MS2[主从架构应用]
    MS2 --> DB[数据库]
    MS2 --> Cache[缓存]
    MS2 --> File[文件系统]
    MS2 --> MQ[消息队列]
    MS2 --> Search[搜索]
    MS2 --> Big[大数据]

    DB --> DB1[MySQL Master-Slave]
    DB --> DB2[PostgreSQL Streaming Replication]
    DB --> DB3[MongoDB Replica Set]

    Cache --> C1[Redis Master-Slave]
    Cache --> C2[Redis Sentinel/Cluster]

    File --> F1[HDFS NameNode + Standby]
    File --> F2[Ceph OSD 副本]

    MQ --> MQ1[Kafka Leader/Follower 分区]
    MQ --> MQ2[RabbitMQ Mirror]

    Search --> S1[ES Primary/Replica]

    Big --> B1[ZooKeeper Leader/Follower]
    Big --> B2[Etcd Raft]
                </div>

                <h3>🆚 与其他类似架构的对比</h3>
                <table>
                    <tr><th>架构</th><th>特点</th><th>代表</th></tr>
                    <tr><td><b>主从 Master-Slave</b></td><td>1 主多从，只主能写</td><td>MySQL 传统</td></tr>
                    <tr><td>双主 Master-Master</td><td>互为主从，都能写</td><td>MySQL MM、PG BDR</td></tr>
                    <tr><td>多主 Multi-Primary</td><td>多个节点都能写</td><td>MySQL Group Replication</td></tr>
                    <tr><td>分片 Sharding</td><td>数据按规则拆到不同主库</td><td>MongoDB、TiDB</td></tr>
                    <tr><td>共识 Raft/Paxos</td><td>多副本一致性算法</td><td>Etcd、Consul、TiKV</td></tr>
                </table>
                <p>→ 现代系统逐渐从"主从"演化为"<b>共识算法 + 自动选主</b>"（如 TiDB、CockroachDB）。</p>

                <hr style="margin: 30px 0; border: 0; border-top: 2px dashed #4CAF50;"/>

                <h3>⚠️ 主从架构的典型问题</h3>

                <h4>1. 主从延迟（最经典痛点）</h4>
                <div class="mermaid">
sequenceDiagram
    User->>App: 提交订单
    App->>Master: INSERT
    Master-->>App: OK
    App->>User: 提交成功
    User->>App: 立刻查订单列表
    App->>Slave: SELECT
    Slave-->>App: 没有这个订单！
    Note over Slave: 主从同步还没完成 延迟 100ms
                </div>
                <p><b>解决方案</b>：</p>
                <ul>
                    <li>强一致需求 → <b>强制读主</b></li>
                    <li>用 GTID 等机制确认同步完成再读</li>
                    <li>中间件路由支持"刚写过 N 秒内读主"</li>
                </ul>

                <h4>2. 故障切换数据丢失</h4>
                <p>异步复制下主挂了，未同步到从库的数据<b>永久丢失</b>。<br/>
                → 解决：半同步 + 定期备份。</p>

                <h4>3. 从库一致性问题</h4>
                <p>多个从库各自延迟不同 → 用户每次查可能看到不同数据。<br/>
                → 解决：会话粘性（一个用户始终读同一个从库）。</p>

                <hr style="margin: 30px 0; border: 0; border-top: 2px dashed #4CAF50;"/>

                <h3>💾 真正的备份是怎么做的？</h3>
                <div class="mermaid">
flowchart TB
    Backup[备份方案]
    Backup --> B1[① 物理备份<br/>直接拷贝数据文件]
    Backup --> B2[② 逻辑备份<br/>导出 SQL/JSON]
    Backup --> B3[③ binlog 增量<br/>+ 全量基础]
    Backup --> B4[④ 快照<br/>云盘/LVM 瞬时拍照]

    B1 --> T1[mysqldump xtrabackup<br/>pg_basebackup]
    B2 --> T2[mysqldump --single-transaction]
    B3 --> T3[binlog + 定期全量]
    B4 --> T4[AWS RDS snapshot<br/>阿里云快照]
                </div>

                <p><b>生产级备份策略</b>：</p>
                <ul>
                    <li>每天一次<b>全量备份</b></li>
                    <li>实时保留 <b>binlog 增量</b></li>
                    <li>数据丢失能<b>回滚到任意时间点</b>（PITR, Point-In-Time Recovery）</li>
                </ul>

                <h3>🏗 三件套的关系</h3>
                <div class="mermaid">
flowchart LR
    Master2[主库] -->|实时同步| Slave3[从库<br/>高可用 + 读写分离]
    Master2 -->|每天全量| Backup3[(备份文件<br/>防止误删)]
    Master2 -->|跨区同步| DR[异地从库<br/>容灾]
                </div>

                <hr style="margin: 30px 0; border: 0; border-top: 2px dashed #4CAF50;"/>

                <h3>🛒 一个真实电商架构示例</h3>
                <div class="mermaid">
flowchart TB
    App[电商应用]
    App --> Cache[(Redis 缓存)]
    Cache -.miss.-> Router[ShardingSphere<br/>读写路由]

    Router -->|写| M[(MySQL 主库)]
    Router -->|普通读| S1[(从库 1)]
    Router -->|普通读| S2[(从库 2)]
    Router -->|刚写过的强一致读| M
    Router -->|后台报表| S3[(从库 3 报表专用)]

    M -.binlog.-> ES[Elasticsearch 搜索]
    M -.binlog.-> DW[(数仓)]
    M -.每天全量备份.-> Backup[(备份 S3)]
    M -.异地同步.-> DR[(深圳灾备从库)]
                </div>

                <p><b>这个架构同时利用了</b>：</p>
                <ol>
                    <li>读写分离（性能）</li>
                    <li>多从库（高可用）</li>
                    <li>异地从库（容灾）</li>
                    <li>专用从库（报表分流）</li>
                    <li>binlog 流式（ES/数仓同步）</li>
                    <li>独立备份（防误删）</li>
                </ol>

                <h3>📋 实战建议</h3>
                <div class="mermaid">
flowchart TD
    Q{你的项目?}
    Q -->|个人项目| A1[单库即可 别折腾]
    Q -->|QPS &lt; 1000| A2[1 主 + 1 从 读写分离]
    Q -->|QPS 1000~10000| A3[1 主 + N 从 + 缓存]
    Q -->|核心业务高可用| A4[1 主 + N 从 + 半同步 + Sentinel/MHA]
    Q -->|跨地域服务| A5[多区域从库 + 自动 failover]
    Q -->|超大规模| A6[分片 Sharding + 主从]
                </div>

                <div class="tip-box success">
                    <span class="tip-title"><i class="fa fa-trophy"></i> 一句话总结</span>
                    <b>主从架构 ≠ 备份</b>。它的 5 大用途：<br/>
                    ① <b>读写分离</b>（性能）② <b>高可用</b>（HA）③ <b>容灾</b>（异地）
                    ④ <b>负载分流</b>（报表）⑤ <b>数据隔离</b>（测试）<br/>
                    <b>生产级数据库需要"主从 + 备份 + 容灾"三件套</b>，缺一不可。<br/>
                    <b>相关概念</b>：与<a href="#arch-mvc-family">CQRS</a>（读写模型分离）思想一致，
                    与<a href="#arch-mirror-family">镜像同步家族</a>同源。
                </div>
            `
        },

        {
            id: 'arch-others',
            title: '11. 其他架构模式',
            html: `
                <table>
                    <tr><th>模式</th><th>说明</th><th>典型应用</th></tr>
                    <tr><td>管道-过滤器 Pipe-Filter</td><td>数据流经一连串过滤器</td><td>Unix 管道、流处理</td></tr>
                    <tr><td>客户端-服务器 C/S</td><td>请求-响应模型</td><td>所有 Web 应用</td></tr>
                    <tr><td>P2P</td><td>对等节点直连</td><td>BitTorrent、区块链</td></tr>
                    <tr><td>BFF</td><td>Backend For Frontend，按端定制后端</td><td>移动 App + Web</td></tr>
                    <tr><td>Lambda / Kappa</td><td>大数据批+流 / 纯流</td><td>实时数仓</td></tr>
                </table>
                <p>已独立成节的模式：<a href="#arch-blackboard">8. 黑板架构</a>、
                <a href="#arch-microkernel">9. 插件式架构</a>、
                <a href="#arch-master-slave">10. 主从架构</a>。</p>
            `
        }
    ]
});
