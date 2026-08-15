/* 纵切与横切：代码组织的两个正交维度 */
window.SECTIONS.push({
    id: 'slice',
    title: '🔪 纵切与横切',
    icon: 'fa-cut',
    intro: `
        <p>写代码时，文件按什么维度分组？最常见的有两种正交思路：</p>
        <ul>
            <li><b>纵切（Vertical Slice）</b>：按<b>业务功能/特性</b>组织，一个功能内部自包含全部技术层。</li>
            <li><b>横切（Horizontal Layering）</b>：按<b>技术职责</b>组织，所有功能共用同一批层。</li>
        </ul>
        <p>它们不是二选一，而是两个维度。好的大型项目通常是<b>外层纵切、内层横切</b>。</p>

        <h2>📐 两个正交维度</h2>
        <div class="mermaid">
flowchart TB
    subgraph Dim["代码组织的两个维度"]
        direction TB
        V["纵切 Vertical\n按业务功能/上下文"]
        H["横切 Horizontal\n按技术职责/层"]
        V -."正交".-> H
    end
        </div>
    `,
    subs: [
        {
            id: 'slice-vertical',
            title: '1. 纵切的各种方式',
            html: `
                <p><b>纵切</b>的核心是：把同一个业务能力的所有代码放在一起，降低跨功能耦合。</p>

                <h3>1.1 按业务功能（Feature-based）</h3>
                <p>最常见的纵切方式，每个文件夹就是一个业务模块。</p>
                <pre><code class="language-text">src/
├── user/
│   ├── User.java
│   ├── UserService.java
│   ├── UserRepository.java
│   └── UserController.java
├── order/
│   ├── Order.java
│   ├── OrderService.java
│   ├── OrderRepository.java
│   └── OrderController.java
└── payment/
    ├── Payment.java
    ├── PaymentService.java
    ├── PaymentRepository.java
    └── PaymentController.java</code></pre>

                <h3>1.2 按限界上下文（Bounded Context）</h3>
                <p>DDD 中的纵切单位。一个 Bounded Context 内部有自己的领域模型、应用服务、仓储，
                不同上下文之间通过显式接口或事件通信。</p>
                <pre><code class="language-text">src/
├── identity/              # 身份认证上下文
│   ├── domain/
│   ├── application/
│   └── infrastructure/
├── billing/               # 计费上下文
│   ├── domain/
│   ├── application/
│   └── infrastructure/
└── shipping/              # 物流上下文
    ├── domain/
    ├── application/
    └── infrastructure/</code></pre>

                <h3>1.3 按子系统/模块（Module/Subsystem）</h3>
                <p>比功能更大，适合 monorepo 或多模块项目。每个模块可以独立构建、独立部署。</p>
                <pre><code class="language-text">modules/
├── user-module/
├── order-module/
├── payment-module/
└── notification-module/</code></pre>

                <h3>1.4 按用例/用户旅程（Use Case）</h3>
                <p>每个文件夹对应一个完整业务用例，常见于 Clean Architecture / Vertical Slice Architecture。</p>
                <pre><code class="language-text">src/
├── create-order/
│   ├── CreateOrderCommand.java
│   ├── CreateOrderHandler.java
│   └── CreateOrderValidator.java
├── pay-order/
│   ├── PayOrderCommand.java
│   ├── PayOrderHandler.java
│   └── PayOrderValidator.java
└── cancel-order/
    ├── CancelOrderCommand.java
    ├── CancelOrderHandler.java
    └── CancelOrderValidator.java</code></pre>

                <div class="tip-box success">
                    <span class="tip-title"><i class="fa fa-check"></i> 纵切的优点</span>
                    <ul>
                        <li>改一个功能，文件基本在一个目录内。</li>
                        <li>功能边界清晰，不易产生跨模块循环依赖。</li>
                        <li>天然适配微服务拆分：一个上下文就是一个服务候选。</li>
                    </ul>
                </div>
            `
        },
        {
            id: 'slice-horizontal',
            title: '2. 横切的各种方式',
            html: `
                <p><b>横切</b>的核心是：把相同技术职责的代码放在一起，统一规范、便于复用。</p>

                <h3>2.1 经典 N 层架构</h3>
                <p>Web 后端最常见的分层方式。</p>
                <pre><code class="language-text">src/
├── controller/      # API 入口
├── service/         # 业务逻辑
├── repository/      # 数据访问
├── entity/          # 数据模型
└── dto/             # 数据传输对象</code></pre>

                <h3>2.2 DDD 分层</h3>
                <p>领域驱动设计中的分层，强调领域模型是核心。</p>
                <pre><code class="language-text">src/
├── domain/          # 实体、值对象、领域服务、领域事件
├── application/     # 应用服务、用例编排
├── infrastructure/  # 仓储实现、外部适配
└── interfaces/      # Controller、CLI、消息监听</code></pre>

                <h3>2.3 整洁架构（Clean Architecture）</h3>
                <p>Robert C. Martin 提出的分层，依赖方向指向中心。</p>
                <pre><code class="language-text">src/
├── entities/              # 企业级业务规则
├── use-cases/             # 应用业务规则
├── interface-adapters/    # 控制器、展示器、网关
└── frameworks-drivers/    # Web、DB、外部框架</code></pre>

                <h3>2.4 技术能力分层</h3>
                <p>有些团队按技术能力命名：api（接入）、biz（业务）、dal（数据访问）。</p>
                <pre><code class="language-text">src/
├── api/             # HTTP/RPC 入口
├── biz/             # 业务逻辑
├── dal/             # 数据访问层
├── common/          # 公共工具
└── config/          # 配置</code></pre>

                <div class="tip-box">
                    <span class="tip-title"><i class="fa fa-info"></i> 横切的优点</span>
                    <ul>
                        <li>同一层的代码风格、抽象级别一致。</li>
                        <li>容易抽取公共逻辑和通用基础设施。</li>
                        <li>新人可以快速理解技术栈结构。</li>
                    </ul>
                </div>
            `
        },
        {
            id: 'slice-combined',
            title: '3. 先纵切，再横切',
            html: `
                <p>大型项目的最佳实践通常是<b>外层纵切、内层横切</b>：先用业务边界把系统切开，
                再在每一块内部做分层。</p>

                <div class="mermaid">
flowchart TB
    subgraph System["整个系统"]
        direction TB
        subgraph User["user/ 上下文"]
            UApi["api/"]
            UApp["application/"]
            UDom["domain/"]
            UInf["infrastructure/"]
        end
        subgraph Order["order/ 上下文"]
            OApi["api/"]
            OApp["application/"]
            ODom["domain/"]
            OInf["infrastructure/"]
        end
        subgraph Pay["payment/ 上下文"]
            PApi["api/"]
            PApp["application/"]
            PDom["domain/"]
            PInf["infrastructure/"]
        end
    end
                </div>

                <pre><code class="language-text">src/
├── user/                       # 外层纵切：业务上下文
│   ├── api/                    # 内层横切：技术层
│   │   └── UserController.java
│   ├── application/
│   │   └── UserAppService.java
│   ├── domain/
│   │   ├── User.java
│   │   └── UserRepository.java # 接口
│   └── infrastructure/
│       └── UserRepositoryImpl.java
├── order/
│   ├── api/
│   ├── application/
│   ├── domain/
│   └── infrastructure/
├── payment/
│   ├── api/
│   ├── application/
│   ├── domain/
│   └── infrastructure/
└── shared/                     # 真正跨上下文才放这里
    ├── event/
    ├── exception/
    └── util/</code></pre>

                <p>这样既能享受纵切的<b>高内聚</b>，又能保留横切的<b>职责清晰</b>。</p>
            `
        },
        {
            id: 'slice-ddd-coupling-trap',
            title: '4. 直接套用 DDD 分层会破坏低耦合',
            html: `
                <p>DDD 分层本身没问题，但<b>直接把它当成项目顶层文件夹结构</b>，常常是一个陷阱。</p>

                <h3>❌ 常见误用</h3>
                <p>把所有功能都塞进同一个 <code>domain/</code>、<code>application/</code>、<code>infrastructure/</code>：</p>
                <pre><code class="language-text">src/
├── domain/               # 所有功能的领域对象混在一起
│   ├── User.java
│   ├── Order.java
│   ├── Payment.java
│   └── Inventory.java
├── application/          # 所有功能的应用服务混在一起
│   ├── UserService.java
│   ├── OrderService.java
│   └── PaymentService.java
└── infrastructure/       # 所有功能的仓储混在一起
    ├── UserRepository.java
    ├── OrderRepository.java
    └── PaymentRepository.java</code></pre>

                <h3>🔴 为什么这破坏了低耦合</h3>
                <ul>
                    <li><b>改动扩散</b>：改订单功能时，可能在 application 层同时改动 OrderService、PaymentService、InventoryService。</li>
                    <li><b>循环依赖</b>：OrderService 依赖 PaymentService，PaymentService 又依赖 OrderService，最后变成一团。</li>
                    <li><b>领域模型污染</b>：User、Order、Payment 的实体互相引用，失去清晰的聚合边界。</li>
                    <li><b>层变成大泥球</b>：名义上分层了，实际上只是把所有代码按类型堆在一起。</li>
                </ul>

                <h3>✅ 正确的 DDD 组织方式</h3>
                <p>DDD 的 domain/application/infrastructure 应该放在<b>每个 Bounded Context 内部</b>，
                而不是作为整个项目的顶层划分。</p>
                <pre><code class="language-text">src/
├── order/                        # Bounded Context
│   ├── domain/                   # 只有订单领域的实体、值对象、事件
│   ├── application/              # 只有订单用例
│   └── infrastructure/           # 只有订单仓储实现
├── payment/                      # 另一个 Bounded Context
│   ├── domain/
│   ├── application/
│   └── infrastructure/
└── shared-kernel/                # 极少数真正共享的概念</code></pre>

                <div class="tip-box success">
                    <span class="tip-title"><i class="fa fa-lightbulb-o"></i> 关键原则</span>
                    <b>先按业务边界纵切，再在每个边界内部做 DDD 分层。</b>
                    如果所有功能共用一套 domain/application/infrastructure，那只是"按层分文件夹"，不是真正的 DDD。
                </div>
            `
        },
        {
            id: 'slice-compare',
            title: '5. 对比与选择',
            html: `
                <table>
                    <tr><th>维度</th><th>纵切</th><th>横切</th></tr>
                    <tr><td>组织依据</td><td>业务功能 / Bounded Context</td><td>技术职责 / 分层</td></tr>
                    <tr><td>改一个功能</td><td>文件集中，效率高</td><td>跨多个层文件夹</td></tr>
                    <tr><td>复用公共逻辑</td><td>需要主动抽取 shared/</td><td>同层复用自然</td></tr>
                    <tr><td>耦合控制</td><td>功能边界清晰</td><td>层内易循环依赖</td></tr>
                    <tr><td>适合规模</td><td>中大型、多团队</td><td>小型、功能联系紧密</td></tr>
                    <tr><td>与 DDD 关系</td><td>天然对齐 Bounded Context</td><td>是 DDD 内部的组织方式</td></tr>
                </table>

                <h3>🎯 选择建议</h3>
                <ul>
                    <li><b>个人项目 / 小团队 / 功能少于 10 个</b>：横切就够了，简单直接。</li>
                    <li><b>业务复杂 / 功能边界清晰 / 多团队协作</b>：先纵切，再横切。</li>
                    <li><b>DDD 项目</b>：顶层一定是 Bounded Context（纵切），内部再用 domain/application/infrastructure（横切）。</li>
                    <li><b>微服务过渡</b>：纵切后的每个上下文，未来可以平滑拆成一个服务。</li>
                </ul>
            `
        }
    ]
});
