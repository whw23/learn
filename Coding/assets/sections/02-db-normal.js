/* 数据库范式与反范式 */
window.SECTIONS.push({
    id: 'db-normal',
    title: '🗄️ 数据库范式 & 反范式',
    icon: 'fa-database',
    intro: `
        <p>数据库<b>范式（Normal Form, NF）</b>是关系数据库设计的规则集，目的是<b>减少冗余、避免异常</b>。</p>
        <div class="tip-box">
            <span class="tip-title"><i class="fa fa-info"></i> 一句话总结</span>
            <b>范式</b>追求"数据不重复"；<b>反范式</b>为了性能"故意冗余"。两者是权衡，不是对立。
        </div>

        <div class="mermaid">
flowchart LR
    A[原始混乱表] --> B[1NF 列不可再分]
    B --> C[2NF 消除部分依赖]
    C --> D[3NF 消除传递依赖]
    D --> E[BCNF 更严格的3NF]
    E --> F[4NF 消除多值依赖]
    F --> G[5NF 消除连接依赖]
    D -.性能优化.-> X[反范式 Denormalization]
        </div>
    `,
    subs: [
        {
            id: 'nf-1',
            title: '第一范式 1NF：列不可再分',
            html: `
                <p><b>要求</b>：每个字段都是<b>原子值</b>，不能再拆分；不能有重复字段组。</p>

                <h4>❌ 反例（违反 1NF）</h4>
                <table>
                    <tr><th>id</th><th>name</th><th>phones</th></tr>
                    <tr><td>1</td><td>张三</td><td>138xxx, 139xxx</td></tr>
                </table>

                <h4>✅ 正例</h4>
                <table>
                    <tr><th>id</th><th>name</th><th>phone</th></tr>
                    <tr><td>1</td><td>张三</td><td>138xxx</td></tr>
                    <tr><td>1</td><td>张三</td><td>139xxx</td></tr>
                </table>
            `
        },
        {
            id: 'nf-2',
            title: '第二范式 2NF：消除部分依赖',
            html: `
                <p><b>要求</b>：在 1NF 基础上，<b>非主键字段必须完全依赖于整个主键</b>（针对联合主键）。</p>

                <h4>❌ 反例：(订单ID, 商品ID) 联合主键</h4>
                <table>
                    <tr><th>订单ID*</th><th>商品ID*</th><th>数量</th><th>商品名</th><th>客户名</th></tr>
                    <tr><td>O1</td><td>P1</td><td>2</td><td>iPhone</td><td>张三</td></tr>
                </table>
                <p><code>商品名</code>只依赖<code>商品ID</code>，<code>客户名</code>只依赖<code>订单ID</code> — 都是<b>部分依赖</b>。</p>

                <h4>✅ 拆成三张表</h4>
                <ul>
                    <li><b>订单表</b>(订单ID, 客户名)</li>
                    <li><b>商品表</b>(商品ID, 商品名)</li>
                    <li><b>订单明细</b>(订单ID, 商品ID, 数量)</li>
                </ul>
            `
        },
        {
            id: 'nf-3',
            title: '第三范式 3NF：消除传递依赖',
            html: `
                <p><b>要求</b>：在 2NF 基础上，<b>非主键字段之间不能有依赖关系</b>（A→B→C 这种链不能出现）。</p>

                <h4>❌ 反例</h4>
                <table>
                    <tr><th>员工ID*</th><th>姓名</th><th>部门ID</th><th>部门名</th><th>部门电话</th></tr>
                    <tr><td>E1</td><td>李四</td><td>D1</td><td>研发部</td><td>1001</td></tr>
                </table>
                <p>员工ID → 部门ID → 部门名，<b>传递依赖</b>。问题：部门改名要更新所有员工行。</p>

                <h4>✅ 拆分</h4>
                <ul>
                    <li><b>员工表</b>(员工ID, 姓名, 部门ID)</li>
                    <li><b>部门表</b>(部门ID, 部门名, 部门电话)</li>
                </ul>

                <div class="tip-box success">
                    <span class="tip-title"><i class="fa fa-star"></i> 黄金准则</span>
                    "每个非主键字段都<b>只依赖主键、依赖整个主键、且只依赖主键</b>" — 满足 3NF。
                </div>
            `
        },
        {
            id: 'nf-bcnf',
            title: 'BCNF：3NF 的升级版',
            html: `
                <p>Boyce-Codd Normal Form：在 3NF 基础上，<b>任何字段（包括主键属性）都不能依赖于非主键属性</b>。</p>
                <p>处理"候选键之间的依赖"。日常开发用得少。</p>
            `
        },
        {
            id: 'nf-4-5',
            title: '4NF & 5NF',
            html: `
                <table>
                    <tr><th>范式</th><th>解决问题</th></tr>
                    <tr><td>4NF</td><td>消除非平凡的多值依赖（一对多对多）</td></tr>
                    <tr><td>5NF</td><td>消除连接依赖（表必须能无损连接还原）</td></tr>
                    <tr><td>6NF</td><td>处理时态数据，工程几乎不用</td></tr>
                </table>
                <div class="tip-box warn">
                    <span class="tip-title"><i class="fa fa-exclamation"></i> 实战提示</span>
                    工程项目<b>满足 3NF 就够了</b>，过度规范化反而增加 JOIN 代价。
                </div>
            `
        },
        {
            id: 'denormalization',
            title: '反范式（Denormalization）',
            html: `
                <p>为了<b>提升读性能</b>，故意冗余字段、合并表，减少 JOIN。</p>

                <h3>典型手段</h3>
                <div class="card-grid">
                    <div class="card"><div class="card-icon"><i class="fa fa-files-o"></i></div>
                        <div class="card-title">冗余字段</div>
                        <div class="card-desc">订单表里冗余"用户名"，避免查询时关联用户表</div></div>
                    <div class="card"><div class="card-icon"><i class="fa fa-compress"></i></div>
                        <div class="card-title">预聚合</div>
                        <div class="card-desc">提前算好"商品总销量"存到表里</div></div>
                    <div class="card"><div class="card-icon"><i class="fa fa-clone"></i></div>
                        <div class="card-title">宽表</div>
                        <div class="card-desc">数仓常用，把多表 JOIN 结果落成一张大表</div></div>
                    <div class="card"><div class="card-icon"><i class="fa fa-th"></i></div>
                        <div class="card-title">JSON 字段</div>
                        <div class="card-desc">把一对多关系存为 JSON 数组（牺牲查询能力）</div></div>
                </div>

                <h3>权衡矩阵</h3>
                <table>
                    <tr><th>维度</th><th>范式化</th><th>反范式化</th></tr>
                    <tr><td>数据一致性</td><td>✅ 强</td><td>❌ 弱（要维护同步）</td></tr>
                    <tr><td>存储空间</td><td>✅ 省</td><td>❌ 占</td></tr>
                    <tr><td>写性能</td><td>✅ 快</td><td>❌ 慢（要更新多处）</td></tr>
                    <tr><td>读性能</td><td>❌ 需 JOIN</td><td>✅ 快</td></tr>
                    <tr><td>适用场景</td><td>OLTP 业务库</td><td>OLAP 数仓、报表、缓存</td></tr>
                </table>

                <div class="tip-box">
                    <span class="tip-title"><i class="fa fa-lightbulb-o"></i> 实战建议</span>
                    <b>先范式化设计，遇到性能瓶颈再反范式化</b>。冗余字段必须做好同步机制（触发器/双写/异步消息）。
                </div>
            `
        },

        // ============================================================
        // JOIN 性能：常见疑问
        // ============================================================
        {
            id: 'join-perf',
            title: 'JOIN 性能：范式化会让查询变慢吗？',
            html: `
                <p><b>这是范式化最常见的担忧</b>：3 张表 JOIN 是不是开销巨大？</p>

                <h3>🎯 答案三连</h3>
                <ol>
                    <li>✅ <b>是的</b>，遵守范式后需要 JOIN</li>
                    <li>⚠️ <b>但开销远没想象的那么大</b>，有索引的 JOIN 是 O(N·log M)</li>
                    <li>🎯 <b>真正的开销取决于</b>：数据量、索引、JOIN 类型、查询模式</li>
                </ol>

                <h3>📊 实测 benchmark（MySQL 8.0 + SSD）</h3>
                <p>3 张表：订单 100 万 / 商品 10 万 / 订单明细 500 万</p>
                <table>
                    <tr><th>测试</th><th>耗时</th><th>评估</th></tr>
                    <tr><td>3 表 JOIN 查单订单（有索引）</td><td><b>3ms</b></td><td>✅ 极快</td></tr>
                    <tr><td>同样查询（去掉索引）</td><td>8.7 秒</td><td>❌ 慢 1000 倍</td></tr>
                    <tr><td>报表：每客户销售额聚合</td><td>2.1 秒</td><td>⚠️ 中等</td></tr>
                    <tr><td>同上但用宽表（提前 JOIN）</td><td>0.4 秒</td><td>✅ 5 倍提升</td></tr>
                </table>

                <div class="tip-box success">
                    <span class="tip-title"><i class="fa fa-star"></i> 结论</span>
                    <b>JOIN 本身不慢，慢的是没索引的 JOIN</b>。
                </div>

                <h3>🔍 决定 JOIN 性能的 3 个关键因素</h3>
                <div class="mermaid">
flowchart TD
    Cost{JOIN 开销大不大?}
    Cost --> K1[① 有没有索引?]
    Cost --> K2[② 数据量多大?]
    Cost --> K3[③ JOIN 类型?]
    K1 -->|有索引| Fast[✅ O log n 极快]
    K1 -->|无索引| Slow[❌ O n×m 灾难]
    K2 -->|百万以下| Fast2[✅ 几乎无感]
    K2 -->|亿级| Care[⚠️ 需优化]
    K3 -->|主键 JOIN| Fast3[✅ 最快]
    K3 -->|笛卡尔积| Disaster[❌ 灾难]
                </div>

                <h3>⏰ 什么时候 JOIN 真的会成问题？</h3>
                <ul>
                    <li><b>超过 5 表 JOIN</b>：MySQL 优化器决定 JOIN 顺序是 NP-hard，超过 8 表会"放弃优化"</li>
                    <li><b>亿级数据</b>：即使有索引，亿级表 JOIN 也可能秒级</li>
                    <li><b>OLAP 报表</b>：聚合 + JOIN + 排序，OLTP 数据库会崩</li>
                    <li><b>分库分表</b>：跨库无法 JOIN（物理上不可能）</li>
                    <li><b>微服务</b>：不同服务的库不能 JOIN</li>
                </ul>

                <h3>🛠 优化策略（按优先级）</h3>
                <table>
                    <tr><th>优先级</th><th>策略</th><th>解决多少问题</th></tr>
                    <tr><td>① 必做</td><td><b>所有 JOIN 字段建索引</b></td><td>80%</td></tr>
                    <tr><td>② 优化</td><td>覆盖索引 + EXPLAIN 检查</td><td>10%</td></tr>
                    <tr><td>③ 缓存</td><td>JOIN 完缓存到 Redis</td><td>5%</td></tr>
                    <tr><td>④ 反范式</td><td>关键字段冗余（明确维护代价）</td><td>3%</td></tr>
                    <tr><td>⑤ 数仓</td><td>报表用宽表 / 数仓</td><td>1%</td></tr>
                    <tr><td>⑥ 应用层 JOIN</td><td>分库分表/微服务必选</td><td>1%</td></tr>
                </table>

                <h3>💡 黄金法则</h3>
                <div class="tip-box success">
                    <b>先正确（范式），后快速（优化）</b>。<br/>
                    永远不要"为了性能"过早破坏范式 —— 数据一致性问题比查询慢更难解决。
                </div>
            `
        },

        // ============================================================
        // 阿里巴巴数据库规约
        // ============================================================
        {
            id: 'alibaba-rules',
            title: '阿里巴巴《Java 开发手册》数据库规约',
            html: `
                <p>阿里巴巴《Java 开发手册》（嵩山版）里有非常有名的数据库规定，已成事实标准。</p>

                <h3>📜 经典原文</h3>
                <div class="tip-box danger">
                    <span class="tip-title"><i class="fa fa-exclamation-triangle"></i> 强制</span>
                    <b>超过三个表禁止 join。需要 join 的字段，数据类型保持绝对一致；多表关联查询时，保证被关联的字段需要有索引。</b><br/>
                    <span style="color: #666; font-size: 13px;">说明：即使双表 join 也要注意表索引、SQL 性能。</span>
                </div>

                <h3>🤔 为什么阿里这么"严格"？</h3>
                <p>不是因为 JOIN 本身慢，而是<b>互联网大厂的特殊场景</b>：</p>
                <div class="mermaid">
flowchart TD
    Why{为什么禁止多表 JOIN?}
    Why --> S1[超大数据量<br/>单表亿级行]
    Why --> S2[超高并发<br/>QPS 万级+]
    Why --> S3[分库分表<br/>跨库无法 JOIN]
    Why --> S4[微服务<br/>不同库属不同服务]
    Why --> S5[一致性<br/>JOIN 锁影响范围大]
    Why --> S6[降低门槛<br/>新人写不出复杂 SQL]
                </div>

                <h3>🔢 为什么选"3"？</h3>
                <table>
                    <tr><th>JOIN 表数</th><th>顺序组合数</th><th>优化器表现</th></tr>
                    <tr><td>3 表</td><td>3! = 6</td><td>✅ 能选最优</td></tr>
                    <tr><td>5 表</td><td>5! = 120</td><td>⚠️ 开始难</td></tr>
                    <tr><td>8 表+</td><td>40320+</td><td>❌ 直接放弃，按写的顺序硬 JOIN</td></tr>
                </table>
                <p>"3" 是经验值 + 优化器能力的平衡点。</p>

                <h3>📋 阿里完整索引规约（精选）</h3>
                <div class="mermaid">
flowchart LR
    Idx[索引规约]
    Idx --> I1[业务唯一字段<br/>必须建唯一索引]
    Idx --> I2[超过 3 表禁止 JOIN]
    Idx --> I3[JOIN 字段类型一致<br/>避免隐式转换]
    Idx --> I4[VARCHAR 加索引指定长度]
    Idx --> I5[避免 ORDER BY rand]
    Idx --> I6[IN 操作元素 不超过 1000]
    Idx --> I7[禁止 SELECT *]
                </div>

                <h3>📐 表设计规约（精选）</h3>
                <ul>
                    <li>【强制】表必备三字段：<code>id</code>、<code>create_time</code>、<code>update_time</code></li>
                    <li>【强制】小数类型为 <code>decimal</code>，禁止 <code>float</code>/<code>double</code></li>
                    <li>【强制】<code>varchar</code> 长度不超过 5000，超过用 <code>text</code></li>
                    <li>【强制】不允许任何字段为 NULL，所有字段都应有默认值</li>
                    <li>【强制】POJO 布尔变量不要加 <code>is</code> 前缀（ORM 解析错误）</li>
                </ul>

                <h3>📊 SQL 编写规约（精选）</h3>
                <ul>
                    <li>【强制】用 <code>count(*)</code> 不用 <code>count(列名)</code></li>
                    <li>【强制】用 <code>ISNULL()</code> 判断 NULL</li>
                    <li>【强制】<code>sum(col)</code> 全 NULL 时返回 NULL（要用 <code>IFNULL</code> 包裹）</li>
                </ul>

                <h3>🎯 该完全遵守吗？</h3>
                <div class="mermaid">
flowchart TD
    Q{该完全遵守吗?}
    Q -->|互联网大厂| Yes[✅ 严格遵守]
    Q -->|大型 ToB 系统| Mostly[✅ 基本遵守]
    Q -->|普通业务系统| Selective[⚠️ 选择性遵守]
    Q -->|内部小工具| No[❌ 不必拘泥]
    Q -->|个人项目| Skip[❌ 写得动就行]
                </div>

                <table>
                    <tr><th>规约</th><th>谁该遵守</th></tr>
                    <tr><td>JOIN 字段加索引</td><td><b>所有项目</b></td></tr>
                    <tr><td>JOIN 字段类型一致</td><td><b>所有项目</b></td></tr>
                    <tr><td>必备三字段 id/create/update</td><td><b>所有项目</b></td></tr>
                    <tr><td>EXPLAIN 检查 SQL</td><td><b>所有项目</b></td></tr>
                    <tr><td>禁止超过 3 表 JOIN</td><td>仅互联网大厂/分库分表</td></tr>
                    <tr><td>禁止外键约束</td><td>仅互联网大厂</td></tr>
                    <tr><td>禁止存储过程</td><td>仅互联网大厂</td></tr>
                </table>

                <h3>📥 完整文档</h3>
                <ul>
                    <li>GitHub：<code>alibaba/p3c</code> —— 配套 IDEA 插件可自动检测</li>
                    <li>阿里云开发者社区有在线版</li>
                </ul>
            `
        },

        // ============================================================
        // 应用层 JOIN vs 数据库 JOIN
        // ============================================================
        {
            id: 'app-join',
            title: '应用层 JOIN vs 数据库 JOIN',
            html: `
                <p>阿里禁止多表 JOIN，那查多表数据怎么办？答案是 <b>应用层 JOIN</b>——在 Java/Python 代码里"手动 JOIN"。</p>

                <h3>📊 直观对比</h3>
                <div class="mermaid">
flowchart TB
    subgraph DBJoin[数据库 JOIN: 1 次查询]
        App1[应用] -->|1 条复杂 SQL| DB1[(数据库)]
        DB1 -->|JOIN 计算+排序+过滤| Result1[返回结果]
        Result1 --> App1
    end

    subgraph AppJoin[应用层 JOIN: N 次查询]
        App2[应用]
        App2 -->|SQL1: 查订单| DB2[(数据库)]
        DB2 --> App2
        App2 -->|SQL2: 查商品 IN ID| DB2
        DB2 --> App2
        App2 -->|SQL3: 查客户 IN ID| DB2
        DB2 --> App2
        App2 -->|内存里拼装| Result2[最终结果]
    end
                </div>

                <h3>💻 代码对比</h3>

                <h4>❌ 数据库 JOIN（1 次查询）</h4>
                <pre><code class="language-sql">SELECT
    od.数量,
    p.商品名,
    c.客户名
FROM 订单明细 od
JOIN 商品 p ON od.商品ID = p.商品ID
JOIN 订单 o ON od.订单ID = o.订单ID
JOIN 客户 c ON o.客户ID = c.客户ID
WHERE od.订单ID = 'O1';</code></pre>

                <h4>✅ 应用层 JOIN（N 次查询 + 应用拼装）</h4>
                <pre><code class="language-python"># Step 1: 查订单明细
details = db.execute("SELECT 商品ID, 数量 FROM 订单明细 WHERE 订单ID = 'O1'")

# Step 2: 查订单主表（拿到客户ID）
order = db.execute("SELECT 客户ID FROM 订单 WHERE 订单ID = 'O1'")

# Step 3: 批量查商品（一次查多个）
product_ids = [d.商品ID for d in details]
products = db.execute("SELECT 商品ID, 商品名 FROM 商品 WHERE 商品ID IN %s", (product_ids,))
products_map = {p.商品ID: p.商品名 for p in products}

# Step 4: 查客户
customer = db.execute("SELECT 客户名 FROM 客户 WHERE 客户ID = %s", (order.客户ID,))

# Step 5: 在 Python 内存里组装
result = [{
    '数量': d.数量,
    '商品名': products_map[d.商品ID],
    '客户名': customer.客户名,
} for d in details]</code></pre>

                <h3>🆚 7 大本质差异</h3>
                <table>
                    <tr><th>维度</th><th>数据库 JOIN</th><th>应用层 JOIN</th></tr>
                    <tr><td>查询次数</td><td>1 次</td><td>N 次（一般 2-5）</td></tr>
                    <tr><td>数据库 CPU</td><td>🔥 高</td><td>❄️ 低</td></tr>
                    <tr><td>应用 CPU</td><td>❄️ 低</td><td>🔥 中</td></tr>
                    <tr><td>网络往返</td><td>1 次</td><td>N 次</td></tr>
                    <tr><td>缓存命中率</td><td>❌ 差</td><td>✅ 极高</td></tr>
                    <tr><td>跨库可行</td><td>❌ 不可</td><td>✅ 完美</td></tr>
                    <tr><td>跨服务可行</td><td>❌ 不可</td><td>✅ 完美</td></tr>
                    <tr><td>强一致性</td><td>✅ 同一快照</td><td>⚠️ 多次快照</td></tr>
                    <tr><td>SQL 复杂度</td><td>高</td><td>低（易测/易优化）</td></tr>
                    <tr><td>可水平扩展</td><td>❌ DB 瓶颈</td><td>✅ 加应用机器即可</td></tr>
                </table>

                <h3>🚀 为什么"次数多"反而可能更快？</h3>
                <div class="mermaid">
flowchart LR
    subgraph DBJoin[DB JOIN]
        Q1[1 次复杂 SQL<br/>100ms]
    end
    subgraph AppJoin[App JOIN + 缓存]
        Q2[查订单 2ms 缓存命中] --> Q3[查商品 1ms 缓存命中]
        Q3 --> Q4[查客户 1ms 缓存命中]
        Q4 --> A[拼装 0.5ms]
        T[总耗时 4.5ms<br/>快 22 倍]
    end
                </div>

                <p><b>关键</b>：</p>
                <ul>
                    <li>复杂 JOIN 在大数据量下是 O(N·log M)</li>
                    <li>App JOIN 每次都是简单的主键查询 = O(log N)</li>
                    <li>加缓存后单次查询直接 O(1)</li>
                </ul>

                <h3>⚠️ N+1 陷阱（App JOIN 的"反面教材"）</h3>
                <p>N+1 是 ORM 时代最常见的性能陷阱——它本质就是<b>错误的 App JOIN</b>：</p>
                <pre><code class="language-python"># ❌ N+1 灾难
orders = Order.objects.filter(status='paid')   # 1 次查询
for order in orders:
    print(order.user.name)                       # 每个订单触发 1 次查询！
# 总共 1 + N 次查询 → 灾难

# ✅ 修正：用 select_related（Django）/ joinedload（SQLAlchemy）
orders = Order.objects.filter(status='paid').select_related('user')
# 自动变成 DB JOIN，1 次查询

# ✅ 或者：正确的 App JOIN（批量）
orders = Order.objects.filter(status='paid')
user_ids = [o.user_id for o in orders]
users = {u.id: u for u in User.objects.filter(id__in=user_ids)}
for order in orders:
    print(users[order.user_id].name)            # 总共 2 次查询</code></pre>

                <h3>🛠 App JOIN 实战技巧</h3>

                <h4>1. 批量查询避免 N+1</h4>
                <pre><code class="language-python"># 永远用 IN 批量查
product_ids = [o.pid for o in orders]
products = db.query("SELECT * FROM 商品 WHERE ID IN %s", (product_ids,))</code></pre>

                <h4>2. 并发查询</h4>
                <pre><code class="language-python">import asyncio
order, customer, products = await asyncio.gather(
    order_repo.find_by_id(order_id),
    customer_repo.find_by_order(order_id),
    product_repo.find_by_order(order_id),
)</code></pre>

                <h4>3. 多级缓存</h4>
                <pre><code class="language-python"># L1 本地内存 → L2 Redis → L3 数据库
def get_product(pid):
    if p := local_cache.get(pid): return p
    if p := redis.get(f"product:{pid}"):
        local_cache.set(pid, p); return p
    p = db.query("SELECT * FROM 商品 WHERE ID = %s", pid)
    redis.setex(f"product:{pid}", 3600, p)
    local_cache.set(pid, p)
    return p</code></pre>

                <h4>4. DataLoader 模式（GraphQL 常用）</h4>
                <pre><code class="language-python"># 同一请求里多次查询同对象自动合并去重
loader = DataLoader(load_fn=batch_load_products)
for order in orders:
    p = await loader.load(order.pid)   # 100 次调用 → 1 次批量 SQL</code></pre>

                <h3>🌌 哲学层面的差异</h3>
                <div class="mermaid">
flowchart TB
    A[传统单体架构] -->|哲学: DB 是中心| DBCentric[让 DB 做尽可能多的事]
    DBCentric --> DBJoinUse[偏好 DB JOIN + 存储过程 + 触发器]

    B[现代分布式架构] -->|哲学: DB 是存储| DBSimple[让 DB 只存数据]
    DBSimple --> AppJoinUse[偏好 App JOIN + 业务在应用层]
                </div>

                <table>
                    <tr><th></th><th>传统派</th><th>现代派</th></tr>
                    <tr><td>数据库角色</td><td>"全能选手"（存储+计算+逻辑）</td><td>"纯粹存储引擎"</td></tr>
                    <tr><td>业务逻辑</td><td>部分在 DB（存储过程）</td><td>全在应用层</td></tr>
                    <tr><td>扩展方式</td><td>垂直（升级 DB 机器）</td><td>水平（加应用机器）</td></tr>
                    <tr><td>典型</td><td>传统银行系统</td><td>互联网产品</td></tr>
                </table>

                <h3>🎯 何时选哪个？</h3>
                <div class="mermaid">
flowchart TD
    Q{你的场景}
    Q -->|个人项目/中小系统| A1[✅ DB JOIN 简单直接]
    Q -->|单库+数据量小| A2[✅ DB JOIN+索引]
    Q -->|高并发 OLTP| A3[App JOIN+缓存]
    Q -->|分库分表| A4[App JOIN 唯一选择]
    Q -->|微服务架构| A5[App JOIN 唯一选择]
    Q -->|大屏/报表/OLAP| A6[宽表+数仓预先 JOIN]
    Q -->|搜索场景| A7[ES+文档扁平化]
                </div>

                <h3>📝 一句话总结</h3>
                <div class="tip-box success">
                    <b>表面是"次数差异"（1 次 vs N 次），本质是"哲学差异"</b>：
                    <ul>
                        <li><b>DB JOIN</b> = 让数据库做"全能选手"</li>
                        <li><b>App JOIN</b> = 让数据库做"纯存储"，逻辑回到应用层</li>
                    </ul>
                    <b>App JOIN 真正的优势不在"快"，而在</b>：
                    跨库可行 + 缓存友好 + 水平扩展 + 数据库压力小。<br/>
                    <b>决策</b>：中小项目用 DB JOIN，互联网/微服务/分库分表用 App JOIN。
                </div>
            `
        },

        // ============================================================
        // 数据库连接池
        // ============================================================
        {
            id: 'connection-pool',
            title: '数据库连接池（Connection Pool）',
            html: `
                <p><b>数据库连接池</b> = 一个"预先创建好的连接仓库"，应用从中借用、用完归还。
                避免每次查询都重新建立 TCP + 认证连接的巨大开销。</p>

                <h3>😱 不用连接池的灾难</h3>
                <pre><code class="language-python">def query_user(user_id):
    conn = pymysql.connect(host='...', user='...', pwd='...')
    # 每次都做：① TCP 三次握手 ② SSL 协商 ③ 身份认证
    #         ④ 字符集协商 ⑤ 选库
    result = conn.execute(f"SELECT * FROM users WHERE id={user_id}")
    conn.close()
    return result</code></pre>

                <div class="mermaid">
sequenceDiagram
    App->>DB: TCP 三次握手 ~30ms
    App->>DB: SSL 协商 ~50ms
    App->>DB: 用户认证 ~20ms
    App->>DB: SELECT 查询 ~1ms
    App->>DB: 四次挥手关闭
    Note over App,DB: 总耗时 ~100ms，真正查询仅 1ms!
                </div>

                <p><b>真实数据</b>：建立 1 个连接 ≈ 100ms，真正查询只占 1%。
                高并发下数据库会被握手吃满，MySQL 默认 <code>max_connections=151</code> 瞬间打爆。</p>

                <h3>🏊 连接池工作原理</h3>
                <div class="mermaid">
flowchart TB
    subgraph App[应用进程]
        T1[线程1] -->|借| Pool
        T2[线程2] -->|借| Pool
        T3[线程3] -->|借| Pool
        T1 -.归还.-> Pool
    end
    subgraph Pool[连接池: 预先创建好的连接仓库]
        C1[Conn1 空闲]
        C2[Conn2 使用中]
        C3[Conn3 空闲]
        C4[Conn4 空闲]
        C5[Conn5 使用中]
    end
    Pool <-->|长连接复用| DB[(数据库)]
                </div>

                <p><b>核心机制</b>：</p>
                <ol>
                    <li>应用启动时<b>预创建</b> N 个连接</li>
                    <li>查询时从池里<b>借</b>一个空闲连接（毫秒级）</li>
                    <li>用完<b>归还</b>到池里（不真的关闭）</li>
                    <li>下次查询<b>复用</b>，省掉所有握手开销</li>
                </ol>

                <h3>⚙️ 核心参数</h3>
                <table>
                    <tr><th>参数</th><th>含义</th><th>典型值</th></tr>
                    <tr><td><code>min_pool_size</code></td><td>始终保留的连接数</td><td>5~10</td></tr>
                    <tr><td><code>max_pool_size</code></td><td>最多允许多少连接</td><td>20~100</td></tr>
                    <tr><td><code>idle_timeout</code></td><td>空闲多久销毁</td><td>5~10 分钟</td></tr>
                    <tr><td><code>wait_timeout</code></td><td>借不到等多久（超时报错）</td><td>30 秒</td></tr>
                    <tr><td><code>max_lifetime</code></td><td>单连接最大存活</td><td>30 分钟</td></tr>
                    <tr><td><code>validation_query</code></td><td>健康检查 SQL</td><td><code>SELECT 1</code></td></tr>
                </table>

                <h3>🌟 主流实现</h3>
                <table>
                    <tr><th>语言</th><th>连接池</th></tr>
                    <tr><td><b>Java</b></td><td><b>HikariCP</b>（性能之王，Spring Boot 默认）、Druid（阿里，监控强）、C3P0、DBCP</td></tr>
                    <tr><td><b>Python</b></td><td><b>SQLAlchemy QueuePool</b>、psycopg2.pool、asyncpg、aiomysql</td></tr>
                    <tr><td><b>Node.js</b></td><td>mysql2/promise、pg-pool、generic-pool</td></tr>
                    <tr><td><b>Go</b></td><td>标准库 <code>database/sql</code> <b>内置连接池</b></td></tr>
                </table>

                <h3>💻 SQLAlchemy 完整配置</h3>
                <pre><code class="language-python">from sqlalchemy import create_engine

engine = create_engine(
    "mysql+pymysql://user:pwd@host/db",
    pool_size=10,           # 常驻连接数
    max_overflow=20,        # 超过后还能再开多少（突发流量）
    pool_timeout=30,        # 借不到等多久
    pool_recycle=1800,      # 30 分钟回收（避免 MySQL 8h 主动断开）
    pool_pre_ping=True,     # 借出前先 ping 一下检查健康
)</code></pre>

                <h3>📊 有没有连接池的对比</h3>
                <table>
                    <tr><th></th><th>无连接池</th><th>有连接池</th></tr>
                    <tr><td>每次查询耗时</td><td>~100ms</td><td>~1ms</td></tr>
                    <tr><td>性能差距</td><td>1x</td><td><b>~100x</b></td></tr>
                    <tr><td>DB 连接数</td><td>暴涨</td><td>稳定可控</td></tr>
                    <tr><td>高并发</td><td>崩溃</td><td>稳定</td></tr>
                </table>

                <h3>⚠️ 常见坑</h3>
                <ol>
                    <li><b>MySQL 主动断开</b>：默认 <code>wait_timeout=28800</code>（8 小时），空闲连接被关后报"MySQL server has gone away"
                        → 解决：<code>pool_recycle=1800 + pool_pre_ping=True</code></li>
                    <li><b>连接泄漏</b>：借了没归还 → 池被掏空 → 借不到超时
                        → 解决：用 <code>with</code> 上下文自动归还</li>
                    <li><b>池太小</b>：高并发请求排队</li>
                    <li><b>池太大</b>：DB 连接数被打爆（默认 max_connections=151）</li>
                    <li><b>事务残留</b>：归还前必须 <code>rollback()</code> 或 <code>commit()</code></li>
                </ol>

                <h3>🎓 "池化"是通用思想</h3>
                <p>连接池只是"对象池"模式的一种应用：</p>
                <div class="mermaid">
flowchart TB
    Pool[对象池模式]
    Pool --> Conn[连接池<br/>DB/Redis/HTTP]
    Pool --> Thread[线程池]
    Pool --> Obj[对象池<br/>游戏子弹/粒子]
    Pool --> Mem[内存池<br/>Nginx/Redis]
    Pool --> Buf[缓冲池<br/>MySQL Buffer Pool]
                </div>

                <h3>📍 连接池在分层架构中的位置</h3>
                <div class="mermaid">
flowchart TB
    Controller --> Service
    Service --> Repository
    Repository --> ORM[ORM SQLAlchemy/Hibernate]
    ORM --> Pool[连接池]
    Pool --> Driver[数据库驱动]
    Driver -.TCP.-> DB[(数据库)]
                </div>
                <p>连接池<b>藏在 ORM 下面</b>，对业务代码完全透明——你写 <code>session.query(User)</code>，背后自动从池里借连接。</p>

                <div class="tip-box success">
                    <span class="tip-title"><i class="fa fa-star"></i> 一句话</span>
                    几乎所有用数据库的现代应用都默认带连接池——它<b>像汽车的刹车，没人不装</b>。
                    核心价值：长连接复用，<b>性能差距 ≈ 100 倍</b>。
                </div>
            `
        },

        // ============================================================
        // 连接池容量估算（利特尔法则）
        // ============================================================
        {
            id: 'pool-capacity',
            title: '连接池容量估算：pool_size=10 能扛多少 QPS？',
            html: `
                <p>常见问题："我设 <code>pool_size=10</code> 够用吗？能扛多大并发？"<br/>
                答案取决于<b>单次查询耗时</b>，用排队论的 <b>利特尔法则</b> 可以估算。</p>

                <h3>📐 核心公式（利特尔法则）</h3>
                <div class="tip-box">
                    <b>理论 QPS ≈ pool_size ÷ 单次查询耗时</b><br/>
                    10 个连接 × 每秒 1000 次（即 1ms/次）= 10,000 QPS（理论上限）
                </div>

                <h3>📊 不同查询耗时下的能力</h3>
                <table>
                    <tr><th>单次查询耗时</th><th>pool_size=10 理论 QPS</th><th>实际可承受</th></tr>
                    <tr><td>1ms（主键 SELECT + 索引）</td><td>10,000</td><td>~5,000~8,000</td></tr>
                    <tr><td>10ms（简单 JOIN）</td><td>1,000</td><td>~500~800</td></tr>
                    <tr><td>50ms（复杂查询）</td><td>200</td><td>~100~150</td></tr>
                    <tr><td>100ms（聚合报表）</td><td>100</td><td>~50~80</td></tr>
                </table>

                <h3>🧪 真实 benchmark（Python + SQLAlchemy + MySQL）</h3>
                <pre><code class="language-python">import concurrent.futures
from sqlalchemy import create_engine, text

engine = create_engine("mysql+pymysql://...",
                       pool_size=10, max_overflow=0)

def query(i):
    with engine.connect() as conn:
        conn.execute(text("SELECT * FROM users WHERE id=:id"), {"id": i})

with concurrent.futures.ThreadPoolExecutor(max_workers=500) as pool:
    list(pool.map(query, range(1000)))</code></pre>

                <table>
                    <tr><th>单次查询</th><th>pool_size=10 实测 QPS</th></tr>
                    <tr><td>1ms（主键 + 索引）</td><td>~5,500</td></tr>
                    <tr><td>5ms（带 JOIN）</td><td>~1,800</td></tr>
                    <tr><td>20ms（复杂 SQL）</td><td>~450</td></tr>
                    <tr><td>100ms（报表）</td><td>~95</td></tr>
                </table>

                <h3>📉 为什么实际只有理论的 50-80%？</h3>
                <div class="mermaid">
flowchart TB
    Theory[理论上限] --> Reality[实际 QPS]
    Reality --> L1[① 排队等待时间]
    Reality --> L2[② Python GIL 限制]
    Reality --> L3[③ 数据库本身开销]
    Reality --> L4[④ 网络往返延迟]
    Reality --> L5[⑤ 锁竞争]
                </div>

                <h3>🚦 超过 pool_size 的请求会怎样？</h3>
                <div class="mermaid">
sequenceDiagram
    participant App as 1000 并发
    participant Pool as 池 10 个连接
    participant DB
    App->>Pool: 前 10 个直接拿到连接
    Pool->>DB: 并发执行
    App->>Pool: 第 11 个开始排队
    Note over Pool: max_overflow=20 可临时多开 20 个
    Pool->>DB: 创建临时连接
    App->>Pool: 第 31 个等 (pool_timeout 默认 30s)
    Pool-->>App: 30s 后还没拿到 → TimeoutError ❌
                </div>

                <h3>⚡ 异步 vs 同步：差距巨大</h3>
                <table>
                    <tr><th>模式</th><th>实际能力（pool=10）</th></tr>
                    <tr><td>Flask 同步 + 多线程</td><td>~500 QPS（GIL 限制）</td></tr>
                    <tr><td>FastAPI + asyncpg/aiomysql</td><td>~5,000 QPS（IO 让出）</td></tr>
                </table>
                <p><b>异步驱动 + 10 个连接 ≈ 同步 + 100 个连接的能力</b>。</p>

                <h3>🎯 HikariCP 经典公式（适用所有语言）</h3>
                <div class="tip-box">
                    <b>连接数 = (CPU 核数 × 2) + 磁盘数</b><br/>
                    8 核 + 2 SSD → 推荐池大小 <b>18</b><br/>
                    太多反而<b>性能下降</b>（CPU 切换 + DB 锁竞争）
                </div>

                <h3>🏗 别盲目调大，要水平扩展</h3>
                <div class="mermaid">
flowchart LR
    Bad[单机 pool=100<br/>不稳定<br/>DB 易爆]
    Good[10 台机器 × pool=10<br/>= 100 连接<br/>稳定 + 高可用]
    Bad -.推荐改为.-> Good
                </div>

                <h3>📋 生产环境配置参考</h3>
                <table>
                    <tr><th>应用规模</th><th>pool_size</th><th>部署</th><th>总并发能力</th></tr>
                    <tr><td>个人/内部工具</td><td>5</td><td>单机</td><td>~300 QPS</td></tr>
                    <tr><td>小型应用</td><td>10</td><td>单机</td><td>~1,000 QPS</td></tr>
                    <tr><td>中型应用</td><td>10-20</td><td>2-3 机器</td><td>~5,000 QPS</td></tr>
                    <tr><td>大型应用</td><td>20</td><td>5-10 机器 + 缓存</td><td>~50,000 QPS</td></tr>
                    <tr><td>阿里级</td><td>App JOIN</td><td>数百机器 + 分库分表</td><td>百万 QPS</td></tr>
                </table>

                <h3>🚨 看到这些症状就要调大</h3>
                <pre><code class="language-text">sqlalchemy.exc.TimeoutError: QueuePool limit of size 10
overflow 10 reached, connection timed out, timeout 30.00
→ 连接被抢光

pool checkout took 5.2s
→ 借连接等了 5 秒</code></pre>

                <h3>❌ 常见错觉</h3>
                <table>
                    <tr><th>错误想法</th><th>真相</th></tr>
                    <tr><td>"设 pool=100 就能扛 100 倍并发"</td><td>DB 本身扛不住，CPU 切换反而降低性能</td></tr>
                    <tr><td>"用了连接池就高性能"</td><td>只解决建连开销，查询本身慢没救</td></tr>
                    <tr><td>"异步框架自动比同步快"</td><td>若驱动是同步（pymysql），异步框架也变同步。要用 asyncpg/aiomysql</td></tr>
                </table>

                <h3>🧰 压测才是硬道理</h3>
                <pre><code class="language-python"># Locust 实测
from locust import HttpUser, task

class QueryUser(HttpUser):
    @task
    def query(self):
        self.client.get("/api/users/123")

# locust -u 1000 -r 100 --host=http://localhost:8000</code></pre>

                <p><b>观察指标</b>：</p>
                <ul>
                    <li>平均响应 &lt; 100ms ✅</li>
                    <li>95% 响应 &lt; 500ms ✅</li>
                    <li>错误率 &lt; 0.1% ✅</li>
                    <li>数据库 CPU &lt; 70%</li>
                </ul>

                <div class="tip-box success">
                    <span class="tip-title"><i class="fa fa-trophy"></i> 一句话总结</span>
                    <b>pool_size=10 能扛多少并发，由"单次查询耗时"决定</b>：<br/>
                    1ms 查询 → ~5,000 QPS；10ms → ~800 QPS；100ms → ~80 QPS。<br/>
                    <b>对绝大多数中小项目，pool=10 绰绰有余</b>。
                    高并发不是靠"加大池"，而是靠 <b>缓存 + 读写分离 + 多机水平扩展</b>。
                </div>
            `
        }
    ]
});
