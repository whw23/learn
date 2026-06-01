/* 编程范式 —— 重组版：每个范式自成完整小节 */
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
    D --> DF[数据流 DF]
    P --> AOP[面向切面 AOP]
    P --> POP[面向插件 POP]
    P --> EDP[事件驱动 EDP]
    P --> Meta[元编程 Meta]
    P --> Concur[并发编程]
    P --> Other[其他<br/>泛型/契约/DOD/...]
        </div>

        <table>
            <tr><th>范式</th><th>核心思想</th><th>典型语言/工具</th><th>关键词</th></tr>
            <tr><td>过程式 PP</td><td>按步骤执行</td><td>C、Pascal</td><td>函数、流程</td></tr>
            <tr><td>面向对象 OOP</td><td>万物皆对象</td><td>Java、Python、C++</td><td>封装/继承/多态</td></tr>
            <tr><td>函数式 FP</td><td>函数即值</td><td>Haskell、Lisp、Scala</td><td>纯函数/不可变</td></tr>
            <tr><td>逻辑式 LP</td><td>声明事实+规则</td><td>Prolog、Datalog、Z3</td><td>推理/约束</td></tr>
            <tr><td>响应式 RP</td><td>数据流自动传播</td><td>RxJS、Vue、Reactor</td><td>流/订阅/推送</td></tr>
            <tr><td>数据流 DF</td><td>节点+边的图</td><td>LangGraph、n8n、Flink</td><td>算子/DAG</td></tr>
            <tr><td>面向切面 AOP</td><td>横切关注点</td><td>Spring AOP、装饰器</td><td>注解/拦截</td></tr>
            <tr><td>面向插件 POP</td><td>主程序+插件</td><td>VS Code、MCP</td><td>钩子/扩展</td></tr>
            <tr><td>事件驱动 EDP</td><td>事件+监听</td><td>JS、Node</td><td>事件循环</td></tr>
            <tr><td>元编程 Meta</td><td>程序操作程序</td><td>Python 装饰器、Rust 宏</td><td>反射/代码生成</td></tr>
            <tr><td>并发编程</td><td>多任务协作</td><td>Go、Erlang、Akka</td><td>线程/协程/Actor</td></tr>
        </table>
    `,
    subs: [
        // ============================================================
        // 1. 命令式
        // ============================================================
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

        // ============================================================
        // 2. 过程式
        // ============================================================
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
                <div class="tip-box">
                    <span class="tip-title"><i class="fa fa-info"></i> 与 FP 的区分</span>
                    见下方"<a href="#paradigm-fp">函数式编程</a>"小节末尾的"FP vs PP 深度辨析"——
                    最大区别<b>不在"用函数"，而在 4 个根本哲学</b>（可变性 / 副作用 / 函数地位 / 思维模型）。
                </div>
            `
        },

        // ============================================================
        // 3. OOP
        // ============================================================
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

        // ============================================================
        // 4. 函数式 —— 含 FP vs PP 深度辨析
        // ============================================================
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

                <hr style="margin: 30px 0; border: 0; border-top: 2px dashed #4CAF50;"/>

                <h3>🔍 深度辨析：FP vs 过程式</h3>
                <p><b>常见误解</b>：函数式 = 多个过程式函数嵌套调用 ❌</p>
                <p><b>真相</b>：差别<b>不在"嵌套层数"，而在 4 个根本哲学</b>。</p>

                <h4>4 个本质区别</h4>
                <table>
                    <tr><th>维度</th><th>过程式</th><th>函数式</th></tr>
                    <tr><td>核心单元</td><td>过程/子程序（动词）</td><td>函数（数学映射）</td></tr>
                    <tr><td>状态</td><td>✅ 有可变状态</td><td>❌ 不可变 immutable</td></tr>
                    <tr><td>副作用</td><td>✅ 允许（修改全局/IO）</td><td>❌ 集中到边界</td></tr>
                    <tr><td>函数地位</td><td>普通子程序</td><td><b>一等公民</b>（可传可返）</td></tr>
                </table>

                <h4>🚨 反例：伪函数式</h4>
                <pre><code class="language-python"># ❌ 看起来像函数式，其实是过程式套娃
cache = {}                       # 全局可变状态
def step1(x):
    cache['v'] = x * 2           # 副作用！
    return cache['v']
def step2(x):
    cache['v'] += x              # 依赖全局状态
    return cache['v']

result = step2(step1(5))         # 函数嵌套调用 ≠ FP！</code></pre>

                <h4>✅ 判断是否真 FP 的 3 个问题</h4>
                <ol>
                    <li>所有函数都没修改外部变量吗？</li>
                    <li>相同输入永远得到相同输出吗？</li>
                    <li>函数能被当作值传递吗？</li>
                </ol>
                <div class="tip-box success">
                    3 个全 Yes = 真 FP；任何一个 No = 只是"过程式分散在多个函数"。
                </div>

                <h4>💡 思维模型对比</h4>
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

                <h4>📝 一句话锁定</h4>
                <div class="tip-box">
                    <b>过程式</b>：<i>"Do this, then this, then this."</i>（命令机器一步步做）<br/>
                    <b>函数式</b>：<i>"The answer is f(g(h(x)))."</i>（描述数学等式）
                </div>
            `
        },

        // ============================================================
        // 5. 声明式
        // ============================================================
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

        // ============================================================
        // 6. 逻辑式 —— 含 Prolog→Datalog→Z3 现代演进
        // ============================================================
        {
            id: 'paradigm-logic',
            title: '6. 逻辑式编程（Logic）',
            html: `
                <p>用<b>事实 + 规则</b>描述问题，由推理引擎自动求解。</p>
                <pre><code class="language-prolog">parent(tom, bob).
