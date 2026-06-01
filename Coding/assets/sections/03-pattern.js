/* 设计模式 GoF 23 + 现代模式 */
window.SECTIONS.push({
    id: 'pattern',
    title: '🎨 设计模式',
    icon: 'fa-puzzle-piece',
    intro: `
        <p><b>设计模式（Design Pattern）</b>是软件设计中针对常见问题的可复用解决方案。<b>GoF（Gang of Four）</b>在 1994 年总结出 23 种经典模式，分为三大类。</p>

        <h2>🧭 SOLID 原则（设计模式的基础）</h2>
        <table>
            <tr><th>缩写</th><th>原则</th><th>含义</th></tr>
            <tr><td><b>S</b></td><td>单一职责 SRP</td><td>一个类只有一个变化原因</td></tr>
            <tr><td><b>O</b></td><td>开闭原则 OCP</td><td>对扩展开放，对修改关闭</td></tr>
            <tr><td><b>L</b></td><td>里氏替换 LSP</td><td>子类必须能替换父类</td></tr>
            <tr><td><b>I</b></td><td>接口隔离 ISP</td><td>不强迫依赖不用的接口</td></tr>
            <tr><td><b>D</b></td><td>依赖倒置 DIP</td><td>依赖抽象，不依赖具体</td></tr>
        </table>

        <h2>📊 23 种模式分类总图</h2>
        <div class="mermaid">
flowchart TB
    GoF[GoF 23 模式] --> Cr[创建型 5种]
    GoF --> St[结构型 7种]
    GoF --> Be[行为型 11种]
    Cr --> C1[单例] & C2[工厂方法] & C3[抽象工厂] & C4[建造者] & C5[原型]
    St --> S1[适配器] & S2[桥接] & S3[组合] & S4[装饰器] & S5[外观] & S6[享元] & S7[代理]
    Be --> B1[责任链] & B2[命令] & B3[解释器] & B4[迭代器] & B5[中介者] & B6[备忘录] & B7[观察者] & B8[状态] & B9[策略] & B10[模板方法] & B11[访问者]
        </div>
    `,
    subs: [
        {
            id: 'pattern-creational',
            title: '一、创建型模式（5 种）',
            html: `
                <p>解决<b>"对象如何创建"</b>的问题，把对象的创建和使用解耦。</p>

                <h3>1. 单例 Singleton</h3>
                <p>全局只有一个实例，比如配置管理器、连接池。</p>
                <pre><code class="language-python">class Singleton:
    _instance = None
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

a, b = Singleton(), Singleton()
print(a is b)  # True</code></pre>

                <h3>2. 工厂方法 Factory Method</h3>
                <p>定义创建对象的接口，让子类决定实例化哪个类。</p>
                <pre><code class="language-python">class Logger:
    def log(self, msg): ...
class FileLogger(Logger):
    def log(self, msg): print(f"[FILE] {msg}")
class DBLogger(Logger):
    def log(self, msg): print(f"[DB] {msg}")

def create_logger(kind: str) -> Logger:
    return {"file": FileLogger, "db": DBLogger}[kind]()

create_logger("file").log("hello")</code></pre>

                <h3>3. 抽象工厂 Abstract Factory</h3>
                <p>创建一<b>族</b>相关对象。如 UI 主题：DarkButton + DarkInput / LightButton + LightInput。</p>
                <div class="mermaid">
classDiagram
    class UIFactory { +createButton(); +createInput() }
    class DarkFactory
    class LightFactory
    UIFactory <|-- DarkFactory
    UIFactory <|-- LightFactory
                </div>

                <h3>4. 建造者 Builder</h3>
                <p>分步骤构建复杂对象。SQL Builder、HTTP Request Builder。</p>
                <pre><code class="language-python">class QueryBuilder:
    def __init__(self): self.parts = {}
    def select(self, *cols): self.parts["select"] = cols; return self
    def from_(self, t): self.parts["from"] = t; return self
    def where(self, w): self.parts["where"] = w; return self
    def build(self):
        return f"SELECT {','.join(self.parts['select'])} FROM {self.parts['from']} WHERE {self.parts['where']}"

print(QueryBuilder().select("id","name").from_("users").where("age>18").build())</code></pre>

                <h3>5. 原型 Prototype</h3>
                <p>通过<b>克隆</b>已有对象来创建新对象，避免重新初始化的开销。</p>
                <pre><code class="language-python">import copy
template = {"role": "user", "perms": ["read"]}
new_user = copy.deepcopy(template)
new_user["name"] = "Alice"</code></pre>
            `
        },
        {
            id: 'pattern-structural',
            title: '二、结构型模式（7 种）',
            html: `
                <p>解决<b>"对象怎么组合"</b>的问题。</p>

                <h3>1. 适配器 Adapter</h3>
                <p>把不兼容的接口转成兼容的。常见于<b>对接第三方 API</b>。</p>
                <pre><code class="language-python"># 旧接口
class OldPayment:
    def pay_money(self, amount): print(f"old pay {amount}")

# 新系统希望统一调用 charge()
class PaymentAdapter:
    def __init__(self, old): self.old = old
    def charge(self, amount): self.old.pay_money(amount)

PaymentAdapter(OldPayment()).charge(100)</code></pre>

                <h3>2. 桥接 Bridge</h3>
                <p>把"抽象"和"实现"分离，独立演化。<br/>形状（圆/方）× 颜色（红/蓝）= 4 组合，不必写 4 个类。</p>

                <h3>3. 组合 Composite</h3>
                <p>把对象组合成"树形结构"，让客户端统一对待"单个对象"和"组合对象"。<br/>典型：文件系统（文件夹/文件）、UI 组件树。</p>
                <div class="mermaid">
classDiagram
    class Component { +render() }
    class File { +render() }
    class Folder { +children; +render() }
    Component <|-- File
    Component <|-- Folder
    Folder o-- Component
                </div>

                <h3>4. 装饰器 Decorator</h3>
                <p>动态给对象<b>添加职责</b>，比继承更灵活。Python 装饰器、Java IO 流。</p>
                <pre><code class="language-python">def bold(fn):
    return lambda s: f"&lt;b&gt;{fn(s)}&lt;/b&gt;"
def italic(fn):
    return lambda s: f"&lt;i&gt;{fn(s)}&lt;/i&gt;"

@bold
@italic
def text(s): return s

print(text("Hi"))   # &lt;b&gt;&lt;i&gt;Hi&lt;/i&gt;&lt;/b&gt;</code></pre>

                <h3>5. 外观 Facade</h3>
                <p>给复杂子系统提供<b>统一简单入口</b>。SDK 封装、电商下单服务。</p>
                <pre><code class="language-python">class OrderFacade:
    def place_order(self, items):
        inventory.lock(items)
        order = order_svc.create(items)
        payment.charge(order)
        notify.send(order)
        return order</code></pre>

                <h3>6. 享元 Flyweight</h3>
                <p>共享细粒度对象，节省内存。典型：字符串常量池、棋子对象池。</p>

                <h3>7. 代理 Proxy</h3>
                <p>给对象提供一个<b>替身</b>来控制访问。<br/>分类：远程代理、虚拟代理（懒加载）、保护代理（权限）、智能代理（计数）。</p>
                <pre><code class="language-python">class ImageProxy:
    def __init__(self, path):
        self.path = path; self._img = None
    def display(self):
        if self._img is None:           # 懒加载
            self._img = load(self.path)
        self._img.show()</code></pre>
            `
        },
        {
            id: 'pattern-behavioral',
            title: '三、行为型模式（11 种）',
            html: `
                <p>解决<b>"对象之间如何协作"</b>的问题。</p>

                <h3>1. 责任链 Chain of Responsibility</h3>
                <p>请求沿链传递，每个节点决定处理或转发。<b>中间件、审批流</b>。</p>
                <pre><code class="language-python">class Handler:
    def __init__(self): self.next = None
    def set_next(self, h): self.next = h; return h
    def handle(self, req):
        if self.next: return self.next.handle(req)

class AuthHandler(Handler):
    def handle(self, req):
        if not req.get("user"): return "401"
        return super().handle(req)

class LogHandler(Handler):
    def handle(self, req):
        print("log:", req)
        return super().handle(req)</code></pre>

                <h3>2. 命令 Command</h3>
                <p>把"请求"封装成对象，支持撤销/重做/队列。<br/>编辑器 Undo、任务队列、菜单按钮。</p>

                <h3>3. 解释器 Interpreter</h3>
                <p>为简单语言定义文法和解释器。正则、SQL parser、表达式引擎。</p>

                <h3>4. 迭代器 Iterator</h3>
                <p>统一遍历集合的方式，不暴露内部结构。<code>for x in collection</code>。</p>
                <pre><code class="language-python">class MyList:
    def __init__(self, data): self.data = data
    def __iter__(self): return iter(self.data)
for x in MyList([1,2,3]): print(x)</code></pre>

                <h3>5. 中介者 Mediator</h3>
                <p>用<b>中介对象</b>封装一组对象的交互，避免相互直接依赖。<br/>聊天室、机场塔台、MVC 中 Controller。</p>

                <h3>6. 备忘录 Memento</h3>
                <p>保存对象状态，供后续恢复。<b>Undo/Redo、游戏存档</b>。</p>

                <h3>7. 观察者 Observer ⭐</h3>
                <p>对象状态变化时，自动通知所有"观察者"。<b>事件、发布订阅、Vue 响应式</b>。</p>
                <pre><code class="language-python">class Subject:
    def __init__(self): self.observers = []
    def attach(self, o): self.observers.append(o)
    def notify(self, data):
        for o in self.observers: o.update(data)

class Logger:
    def update(self, data): print("log:", data)

s = Subject(); s.attach(Logger()); s.notify("hi")</code></pre>

                <div class="mermaid">
sequenceDiagram
    Subject->>ObserverA: notify(event)
    Subject->>ObserverB: notify(event)
    Subject->>ObserverC: notify(event)
                </div>

                <h3>8. 状态 State</h3>
                <p>对象内部状态改变时，行为也跟着改变。<b>订单状态机、TCP 连接状态</b>。</p>

                <h3>9. 策略 Strategy ⭐</h3>
                <p>定义一系列算法，让它们可<b>互换</b>。<br/>支付方式（支付宝/微信/银行卡）、排序算法切换、运费计算。</p>
                <pre><code class="language-python">class Payment:
    def pay(self, amount): ...
class Alipay(Payment):
    def pay(self, a): print(f"支付宝 {a}")
class WeChat(Payment):
    def pay(self, a): print(f"微信 {a}")

def checkout(strategy: Payment, amount):
    strategy.pay(amount)

checkout(Alipay(), 100)
checkout(WeChat(), 200)</code></pre>

                <h3>10. 模板方法 Template Method</h3>
                <p>父类定义<b>算法骨架</b>，把具体步骤延迟到子类。</p>
                <pre><code class="language-python">class Report:
    def generate(self):       # 模板
        self.header()
        self.body()           # 子类实现
        self.footer()
    def header(self): print("=== Report ===")
    def footer(self): print("--- end ---")
    def body(self): raise NotImplementedError

class SalesReport(Report):
    def body(self): print("销售数据...")</code></pre>

                <h3>11. 访问者 Visitor</h3>
                <p>把作用于对象结构的<b>操作</b>分离出来，无需修改这些对象的类。<br/>AST 遍历、编译器优化、报表生成。</p>
            `
        },
        {
            id: 'pattern-modern',
            title: '四、现代/扩展模式',
            html: `
                <h3>架构层面的模式</h3>
                <table>
                    <tr><th>模式</th><th>用途</th></tr>
                    <tr><td><b>依赖注入 DI</b></td><td>容器注入依赖，解耦创建与使用（Spring、NestJS）</td></tr>
                    <tr><td><b>仓储 Repository</b></td><td>封装数据访问，对业务暴露领域语义</td></tr>
                    <tr><td><b>工作单元 UoW</b></td><td>跟踪事务边界，统一提交</td></tr>
                    <tr><td><b>CQRS</b></td><td>读/写分离，复杂查询走专门模型</td></tr>
                    <tr><td><b>事件溯源 Event Sourcing</b></td><td>用事件流而非当前状态来存储数据</td></tr>
                    <tr><td><b>Saga</b></td><td>分布式长事务补偿</td></tr>
                    <tr><td><b>断路器 Circuit Breaker</b></td><td>熔断失败的下游服务</td></tr>
                    <tr><td><b>限流 Rate Limiter</b></td><td>令牌桶、漏桶</td></tr>
                </table>

                <h3>函数式/响应式模式</h3>
                <ul>
                    <li><b>Monad</b>：链式组合带上下文的计算（Option/Result/Promise）</li>
                    <li><b>Functor</b>：可 map 的容器</li>
                    <li><b>Currying / 部分应用</b></li>
                    <li><b>响应式 Subject/Observable</b></li>
                </ul>

                <h3>反模式（要避免的）</h3>
                <div class="tip-box danger">
                    <ul>
                        <li><b>God Object（上帝对象）</b>：一个类干了所有事</li>
                        <li><b>Spaghetti Code（意大利面条）</b>：流程混乱、强耦合</li>
                        <li><b>Magic Numbers/Strings</b>：硬编码无意义值</li>
                        <li><b>Copy-Paste Programming</b>：违反 DRY</li>
                        <li><b>Premature Optimization</b>：过早优化</li>
                        <li><b>Golden Hammer</b>：什么都用同一个工具锤</li>
                    </ul>
                </div>

                <div class="tip-box success">
                    <span class="tip-title"><i class="fa fa-check"></i> 学习建议</span>
                    <b>先掌握 5 个最常用</b>：单例、工厂、策略、观察者、装饰器。其余按需查阅即可。
                </div>
            `
        }
    ]
});
