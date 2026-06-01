/* 数据对象家族 */
window.SECTIONS.push({
    id: 'dto',
    title: '📦 数据对象家族',
    icon: 'fa-cubes',
    intro: `
        <p>这些"XO"对象本质上都是<b>数据容器</b>，差别只在<b>"用在哪一层 / 给谁看 / 有没有行为"</b>。</p>

        <h2>📊 全家福对照</h2>
        <table>
            <tr><th>缩写</th><th>全称</th><th>用途</th><th>所在层</th><th>是否含行为</th></tr>
            <tr><td><b>Schema</b></td><td>—</td><td>结构定义/校验</td><td>API 边界、文档</td><td>否</td></tr>
            <tr><td><b>DTO</b></td><td>Data Transfer Object</td><td>跨层/跨服务传输</td><td>Controller↔Service</td><td>否</td></tr>
            <tr><td><b>VO</b></td><td>View Object</td><td>返回给前端展示</td><td>Controller→前端</td><td>否</td></tr>
            <tr><td><b>VO</b>（另义）</td><td>Value Object</td><td>无 ID 不可变值</td><td>Domain 层</td><td>有（不可变方法）</td></tr>
            <tr><td><b>PO</b></td><td>Persistent Object</td><td>映射数据库表</td><td>Repository↔DB</td><td>否（≈ORM Entity）</td></tr>
            <tr><td><b>BO</b></td><td>Business Object</td><td>业务对象，组合多个 PO</td><td>Service 内</td><td>有</td></tr>
            <tr><td><b>DO</b></td><td>Domain Object</td><td>领域对象（DDD）</td><td>Domain 层</td><td>有（核心业务方法）</td></tr>
            <tr><td><b>POJO</b></td><td>Plain Old Java Object</td><td>简单 Java 对象</td><td>到处</td><td>—</td></tr>
            <tr><td><b>POCO</b></td><td>Plain Old CLR Object</td><td>POJO 的 .NET 版</td><td>—</td><td>—</td></tr>
            <tr><td><b>Entity</b></td><td>实体</td><td>有唯一 ID 的对象</td><td>Domain / ORM</td><td>有</td></tr>
            <tr><td><b>Aggregate</b></td><td>聚合（根）</td><td>一组对象的边界</td><td>Domain</td><td>有</td></tr>
            <tr><td><b>Command</b></td><td>命令对象</td><td>表达"要做什么"</td><td>CQRS-写</td><td>否</td></tr>
            <tr><td><b>Query</b></td><td>查询对象</td><td>表达"要查什么"</td><td>CQRS-读</td><td>否</td></tr>
            <tr><td><b>Event</b></td><td>事件对象</td><td>表达"发生了什么"</td><td>事件驱动</td><td>否</td></tr>
        </table>
    `,
    subs: [
        {
            id: 'dto-schema',
            title: '1. Schema（结构定义）',
            html: `
                <p>定义数据"形状 + 约束"，常做<b>校验和文档生成</b>。</p>
                <pre><code class="language-python">from pydantic import BaseModel, EmailStr, Field

class UserSchema(BaseModel):
    email: EmailStr
    name: str = Field(min_length=2, max_length=50)
    age: int = Field(ge=0, le=150)</code></pre>
                <ul>
                    <li>Python：Pydantic、Marshmallow</li>
                    <li>JS/TS：Zod、Yup、Joi、TypeBox</li>
                    <li>通用：JSON Schema、OpenAPI Schema、GraphQL Schema、Protobuf</li>
                </ul>
            `
        },
        {
            id: 'dto-dto',
            title: '2. DTO（数据传输对象）',
            html: `
                <p><b>跨层、跨进程、跨服务</b>传输数据的纯数据载体。<b>无业务方法</b>。</p>
                <pre><code class="language-python">class UserCreateDTO(BaseModel):
    email: str
    password: str
    name: str

class UserUpdateDTO(BaseModel):
    name: str | None = None
    avatar: str | None = None</code></pre>
                <div class="tip-box">
                    <span class="tip-title"><i class="fa fa-info"></i> 为什么要 DTO？</span>
                    ① 防止数据库字段直接暴露给前端；② 接口字段变化不影响内部模型；③ 字段裁剪和聚合。
                </div>
            `
        },
        {
            id: 'dto-vo',
            title: '3. VO（视图对象 / 值对象）',
            html: `
                <h3>VO ①：View Object（视图对象，阿里规范）</h3>
                <p>专门给<b>前端展示</b>的数据结构。可以裁剪、合并、格式化字段。</p>
                <pre><code class="language-python">class UserVO(BaseModel):
    id: int
    nickname: str         # 可以是 name 重命名
    avatar_url: str
    created_at_text: str  # "3 分钟前"，已格式化

    @classmethod
    def from_model(cls, u):
        return cls(
            id=u.id, nickname=u.name,
            avatar_url=cdn(u.avatar),
            created_at_text=humanize(u.created_at)
        )</code></pre>

                <h3>VO ②：Value Object（值对象，DDD/经典）</h3>
                <p><b>无 ID、不可变、用属性判断相等</b>。如 <code>Money(100, "USD")</code>、<code>Address</code>。</p>
                <pre><code class="language-python">from dataclasses import dataclass

@dataclass(frozen=True)        # 不可变
class Money:
    amount: int
    currency: str
    def add(self, other):
        assert self.currency == other.currency
        return Money(self.amount + other.amount, self.currency)

m1 = Money(100, "USD")
m2 = Money(100, "USD")
print(m1 == m2)               # True（属性相等就相等）</code></pre>
            `
        },
        {
            id: 'dto-po',
            title: '4. PO（持久化对象 / ORM Entity）',
            html: `
                <p>对应<b>数据库表</b>的对象，字段与列一一映射。</p>
                <pre><code class="language-python">class UserPO(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120))
    password_hash: Mapped[str]
    created_at: Mapped[datetime]</code></pre>
                <div class="tip-box warn">
                    <span class="tip-title"><i class="fa fa-exclamation-triangle"></i> 重要</span>
                    PO <b>不应该被 Controller 直接返回给前端</b>！要先转成 VO，否则数据库结构会泄露给前端。
                </div>
            `
        },
        {
            id: 'dto-bo-do',
            title: '5. BO / DO（业务对象 / 领域对象）',
            html: `
                <p><b>BO</b>：Business Object，组合一个或多个 PO 表达完整业务概念。<br/>
                <b>DO</b>：Domain Object，DDD 中的领域对象，包含核心业务行为。</p>
                <pre><code class="language-python">class OrderBO:                       # 业务对象
    def __init__(self, order_po, items_po, user_po):
        self.order = order_po
        self.items = items_po
        self.user = user_po

    def total(self):                   # 业务方法
        return sum(i.price * i.qty for i in self.items)

    def can_cancel(self):
        return self.order.status == "PENDING"</code></pre>
            `
        },
        {
            id: 'dto-cqrs',
            title: '6. Command / Query / Event',
            html: `
                <p>CQRS 与事件驱动架构里常用的三种对象。</p>
                <table>
                    <tr><th>类型</th><th>语义</th><th>示例</th></tr>
                    <tr><td>Command</td><td>"我要做什么"（祈使句）</td><td>CreateOrderCommand</td></tr>
                    <tr><td>Query</td><td>"我要查什么"（疑问句）</td><td>GetUserByIdQuery</td></tr>
                    <tr><td>Event</td><td>"发生了什么"（过去时）</td><td>OrderCreatedEvent</td></tr>
                </table>
                <pre><code class="language-python">@dataclass
class CreateOrderCommand:
    user_id: int
    items: list[dict]

@dataclass
class OrderCreatedEvent:
    order_id: int
    user_id: int
    total: int
    occurred_at: datetime</code></pre>
            `
        },
        {
            id: 'dto-flow',
            title: '7. 数据流转完整示例',
            html: `
                <div class="mermaid">
flowchart LR
    FE[前端 JSON] -->|HTTP POST| C[Controller]
    C -->|UserCreateDTO| S[Service]
    S -->|领域操作| BO[User BO/Entity]
    BO -->|to PO| R[Repository]
    R -->|UserPO| ORM
    ORM --> DB[(MySQL)]
    DB --> ORM --> R --> BO
    BO -->|to VO| C
    C -->|UserVO JSON| FE
                </div>

                <div class="tip-box success">
                    <span class="tip-title"><i class="fa fa-lightbulb-o"></i> 实战建议</span>
                    ① 小项目可以只用 <b>DTO + PO</b>，不必齐全；<br/>
                    ② 团队<b>统一命名约定</b>比追求"标准定义"更重要；<br/>
                    ③ 用 <b>Mapper/Converter</b>（如 MapStruct、自动映射）减少手写转换代码。
                </div>
            `
        }
    ]
});
