/* Design Principles - foundational software design guidelines */
window.SECTIONS.push({
    id: 'principles',
    title: '📐 设计原则',
    icon: 'fa-balance-scale',
    intro: `
        <p><b>设计原则（Design Principles）</b>是软件工程中经过实践验证的通用指导思想，处于「编程范式」和「设计模式」之间的层次——它们告诉你<b>应该追求什么目标</b>，设计模式则是达成这些目标的具体手段。</p>
        <div class="mermaid">
flowchart LR
    A[编程范式<br/>OOP / FP] --> B[设计原则<br/>SOLID / DRY…]
    B --> C[设计模式<br/>GoF 23种]
    C --> D[架构模式<br/>MVC / 微服务]
        </div>
    `,
    subs: [
        {
            id: 'principles-cohesion-coupling',
            title: '高内聚 / 低耦合',
            html: `
                <p>这是所有设计原则的<b>根本目标</b>，其他原则几乎都是它的具体体现。</p>

                <h3>🔵 高内聚（High Cohesion）</h3>
                <p>一个模块/类内部的元素<b>紧密围绕同一职责</b>，彼此高度相关。</p>
                <table>
                    <tr><th>程度</th><th>描述</th><th>评价</th></tr>
                    <tr><td>功能内聚</td><td>所有元素共同完成一个功能</td><td>✅ 最佳</td></tr>
                    <tr><td>顺序内聚</td><td>输出是下一步的输入</td><td>🟡 良好</td></tr>
                    <tr><td>逻辑内聚</td><td>做同一类型的事，用 if 选择</td><td>🟠 较差</td></tr>
                    <tr><td>偶然内聚</td><td>毫无关系，只是凑在一起</td><td>❌ 最差</td></tr>
                </table>

                <h3>🔵 低耦合（Low Coupling）</h3>
                <p>模块之间的<b>依赖尽量少、尽量弱</b>，改动一处不影响其他地方。</p>
                <table>
                    <tr><th>耦合类型</th><th>描述</th><th>评价</th></tr>
                    <tr><td>无耦合</td><td>模块间完全独立</td><td>✅ 理想</td></tr>
                    <tr><td>数据耦合</td><td>通过参数传递简单数据</td><td>✅ 良好</td></tr>
                    <tr><td>控制耦合</td><td>传递控制标志影响对方行为</td><td>🟠 较差</td></tr>
                    <tr><td>内容耦合</td><td>直接访问另一模块内部数据</td><td>❌ 最差</td></tr>
                </table>

                <h3>💡 实际影响</h3>
                <div class="mermaid">
flowchart LR
    subgraph 高耦合问题
        A[改动 A] --> B[需改 B]
        B --> C[需改 C]
        C --> D[需改 D]
    end
    subgraph 低耦合优势
        E[改动 E] -.不影响.-> F[F 独立]
        E -.不影响.-> G[G 独立]
    end
                </div>
            `
        },
        {
            id: 'principles-solid',
            title: 'SOLID 原则',
            html: `
                <p>由 Robert C. Martin（Uncle Bob）总结的 5 条面向对象设计原则，是高内聚/低耦合在 OOP 中的具体落地。</p>
                <table>
                    <tr><th>字母</th><th>原则</th><th>核心思想</th><th>违反后果</th></tr>
                    <tr>
                        <td><b style="font-size:1.2em">S</b></td>
                        <td>单一职责 SRP<br/><small>Single Responsibility</small></td>
                        <td>一个类只有<b>一个</b>变化的原因</td>
                        <td>改一处，意外影响另一功能</td>
                    </tr>
                    <tr>
                        <td><b style="font-size:1.2em">O</b></td>
                        <td>开闭原则 OCP<br/><small>Open/Closed</small></td>
                        <td>对<b>扩展</b>开放，对<b>修改</b>关闭</td>
                        <td>添加新功能必须改老代码，引入 bug</td>
                    </tr>
                    <tr>
                        <td><b style="font-size:1.2em">L</b></td>
                        <td>里氏替换 LSP<br/><small>Liskov Substitution</small></td>
                        <td>子类必须能<b>替换</b>父类且行为不变</td>
                        <td>多态失效，子类破坏父类契约</td>
                    </tr>
                    <tr>
                        <td><b style="font-size:1.2em">I</b></td>
                        <td>接口隔离 ISP<br/><small>Interface Segregation</small></td>
                        <td>接口要<b>小而专</b>，不强迫实现不需要的方法</td>
                        <td>实现类被迫实现空方法，接口臃肿</td>
                    </tr>
                    <tr>
                        <td><b style="font-size:1.2em">D</b></td>
                        <td>依赖倒置 DIP<br/><small>Dependency Inversion</small></td>
                        <td>依赖<b>抽象</b>，不依赖具体实现</td>
                        <td>高层模块被低层实现绑死，难以替换</td>
                    </tr>
                </table>

                <h3>💡 SOLID 与高内聚/低耦合的关系</h3>
                <table>
                    <tr><th>SOLID</th><th>对应目标</th></tr>
                    <tr><td>S - 单一职责</td><td>↑ 高内聚</td></tr>
                    <tr><td>O - 开闭原则</td><td>↑ 扩展性 / ↓ 修改风险</td></tr>
                    <tr><td>L - 里氏替换</td><td>↑ 多态可靠性</td></tr>
                    <tr><td>I - 接口隔离</td><td>↓ 耦合（不依赖不需要的接口）</td></tr>
                    <tr><td>D - 依赖倒置</td><td>↓ 低耦合（依赖抽象层）</td></tr>
                </table>
            `
        },
        {
            id: 'principles-dry-kiss-yagni',
            title: 'DRY / KISS / YAGNI',
            html: `
                <p>三条最实用的通用原则，适用于任何编程语言和范式。</p>

                <h3>🔴 DRY — Don't Repeat Yourself</h3>
                <p>每一块知识在系统中只有<b>唯一、权威的表示</b>。重复 = 未来的不一致。</p>
                <table>
                    <tr><th>❌ 违反</th><th>✅ 遵守</th></tr>
                    <tr>
                        <td>同一逻辑在 3 个地方各写一遍</td>
                        <td>抽取成函数/常量，一处修改全生效</td>
                    </tr>
                    <tr>
                        <td>配置值硬编码在多处</td>
                        <td>定义为常量，统一引用</td>
                    </tr>
                </table>
                <p>⚠️ 注意：<b>代码相似 ≠ 重复</b>。过度 DRY 会产生不必要的抽象，两者权衡取决于「是否是同一个知识」。</p>

                <h3>🟢 KISS — Keep It Simple, Stupid</h3>
                <p>系统应该尽可能<b>简单</b>，复杂性是 bug 的温床。</p>
                <table>
                    <tr><th>❌ 违反</th><th>✅ 遵守</th></tr>
                    <tr>
                        <td>用设计模式解决一个 20 行就够的问题</td>
                        <td>直接写，等复杂度真的出现再抽象</td>
                    </tr>
                    <tr>
                        <td>一个函数做了 7 件事</td>
                        <td>拆成小函数，每个只做一件事</td>
                    </tr>
                </table>

                <h3>🟡 YAGNI — You Aren't Gonna Need It</h3>
                <p>不要<b>提前实现</b>你认为"将来可能会用到"的功能。</p>
                <table>
                    <tr><th>❌ 违反</th><th>✅ 遵守</th></tr>
                    <tr>
                        <td>"未来可能支持多租户，先把框架搭好"</td>
                        <td>只实现当前需求，未来需要再加</td>
                    </tr>
                    <tr>
                        <td>过度抽象、过度配置化</td>
                        <td>解决真实存在的问题</td>
                    </tr>
                </table>

                <h3>三者关系</h3>
                <div class="mermaid">
flowchart TD
    KISS[KISS<br/>保持简单] --> |避免| OverDesign[过度设计]
    YAGNI[YAGNI<br/>不提前实现] --> |避免| OverDesign
    DRY[DRY<br/>不重复] --> |避免| Inconsistency[不一致/维护难]
                </div>
            `
        },
        {
            id: 'principles-others',
            title: '其他常见原则',
            html: `
                <table>
                    <tr><th>原则</th><th>核心思想</th><th>典型应用</th></tr>
                    <tr>
                        <td><b>关注点分离</b><br/><small>Separation of Concerns</small></td>
                        <td>不同职责放不同地方，互不干扰</td>
                        <td>MVC 分层、CSS/HTML/JS 分离</td>
                    </tr>
                    <tr>
                        <td><b>迪米特法则</b><br/><small>Law of Demeter / 最小知识原则</small></td>
                        <td>只和「直接朋友」交互，不跨层访问</td>
                        <td><code>a.getB().getC().doX()</code> → 违反<br/>应封装成 <code>a.doX()</code></td>
                    </tr>
                    <tr>
                        <td><b>组合优于继承</b><br/><small>Favor Composition over Inheritance</small></td>
                        <td>用组合/聚合复用行为，而非继承层次</td>
                        <td>Strategy 模式、React Hooks</td>
                    </tr>
                    <tr>
                        <td><b>好莱坞原则</b><br/><small>Hollywood Principle</small></td>
                        <td>"Don't call us, we'll call you"<br/>框架调用你的代码，而非你调用框架</td>
                        <td>IoC 容器、回调、事件系统</td>
                    </tr>
                    <tr>
                        <td><b>单一抽象层次</b><br/><small>Single Level of Abstraction</small></td>
                        <td>一个函数内的代码抽象层次要一致</td>
                        <td>不要在高层业务逻辑里混入底层 SQL</td>
                    </tr>
                    <tr>
                        <td><b>最小权限原则</b><br/><small>Principle of Least Privilege</small></td>
                        <td>模块/用户只拥有完成任务所需的最小权限</td>
                        <td>数据库只读账号、private 字段</td>
                    </tr>
                </table>

                <h3>💡 所有原则的共同目标</h3>
                <div class="mermaid">
flowchart LR
    P[所有设计原则] --> G1[可维护性<br/>Maintainability]
    P --> G2[可扩展性<br/>Extensibility]
    P --> G3[可测试性<br/>Testability]
    P --> G4[可读性<br/>Readability]
    G1 & G2 & G3 & G4 --> Final[高质量软件]
                </div>
            `
        }
    ]
});
