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

                <h3>核心概念</h3>
                <div class="card-grid">
                    <div class="card"><div class="card-title">Entity（实体）</div>
                        <div class="card-desc">有唯一标识，会变化。如 User、Order</div></div>
                    <div class="card"><div class="card-title">Value Object（值对象）</div>
                        <div class="card-desc">无 ID 不可变。如 Money、Address</div></div>
                    <div class="card"><div class="card-title">Aggregate（聚合根）</div>
                        <div class="card-desc">一组对象的边界，外部只能通过聚合根访问</div></div>
                    <div class="card"><div class="card-title">Repository（仓储）</div>
                        <div class="card-desc">聚合根的持久化</div></div>
                    <div class="card"><div class="card-title">Domain Service</div>
                        <div class="card-desc">不适合放在 Entity 里的业务逻辑</div></div>
                    <div class="card"><div class="card-title">Bounded Context</div>
                        <div class="card-desc">业务边界，不同上下文可有同名不同义</div></div>
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
                <p>组件之间通过<b>事件</b>异步通信，<b>极致解耦</b>。</p>
                <div class="mermaid">
flowchart LR
    P1[生产者 订单服务] -->|OrderCreated| B[(Event Bus<br/>Kafka/RabbitMQ)]
    B --> C1[库存服务]
    B --> C2[通知服务]
    B --> C3[积分服务]
                </div>
                <h3>变体</h3>
                <ul>
                    <li><b>事件通知</b>：只通知"发生了什么"</li>
                    <li><b>事件溯源</b>（Event Sourcing）：所有变更存为事件流，状态由事件回放得到</li>
                    <li><b>CQRS</b>：命令（写）与查询（读）分离，常配合事件溯源</li>
                </ul>
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