parent(bob, alice).
grandparent(X, Z) :- parent(X, Y), parent(Y, Z).

?- grandparent(tom, alice).   % true</code></pre>
                <div class="tip-box">应用：专家系统、形式验证、AI 推理。</div>

                <hr style="margin: 30px 0; border: 0; border-top: 2px dashed #4CAF50;"/>

                <h3>🌳 逻辑式编程的现代演进：Prolog → Datalog → Z3</h3>
                <p><b>Prolog 是经典，但绝不是"最优"</b>。每个后辈都瞄准了 Prolog 的痛点。</p>

                <h4>❌ Prolog 的五大硬伤</h4>
                <ol>
                    <li><b>性能差</b>：解释执行 + 全回溯，比命令式慢 1~2 个数量级</li>
                    <li><b>非确定性求解</b>：左递归会死循环</li>
                    <li><b>没有类型系统</b>：运行时才崩</li>
                    <li><b>切刀 cut</b>：破坏纯逻辑语义</li>
                    <li><b>生态萎缩</b>：工业界新项目少</li>
                </ol>

                <h4>🌿 现代逻辑驱动家族</h4>
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

                <h4>🥊 按场景选最优工具</h4>
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

                <h4>🎯 Z3 是什么？</h4>
                <p><b>Z3 = 微软的 SMT (Satisfiability Modulo Theories) 求解器</b>。给它一组约束，它返回是否有解+具体值。</p>
                <pre><code class="language-python">from z3 import *
x, y = Int('x'), Int('y')
s = Solver()
s.add(x > 0, y > 0, x + y == 10, x * y == 21)
print(s.check())   # sat
print(s.model())   # [x = 3, y = 7]</code></pre>
                <p>没有任何过程式逻辑——你只描述"答案应该满足什么"，剩下交给 Z3。<b>这就是声明式 + 逻辑驱动的精髓</b>。</p>

                <h4>📚 Prolog vs Z3 对比</h4>
                <table>
                    <tr><th>维度</th><th>Prolog</th><th>Z3</th></tr>
                    <tr><td>范式定位</td><td>逻辑式语言</td><td>SMT 求解器（库）</td></tr>
                    <tr><td>核心问题</td><td>目标能否从规则推出</td><td>约束能否同时满足</td></tr>
                    <tr><td>执行机制</td><td>归结 + 回溯</td><td>DPLL(T) + 理论求解</td></tr>
                    <tr><td>支持类型</td><td>项/原子/列表</td><td>整数/实数/位向量/数组/字符串</td></tr>
                    <tr><td>使用方式</td><td>独立语言</td><td>嵌入 Python/C++/...</td></tr>
                    <tr><td>典型应用</td><td>专家系统、NLP</td><td>程序验证、CTF、调度</td></tr>
                </table>

                <h4>🔥 Z3 的杀手锏应用</h4>
                <ul>
                    <li><b>程序验证</b>：Dafny、F*、Boogie</li>
                    <li><b>符号执行找 bug</b>：KLEE、angr</li>
                    <li><b>逆向工程 / CTF 解题</b>：自动反推密码学约束</li>
                    <li><b>调度/编译器优化</b></li>
                    <li><b>类型系统</b>：LiquidHaskell</li>
                </ul>

                <div class="tip-box success">
                    <b>Prolog</b> 是逻辑式编程的"亲儿子"，<b>Z3</b> 是逻辑驱动声明式范式的"远房表亲"。
                    血统不同，精神一致：<b>"告诉计算机答案应该满足什么，让它自己找"</b>。
                </div>
            `
        },

        // ============================================================
        // 7. 响应式 —— 含本质详解、推送 vs 轮询、Hook/回调辨析
        // ============================================================
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

                <hr style="margin: 30px 0; border: 0; border-top: 2px dashed #4CAF50;"/>

                <h3>🎯 响应式编程的本质</h3>
                <p>很多人觉得响应式"很玄"。其实它的本质<b>就是 Excel 公式那种"自动联动"</b>。</p>

                <h4>🏁 从 Excel 切入</h4>
                <pre><code class="language-text">A1 = 10
A2 = 20
A3 = A1 + A2       ← 显示 30
改 A1 = 100 → A3 自动变 120</code></pre>
                <p><b>这就是响应式</b>：你没写"当 A1 变了更新 A3"的代码，A3 自己反应了。</p>

                <h4>⚖️ vs 命令式</h4>
                <pre><code class="language-python"># 命令式：必须手动重算
A1 = 10; A2 = 20; A3 = A1 + A2   # A3 = 30
A1 = 100
print(A3)                          # 还是 30！没自动更新

# 响应式（Vue 3）
A1 = ref(10); A2 = ref(20)
A3 = computed(lambda: A1.value + A2.value)
watchEffect(lambda: print("A3 =", A3.value))
A1.value = 100   # 自动输出 "A3 = 120"</code></pre>

                <h4>❓ 常见疑问：写成函数就是响应式吗？</h4>
                <pre><code class="language-python">def A3(): return A1 + A2</code></pre>
                <div class="tip-box warn">
                    <b>不够！</b> 这只是"惰性求值"。响应式 = <b>延迟计算 + 自动通知所有依赖者</b>。
                </div>

                <h4>❓ 是轮询实现的吗？</h4>
                <div class="tip-box danger">
                    <b>绝不是轮询！</b> 响应式用"<b>推送模式 + 依赖追踪</b>"：
                    <ul>
                        <li><b>读取时</b>：数据的 getter 悄悄记下"谁在读我"</li>
                        <li><b>赋值时</b>：数据的 setter 主动调用所有订阅者</li>
                        <li>程序不变化时 <b>CPU 是 0%</b></li>
                    </ul>
                </div>

                <h4>❓ 本质是广播吗？</h4>
                <p><b>是！</b> 但是<b>"自动追踪依赖的精准广播"</b>：</p>
                <table>
                    <tr><th></th><th>普通广播/Pub-Sub</th><th>响应式</th></tr>
                    <tr><td>订阅</td><td>手动 <code>.subscribe()</code></td><td><b>读取即订阅</b>（自动）</td></tr>
                    <tr><td>取消</td><td>手动 <code>.unsubscribe()</code></td><td><b>不读即取消</b>（自动）</td></tr>
                    <tr><td>粒度</td><td>频道</td><td>单个字段</td></tr>
                </table>

                <h4>📡 响应式 ↔ SSE：同源同宗</h4>
                <p>它们都是<b>"推送模式"</b>家族成员，只是<b>距离不同</b>：</p>
                <div class="mermaid">
flowchart TB
    Core[核心: 拒绝轮询 主动推送]
    Core --> L1[最近: 函数回调]
    Core --> L2[同进程: 响应式编程]
    Core --> L3[同机器: 共享内存事件]
    Core --> L4[局域网: WebSocket/TCP]
    Core --> L5[公网: SSE/HTTP]
    Core --> L6[跨服务: Kafka/MQ]
                </div>

                <h4>🛠 30 行实现一个响应式系统</h4>
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

                <h4>🌐 两大流派</h4>
                <div class="mermaid">
flowchart LR
    RP[响应式编程] --> S1[信号式 Signal-based]
    RP --> S2[流式 Stream-based]
    S1 --> V[Vue / SolidJS / Svelte / MobX]
    S2 --> R[RxJS / Reactor / Akka Streams]
                </div>

                <h4>🌍 远不止 TypeScript</h4>
                <table>
                    <tr><th>语言</th><th>响应式库</th></tr>
                    <tr><td>JS/TS</td><td>RxJS、Vue、SolidJS、MobX</td></tr>
                    <tr><td>Java</td><td>RxJava、Reactor、Spring WebFlux</td></tr>
                    <tr><td>Kotlin</td><td>Flow、RxKotlin</td></tr>
                    <tr><td>Swift</td><td>Combine、RxSwift</td></tr>
                    <tr><td>C#</td><td>Rx.NET</td></tr>
                    <tr><td>Python</td><td>RxPY</td></tr>
                    <tr><td>大数据</td><td>Flink、Kafka Streams、Beam</td></tr>
                </table>

                <hr style="margin: 30px 0; border: 0; border-top: 2px dashed #4CAF50;"/>

                <h3>🔍 辨析：Callback / Hook / Agent ≠ 响应式</h3>
                <p>这些概念都"长得像响应式"，但<b>不能划等号</b>。它们是 RP 的"原料"或"前身"。</p>

                <h4>📊 边界对照表</h4>
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

                <h4>🔑 决定性测试</h4>
                <ol>
                    <li>支持 <code>map/filter/debounce</code> 等操作符吗？</li>
                    <li>事件被抽象成可订阅的"流"了吗？</li>
                    <li>多个流可以组合/merge 吗？</li>
                </ol>
                <p>全 Yes 才是 RP。</p>

                <h4>🧩 同一需求 4 种写法</h4>
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

                <h4>🤖 LLM 流式输出 + Function Call 算 RP 吗？</h4>
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

        // ============================================================
        // 8. 数据流编程（NEW 独立小节，详细展开 LangGraph/n8n）
        // ============================================================
        {
            id: 'paradigm-dataflow',
            title: '8. 数据流编程（Dataflow）',
            html: `
                <p>核心：<b>把程序建模为"数据流过节点的图"</b>，节点是算子，边是数据。</p>

                <h3>🌊 核心特征</h3>
                <div class="mermaid">
