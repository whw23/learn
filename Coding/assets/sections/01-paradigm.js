/* 编程范式 */
window.SECTIONS.push({
    id: 'paradigm',
    title: '🧠 编程范式',
    icon: 'fa-lightbulb-o',
    intro: `
        <p><b>编程范式（Programming Paradigm）</b>是程序设计的根本思想和风格——它决定了你"如何思考问题、如何组织代码"。</p>

        <h2>📋 主流范式一览</h2>
        <div class="mermaid">
flowchart LR
    P[编程范式] --> I[命令式<br/>Imperative]
    P --> D[声明式<br/>Declarative]
    I --> PP[过程式 PP]
    I --> OOP[面向对象 OOP]
    D --> FP[函数式 FP]
    D --> LP[逻辑式 LP]
    D --> RP[响应式 RP]
    P --> AOP[面向切面 AOP]
    P --> POP[面向插件 POP]
    P --> EDP[事件驱动 EDP]
    P --> DOP[数据导向 DOP]
        </div>

        <table>
            <tr><th>范式</th><th>核心思想</th><th>典型语言</th><th>关键词</th></tr>
            <tr><td>过程式 PP</td><td>按步骤执行</td><td>C、Pascal</td><td>函数、流程</td></tr>
            <tr><td>面向对象 OOP</td><td>万物皆对象</td><td>Java、Python、C++</td><td>封装/继承/多态</td></tr>
            <tr><td>函数式 FP</td><td>函数即值</td><td>Haskell、Lisp、Scala</td><td>纯函数/不可变</td></tr>
            <tr><td>逻辑式 LP</td><td>声明事实+规则</td><td>Prolog</td><td>推理/谓词</td></tr>
            <tr><td>响应式 RP</td><td>数据流驱动</td><td>RxJS、Vue</td><td>流/订阅</td></tr>
            <tr><td>面向切面 AOP</td><td>横切关注点</td><td>Spring AOP</td><td>注解/拦截</td></tr>
            <tr><td>面向插件 POP</td><td>主程序+插件</td><td>VS Code、Pytest</td><td>钩子/扩展</td></tr>
            <tr><td>事件驱动 EDP</td><td>事件+监听</td><td>JS、Node</td><td>事件循环</td></tr>
            <tr><td>数据导向 DOP</td><td>数据与行为分离</td><td>Clojure</td><td>纯数据</td></tr>
        </table>
    `,
    subs: [
        {
            id: 'paradigm-imperative',
            title: '1. 命令式编程（Imperative）',
            html: `
                <p>核心：<b>告诉计算机"怎么做"</b>，一步一步执行。包含过程式和面向对象两大分支。</p>
                <pre><code class="language-python"># 命令式：求和
total = 0
for i in range(1, 11):
    total += i
print(total)</code></pre>
                <div class="tip-box">
                    <span class="tip-title"><i class="fa fa-bookmark"></i> 关键特征</span>
                    有状态、有顺序、有副作用、显式控制流（if/for/while）。
                </div>
            `
        },
        {
            id: 'paradigm-procedural',
            title: '2. 过程式编程（Procedural）',
            html: `
                <p>以<b>函数（过程）</b>作为组织单元，数据和函数分离。是命令式的子集。</p>
                <pre><code class="language-c">// C 语言：典型过程式
int add(int a, int b) { return a + b; }
int main() {
    int x = 5, y = 3;
    printf("%d", add(x, y));
    return 0;
}</code></pre>
            `
        },
        {
            id: 'paradigm-oop',
            title: '3. 面向对象编程（OOP）',
            html: `
                <p>把现实世界抽象成<b>对象</b>，每个对象有<b>状态（属性）</b>和<b>行为（方法）</b>。</p>

                <h3>四大特性</h3>
                <div class="card-grid">
                    <div class="card"><div class="card-icon"><i class="fa fa-lock"></i></div>
                        <div class="card-title">封装 Encapsulation</div>
                        <div class="card-desc">隐藏内部细节，对外暴露接口</div></div>
                    <div class="card"><div class="card-icon"><i class="fa fa-sitemap"></i></div>
                        <div class="card-title">继承 Inheritance</div>
                        <div class="card-desc">子类复用父类的能力</div></div>
                    <div class="card"><div class="card-icon"><i class="fa fa-random"></i></div>
                        <div class="card-title">多态 Polymorphism</div>
                        <div class="card-desc">同一接口，不同实现</div></div>
                    <div class="card"><div class="card-icon"><i class="fa fa-cube"></i></div>
                        <div class="card-title">抽象 Abstraction</div>
                        <div class="card-desc">提取共性，忽略细节</div></div>
                </div>

                <h3>代码示例</h3>
                <pre><code class="language-python">from abc import ABC, abstractmethod

class Animal(ABC):                # 抽象
    def __init__(self, name):
        self._name = name         # 封装（约定私有）
    @abstractmethod
    def speak(self): ...

class Dog(Animal):                # 继承
    def speak(self):              # 多态
        return f"{self._name}: Woof!"

class Cat(Animal):
    def speak(self):
        return f"{self._name}: Meow!"

for a in [Dog("Tom"), Cat("Lily")]:
    print(a.speak())</code></pre>

                <div class="mermaid">
classDiagram
    class Animal { +name; +speak()* }
    class Dog { +speak() }
    class Cat { +speak() }
    Animal <|-- Dog
    Animal <|-- Cat
                </div>

                <div class="tip-box warn">
                    <span class="tip-title"><i class="fa fa-exclamation-triangle"></i> 注意</span>
                    OOP 不是银弹。过度继承会带来僵化，现代趋势是<b>"组合优于继承"</b>。
                </div>
            `
        },
        {
            id: 'paradigm-fp',
            title: '4. 函数式编程（FP）',
            html: `
                <p>核心：<b>函数是一等公民</b>，强调<b>纯函数 + 不可变数据 + 无副作用</b>。</p>

                <h3>核心概念</h3>
                <ul>
                    <li><b>纯函数</b>：相同输入永远得到相同输出，无副作用</li>
                    <li><b>不可变性</b>：数据创建后不能修改</li>
                    <li><b>高阶函数</b>：函数可作为参数和返回值（map/filter/reduce）</li>
                    <li><b>柯里化（Currying）</b>：把多参数函数变成单参数链式调用</li>
                    <li><b>函数组合</b>：小函数拼成大函数</li>
                </ul>

                <pre><code class="language-python"># FP 风格：求 1~10 偶数的平方和
from functools import reduce
result = reduce(
    lambda acc, x: acc + x,
    map(lambda x: x*x,
        filter(lambda x: x%2==0, range(1, 11)))
)
print(result)  # 220</code></pre>

                <pre><code class="language-javascript">// JS：柯里化
const add = a => b => a + b;
const add5 = add(5);
console.log(add5(3)); // 8</code></pre>
            `
        },
        {
            id: 'paradigm-declarative',
            title: '5. 声明式编程（Declarative）',
            html: `
                <p>核心：<b>告诉计算机"想要什么"</b>，不关心怎么实现。FP/SQL/HTML 都是声明式。</p>
                <pre><code class="language-sql">-- SQL 是典型声明式：你只说"要什么"
SELECT name, age FROM users WHERE age > 18 ORDER BY age DESC;</code></pre>
                <pre><code class="language-html">&lt;!-- HTML 也是声明式：描述结构，不描述渲染过程 --&gt;
&lt;ul&gt;&lt;li&gt;Apple&lt;/li&gt;&lt;li&gt;Banana&lt;/li&gt;&lt;/ul&gt;</code></pre>
            `
        },
        {
            id: 'paradigm-logic',
            title: '6. 逻辑式编程（Logic）',
            html: `
                <p>用<b>事实 + 规则</b>描述问题，由推理引擎自动求解。代表：Prolog。</p>
                <pre><code class="language-prolog">parent(tom, bob).
parent(bob, alice).
grandparent(X, Z) :- parent(X, Y), parent(Y, Z).

?- grandparent(tom, alice).   % true</code></pre>
                <div class="tip-box">应用：专家系统、形式验证、AI 推理。</div>
            `
        },
        {
            id: 'paradigm-reactive',
            title: '7. 响应式编程（Reactive）',
            html: `
                <p>核心：<b>一切皆数据流</b>。值变化时自动触发依赖更新。</p>
                <pre><code class="language-javascript">// RxJS 示例
import { fromEvent } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';

fromEvent(input, 'input')
  .pipe(debounceTime(300), map(e => e.target.value))
  .subscribe(val => console.log('搜索:', val));</code></pre>
                <pre><code class="language-javascript">// Vue 响应式：data 变了，视图自动更新
const state = reactive({ count: 0 });
watchEffect(() => console.log(state.count));
state.count++;  // 自动输出 1</code></pre>
            `
        },
        {
            id: 'paradigm-aop',
            title: '8. 面向切面编程（AOP）',
            html: `
                <p>把<b>横切关注点</b>（日志、事务、权限、缓存）从业务逻辑中抽离，统一管理。</p>

                <div class="mermaid">
flowchart LR
    A[Controller] -->|被拦截| B[切面 Aspect<br/>日志/事务/权限]
    B --> C[Service 真实业务]
    C --> B --> A
                </div>

                <pre><code class="language-python"># Python 装饰器实现 AOP
import functools, time

def log_time(func):
    @functools.wraps(func)
    def wrapper(*a, **k):
        t = time.time()
        r = func(*a, **k)
        print(f"{func.__name__} 耗时 {time.time()-t:.3f}s")
        return r
    return wrapper

@log_time
def heavy(): time.sleep(1)
heavy()</code></pre>
            `
        },
        {
            id: 'paradigm-plugin',
            title: '9. 面向插件编程（POP）',
            html: `
                <p>核心：<b>主程序定义"插槽"，插件按规范实现，运行时动态加载</b>。让系统具备可扩展性。</p>

                <h3>架构图</h3>
                <div class="mermaid">
flowchart TB
    Host[主程序 Host] -->|定义| API[插件接口/Hook]
    P1[插件A] -->|实现| API
    P2[插件B] -->|实现| API
    P3[插件C] -->|实现| API
    Host -->|发现/加载| P1
    Host -->|发现/加载| P2
    Host -->|发现/加载| P3
                </div>

                <h3>关键机制</h3>
                <table>
                    <tr><th>机制</th><th>说明</th></tr>
                    <tr><td>接口约定</td><td>主程序定义抽象接口</td></tr>
                    <tr><td>注册机制</td><td>插件向 registry 报到</td></tr>
                    <tr><td>生命周期</td><td>load → activate → deactivate → unload</td></tr>
                    <tr><td>隔离</td><td>插件 A 崩溃不影响 B</td></tr>
                </table>

                <pre><code class="language-python"># 简易插件系统
class Plugin:
    name = ""
    def run(self, ctx): ...

REGISTRY = []
def register(cls):
    REGISTRY.append(cls())
    return cls

@register
class HelloPlugin(Plugin):
    name = "hello"
    def run(self, ctx): print(f"Hello, {ctx['user']}")

@register
class TimePlugin(Plugin):
    name = "time"
    def run(self, ctx):
        from datetime import datetime
        print(datetime.now())

# 主程序统一调度
for p in REGISTRY:
    p.run({"user": "Alice"})</code></pre>

                <div class="tip-box success">
                    <span class="tip-title"><i class="fa fa-check"></i> 典型案例</span>
                    VS Code 扩展、Chrome Extension、Pytest Plugins、Webpack Loader、Babel Plugin、Vim/Neovim。
                </div>
            `
        },
        {
            id: 'paradigm-event',
            title: '10. 事件驱动编程（EDP）',
            html: `
                <p>程序流程由<b>事件</b>驱动，注册监听器响应事件。</p>
                <pre><code class="language-javascript">button.addEventListener('click', e => {
    console.log('点击了！', e.target);
});</code></pre>
                <div class="mermaid">
sequenceDiagram
    User->>UI: 点击按钮
    UI->>EventLoop: 派发 click 事件
    EventLoop->>Handler: 调用回调
    Handler-->>UI: 更新视图
                </div>
            `
        },
        {
            id: 'paradigm-others',
            title: '11. 其他范式补充（详细展开）',
            html: `
                <p>除前面 10 大主流范式外，下面这些"小众但重要"的范式各自解决特定问题。</p>

                <h3>📌 11.1 泛型编程（Generic Programming）</h3>
                <p>核心：<b>算法与具体类型解耦</b>。同一个函数可作用于多种类型，编译期决定。</p>
                <pre><code class="language-cpp">// C++ STL：sort 对任何可比较类型都能用
template &lt;typename T&gt;
void sort(vector&lt;T&gt;& v) { /* ... */ }

sort(vector&lt;int&gt;{3,1,2});
sort(vector&lt;string&gt;{"b","a"});</code></pre>
                <ul>
                    <li>代表：C++ STL、Rust Generics、Java Generics、TypeScript Generics</li>
                    <li>关键概念：类型参数、协变/逆变、Trait/Concept、type erasure</li>
                </ul>

                <h3>📌 11.2 元编程（Metaprogramming）</h3>
                <p>核心：<b>程序操作程序</b>——代码可以读、生成、修改自己或其他代码。</p>
                <pre><code class="language-python"># Python 装饰器是最常见的元编程
def trace(fn):
    def wrapper(*a, **k):
        print(f"call {fn.__name__}")
        return fn(*a, **k)
    return wrapper

@trace  # ← 这就是元编程：修改函数本身
def greet(name): print(f"hi {name}")</code></pre>
                <ul>
                    <li>分支：<b>编译期</b>（C++ 模板、Rust 宏、Lisp macro）/ <b>运行期</b>（Python/Ruby 反射）</li>
                    <li>典型：装饰器、宏、注解处理器、AST 操作、代码生成</li>
                </ul>

                <h3>📌 11.3 并发编程（Concurrent / Parallel）</h3>
                <p>不是单一范式，是一组处理"多任务协作"的思想。</p>
                <div class="mermaid">
flowchart TB
    C[并发模型]
    C --> T[线程 + 锁<br/>Java/C++]
    C --> Co[协程 Coroutine<br/>Python/Go/Kotlin]
    C --> A[Actor 模型<br/>Erlang/Akka]
    C --> CSP[CSP 通道<br/>Go]
    C --> EL[事件循环<br/>Node/浏览器]
    C --> STM[软件事务内存<br/>Clojure/Haskell]
                </div>
                <ul>
                    <li><b>共享内存</b>派：线程+锁，效率高但易出 bug</li>
                    <li><b>消息传递</b>派：Actor/CSP，更安全但抽象更重</li>
                    <li><b>事件循环</b>派：单线程异步，避免锁但要小心阻塞</li>
                </ul>

                <h3>📌 11.4 数据流编程（Dataflow Programming）</h3>
                <p>核心：<b>把程序建模为"数据流过节点的图"</b>，节点是算子，边是数据。</p>
                <pre><code class="language-python"># TensorFlow / PyTorch 计算图
x = tf.constant(3.0)
y = tf.constant(4.0)
z = x * x + y * y      # 这一行不是立即计算，而是建图
                       # 真正执行由数据流引擎调度</code></pre>
                <ul>
                    <li>代表：TensorFlow、Apache Beam、Flink、LabVIEW</li>
                    <li>优势：天然并行、易调度、易优化</li>
                    <li>本质：和响应式 + FP 高度重叠</li>
                </ul>

                <h3>📌 11.5 契约式编程（Design by Contract, DbC）</h3>
                <p>核心：<b>函数声明前置条件、后置条件、不变量</b>，违反时崩溃。</p>
                <pre><code class="language-python"># Python 用 assert 模拟 DbC
def withdraw(account, amount):
    # 前置条件
    assert amount > 0, "金额必须为正"
    assert account.balance >= amount, "余额不足"

    old = account.balance
    account.balance -= amount

    # 后置条件
    assert account.balance == old - amount</code></pre>
                <ul>
                    <li>原型：Eiffel 语言（Bertrand Meyer 提出）</li>
                    <li>现代延续：Python <code>icontract</code>、Rust <code>contracts</code>、Java JML</li>
                    <li>升级版：依赖类型系统（Idris、Liquid Haskell）</li>
                </ul>

                <h3>📌 11.6 面向服务编程（Service-Oriented, SOA）</h3>
                <p>核心：<b>系统由独立服务组成，通过标准协议通信</b>。</p>
                <ul>
                    <li>第一代：SOAP + ESB + WSDL（笨重）</li>
                    <li>第二代：<b>微服务</b>——HTTP/gRPC + 独立部署 + 独立 DB</li>
                    <li>第三代：<b>Serverless / FaaS</b>——函数即服务</li>
                </ul>
                <p>详见 <a href="#arch-microservice">架构模式 - 微服务</a> 章节。</p>

                <h3>📌 11.7 面向方面编程（Aspect-Oriented）</h3>
                <p>同 AOP，参考 <a href="#paradigm-aop">第 8 节</a>。本质是把横切关注点（日志/事务/权限）从业务剥离。</p>

                <h3>📌 11.8 面向能力编程（Capability-Oriented）</h3>
                <p>核心：<b>权限以"能力"为单位，不可伪造也不可窃听</b>。</p>
                <ul>
                    <li>例子：操作系统的 <code>fd</code> 文件描述符；JavaScript 的 <code>Promise</code> resolver</li>
                    <li>语言：E、Pony、Newspeak</li>
                </ul>

                <h3>📌 11.9 面向数据编程（Data-Oriented Design, DOD）</h3>
                <p>不是 DOP 数据导向，而是<b>"按内存布局优化数据，让 CPU 缓存命中率最大"</b>。</p>
                <ul>
                    <li>典型：游戏引擎 ECS（Entity-Component-System）架构</li>
                    <li>口号：<b>"data is king, code follows data"</b></li>
                    <li>代表：Unity ECS、Bevy（Rust）</li>
                </ul>

                <h3>📌 11.10 流式编程（Stream Programming）</h3>
                <p>核心：<b>对数据流应用一连串算子</b>，可以是有限或无限流。</p>
                <pre><code class="language-java">// Java Stream
list.stream()
    .filter(x -> x > 0)
    .map(x -> x * x)
    .reduce(0, Integer::sum);</code></pre>
                <ul>
                    <li>代表：Java Stream、Kotlin Flow、RxJS、Apache Flink、Kafka Streams</li>
                    <li>与响应式/函数式高度交叉</li>
                </ul>

                <h3>📌 11.11 表格驱动编程（Table-Driven）</h3>
                <p>把复杂的 if/else 逻辑变成"查表"。代码更少、更易改。</p>
                <pre><code class="language-python"># 不要这样写
if user_type == "admin": price = base * 0.5
elif user_type == "vip": price = base * 0.7
elif user_type == "normal": price = base * 1.0

# 表格驱动
DISCOUNT = {"admin": 0.5, "vip": 0.7, "normal": 1.0}
price = base * DISCOUNT[user_type]</code></pre>

                <h3>📌 11.12 自然语言编程（Natural Language Programming）</h3>
                <p>AI 时代新兴：<b>用自然语言写"代码"</b>。详见后续"<a href="#ai-era">AI 时代的编程</a>"章节。</p>
                <ul>
                    <li>Prompt 工程 / Spec-Driven Development</li>
                    <li>低代码 / 无代码 + LLM</li>
                </ul>

                <h3>📊 范式总结表</h3>
                <table>
                    <tr><th>范式</th><th>关键词</th><th>解决什么</th></tr>
                    <tr><td>泛型</td><td>类型参数</td><td>同算法处理不同类型</td></tr>
                    <tr><td>元编程</td><td>代码操作代码</td><td>消除样板代码</td></tr>
                    <tr><td>并发</td><td>多任务</td><td>性能 + 响应性</td></tr>
                    <tr><td>数据流</td><td>计算图</td><td>大规模并行</td></tr>
                    <tr><td>契约式</td><td>前/后置条件</td><td>程序正确性</td></tr>
                    <tr><td>面向服务</td><td>独立服务</td><td>系统拆分</td></tr>
                    <tr><td>面向能力</td><td>权限令牌</td><td>安全模型</td></tr>
                    <tr><td>面向数据 DOD</td><td>内存布局</td><td>性能极致</td></tr>
                    <tr><td>流式</td><td>算子链</td><td>数据处理</td></tr>
                    <tr><td>表格驱动</td><td>查表</td><td>简化分支</td></tr>
                    <tr><td>自然语言</td><td>Prompt</td><td>AI 编程</td></tr>
                </table>
            `
        },
        {
            id: 'paradigm-fp-vs-pp',
            title: '12. 深度辨析：函数式 vs 过程式',
            html: `
                <p><b>常见误解</b>：函数式 = 多个过程式函数嵌套调用 ❌</p>
                <p><b>真相</b>：它们的差别<b>不在"嵌套层数"，而在 4 个根本性哲学</b>。</p>

                <h3>🔍 4 个本质区别</h3>
                <table>
                    <tr><th>维度</th><th>过程式</th><th>函数式</th></tr>
                    <tr><td>核心单元</td><td>过程/子程序（动词）</td><td>函数（数学映射）</td></tr>
                    <tr><td>状态</td><td>✅ 有可变状态</td><td>❌ 不可变 immutable</td></tr>
                    <tr><td>副作用</td><td>✅ 允许（修改全局/IO）</td><td>❌ 集中到边界</td></tr>
                    <tr><td>函数地位</td><td>普通子程序</td><td><b>一等公民</b>（可传可返）</td></tr>
                </table>

                <h3>🧪 同一问题两种写法</h3>
                <pre><code class="language-python"># 过程式：求 1~10 偶数平方和
total = 0
for i in range(1, 11):
    if i % 2 == 0:
        total += i * i      # 修改外部变量（副作用）
print(total)

# 函数式
from functools import reduce
total = reduce(
    lambda a, b: a + b,
    map(lambda x: x*x,
        filter(lambda x: x%2==0, range(1, 11)))
)</code></pre>

                <h3>🚨 反例：伪函数式</h3>
                <pre><code class="language-python"># ❌ 看起来像函数式，其实是过程式套娃
cache = {}                       # 全局可变状态
def step1(x):
    cache['v'] = x * 2           # 副作用！
    return cache['v']
def step2(x):
    cache['v'] += x              # 依赖全局状态
    return cache['v']

result = step2(step1(5))         # 不是 FP！</code></pre>

                <h3>✅ 判断是否真 FP 的 3 个问题</h3>
                <ol>
                    <li>所有函数都没修改外部变量吗？</li>
                    <li>相同输入永远得到相同输出吗？</li>
                    <li>函数能被当作值传递吗？</li>
                </ol>
                <div class="tip-box success">
                    三个全 Yes = 真 FP；任何一个 No = 只是"过程式分散在多个函数"。
                </div>

                <h3>💡 思维模型对比</h3>
                <div class="mermaid">
flowchart LR
    subgraph PP[过程式: 状态机]
        S0[状态 S0] -->|step| S1
        S1 -->|step| S2
        S2 -->|step| End[最终]
    end
    subgraph FP[函数式: 数据管道]
        D0[原数据] -->|f| D1
        D1 -->|g| D2
        D2 -->|h| R[结果]
    end
                </div>

                <h3>📝 一句话锁定</h3>
                <div class="tip-box">
                    <b>过程式</b>：<i>"Do this, then this, then this."</i>（命令机器一步步做）<br/>
                    <b>函数式</b>：<i>"The answer is f(g(h(x)))."</i>（描述数学等式）
                </div>
            `
        },
        {
            id: 'paradigm-reactive-deep',
            title: '13. 深度理解：响应式编程的本质',
            html: `
                <p>很多人对响应式编程的第一感觉是"很玄"。其实它的本质<b>就是 Excel 公式那种"自动联动"</b>。</p>

                <h3>🏁 从 Excel 切入</h3>
                <pre><code class="language-text">A1 = 10
A2 = 20
A3 = A1 + A2       ← 显示 30

改 A1 = 100 → A3 自动变 120</code></pre>
                <p><b>这就是响应式</b>：你没写"当 A1 变了更新 A3"的代码，但 A3 自己反应了。</p>

                <h3>⚖️ vs 命令式</h3>
                <pre><code class="language-python"># 命令式：必须手动重算
A1 = 10; A2 = 20; A3 = A1 + A2   # A3 = 30
A1 = 100
print(A3)                          # 还是 30！没自动更新

# 响应式（Vue 3）
from vue import ref, computed, watchEffect
A1 = ref(10); A2 = ref(20)
A3 = computed(lambda: A1.value + A2.value)
watchEffect(lambda: print("A3 =", A3.value))
A1.value = 100   # 自动输出 "A3 = 120"</code></pre>

                <h3>❓ 常见疑问 1：响应式 = 把 A3 写成函数？</h3>
                <pre><code class="language-python">def A3(): return A1 + A2</code></pre>
                <div class="tip-box warn">
                    <b>不够！</b> 这只是"惰性求值"。响应式 = <b>延迟计算 + 自动通知所有依赖者</b>。
                    缺了"自动通知"这一步，就只是 Lazy，不是 Reactive。
                </div>

                <h3>❓ 常见疑问 2：需要轮询监听吗？</h3>
                <div class="tip-box danger">
                    <b>绝不是轮询！</b> 响应式用"<b>推送模式 + 依赖追踪</b>"：
                    <ul>
                        <li><b>读取时</b>：数据的 getter 悄悄记下"谁在读我"</li>
                        <li><b>赋值时</b>：数据的 setter 主动调用所有订阅者</li>
                        <li>程序不变化时 <b>CPU 是 0%</b></li>
                    </ul>
                </div>

                <h3>❓ 常见疑问 3：本质是广播吗？</h3>
                <p><b>是！</b> 但是<b>"自动追踪依赖的精准广播"</b>：</p>
                <table>
                    <tr><th></th><th>普通广播/Pub-Sub</th><th>响应式</th></tr>
                    <tr><td>订阅</td><td>手动 <code>.subscribe()</code></td><td><b>读取即订阅</b>（自动）</td></tr>
                    <tr><td>取消</td><td>手动 <code>.unsubscribe()</code></td><td><b>不读即取消</b>（自动）</td></tr>
                    <tr><td>粒度</td><td>频道</td><td>单个字段</td></tr>
                </table>

                <h3>📡 响应式 ↔ SSE：同源同宗</h3>
                <p>它们都是<b>"推送模式"</b>家族成员，只是<b>距离不同</b>：</p>
                <div class="mermaid">
flowchart TB
    Core[核心: 拒绝轮询 主动推送]
    Core --> L1[最近: 函数回调]
    Core --> L2[同进程: 响应式编程 ★]
    Core --> L3[同机器: 共享内存事件]
    Core --> L4[局域网: WebSocket/TCP]
    Core --> L5[公网: SSE/HTTP ★]
    Core --> L6[跨服务: Kafka/MQ]
                </div>
                <table>
                    <tr><th></th><th>SSE</th><th>响应式</th></tr>
                    <tr><td>属于</td><td>网络协议</td><td>编程范式</td></tr>
                    <tr><td>作用域</td><td>跨网络</td><td>同进程</td></tr>
                    <tr><td>传输</td><td>HTTP 字节</td><td>函数调用</td></tr>
                    <tr><td>核心</td><td>服务端推送</td><td>数据推送</td></tr>
                </table>

                <h3>🛠 30 行实现一个响应式系统</h3>
                <pre><code class="language-python">current_effect = None
subscribers = {}

class Reactive:
    def __init__(self, value):
        self._value = value
        subscribers[id(self)] = set()

    @property
    def value(self):
        if current_effect is not None:
            subscribers[id(self)].add(current_effect)   # 收集依赖
        return self._value

    @value.setter
    def value(self, v):
        self._value = v
        for fn in list(subscribers[id(self)]):           # 主动通知
            fn()

def effect(fn):
    global current_effect
    current_effect = fn
    fn()
    current_effect = None

# === 实战 ===
A1 = Reactive(10); A2 = Reactive(20)
effect(lambda: print(f"A3 = {A1.value + A2.value}"))
A1.value = 100   # 自动输出 "A3 = 120"</code></pre>

                <h3>🌐 响应式的两大流派</h3>
                <div class="mermaid">
flowchart LR
    RP[响应式编程] --> S1[信号式 Signal-based]
    RP --> S2[流式 Stream-based]
    S1 --> V[Vue / SolidJS / Svelte / MobX]
    S2 --> R[RxJS / Reactor / Akka Streams]
                </div>
                <ul>
                    <li><b>信号式</b>：像 Excel，关注"数据状态"——细粒度更新</li>
                    <li><b>流式</b>：像水管，关注"事件流"——能 map/filter/debounce 组合</li>
                </ul>

                <h3>🌍 响应式编程远不止 TypeScript</h3>
                <table>
                    <tr><th>语言</th><th>响应式库</th></tr>
                    <tr><td>JS/TS</td><td>RxJS、Vue、SolidJS、MobX</td></tr>
                    <tr><td>Java</td><td>RxJava、Project Reactor、Spring WebFlux</td></tr>
                    <tr><td>Kotlin</td><td>Flow、RxKotlin</td></tr>
                    <tr><td>Swift</td><td>Combine（Apple 官方）、RxSwift</td></tr>
                    <tr><td>C#</td><td>Rx.NET、IObservable</td></tr>
                    <tr><td>Python</td><td>RxPY</td></tr>
                    <tr><td>Scala</td><td>Akka Streams、Monix</td></tr>
                    <tr><td>大数据</td><td>Flink、Kafka Streams、Beam</td></tr>
                </table>
                <p>⭐ ReactiveX 是跨 18+ 语言的统一响应式 API。</p>
            `
        },
        {
            id: 'paradigm-callback-hook',
            title: '14. 辨析：Callback / Hook / Agent ≠ 响应式',
            html: `
                <p>这些概念都"长得像响应式"，但<b>不能划等号</b>。它们是 RP 的"原料"或"前身"。</p>

                <h3>📊 边界对照表</h3>
                <table>
                    <tr><th>概念</th><th>是 RP 吗</th><th>本质</th></tr>
                    <tr><td>Callback 回调</td><td>❌</td><td>RP 的祖先，一次性反应</td></tr>
                    <tr><td>Promise</td><td>⚠️</td><td>简化版，只发一次值</td></tr>
                    <tr><td>async/await</td><td>❌</td><td>语法糖，单次异步</td></tr>
                    <tr><td>Hook (React)</td><td>⚠️</td><td>借鉴 RP 思想，本质扩展点</td></tr>
                    <tr><td>Hook (Git/Pytest)</td><td>❌</td><td>插件机制（POP）</td></tr>
                    <tr><td>EventEmitter</td><td>⚠️</td><td>RP 基础，缺操作符</td></tr>
                    <tr><td>观察者模式</td><td>⚠️</td><td>RP 理论基础</td></tr>
                    <tr><td>AI Agent</td><td>❌</td><td>自治决策系统</td></tr>
                    <tr><td>Actor (Akka)</td><td>⚠️</td><td>可配合 RP 使用</td></tr>
                </table>

                <h3>🔑 决定性测试</h3>
                <ol>
                    <li>支持 <code>map/filter/debounce</code> 等操作符吗？</li>
                    <li>事件被抽象成可订阅的"流"了吗？</li>
                    <li>多个流可以组合/merge 吗？</li>
                </ol>
                <p>全 Yes 才是 RP。</p>

                <h3>🧩 同一需求 4 种写法</h3>
                <pre><code class="language-javascript">// ❌ 回调
button.onclick = () => console.log('clicked');

// ❌ 事件订阅
emitter.on('data', d => console.log(d));

// ❌ async/await
button.addEventListener('click', async () => {
    await sleep(300);
    const data = await fetch('/api').then(r => r.json());
    updateUI(data);
});

// ✅ 真正的响应式编程
fromEvent(button, 'click').pipe(
    debounceTime(300),
    switchMap(() => from(fetch('/api'))),
    map(r => r.json())
).subscribe(updateUI);</code></pre>

                <h3>🤖 LLM 流式输出 + Function Call 算 RP 吗？</h3>
                <p><b>场景符合 RP，但实现方式决定它是不是 RP</b>：</p>
                <table>
                    <tr><th>写法</th><th>是 RP 吗</th></tr>
                    <tr><td><code>for chunk in stream</code> 循环</td><td>❌ 过程式</td></tr>
                    <tr><td><code>async for</code> 迭代器</td><td>❌ 异步迭代</td></tr>
                    <tr><td>SSE <code>onmessage</code> 回调</td><td>❌ 事件回调</td></tr>
                    <tr><td>RxJS pipe 操作符链</td><td>✅ 真 RP</td></tr>
                </table>
                <div class="tip-box">
                    <b>什么时候 LLM 场景真该用 RP？</b>
                    多 Agent 并发、用户输入自动取消上一次请求、复杂前端 UI 交互——这些是 RP 杀手锏。
                    简单流式输出用 <code>async for</code> 就够，别过度设计。
                </div>
            `
        },
        {
            id: 'paradigm-logic-modern',
            title: '15. 逻辑式编程的现代演进：Prolog → Datalog → Z3',
            html: `
                <p><b>Prolog 是经典，但绝不是"最优"</b>。每个后辈都瞄准了 Prolog 的痛点。</p>

                <h3>❌ Prolog 的五大硬伤</h3>
                <ol>
                    <li><b>性能差</b>：解释执行 + 全回溯，比命令式慢 1~2 个数量级</li>
                    <li><b>非确定性求解</b>：左递归会死循环</li>
                    <li><b>没有类型系统</b>：运行时才崩</li>
                    <li><b>切刀 cut</b>：破坏纯逻辑语义</li>
                    <li><b>生态萎缩</b>：工业界新项目少</li>
                </ol>

                <h3>🌳 现代逻辑驱动家族</h3>
                <div class="mermaid">
flowchart TB
    LP[逻辑驱动的编程世界]
    LP --> Prolog[Prolog<br/>一阶谓词逻辑]
    LP --> Datalog[Datalog<br/>数据库逻辑]
    LP --> miniK[miniKanren<br/>关系编程]
    LP --> SMT[SMT 求解器]
    LP --> CP[约束编程]
    LP --> ASP[Answer Set Programming]
    SMT --> Z3[Z3 Microsoft]
    SMT --> CVC[CVC5]
    CP --> MZ[MiniZinc]
    CP --> OR[OR-Tools]
                </div>

                <h3>🥊 按场景选最优工具</h3>
                <table>
                    <tr><th>场景</th><th>最优工具</th><th>原因</th></tr>
                    <tr><td>数据查询/程序分析</td><td><b>Datalog (Soufflé)</b></td><td>保证终止 + 极快 + 可并行</td></tr>
                    <tr><td>程序验证/符号执行</td><td><b>Z3 / CVC5</b></td><td>SMT 算法远超 Prolog 回溯</td></tr>
                    <tr><td>调度/排班/路径</td><td><b>MiniZinc / OR-Tools</b></td><td>专为约束优化设计</td></tr>
                    <tr><td>NP 难问题</td><td><b>ASP (Clingo)</b></td><td>稳定模型语义</td></tr>
                    <tr><td>工业级类型安全</td><td><b>Mercury</b></td><td>加了类型 + 模式</td></tr>
                    <tr><td>程序合成 / 教学</td><td><b>miniKanren</b></td><td>纯粹优雅，可反向运行</td></tr>
                    <tr><td>经典推理 / 原型</td><td><b>Prolog</b></td><td>50 年生态，DCG 漂亮</td></tr>
                </table>

                <h3>🎯 Z3 是什么？</h3>
                <p><b>Z3 = 微软的 SMT (Satisfiability Modulo Theories) 求解器</b>。给它一组约束，它返回是否有解+具体值。</p>
                <pre><code class="language-python">from z3 import *
x, y = Int('x'), Int('y')
s = Solver()
s.add(x > 0, y > 0, x + y == 10, x * y == 21)
print(s.check())   # sat
print(s.model())   # [x = 3, y = 7]</code></pre>
                <p>没有任何过程式逻辑——你只描述"答案应该满足什么"，剩下交给 Z3。<b>这就是声明式 + 逻辑驱动的精髓</b>。</p>

                <h3>📚 Prolog vs Z3 对比</h3>
                <table>
                    <tr><th>维度</th><th>Prolog</th><th>Z3</th></tr>
                    <tr><td>范式定位</td><td>逻辑式语言</td><td>SMT 求解器（库）</td></tr>
                    <tr><td>核心问题</td><td>目标能否从规则推出</td><td>约束能否同时满足</td></tr>
                    <tr><td>执行机制</td><td>归结 + 回溯</td><td>DPLL(T) + 理论求解</td></tr>
                    <tr><td>支持类型</td><td>项/原子/列表</td><td>整数/实数/位向量/数组/字符串</td></tr>
                    <tr><td>使用方式</td><td>独立语言</td><td>嵌入 Python/C++/...</td></tr>
                    <tr><td>典型应用</td><td>专家系统、NLP</td><td>程序验证、CTF、调度</td></tr>
                </table>

                <h3>🔥 Z3 的杀手锏应用</h3>
                <ul>
                    <li><b>程序验证</b>：Dafny、F*、Boogie</li>
                    <li><b>符号执行找 bug</b>：KLEE、angr</li>
                    <li><b>逆向工程 / CTF 解题</b>：自动反推密码学约束</li>
                    <li><b>调度/编译器优化</b></li>
                    <li><b>类型系统</b>：LiquidHaskell</li>
                </ul>

                <h3>🏆 一句话定位</h3>
                <div class="tip-box success">
                    <b>Prolog</b> 是逻辑式编程的"亲儿子"，<b>Z3</b> 是逻辑驱动声明式范式的"远房表亲"。
                    血统不同，精神一致：<b>"告诉计算机答案应该满足什么，让它自己找"</b>。
                </div>
            `
        },
        {
            id: 'paradigm-aop-practical',
            title: '16. 通俗版 AOP：从装饰器开始',
            html: `
                <p>面向切面编程（AOP）= <b>"把那些重复又跟业务无关的代码（日志/权限/事务）抽出来，自动应用到所有需要的方法上"</b>。</p>

                <h3>😩 痛点：横切关注点污染业务</h3>
                <pre><code class="language-python"># 没 AOP：业务密度只有 15%
def transfer(from_id, to_id, amount):
    logger.info(f"transfer {from_id}->{to_id} {amount}")   # 日志
    if not has_perm("transfer"): raise PermissionError      # 权限
    if amount <= 0: raise ValueError                        # 校验
    start = time.time()                                     # 计时
    try:
        db.begin()                                          # 事务
        # ↓↓↓ 真正业务仅 3 行 ↓↓↓
        db.update(f"UPDATE acc SET bal=bal-{amount} WHERE id={from_id}")
        db.update(f"UPDATE acc SET bal=bal+{amount} WHERE id={to_id}")
        record_audit(from_id, to_id, amount)
        # ↑↑↑ 真正业务结束 ↑↑↑
        db.commit()
    except Exception as e:
        db.rollback(); logger.error(e); raise
    finally:
        logger.info(f"耗时 {time.time()-start:.3f}s")</code></pre>

                <h3>✅ 用 AOP：业务密度 100%</h3>
                <pre><code class="language-python">@log
@require_perm("transfer")
@validate(amount=lambda x: x > 0)
@timing
@transactional
def transfer(from_id, to_id, amount):
    db.update(f"UPDATE acc SET bal=bal-{amount} WHERE id={from_id}")
    db.update(f"UPDATE acc SET bal=bal+{amount} WHERE id={to_id}")
    record_audit(from_id, to_id, amount)</code></pre>

                <h3>🎯 AOP 4 大核心术语</h3>
                <table>
                    <tr><th>术语</th><th>通俗解释</th><th>Python 装饰器对应</th></tr>
                    <tr><td>Aspect 切面</td><td>横切功能整体</td><td><code>log</code> 装饰器整体</td></tr>
                    <tr><td>Advice 通知</td><td>具体执行的代码</td><td>wrapper 函数体</td></tr>
                    <tr><td>Pointcut 切点</td><td>在哪些方法上生效</td><td><code>@log</code> 标记位置</td></tr>
                    <tr><td>JoinPoint 连接点</td><td>方法被调用的瞬间</td><td>装饰函数被 call 时</td></tr>
                    <tr><td>Weaving 织入</td><td>把切面应用到目标</td><td>装饰器自动包装</td></tr>
                </table>

                <h3>⏱ Advice 的 5 种时机</h3>
                <div class="mermaid">
flowchart LR
    A[Before] --> B[Around 前半] --> M[原方法] --> C[AfterReturning 正常]
    M --> D[AfterThrowing 异常]
    M --> E[After 无论如何]
                </div>

                <h3>🏗 AOP 实现技术</h3>
                <table>
                    <tr><th>方式</th><th>代表</th></tr>
                    <tr><td>装饰器</td><td>Python @, JS @</td></tr>
                    <tr><td>代理 Proxy</td><td>Spring AOP</td></tr>
                    <tr><td>字节码增强</td><td>AspectJ</td></tr>
                    <tr><td>中间件 Middleware</td><td>Express/FastAPI/Koa</td></tr>
                    <tr><td>拦截器</td><td>NestJS、Axios</td></tr>
                    <tr><td>Hooks</td><td>React Hook</td></tr>
                </table>

                <h3>🌟 你早就在用 AOP</h3>
                <ul>
                    <li>FastAPI <code>@app.middleware("http")</code> → AOP</li>
                    <li>Spring <code>@Transactional</code> → AOP</li>
                    <li>Flask <code>@require_login</code> → AOP</li>
                    <li>Express <code>app.use(logger)</code> → AOP</li>
                    <li>NestJS <code>@UseGuards()</code> → AOP</li>
                    <li>React HOC（高阶组件） → AOP 思想</li>
                </ul>

                <h3>⚖️ AOP vs 普通函数封装</h3>
                <div class="tip-box">
                    <b>普通封装</b>：业务方法<b>主动调用</b>工具函数<br/>
                    <b>AOP</b>：业务方法<b>完全不感知</b>，框架自动织入<br/>
                    → <b>AOP = 非侵入式功能增强</b>
                </div>
            `
        }
    ]
});
