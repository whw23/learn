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
        {
            id: 'arch-layered',
            title: '2. 分层架构（Layered）',
            html: `
                <p>系统分为多层，每层只依赖下一层。是最经典、最广泛使用的架构。</p>
                <p>详细内容见下一大章 <a href="#layer">后端分层架构</a>。</p>
            `
        },
        {
            id: 'arch-hexagonal',
            title: '3. 六边形架构 / 整洁架构 / 洋葱架构',
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
            title: '4. DDD（领域驱动设计）',
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
            title: '5. SOA / 微服务 / Serverless',
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
            title: '6. 事件驱动架构（EDA）',
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
            title: '7. 其他架构模式',
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