flowchart LR
    Node1[节点1] -->|数据| Node2[节点2]
    Node2 -->|数据| Node3[节点3]
    Node2 -->|数据| Node4[节点4]
    Node3 -->|数据| Node5[输出]
    Node4 -->|数据| Node5
                </div>
                <ol>
                    <li><b>节点 = 算子</b>（处理数据的小函数）</li>
                    <li><b>边 = 数据流动</b></li>
                    <li><b>声明式</b>：你画图，不写控制流</li>
                    <li><b>天然并行</b>：无依赖节点可同时执行</li>
                    <li><b>可视化友好</b>：图结构容易渲染</li>
                </ol>

                <h3>💻 最经典例子：计算图</h3>
                <pre><code class="language-python"># TensorFlow / PyTorch 计算图
x = tf.constant(3.0)
y = tf.constant(4.0)
z = x * x + y * y      # 这一行不是立即计算，而是建图
                       # 真正执行由数据流引擎调度</code></pre>

                <hr style="margin: 30px 0; border: 0; border-top: 2px dashed #4CAF50;"/>

                <h3>🤖 AI 时代的数据流编程代表</h3>
                <p>AI Agent 时代把数据流编程推到了主流——<b>LangGraph、n8n、Dify、ComfyUI</b> 都是教科书级实现。</p>

                <h4>1. LangGraph：AI Agent 工作流</h4>
                <pre><code class="language-python">from langgraph.graph import StateGraph

# 1. 定义节点（算子）
def fetch_data(state): return {"data": db.query(state["id"])}
def analyze(state): return {"summary": llm.summarize(state["data"])}
def notify(state): return {"sent": send_email(state["summary"])}

# 2. 构建图（声明数据流）
graph = StateGraph(State)
graph.add_node("fetch", fetch_data)
graph.add_node("analyze", analyze)
graph.add_node("notify", notify)

# 3. 连接边
graph.add_edge("fetch", "analyze")
graph.add_edge("analyze", "notify")

