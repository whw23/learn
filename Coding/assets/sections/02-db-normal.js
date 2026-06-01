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
        }
    ]
});
