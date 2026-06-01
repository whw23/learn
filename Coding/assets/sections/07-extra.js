/* 其他重要编程概念扩展 */
window.SECTIONS.push({
    id: 'extra',
    title: '🌟 其他核心编程概念',
    icon: 'fa-star',
    intro: `
        <p>这一章覆盖编程世界里其他<b>高频出现、必须理解</b>的概念，按主题分组。</p>
    `,
    subs: [
        {
            id: 'extra-principles',
            title: '1. 编程原则与思想',
            html: `
                <table>
                    <tr><th>原则</th><th>全称</th><th>含义</th></tr>
                    <tr><td><b>DRY</b></td><td>Don't Repeat Yourself</td><td>不要重复自己，重复就抽象</td></tr>
                    <tr><td><b>KISS</b></td><td>Keep It Simple, Stupid</td><td>保持简单</td></tr>
                    <tr><td><b>YAGNI</b></td><td>You Aren't Gonna Need It</td><td>不要做没要求的功能</td></tr>
                    <tr><td><b>SOLID</b></td><td>5 个 OOP 原则</td><td>见设计模式章节</td></tr>
                    <tr><td><b>GRASP</b></td><td>通用职责分配模式</td><td>谁该负责什么</td></tr>
                    <tr><td><b>LoD</b></td><td>Law of Demeter</td><td>最少知识原则，只跟"朋友"说话</td></tr>
                    <tr><td><b>CoC</b></td><td>Convention over Configuration</td><td>约定优于配置（Rails/Spring Boot）</td></tr>
                    <tr><td><b>SoC</b></td><td>Separation of Concerns</td><td>关注点分离</td></tr>
                    <tr><td><b>POLA</b></td><td>Principle of Least Astonishment</td><td>最小惊讶原则</td></tr>
                    <tr><td><b>Fail-Fast</b></td><td>—</td><td>错误尽早暴露</td></tr>
                </table>

                <div class="tip-box success">
                    <span class="tip-title"><i class="fa fa-quote-left"></i> Kent Beck</span>
                    "<b>Make it work, make it right, make it fast.</b>"——先能跑、再正确、最后才优化。
                </div>
            `
        },
        {
            id: 'extra-async',
            title: '2. 并发与异步',
            html: `
                <div class="mermaid">
flowchart TB
    A[并发模型] --> B[多进程 Process]
    A --> C[多线程 Thread]
    A --> D[协程 Coroutine]
    A --> E[Actor 模型]
    A --> F[CSP 通道]
    A --> G[事件循环 Event Loop]
                </div>

                <table>
                    <tr><th>概念</th><th>说明</th><th>典型</th></tr>
                    <tr><td>进程 Process</td><td>独立地址空间，开销大</td><td>Nginx worker</td></tr>
                    <tr><td>线程 Thread</td><td>共享内存，注意锁</td><td>Java、C++</td></tr>
                    <tr><td>协程 Coroutine</td><td>用户态轻量线程</td><td>Python asyncio、Go goroutine</td></tr>
                    <tr><td>Actor</td><td>消息传递，无共享</td><td>Erlang、Akka</td></tr>
                    <tr><td>CSP</td><td>通过 channel 通信</td><td>Go</td></tr>
                    <tr><td>事件循环</td><td>单线程 + 回调</td><td>Node.js、浏览器</td></tr>
                </table>

                <h3>关键术语</h3>
                <ul>
                    <li><b>同步 vs 异步</b>：是否阻塞等待结果</li>
                    <li><b>阻塞 vs 非阻塞</b>：调用是否立即返回</li>
                    <li><b>并发 vs 并行</b>：交替执行 vs 同时执行</li>
                    <li><b>竞态条件 Race Condition</b>：多线程访问共享资源导致结果不确定</li>
                    <li><b>死锁 Deadlock</b>：互相等待对方释放锁</li>
                    <li><b>原子操作 Atomic</b>：不可分割的操作</li>
                </ul>
            `
        },
        {
            id: 'extra-mem',
            title: '3. 内存与性能',
            html: `
                <p>程序运行时要不停申请和释放内存。<b>谁负责释放、释放得快不快</b>，直接决定了性能和稳定性。</p>

                <h3>🧠 栈 Stack vs 堆 Heap</h3>
                <p>这是程序运行时<b>两块不同的内存区域</b>，不要和"数据结构里的栈/堆"混淆。</p>
                <table>
                    <tr><th></th><th>栈 Stack</th><th>堆 Heap</th></tr>
                    <tr><td>存什么</td><td>函数调用、局部变量、基本类型</td><td>动态分配的对象（new / malloc）</td></tr>
                    <tr><td>分配方式</td><td>编译期确定，自动入栈/出栈</td><td>运行时申请，需要管理释放</td></tr>
                    <tr><td>速度</td><td>✅ 极快（指针移动）</td><td>❌ 慢（要找空闲块）</td></tr>
                    <tr><td>大小</td><td>小（几 MB）</td><td>大（受系统限制）</td></tr>
                    <tr><td>生命周期</td><td>函数返回即销毁</td><td>需要 GC 或手动 free</td></tr>
                </table>
                <pre><code>def foo():
    x = 10              # 栈：函数返回时自动消失
    data = [1, 2, 3]    # 列表对象在堆，引用 data 在栈
    return data         # 引用被外部接住 → 堆对象继续存活</code></pre>

                <h3>🗑️ GC（Garbage Collection，垃圾回收）</h3>
                <p><b>程序运行时自动回收"不再使用的堆内存"的机制</b>，让你不用手写 <code>free()</code>。</p>

                <h4>为什么需要？</h4>
                <p>只申请不释放 → 内存耗尽 → 崩溃（<b>内存泄漏</b>）。两种解决思路：</p>
                <table>
                    <tr><th>方式</th><th>代表语言</th><th>谁释放</th></tr>
                    <tr><td>手动管理</td><td>C / C++</td><td>程序员（容易出 bug）</td></tr>
                    <tr><td>自动 GC</td><td>Python / Java / Go / JS</td><td>运行时</td></tr>
                    <tr><td>编译期检查</td><td>Rust</td><td>所有权 + 借用检查器</td></tr>
                </table>

                <h4>GC 怎么判断"垃圾"？三种核心算法</h4>
                <div class="card-grid">
                    <div class="card">
                        <div class="card-title">① 引用计数 Reference Counting</div>
                        <div class="card-desc">每个对象记录"几个变量指向我"，归零立刻回收。<br/>
                        ❌ 缺点：循环引用回收不掉。<br/>
                        代表：Python（主）、Swift、C++ shared_ptr</div>
                    </div>
                    <div class="card">
                        <div class="card-title">② 标记-清除 Mark &amp; Sweep</div>
                        <div class="card-desc">从"根对象"出发遍历，可达 = 存活；剩下的清除。<br/>
                        ✅ 能解决循环引用。<br/>
                        代表：JVM、Go、V8</div>
                    </div>
                    <div class="card">
                        <div class="card-title">③ 分代回收 Generational GC</div>
                        <div class="card-desc">观察：大多数对象很快就死。<br/>
                        新对象放"新生代"频繁扫描；活得久的搬到"老年代"少扫描。<br/>
                        代表：JVM、.NET、Python</div>
                    </div>
                </div>

                <div class="mermaid">
flowchart LR
    Root[根对象<br/>全局变量/栈] --> A[对象A]
    A --> B[对象B]
    B --> C[对象C]
    D[对象D] <--> E[对象E]
    F[对象F] --> D

    classDef alive fill:#d4edda,stroke:#28a745
    classDef dead fill:#f8d7da,stroke:#dc3545
    class A,B,C alive
    class D,E,F dead
                </div>
                <p style="text-align:center;color:#666;font-size:13px;">
                    🟢 根可达 = 存活　　🔴 根不可达（即使互相引用）= 垃圾
                </p>

                <h4>GC 的代价（性能关键）</h4>
                <table>
                    <tr><th>代价</th><th>说明</th></tr>
                    <tr><td>CPU 开销</td><td>扫描、标记、整理都耗算力</td></tr>
                    <tr><td><b>STW</b> Stop-The-World</td><td>部分 GC 会暂停整个程序几 ms~几百 ms</td></tr>
                    <tr><td>延迟不可预测</td><td>实时系统（游戏、交易、音视频）很头疼</td></tr>
                    <tr><td>内存占用偏高</td><td>对象死了不立刻释放，要等 GC 触发</td></tr>
                </table>

                <h4>各语言 GC 策略一览</h4>
                <table>
                    <tr><th>语言</th><th>策略</th></tr>
                    <tr><td>Python</td><td>引用计数 + 分代标记清除（处理循环引用）</td></tr>
                    <tr><td>Java</td><td>分代，可选 G1 / ZGC / Shenandoah（低延迟）</td></tr>
                    <tr><td>Go</td><td>并发三色标记清除，STW 通常 &lt; 1ms</td></tr>
                    <tr><td>JavaScript (V8)</td><td>分代 + 标记清除</td></tr>
                    <tr><td>C / C++</td><td>❌ 无 GC，手动 / 智能指针</td></tr>
                    <tr><td>Rust</td><td>❌ 无 GC，所有权机制在编译期保证安全</td></tr>
                </table>

                <div class="tip-box warning">
                    <span class="tip-title"><i class="fa fa-exclamation-triangle"></i> 注意</span>
                    <b>有 GC ≠ 不会内存泄漏</b>！只要对象还被引用着（例如塞进了全局缓存、事件监听器没解绑），GC 就以为它"还活着"，永远不回收。
                </div>

                <h3>⚡ 其他性能关键概念</h3>
                <ul>
                    <li><b>内存泄漏 Memory Leak</b>：对象不再被使用，但仍被引用，GC 无法回收</li>
                    <li><b>弱引用 Weak Reference</b>：不增加引用计数，常用于缓存，打破循环引用</li>
                    <li><b>缓存局部性 Cache Locality</b>：连续访问相邻内存，CPU L1/L2/L3 缓存命中率高 → 比 RAM 快百倍</li>
                    <li><b>零拷贝 Zero-Copy</b>：数据从内核态直接发出，避免用户态-内核态来回复制（sendfile / mmap / splice）</li>
                    <li><b>大 O 复杂度</b>：算法效率上界，O(1) &lt; O(log n) &lt; O(n) &lt; O(n log n) &lt; O(n²) &lt; O(2ⁿ)</li>
                    <li><b>Profile / Benchmark</b>：先测量再优化，<b>不要靠猜</b>（py-spy、pprof、perf、JMH）</li>
                </ul>

                <div class="tip-box success">
                    <span class="tip-title"><i class="fa fa-lightbulb"></i> Donald Knuth</span>
                    "<b>Premature optimization is the root of all evil.</b>"——过早优化是万恶之源。先让程序正确，再用 profiler 找出真正的瓶颈。
                </div>
            `
        },
        {
            id: 'extra-distributed',
            title: '4. 分布式系统核心概念',
            html: `
                <div class="card-grid">
                    <div class="card"><div class="card-title">CAP 定理</div>
                        <div class="card-desc">一致性 C、可用性 A、分区容忍 P 三选二</div></div>
                    <div class="card"><div class="card-title">BASE</div>
                        <div class="card-desc">Basically Available + Soft State + Eventually Consistent</div></div>
                    <div class="card"><div class="card-title">ACID</div>
                        <div class="card-desc">原子/一致/隔离/持久（事务）</div></div>
                    <div class="card"><div class="card-title">幂等性</div>
                        <div class="card-desc">同一请求多次执行结果相同</div></div>
                </div>

                <table>
                    <tr><th>概念</th><th>说明</th></tr>
                    <tr><td>一致性 Hash</td><td>节点增减时数据迁移最少</td></tr>
                    <tr><td>分布式锁</td><td>Redis / ZooKeeper / etcd</td></tr>
                    <tr><td>分布式事务</td><td>2PC、3PC、TCC、Saga、本地消息表</td></tr>
                    <tr><td>共识算法</td><td>Paxos、Raft、ZAB</td></tr>
                    <tr><td>服务发现</td><td>Consul、Nacos、Eureka</td></tr>
                    <tr><td>限流/熔断/降级</td><td>Sentinel、Hystrix、Resilience4j</td></tr>
                    <tr><td>分库分表</td><td>水平/垂直拆分</td></tr>
                    <tr><td>读写分离</td><td>主写从读</td></tr>
                </table>
            `
        },
        {
            id: 'extra-test',
            title: '5. 测试与质量',
            html: `
                <div class="mermaid">
flowchart TB
    T[测试金字塔] --> U[单元测试 Unit<br/>多 · 快 · 便宜]
    T --> I[集成测试 Integration<br/>中]
    T --> E[端到端测试 E2E<br/>少 · 慢 · 贵]
                </div>

                <table>
                    <tr><th>概念</th><th>说明</th></tr>
                    <tr><td><b>TDD</b></td><td>测试驱动开发：先写测试，再写实现</td></tr>
                    <tr><td><b>BDD</b></td><td>行为驱动开发：用自然语言描述行为（Cucumber）</td></tr>
                    <tr><td><b>Mock / Stub / Spy / Fake</b></td><td>测试替身的四种类型</td></tr>
                    <tr><td><b>覆盖率 Coverage</b></td><td>行覆盖、分支覆盖、条件覆盖</td></tr>
                    <tr><td><b>快照测试 Snapshot</b></td><td>保存输出对比变化</td></tr>
                    <tr><td><b>契约测试 Contract</b></td><td>验证服务间接口兼容</td></tr>
                    <tr><td><b>混沌工程 Chaos</b></td><td>主动制造故障，验证系统韧性</td></tr>
                </table>
            `
        },
        {
            id: 'extra-engineering',
            title: '6. 工程化与 DevOps',
            html: `
                <ul>
                    <li><b>版本控制</b>：Git、Git Flow、GitHub Flow、Trunk-Based</li>
                    <li><b>CI/CD</b>：持续集成、持续交付、持续部署</li>
                    <li><b>语义化版本 SemVer</b>：MAJOR.MINOR.PATCH</li>
                    <li><b>Conventional Commits</b>：feat/fix/docs/chore/...</li>
                    <li><b>Code Review</b>：必备文化</li>
                    <li><b>Linter / Formatter</b>：ESLint、Prettier、Ruff、Black</li>
                    <li><b>Type Check</b>：mypy、TypeScript</li>
                    <li><b>容器化</b>：Docker、Kubernetes</li>
                    <li><b>IaC</b>：Terraform、Pulumi、Ansible</li>
                    <li><b>可观测性 3 支柱</b>：Logs / Metrics / Traces</li>
                    <li><b>Feature Flag</b>：功能开关，灰度发布</li>
                    <li><b>蓝绿部署 / 金丝雀</b>：发布策略</li>
                </ul>
            `
        },
        {
            id: 'extra-security',
            title: '7. 安全相关',
            html: `
                <table>
                    <tr><th>威胁</th><th>说明</th><th>对策</th></tr>
                    <tr><td>SQL 注入</td><td>用户输入拼到 SQL</td><td>参数化查询</td></tr>
                    <tr><td>XSS</td><td>跨站脚本</td><td>输出转义、CSP</td></tr>
                    <tr><td>CSRF</td><td>跨站请求伪造</td><td>CSRF Token、SameSite Cookie</td></tr>
                    <tr><td>SSRF</td><td>服务端请求伪造</td><td>白名单</td></tr>
                    <tr><td>RCE</td><td>远程代码执行</td><td>输入校验、沙箱</td></tr>
                </table>

                <ul>
                    <li><b>认证 Authentication</b> vs <b>授权 Authorization</b></li>
                    <li><b>JWT / OAuth2 / OIDC / SAML</b>：身份协议</li>
                    <li><b>HTTPS / TLS</b>：传输加密</li>
                    <li><b>对称 vs 非对称加密</b>：AES vs RSA/ECC</li>
                    <li><b>Hash</b>：MD5/SHA-256（不可逆），密码用 bcrypt/argon2</li>
                    <li><b>OWASP Top 10</b>：必看清单</li>
                </ul>
            `
        },
        {
            id: 'extra-network',
            title: '8. 网络与协议',
            html: `
                <ul>
                    <li><b>OSI 七层 / TCP-IP 五层</b></li>
                    <li><b>TCP vs UDP</b>：可靠 vs 快速</li>
                    <li><b>HTTP/1.1 → HTTP/2 → HTTP/3</b>：多路复用 → QUIC</li>
                    <li><b>WebSocket / SSE</b>：长连接</li>
                    <li><b>REST / GraphQL / gRPC / WebRTC</b>：API 风格</li>
                    <li><b>DNS / CDN / 反向代理</b></li>
                    <li><b>RESTful 6 约束</b>：无状态、统一接口、可缓存…</li>
                </ul>
            `
        },
        {
            id: 'extra-ds',
            title: '9. 数据结构与算法',
            html: `
                <table>
                    <tr><th>数据结构</th><th>典型用途</th></tr>
                    <tr><td>数组 / 链表</td><td>顺序存储 vs 灵活插入</td></tr>
                    <tr><td>栈 / 队列</td><td>LIFO / FIFO</td></tr>
                    <tr><td>哈希表 HashMap</td><td>O(1) 查找</td></tr>
                    <tr><td>树（二叉/B+/红黑/Trie）</td><td>数据库索引、前缀匹配</td></tr>
                    <tr><td>堆 Heap</td><td>优先队列、Top K</td></tr>
                    <tr><td>图 Graph</td><td>社交网络、最短路</td></tr>
                    <tr><td>布隆过滤器</td><td>判断"一定不存在"</td></tr>
                    <tr><td>LRU/LFU 缓存</td><td>缓存淘汰</td></tr>
                </table>
                <ul>
                    <li><b>算法范式</b>：分治、动态规划、贪心、回溯、双指针、滑动窗口</li>
                    <li><b>排序</b>：快排、归并、堆排、桶排</li>
                    <li><b>搜索</b>：BFS、DFS、二分</li>
                </ul>
            `
        },
        {
            id: 'extra-misc',
            title: '10. 其他常被问到的术语',
            html: `
                <table>
                    <tr><th>术语</th><th>解释</th></tr>
                    <tr><td><b>IoC（控制反转）</b></td><td>对象创建权交给容器，典型实现：DI 依赖注入</td></tr>
                    <tr><td><b>DI（依赖注入）</b></td><td>构造器/Setter/接口注入</td></tr>
                    <tr><td><b>AOP（面向切面）</b></td><td>横切关注点解耦</td></tr>
                    <tr><td><b>RPC</b></td><td>远程过程调用：gRPC、Dubbo、Thrift</td></tr>
                    <tr><td><b>MQ 消息队列</b></td><td>Kafka、RabbitMQ、RocketMQ、NATS</td></tr>
                    <tr><td><b>缓存</b></td><td>本地（Caffeine）、分布式（Redis）</td></tr>
                    <tr><td><b>幂等 / 重试 / 退避</b></td><td>容错三件套</td></tr>
                    <tr><td><b>Pub/Sub</b></td><td>发布订阅</td></tr>
                    <tr><td><b>异步任务 / 定时任务</b></td><td>Celery、Quartz、Airflow</td></tr>
                    <tr><td><b>状态机</b></td><td>有限状态机 FSM，工作流</td></tr>
                    <tr><td><b>领域特定语言 DSL</b></td><td>SQL、正则、Gradle</td></tr>
                    <tr><td><b>函数签名 / 类型推导</b></td><td>静态类型语言基础</td></tr>
                    <tr><td><b>泛型 / 协变 / 逆变</b></td><td>类型系统进阶</td></tr>
                    <tr><td><b>闭包 Closure</b></td><td>函数捕获外部变量</td></tr>
                    <tr><td><b>柯里化 / 偏函数</b></td><td>函数式技巧</td></tr>
                    <tr><td><b>单子 Monad</b></td><td>FP 中的链式上下文</td></tr>
                    <tr><td><b>反射 Reflection</b></td><td>运行时操作类型</td></tr>
                    <tr><td><b>注解 / 装饰器</b></td><td>元数据 / 元编程</td></tr>
                    <tr><td><b>GC / RAII / 所有权</b></td><td>内存管理三种思路（Java/C++/Rust）</td></tr>
                    <tr><td><b>不可变性 Immutable</b></td><td>线程安全、可预测</td></tr>
                    <tr><td><b>纯函数 / 副作用</b></td><td>FP 基石</td></tr>
                    <tr><td><b>BFF</b></td><td>Backend For Frontend</td></tr>
                    <tr><td><b>API 网关</b></td><td>路由、鉴权、限流统一入口</td></tr>
                    <tr><td><b>幂等键 Idempotency Key</b></td><td>支付/订单防重</td></tr>
                </table>
            `
        },
        {
            id: 'extra-summary',
            title: '11. 总结：编程思维全景图',
            html: `
                <div class="mermaid">
mindmap
  root((编程世界))
    思想
      编程范式
      设计原则
      SOLID/DRY/KISS/YAGNI
    构造
      设计模式
      架构模式
      数据结构
    分层
      Controller
      Service
      Repository
      ORM
    数据
      DTO
      VO
      PO
      Schema
    协作
      Git
      CI/CD
      Code Review
    质量
      测试
      Lint
      Type Check
    生产
      日志
      监控
      限流
      熔断
                </div>

                <div class="tip-box success">
                    <span class="tip-title"><i class="fa fa-trophy"></i> 学习路径建议</span>
                    <ol>
                        <li><b>1-3 月</b>：精通一门语言 + OOP + 基础数据结构</li>
                        <li><b>3-6 月</b>：MVC + 分层架构 + 常见设计模式 5 个 + Git</li>
                        <li><b>6-12 月</b>：SOLID + 23 种设计模式 + 数据库范式 + 测试</li>
                        <li><b>1-2 年</b>：DDD + 整洁架构 + 并发编程 + 分布式基础</li>
                        <li><b>2 年+</b>：微服务 + 性能优化 + 系统设计</li>
                    </ol>
                </div>

                <p style="text-align:center; color:#888; margin-top:30px;">
                    📚 持续学习是程序员的命运，<br/>
                    把概念变成肌肉记忆，把模式变成本能反应。
                </p>
            `
        }
    ]
});