# 4. 编译 + 执行
app = graph.compile()
result = app.invoke({"id": 123})</code></pre>

                <p>LangGraph 的核心抽象就叫 <code>StateGraph</code>——本身就是数据流编程的体现。</p>

                <h4>2. n8n：低代码可视化工作流</h4>
                <div class="mermaid">
flowchart LR
    Trigger[Webhook 触发] --> HTTP[HTTP 请求]
    HTTP --> JSON[解析 JSON]
    JSON --> Filter[过滤数据]
    Filter --> Slack[发送 Slack]
    Filter --> DB[(写数据库)]
                </div>
                <p>n8n 是<b>纯可视化的数据流编程</b>——拖拽节点连线，不写代码。</p>

                <h4>3. ComfyUI：Stable Diffusion 工作流</h4>
                <div class="mermaid">
flowchart LR
    Prompt[文本提示词节点] --> Encoder[CLIP 编码器]
    Model[模型加载节点] --> Sampler[采样器]
    Encoder --> Sampler
    Noise[噪声节点] --> Sampler
    Sampler --> VAE[VAE 解码]
    VAE --> Image[图像输出]
                </div>

                <h3>🌳 数据流编程工具光谱</h3>
                <table>
                    <tr><th>领域</th><th>工具</th></tr>
                    <tr><td><b>AI Agent</b></td><td>LangGraph、Dify、Flowise、Coze（扣子）</td></tr>
                    <tr><td><b>大数据流</b></td><td>Apache Flink、Beam、Kafka Streams</td></tr>
                    <tr><td><b>大数据调度</b></td><td>Airflow、Dagster、Prefect</td></tr>
                    <tr><td><b>机器学习</b></td><td>TensorFlow、PyTorch（动态图）</td></tr>
                    <tr><td><b>自动化/低代码</b></td><td>n8n、Zapier、Make、Power Automate</td></tr>
                    <tr><td><b>科学计算</b></td><td>Jupyter、KNIME、Orange</td></tr>
                    <tr><td><b>多媒体/创作</b></td><td>ComfyUI、Houdini、Blender Geometry Nodes、Unreal Blueprint</td></tr>
                    <tr><td><b>嵌入式/工业</b></td><td>LabVIEW、Pure Data、Max/MSP</td></tr>
                </table>

                <h3>🥊 数据流 vs 其他范式</h3>
                <table>
                    <tr><th></th><th>过程式</th><th>函数式</th><th>响应式</th><th>数据流</th></tr>
                    <tr><td>关注点</td><td>步骤</td><td>数学映射</td><td>状态自动同步</td><td>节点+边</td></tr>
                    <tr><td>声明式</td><td>❌</td><td>✅</td><td>✅</td><td>✅</td></tr>
                    <tr><td>天然并行</td><td>❌</td><td>⚠️</td><td>⚠️</td><td>✅</td></tr>
                    <tr><td>可视化</td><td>❌</td><td>❌</td><td>❌</td><td>✅</td></tr>
                    <tr><td>AI 时代代表</td><td>—</td><td>LangChain</td><td>RxJS</td><td><b>LangGraph / n8n / Dify</b></td></tr>
                </table>

                <h3>🎯 为什么 AI 时代选择数据流？</h3>
                <p>LangGraph 官方解释：</p>
                <div class="tip-box">
                    "Most agent frameworks are linear. But real-world AI workflows need
                    <b>branches, loops, parallelism, and human-in-the-loop</b> —
                    which is naturally modeled as a <b>graph</b>."
                </div>

                <div class="tip-box success">
                    <span class="tip-title"><i class="fa fa-lightbulb-o"></i> 一句话</span>
                    <b>数据流编程是 AI 时代最主流的范式之一</b>——因为 Agent 工作流天生是图，
                    多步骤、多服务、多 LLM 调用需要清晰的可视化调度。
                </div>
            `
        },

        // ============================================================
        // 9. AOP —— 含通俗版深度
        // ============================================================
        {
            id: 'paradigm-aop',
            title: '9. 面向切面编程（AOP）',
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

                <hr style="margin: 30px 0; border: 0; border-top: 2px dashed #4CAF50;"/>

                <h3>😩 为什么需要 AOP？痛点分析</h3>
                <p><b>没 AOP 时业务密度只有 15%</b>：</p>
                <pre><code class="language-python">def transfer(from_id, to_id, amount):
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

                <h3>✅ 用 AOP 后业务密度 100%</h3>
                <pre><code class="language-python">@log
@require_perm("transfer")
@validate(amount=lambda x: x > 0)
@timing
@transactional
def transfer(from_id, to_id, amount):
    db.update(f"UPDATE acc SET bal=bal-{amount} WHERE id={from_id}")
    db.update(f"UPDATE acc SET bal=bal+{amount} WHERE id={to_id}")
    record_audit(from_id, to_id, amount)</code></pre>

                <h3>🎯 AOP 5 大核心术语</h3>
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
        },

        // ============================================================
        // 10. POP
        // ============================================================
        {
            id: 'paradigm-plugin',
            title: '10. 面向插件编程（POP）',
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

                <div class="tip-box">
                    <span class="tip-title"><i class="fa fa-magic"></i> AI 时代的 POP</span>
                    Function Call / MCP / Agent Skill 都是 POP 的 AI 时代实现。
                    详见 <a href="#ai-pop-evolution">🤖 AI 时代 → POP 演进</a>章节。
                </div>
            `
        },

        // ============================================================
        // 11. 事件驱动
        // ============================================================
        {
            id: 'paradigm-event',
            title: '11. 事件驱动编程（EDP）',
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
                <div class="tip-box">
                    <b>EDP vs 响应式</b>：EDP 是"架构层（系统由事件协作）"，
                    响应式是"范式层（用流处理这些事件）"——见<a href="#paradigm-reactive">响应式</a>章节末尾辨析。
                </div>
            `
        },

        // ============================================================
        // 12. 元编程（独立深度小节）
        // ============================================================
        {
            id: 'paradigm-meta',
            title: '12. 元编程（Metaprogramming）',
            html: `
                <p>核心：<b>程序操作程序</b>——代码可以读取、生成、修改自己或其他代码。</p>

                <h3>🪞 什么叫"元"？</h3>
                <p><b>"Meta-"</b> 前缀来自希腊语，意思是 <b>"关于...本身"</b>。</p>
                <table>
                    <tr><th>词</th><th>含义</th></tr>
                    <tr><td>Data</td><td>数据</td></tr>
                    <tr><td><b>Meta</b>data</td><td>关于数据的数据（文件大小、创建时间）</td></tr>
                    <tr><td>Language</td><td>语言</td></tr>
                    <tr><td><b>Meta</b>language</td><td>描述语言的语言（如 BNF 语法）</td></tr>
                    <tr><td>Programming</td><td>编程</td></tr>
                    <tr><td><b>Meta</b>programming</td><td><b>关于"编程"的编程 = 写代码操作代码</b></td></tr>
                </table>

                <h3>💡 最直观例子：Python 装饰器</h3>
                <pre><code class="language-python">def trace(fn):                    # ← 这就是元编程！
    """trace 接收一个函数，返回一个新函数"""
    def wrapper(*args, **kwargs):
        print(f"调用 {fn.__name__}")
        return fn(*args, **kwargs)
    return wrapper

@trace                            # ← 本质：greet = trace(greet)
def greet(name):
    print(f"Hi, {name}")

greet("Alice")
# 输出:
# 调用 greet
# Hi, Alice</code></pre>
                <p><b>关键点</b>：<code>trace</code> 不是处理"数据"，而是处理"函数本身"——这就是元编程。</p>

                <h3>⚖️ 普通编程 vs 元编程</h3>
                <div class="mermaid">
flowchart LR
    subgraph 普通编程
        Code1[代码] -->|操作| Data[数据]
    end
    subgraph 元编程
        Code2[代码] -->|操作| OtherCode[其他代码/自己]
    end
                </div>
                <table>
                    <tr><th></th><th>普通编程</th><th>元编程</th></tr>
                    <tr><td>操作对象</td><td>数字、字符串、列表...</td><td><b>函数、类、模块、AST</b></td></tr>
                    <tr><td>典型动作</td><td>计算、增删改查</td><td><b>检查、生成、修改、注入</b></td></tr>
                    <tr><td>例子</td><td><code>sum([1,2,3])</code></td><td><code>@trace</code>、<code>getattr(obj, 'method')</code></td></tr>
                </table>

                <h3>🧰 元编程的 4 大能力</h3>
                <div class="mermaid">
flowchart TB
    Meta[元编程能力]
    Meta --> A[① 反射 Reflection<br/>读取代码结构]
    Meta --> B[② 内省 Introspection<br/>知道自己长啥样]
    Meta --> C[③ 代码生成 Code Gen<br/>动态创建函数/类]
    Meta --> D[④ 代码修改 Modification<br/>改变行为]
                </div>

                <h4>能力 1：反射 / 内省（看清代码）</h4>
                <pre><code class="language-python">class User:
    def __init__(self, name): self.name = name
    def greet(self): return f"Hi {self.name}"

u = User("Alice")

# 普通编程：使用对象
print(u.greet())                   # "Hi Alice"

# 元编程：检查对象本身
print(type(u))                     # <class 'User'>
print(dir(u))                      # 列出所有属性方法
print(hasattr(u, 'greet'))         # True
print(getattr(u, 'name'))          # 'Alice'  ← 用字符串访问属性

# 甚至动态调用方法
method_name = "greet"
result = getattr(u, method_name)() # "Hi Alice"</code></pre>

                <h4>能力 2：代码生成（动态创建类）</h4>
                <pre><code class="language-python"># 动态创建一个类
User = type('User', (object,), {
    'name': 'default',
    'greet': lambda self: f"Hi {self.name}"
})

u = User()
print(u.greet())  # "Hi default"</code></pre>

                <h4>能力 3：代码修改（装饰器、Monkey Patch）</h4>
                <pre><code class="language-python">@cache
@retry(times=3)
@timeout(5)
def fetch_data(url):
    return requests.get(url).json()

# Monkey Patch：运行时修改第三方代码
import json
old_dumps = json.dumps
def new_dumps(*a, **k):
    print("called json.dumps")
    return old_dumps(*a, **k)
json.dumps = new_dumps     # ← 偷天换日！</code></pre>

                <h4>能力 4：代码生成代码（最高阶）</h4>
                <pre><code class="language-python"># 根据数据库表结构，自动生成 SQLAlchemy 模型
def generate_model(table_name, columns):
    attrs = {'__tablename__': table_name}
    for col_name, col_type in columns.items():
        attrs[col_name] = Column(col_type)
    return type(table_name.capitalize(), (Base,), attrs)

User = generate_model('users', {'id': Integer, 'name': String})</code></pre>

                <h3>🌟 你天天用的库都靠元编程</h3>
                <table>
                    <tr><th>库</th><th>怎么用的元编程</th></tr>
                    <tr><td>Pydantic / FastAPI</td><td>元类读取类型注解，自动生成 validate/dict/json</td></tr>
                    <tr><td>Django ORM</td><td>元类自动生成表 + Manager 方法</td></tr>
                    <tr><td>pytest fixture</td><td>反射测试函数参数名，自动注入</td></tr>
                    <tr><td>Flask 路由</td><td>装饰器读取函数签名生成 URL 规则</td></tr>
                    <tr><td>SQLAlchemy</td><td>重载 Python 运算符，生成 SQL</td></tr>
                    <tr><td>dataclass</td><td>装饰器自动生成 <code>__init__</code> 等</td></tr>
                </table>

                <h3>🌍 各语言元编程能力</h3>
                <div class="mermaid">
flowchart LR
    M[元编程支持度] --> H[高]
    M --> Mid[中]
    M --> L[低]
    H --> H1[Lisp/Clojure<br/>代码即数据]
    H --> H2[Ruby<br/>动态特性丰富]
    H --> H3[Python<br/>装饰器/元类]
    H --> H4[JavaScript<br/>Proxy/eval]
    Mid --> Mid1[C++<br/>模板/constexpr]
    Mid --> Mid2[Rust<br/>宏 macro]
    Mid --> Mid3[TypeScript<br/>装饰器/类型操作]
    Mid --> Mid4[Java<br/>反射/注解]
    L --> L1[C<br/>仅预处理器宏]
    L --> L2[Go<br/>反射受限]
                </div>

                <h3>⏰ 元编程的 2 个时机</h3>
                <table>
                    <tr><th></th><th>编译期元编程</th><th>运行期元编程</th></tr>
                    <tr><td>执行时机</td><td>程序编译时</td><td>程序运行时</td></tr>
                    <tr><td>性能</td><td>零开销（已展开）</td><td>有开销（动态查找）</td></tr>
                    <tr><td>能用的信息</td><td>类型、常量</td><td>一切（实时数据）</td></tr>
                    <tr><td>典型</td><td>Rust macro、C++ template</td><td>Python decorator</td></tr>
                </table>

                <h3>🎓 元编程层级</h3>
                <div class="mermaid">
flowchart TB
    L0[L0: 普通代码<br/>处理数据]
    L1[L1: 反射/内省<br/>读取代码结构]
    L2[L2: 装饰器/Monkey Patch<br/>修改已有代码]
    L3[L3: 元类/动态类生成<br/>创造新代码]
    L4[L4: 宏 + AST 操作<br/>编译期改写代码]
    L5[L5: 同像语言 Lisp<br/>代码 = 数据]
    L0 --> L1 --> L2 --> L3 --> L4 --> L5
                </div>

                <h3>⚖️ 优缺点</h3>
                <table>
                    <tr><th>✅ 优点</th><th>❌ 缺点</th></tr>
                    <tr><td>消除重复样板代码</td><td>难调试，错误堆栈深</td></tr>
                    <tr><td>框架神奇（Django/Spring）</td><td>运行时性能差</td></tr>
                    <tr><td>DSL 优雅（SQLAlchemy）</td><td>易写出"魔法"，接手难</td></tr>
                    <tr><td>强大灵活</td><td>静态分析失效（IDE 提示弱）</td></tr>
                </table>

                <div class="tip-box success">
                    <span class="tip-title"><i class="fa fa-quote-left"></i> 一句话</span>
                    <b>普通程序员写程序，元程序员写"写程序的程序"。</b><br/>
                    理解了元编程，你就理解了"为什么有些代码能那么少却能做那么多"。
                </div>
            `
        },

        // ============================================================
        // 13. 并发编程（独立小节）
        // ============================================================
        {
            id: 'paradigm-concurrent',
            title: '13. 并发编程（Concurrent / Parallel）',
            html: `
                <p>不是单一范式，是一组处理<b>"多任务协作"</b>的思想。</p>

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

                <h3>🥊 三大流派</h3>
                <table>
                    <tr><th>流派</th><th>代表</th><th>优点</th><th>缺点</th></tr>
                    <tr><td><b>共享内存 + 锁</b></td><td>Java、C++、Rust Mutex</td><td>效率高</td><td>易死锁、竞态</td></tr>
                    <tr><td><b>消息传递</b></td><td>Actor (Erlang/Akka)、CSP (Go)</td><td>安全，无共享</td><td>抽象较重</td></tr>
                    <tr><td><b>事件循环</b></td><td>Node.js、浏览器、asyncio</td><td>单线程无锁</td><td>怕阻塞</td></tr>
                </table>

                <h3>📚 关键术语</h3>
                <ul>
                    <li><b>同步 vs 异步</b>：是否阻塞等结果</li>
                    <li><b>阻塞 vs 非阻塞</b>：调用是否立即返回</li>
                    <li><b>并发 vs 并行</b>：交替执行 vs 同时执行（多核）</li>
                    <li><b>竞态条件 Race</b>：多线程访问共享资源导致结果不定</li>
                    <li><b>死锁 Deadlock</b>：互相等待对方释放锁</li>
                    <li><b>原子操作 Atomic</b>：不可分割的操作</li>
                </ul>

                <h3>💻 几种风格对比</h3>
                <pre><code class="language-python"># 1. 多线程（共享内存）
from threading import Thread
def task(n): print(n * 2)
threads = [Thread(target=task, args=(i,)) for i in range(5)]
[t.start() for t in threads]

# 2. 协程（asyncio）
import asyncio
async def task(n): await asyncio.sleep(0.1); print(n * 2)
await asyncio.gather(*[task(i) for i in range(5)])

# 3. 多进程（独立内存）
from multiprocessing import Process
processes = [Process(target=task, args=(i,)) for i in range(5)]
[p.start() for p in processes]</code></pre>

                <pre><code class="language-go">// Go: CSP 风格通道
ch := make(chan int)
go func() { ch &lt;- 42 }()   // goroutine 发送
val := &lt;-ch                  // main 接收</code></pre>
            `
        },

        // ============================================================
        // 14. 泛型编程（独立小节）
        // ============================================================
        {
            id: 'paradigm-generic',
            title: '14. 泛型编程（Generic Programming）',
            html: `
                <p>核心：<b>算法与具体类型解耦</b>。同一个函数可作用于多种类型，编译期决定。</p>

                <h3>💻 经典例子</h3>
                <pre><code class="language-cpp">// C++ STL：sort 对任何可比较类型都能用
template &lt;typename T&gt;
void sort(vector&lt;T&gt;& v) { /* ... */ }

sort(vector&lt;int&gt;{3,1,2});
sort(vector&lt;string&gt;{"b","a"});</code></pre>

                <pre><code class="language-typescript">// TypeScript 泛型函数
function first&lt;T&gt;(arr: T[]): T | undefined {
    return arr[0];
}
first([1, 2, 3])       // 类型推导为 number
first(["a", "b"])      // 类型推导为 string</code></pre>

                <pre><code class="language-rust">// Rust trait bound
fn largest&lt;T: PartialOrd&gt;(list: &amp;[T]) -> &amp;T {
    let mut largest = &amp;list[0];
    for item in list {
        if item > largest { largest = item; }
    }
    largest
}</code></pre>

                <h3>🌟 各语言代表</h3>
                <ul>
                    <li><b>C++</b>：模板（template）—— 编译期单态化</li>
                    <li><b>Rust</b>：泛型 + Trait Bound</li>
                    <li><b>Java</b>：泛型（类型擦除）</li>
                    <li><b>TypeScript</b>：泛型 + 条件类型 + 映射类型</li>
                    <li><b>Go 1.18+</b>：终于加入泛型</li>
                </ul>

                <h3>📚 进阶概念</h3>
                <ul>
                    <li><b>类型参数（Type Parameter）</b>：<code>&lt;T&gt;</code></li>
                    <li><b>协变 / 逆变（Covariance / Contravariance）</b>：父子类型替换规则</li>
                    <li><b>Trait / Concept / Type Class</b>：约束泛型必须支持哪些操作</li>
                    <li><b>类型擦除（Type Erasure）</b>：Java 风格，运行时无泛型信息</li>
                    <li><b>单态化（Monomorphization）</b>：C++/Rust 风格，编译期为每个类型生成具体代码</li>
                </ul>
            `
        },

        // ============================================================
        // 15. 数据流（已移到 8）—— 跳过

        // 16. 契约式（独立小节）
        // ============================================================
        {
            id: 'paradigm-dbc',
            title: '15. 契约式编程（Design by Contract）',
            html: `
                <p>核心：<b>函数声明前置条件、后置条件、不变量</b>，违反时崩溃。</p>

                <h3>📋 三大契约</h3>
                <table>
                    <tr><th>契约</th><th>含义</th></tr>
                    <tr><td><b>Precondition 前置条件</b></td><td>调用前必须满足的条件（参数有效性）</td></tr>
                    <tr><td><b>Postcondition 后置条件</b></td><td>调用后保证的状态（返回值有效性）</td></tr>
                    <tr><td><b>Invariant 不变量</b></td><td>整个生命周期都成立的条件</td></tr>
                </table>

                <h3>💻 Python 模拟</h3>
                <pre><code class="language-python">def withdraw(account, amount):
    # 前置条件
    assert amount > 0, "金额必须为正"
    assert account.balance >= amount, "余额不足"

    old = account.balance
    account.balance -= amount

    # 后置条件
    assert account.balance == old - amount
    assert account.balance >= 0</code></pre>

                <h3>🛠 工具支持</h3>
                <ul>
                    <li><b>Eiffel</b>：DbC 的原型语言（Bertrand Meyer 提出）</li>
                    <li><b>Python</b>：<code>icontract</code>、<code>deal</code> 库</li>
                    <li><b>Rust</b>：<code>contracts</code> crate</li>
                    <li><b>Java</b>：JML (Java Modeling Language)</li>
                    <li><b>升级版</b>：依赖类型系统（Idris、Liquid Haskell、F*）—— 编译期就验证契约</li>
                </ul>

                <div class="tip-box">
                    <b>与 TDD 的差别</b>：TDD 用测试验证"几个例子"；DbC 用断言验证"所有调用"。
                </div>
            `
        },

        // ============================================================
        // 17. 面向能力
        // ============================================================
        {
            id: 'paradigm-capability',
            title: '16. 面向能力编程（Capability-Oriented）',
            html: `
                <p>核心：<b>权限以"能力（Capability）"为单位，不可伪造也不可窃听</b>。</p>

                <h3>🔐 核心思想</h3>
                <p>传统权限模型（ACL）：<i>"用户 X 对资源 Y 有 R/W 权限"</i> —— 容易被绕过。</p>
                <p>能力模型：<i>"持有 token 就能操作，token 由资源所有者颁发"</i> —— 像门钥匙，没钥匙就进不去。</p>

                <h3>💡 你早就在用</h3>
                <ul>
                    <li><b>操作系统的 fd 文件描述符</b>：拿到 fd 才能读写文件</li>
                    <li><b>JavaScript 的 Promise resolver</b>：只有持有 resolver 才能 resolve</li>
                    <li><b>OAuth Token</b>：能力的网络版</li>
                    <li><b>Capability URL</b>：URL 本身就是能力（如 Google Docs 的分享链接）</li>
                </ul>

                <h3>🌟 代表语言</h3>
                <ul>
                    <li><b>E 语言</b>：能力模型的开山之作</li>
                    <li><b>Pony</b>：Actor + Capability</li>
                    <li><b>Newspeak</b>：模块即能力</li>
                </ul>
            `
        },

        // ============================================================
        // 18. DOD
        // ============================================================
        {
            id: 'paradigm-dod',
            title: '17. 面向数据编程（Data-Oriented Design, DOD）',
            html: `
                <p>核心：<b>按内存布局优化数据，让 CPU 缓存命中率最大</b>。</p>
                <p>⚠️ 注意：和"<b>DOP 数据导向</b>"（Clojure 风格）<b>不是同一个东西</b>。</p>

                <h3>🎯 核心思想</h3>
                <ul>
                    <li>不按"对象语义"组织数据，按"<b>数据访问模式</b>"组织</li>
                    <li>把多个对象的同一字段连续存储 → 提高缓存命中</li>
                    <li>口号：<b>"data is king, code follows data"</b></li>
                </ul>

                <h3>🎮 典型：游戏引擎 ECS 架构</h3>
                <div class="mermaid">
flowchart LR
    subgraph OOP风格[OOP: 每个 Entity 是一个对象]
        E1[Entity1<br/>pos+vel+health]
        E2[Entity2<br/>pos+vel+health]
        E3[Entity3<br/>pos+vel+health]
    end
    subgraph ECS风格[ECS: 字段分开按数组连续存储]
        P[pos 数组: x1 x2 x3 ...]
        V[vel 数组: v1 v2 v3 ...]
        H[health 数组: h1 h2 h3 ...]
    end
                </div>

                <h3>🌟 代表</h3>
                <ul>
                    <li><b>Unity DOTS / ECS</b></li>
                    <li><b>Bevy</b>（Rust 游戏引擎）</li>
                    <li><b>Unreal Mass Entity</b></li>
                    <li>Mike Acton（前 Insomniac Games 引擎工程师）经典演讲</li>
                </ul>

                <h3>📈 性能差距</h3>
                <p>同样的逻辑，ECS 可比 OOP 快 <b>10~100 倍</b>（缓存命中率差异）。</p>
            `
        },

        // ============================================================
        // 19. 流式
        // ============================================================
        {
            id: 'paradigm-stream',
            title: '18. 流式编程（Stream Programming）',
            html: `
                <p>核心：<b>对数据流应用一连串算子</b>，可以是有限或无限流。</p>

                <pre><code class="language-java">// Java Stream
list.stream()
    .filter(x -> x > 0)
    .map(x -> x * x)
    .reduce(0, Integer::sum);</code></pre>

                <pre><code class="language-kotlin">// Kotlin Flow
flow {
    for (i in 1..10) { emit(i); delay(100) }
}.filter { it % 2 == 0 }
 .map { it * it }
 .collect { println(it) }</code></pre>

                <h3>🌟 代表</h3>
                <ul>
                    <li><b>Java Stream</b>（Java 8+）</li>
                    <li><b>Kotlin Flow</b></li>
                    <li><b>RxJS / Reactor</b>（也算响应式）</li>
                    <li><b>Apache Flink</b>、<b>Kafka Streams</b>（大数据）</li>
                    <li><b>Unix 管道</b>（祖宗）：<code>cat file | grep foo | wc -l</code></li>
                </ul>

                <div class="tip-box">
                    流式 / 响应式 / 函数式 / 数据流——四者有大量重叠。区别看<b>意图</b>：流式强调"算子链处理数据"。
                </div>
            `
        },

        // ============================================================
        // 20. 表格驱动
        // ============================================================
        {
            id: 'paradigm-table',
            title: '19. 表格驱动编程（Table-Driven）',
            html: `
                <p>把复杂的 if/else 逻辑变成"查表"。<b>代码更少、更易改</b>。</p>

                <h3>💡 经典例子</h3>
                <pre><code class="language-python"># ❌ 不要这样写
if user_type == "admin": price = base * 0.5
elif user_type == "vip": price = base * 0.7
elif user_type == "normal": price = base * 1.0
elif user_type == "student": price = base * 0.6

# ✅ 表格驱动
DISCOUNT = {
    "admin": 0.5,
    "vip": 0.7,
    "normal": 1.0,
    "student": 0.6,
}
price = base * DISCOUNT[user_type]</code></pre>

                <h3>🎯 何时用</h3>
                <ul>
                    <li>多个分支只是"输入 → 输出"的映射</li>
                    <li>规则会频繁变化（改表就行，不用改代码）</li>
                    <li>规则数量多（5+ 分支）</li>
                    <li>需要从配置/数据库加载规则</li>
                </ul>

                <h3>📚 升级版</h3>
                <ul>
                    <li><b>决策表（Decision Table）</b>：多列输入 → 输出</li>
                    <li><b>规则引擎</b>：Drools、Easy Rules</li>
                    <li><b>状态机</b>：用表描述状态转移</li>
                </ul>
            `
        },

        // ============================================================
        // 21. 自然语言编程
        // ============================================================
        {
            id: 'paradigm-nlp',
            title: '20. 自然语言编程（Natural Language Programming）',
            html: `
                <p>AI 时代新兴范式：<b>用自然语言写"代码"</b>，由 LLM 转化为可执行的真实代码。</p>

                <h3>🌟 三种形态</h3>
                <ol>
                    <li><b>Prompt 工程</b>：用提示词"驱动" LLM 做事</li>
                    <li><b>SDD 规约驱动开发</b>：写结构化 Spec → AI 生成代码</li>
                    <li><b>Vibe Coding 氛围编程</b>：凭感觉跟 AI 对话写代码（Karpathy 2025）</li>
                </ol>

                <h3>💡 例子</h3>
                <pre><code class="language-markdown"># 用自然语言"编程"
做一个 Todo 应用：
- 用 React + TypeScript
- 支持添加/删除/完成
- 数据存到 localStorage
- 界面简洁

请生成代码。</code></pre>

                <p>→ AI（Cursor / Claude / Copilot）会生成完整可运行项目。</p>

                <div class="tip-box success">
                    <b>详见</b> <a href="#ai-era">🤖 AI 时代的编程</a> 章节，那里有完整的 SDD / Vibe Coding / MCP / Agent Skill 讲解。
                </div>
            `
        }
    ]
});
