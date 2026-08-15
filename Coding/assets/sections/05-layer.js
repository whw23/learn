/* 后端分层架构详解 */
window.SECTIONS.push({
    id: 'layer',
    title: '🧱 后端分层架构',
    icon: 'fa-bars',
    intro: `
        <p>后端项目通常按<b>"职责"</b>分层。依赖<b>自上而下单向流动</b>，下层不知道上层存在。</p>
        <p>代码组织还有另一个维度：按业务功能<b>纵切</b> vs 按技术职责<b>横切</b>。详见
        <a href="#slice">🔪 纵切与横切</a> 章节。</p>

        <h2>📊 经典 N 层架构总图</h2>
        <div class="mermaid">
flowchart TB
    Client[Client / 前端]
    Client --> API[API/Controller 层 - 接收请求]
    API --> Facade[Facade/AppService 层 - 编排可选]
    Facade --> Service[Service 层 - 业务逻辑]
    Service --> Domain[Domain 层 - 领域模型 可选]
    Service --> Repo[Repository/DAO 层 - 数据访问]
    Repo --> Mapper[ORM/Mapper 层]
    Mapper --> DB[(数据库)]
    Service -.->|外部调用| Adapter[Adapter/Integration 层]
    Adapter --> Third[第三方服务]
    API -.->|参数转换| DTO[DTO/VO]
    Service -.->|对象映射| Conv[Converter/Mapper]
        </div>
    `,
    subs: [
        {
            id: 'layer-controller',
            title: '1. Controller / API 层',
            html: `
                <p><b>职责</b>：接收 HTTP/RPC/WebSocket 请求，校验参数，调用 Service，返回响应。</p>
                <ul>
                    <li>✅ 参数解析（path/query/body）</li>
                    <li>✅ 请求校验（用 Schema/Validator）</li>
                    <li>✅ 异常翻译成 HTTP 状态码</li>
                    <li>❌ 不写业务逻辑</li>
                    <li>❌ 不直接访问数据库</li>
                </ul>
                <pre><code class="language-python">@router.post("/users")
async def create_user(dto: UserCreateDTO, svc: UserService = Depends()):
    user = await svc.create(dto)
    return UserVO.from_model(user)</code></pre>
            `
        },
        {
            id: 'layer-service',
            title: '2. Service / 业务层',
            html: `
                <p><b>职责</b>：核心业务编排。调用 Repository、组合多个领域操作、处理事务。</p>
                <ul>
                    <li>✅ 业务规则（如"余额不能为负"）</li>
                    <li>✅ 事务边界</li>
                    <li>✅ 调用外部服务、发消息</li>
                    <li>❌ 不直接处理 HTTP</li>
                    <li>❌ 不写 SQL</li>
                </ul>
                <pre><code class="language-python">class OrderService:
    def __init__(self, order_repo, inventory_svc, payment_svc):
        self.order_repo = order_repo
        self.inv = inventory_svc
        self.pay = payment_svc

    @transactional
    async def place(self, dto: OrderCreateDTO) -> Order:
        await self.inv.lock(dto.items)
        order = await self.order_repo.save(Order.from_dto(dto))
        await self.pay.charge(order)
        return order</code></pre>
            `
        },
        {
            id: 'layer-repo',
            title: '3. Repository / DAO 层',
            html: `
                <p><b>职责</b>：封装数据库操作，对上层暴露<b>面向领域</b>的方法（不是 SQL）。</p>
                <table>
                    <tr><th>概念</th><th>说明</th></tr>
                    <tr><td><b>Repository</b></td><td>DDD 概念，返回领域对象/聚合根，偏业务</td></tr>
                    <tr><td><b>DAO</b></td><td>Data Access Object，偏数据表，更底层</td></tr>
                    <tr><td><b>Mapper</b></td><td>MyBatis 风格，把 SQL 映射成方法</td></tr>
                </table>
                <pre><code class="language-python">class UserRepository:
    def __init__(self, session): self.session = session

    async def find_by_email(self, email: str) -> User | None:
        return await self.session.scalar(
            select(UserPO).where(UserPO.email == email)
        )

    async def save(self, user: User) -> User:
        po = UserPO(**user.dict())
        self.session.add(po)
        await self.session.flush()
        return User.from_po(po)</code></pre>
                <div class="tip-box">
                    <span class="tip-title"><i class="fa fa-info"></i> 关键约定</span>
                    Repository 返回 <b>领域对象</b>，不返回 ORM 实体。这样上层不依赖 ORM。
                </div>
            `
        },
        {
            id: 'layer-orm',
            title: '4. ORM / Model 层',
            html: `
                <p><b>ORM（Object-Relational Mapping）</b>：把对象自动映射到数据库表。</p>
                <pre><code class="language-python">class UserPO(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(unique=True)
    created_at: Mapped[datetime] = mapped_column(default=datetime.utcnow)</code></pre>
                <table>
                    <tr><th>语言</th><th>常用 ORM</th></tr>
                    <tr><td>Python</td><td>SQLAlchemy, Django ORM, Tortoise, Peewee</td></tr>
                    <tr><td>Java</td><td>Hibernate, MyBatis, JPA</td></tr>
                    <tr><td>JS/TS</td><td>Prisma, TypeORM, Sequelize, Drizzle</td></tr>
                    <tr><td>Go</td><td>GORM, Ent, sqlc</td></tr>
                </table>
            `
        },
        {
            id: 'layer-domain',
            title: '5. Domain 层（DDD 风格）',
            html: `
                <p>放<b>领域模型 + 领域服务 + 领域事件</b>。是六边形架构/DDD 项目的核心。</p>
                <pre><code class="language-python">class Account:                 # 领域实体
    def __init__(self, id, balance):
        self.id = id
        self._balance = balance

    def withdraw(self, amount):  # 业务规则在领域里
        if amount > self._balance:
            raise InsufficientBalance
        self._balance -= amount
        return WithdrewEvent(self.id, amount)  # 领域事件</code></pre>
            `
        },
        {
            id: 'layer-facade',
            title: '6. Facade / AppService 层',
            html: `
                <p>当 Service 调用复杂、跨多个领域时，加一层 <b>应用服务（AppService）</b> 做编排。</p>
                <p>对外暴露用例（UseCase）级 API，对内调度多个 DomainService。</p>
            `
        },
        {
            id: 'layer-adapter',
            title: '7. Adapter / Integration 层',
            html: `
                <p>对接<b>外部系统</b>：第三方 API、消息队列、缓存、文件存储。</p>
                <p>用<b>接口 + 适配器</b>隔离细节，方便替换实现和单元测试。</p>
                <pre><code class="language-python">class PaymentGateway(Protocol):
    def charge(self, amount: int) -> str: ...

class StripeAdapter(PaymentGateway):
    def charge(self, amount):
        return stripe.Charge.create(amount=amount)

class AlipayAdapter(PaymentGateway):
    def charge(self, amount):
        return alipay.trade.pay(amount)</code></pre>
            `
        },
        {
            id: 'layer-other',
            title: '8. 其他常见分层',
            html: `
                <table>
                    <tr><th>层</th><th>职责</th></tr>
                    <tr><td><b>Middleware（中间件）</b></td><td>请求前/后处理：鉴权、日志、CORS</td></tr>
                    <tr><td><b>Filter / Interceptor</b></td><td>类似中间件，AOP 实现</td></tr>
                    <tr><td><b>Validator</b></td><td>参数校验、业务校验</td></tr>
                    <tr><td><b>Converter / Mapper</b></td><td>DTO ↔ Entity ↔ VO 转换</td></tr>
                    <tr><td><b>Util / Helper</b></td><td>通用工具函数</td></tr>
                    <tr><td><b>Config</b></td><td>配置、常量、环境变量</td></tr>
                    <tr><td><b>Exception</b></td><td>自定义异常、全局异常处理</td></tr>
                    <tr><td><b>DTO / VO / Schema</b></td><td>数据传输与展示对象</td></tr>
                    <tr><td><b>Event / Listener</b></td><td>领域事件 + 监听处理</td></tr>
                    <tr><td><b>Job / Scheduler</b></td><td>定时任务、异步任务</td></tr>
                    <tr><td><b>RPC Client</b></td><td>调用其他微服务</td></tr>
                </table>
            `
        },
        {
            id: 'layer-rule',
            title: '9. 分层架构的核心铁律',
            html: `
                <div class="tip-box success">
                    <ol>
                        <li><b>依赖单向流动</b>：Controller → Service → Repository → ORM → DB</li>
                        <li><b>跨层不能跳层</b>：Controller 不能直接调 Repository</li>
                        <li><b>下层不感知上层</b>：Service 不知道是被 HTTP 还是 CLI 调用</li>
                        <li><b>面向接口编程</b>：依赖抽象，实现可替换</li>
                        <li><b>数据对象在边界转换</b>：DTO 进入 Service 前转换；离开前再转 VO</li>
                    </ol>
                </div>

                <h3>典型项目目录</h3>
                <pre><code class="language-text">src/
├── api/              # Controller
│   └── user_controller.py
├── service/          # Service
│   └── user_service.py
├── domain/           # 领域模型（可选）
│   └── user.py
├── repository/       # Repository
│   └── user_repository.py
├── model/            # ORM Entity
│   └── user_po.py
├── schema/           # DTO/VO/Pydantic Schema
│   ├── user_dto.py
│   └── user_vo.py
├── adapter/          # 外部服务适配
├── middleware/
├── exception/
├── util/
├── config/
└── main.py</code></pre>
            `
        }
    ]
});
