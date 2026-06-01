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
            title: '11. 其他范式补充',
            html: `
                <table>
                    <tr><th>范式</th><th>说明</th></tr>
                    <tr><td>泛型编程 Generic</td><td>算法与类型解耦，如 C++ STL、Java Generics</td></tr>
                    <tr><td>元编程 Meta</td><td>程序操作程序：Python 装饰器、宏、反射</td></tr>
                    <tr><td>并发编程 Concurrent</td><td>多任务协作：协程、Actor 模型（Erlang）</td></tr>
                    <tr><td>数据流编程 Dataflow</td><td>节点间数据流动：TensorFlow、Apache Beam</td></tr>
                    <tr><td>契约式编程 DbC</td><td>前置/后置条件 + 不变量：Eiffel</td></tr>
                    <tr><td>面向方面 Aspect</td><td>同 AOP</td></tr>
                    <tr><td>面向服务 SOP</td><td>系统由服务组成：SOA、微服务</td></tr>
                </table>
            `
        }
    ]
});
