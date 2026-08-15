/* AI Agent 体系核心术语与 AI 通用概念速查 */
window.SECTIONS = window.SECTIONS || [];
window.SECTIONS.push({
    id: 'ai-agent-terminology',
    title: '🤖 AI Agent 术语',
    icon: 'fa-android',
    intro: `
        <p><b>AI Agent 体系</b>正在快速成为新一代软件架构的默认组织方式。本章从底层模型到多 Agent 协作，梳理核心术语与当前主流概念。</p>

        <h2>🌌 Agent 生态体系全景</h2>
        <div class="mermaid">
flowchart TB
    M[Model 底层模型<br/>只输入输出文本]
    M --> A[Agent 智能体<br/>Model + Harness]
    A --> T[Tool 工具<br/>单个可调用动作]
    A --> S[Skill 技能<br/>文档即插件]
    A --> H[Harness 执行层<br/>调用模型 + 控制 Loop]
    H --> L[Agent Loop<br/>感知→推理→行动→观察]
    A --> M2[Memory 记忆]
    A --> Mcp[MCP 协议<br/>agent ↔ 工具]
    A --> A2a[A2A 协议<br/>agent ↔ agent]
    A --> O[Orchestrator 编排器]
    O --> Sub[Subagent 子 Agent]

    style M fill:#e8f5e9
    style A fill:#e8f5e9
        </div>

        <div class="tip-box success">
            <span class="tip-title"><i class="fa fa-lightbulb-o"></i> 学习路径</span>
            ① 基础层 → ② 执行层 → ③ 控制层 → ④ 多 Agent 层 → ⑤ 协议层 → ⑥ AI 通用概念速查
        </div>
    `,
    subs: [
        {
            id: 'agent-terms-foundation',
            title: '1. 基础层：Model / Agent / Tool / Skill',
            html: `
                <p><b>基础层</b>是 Agent 系统最底层的组成单元。它回答"谁在做"和"能用什么"的问题。</p>

                <table>
                    <tr><th>术语</th><th>含义</th><th>典型场景 / 工具</th></tr>
                    <tr><td><b>Model</b></td><td>底层语言模型，只负责输入文本、输出文本，没有执行能力</td><td>GPT-5、Claude 4.5、Gemini 2.5、DeepSeek-V3</td></tr>
                    <tr><td><b>Agent</b></td><td>Model + Harness 的完整系统，能感知环境、调用工具、完成目标</td><td>Claude Code、OpenAI Codex、LangGraph Agent</td></tr>
                    <tr><td><b>Tool</b></td><td>单个可调用动作：name + description + JSON Schema + execute 函数</td><td>file_search、run_tests、get_weather</td></tr>
                    <tr><td><b>Skill</b></td><td>领域专业知识包（Markdown 文档），教 Agent "怎么做"</td><td>Claude Code Skill、.agents/skills/SKILL.md</td></tr>
                </table>

                <h3>🛠 Tool 的 JSON Schema 示例</h3>
                <pre><code class="language-json">{
  "type": "function",
  "function": {
    "name": "get_weather",
    "description": "查询指定城市天气",
    "parameters": {
      "type": "object",
      "properties": {
        "city": {"type": "string", "description": "城市名"}
      },
      "required": ["city"]
    }
  }
}</code></pre>

                <h3>📝 Skill 文件结构</h3>
                <pre><code class="language-markdown">---
name: testing-skill
description: Use when writing tests...
---

# Testing Best Practices

## Step 1: Understand the codebase
...</code></pre>

                <h3>🔧 Tool vs Skill</h3>
                <table>
                    <tr><th>维度</th><th>Tool</th><th>Skill</th></tr>
                    <tr><td>形式</td><td>代码函数</td><td>Markdown 文档</td></tr>
                    <tr><td>执行者</td><td>CPU / 程序</td><td>LLM 阅读后推理</td></tr>
                    <tr><td>粒度</td><td>单个动作</td><td>完整工作流/方法论</td></tr>
                    <tr><td>确定性</td><td>高</td><td>智能化决策</td></tr>
                </table>
            `
        },
        {
            id: 'agent-terms-execution',
            title: '2. 执行层：Harness / Scaffolding / Agent Loop / Runner',
            html: `
                <p><b>执行层</b>负责让 Agent 真正跑起来。2025 末–2026 年，"Harness" 成为描述这一层最流行的词。</p>

                <table>
                    <tr><th>术语</th><th>含义</th><th>典型场景 / 工具</th></tr>
                    <tr><td><b>Harness</b></td><td>包裹 LLM 的执行层：管理工具调度、上下文、权限、生命周期、沙箱、记忆</td><td>Anthropic Claude SDK、OpenAI Agents SDK、LangGraph</td></tr>
                    <tr><td><b>Scaffolding</b></td><td>行为定义层：system prompt、tool 描述、上下文规则、约束文件</td><td>CLAUDE.md、AGENTS.md、.cursorrules</td></tr>
                    <tr><td><b>Agent Loop</b></td><td>感知 → 推理 → 行动 → 观察 → 重复</td><td>ReAct loop、Claude Code turn 循环</td></tr>
                    <tr><td><b>Runner</b></td><td>管理 Agent Loop 的运行时组件</td><td>pi-agent session runtime、OpenAI Runner</td></tr>
                </table>

                <h3>🔄 Agent Loop 五步法</h3>
                <div class="mermaid">
flowchart LR
    P[感知 Perceive] --> R[推理 Reason]
    R --> A[行动 Act]
    A --> O[观察 Observe]
    O --> P
                </div>

                <h3>⚙️ Harness 单周期伪代码</h3>
                <pre><code class="language-python">while not done:
    # 1. 组装 prompt
    prompt = build_prompt(system, tools, memory, history, user_msg)
    # 2. 调用 LLM
    output = llm.generate(prompt, tools=tools)
    # 3. 分类输出
    if not output.tool_calls:
        return output.text
    # 4. 执行工具
    results = execute_tools(output.tool_calls, sandbox)
    # 5. 更新上下文
    history.append(output)
    history.extend(results)
</code></pre>

                <div class="tip-box success">
                    <span class="tip-title"><i class="fa fa-lightbulb-o"></i> 关键洞察</span>
                    "The harness is the product." 两个团队用同一个模型， harness 不同，交付的 Agent 效果可能天差地别。
                </div>
            `
        },
        {
            id: 'agent-terms-control',
            title: '3. 控制层：Guardrail / Hook / Human-in-the-Loop / Verification Loop',
            html: `
                <p><b>控制层</b>保证 Agent 按规矩运行、不越界、不假装完成。</p>

                <table>
                    <tr><th>术语</th><th>含义</th><th>典型场景 / 工具</th></tr>
                    <tr><td><b>Guardrail</b></td><td>输入/输出/工具调用的校验与安全层</td><td>输入敏感词过滤、输出合规检查、工具参数校验</td></tr>
                    <tr><td><b>Hook</b></td><td>Agent 生命周期中的拦截点</td><td>SessionStart / PreToolUse / PostToolUse / Stop</td></tr>
                    <tr><td><b>Human-in-the-Loop</b></td><td>暂停执行等待人工审批</td><td>危险命令确认、生成内容审查</td></tr>
                    <tr><td><b>Verification Loop</b></td><td>Agent 产出 → 评估 → 通过/重试</td><td>自动跑测试、结果一致性检查</td></tr>
                </table>

                <h3>🪝 Hook 类型与时机</h3>
                <table>
                    <tr><th>Hook</th><th>触发时机</th><th>典型用途</th></tr>
                    <tr><td>SessionStart</td><td>会话开始 / clear / compact</td><td>强制注入项目规则</td></tr>
                    <tr><td>PreToolUse</td><td>AI 调用工具前</td><td>拦截危险命令、保护敏感文件</td></tr>
                    <tr><td>PostToolUse</td><td>AI 调用工具后</td><td>自动格式化、自动 lint</td></tr>
                    <tr><td>Stop</td><td>AI 准备结束回复</td><td>强制跑测试，没过不许说完成</td></tr>
                    <tr><td>UserPromptSubmit</td><td>用户提交消息</td><td>注入额外上下文</td></tr>
                </table>

                <h3>🔄 Verification Loop 流程</h3>
                <div class="mermaid">
flowchart LR
    O[Agent 产出] --> V[Harness 评估]
    V -->|通过| D[交付]
    V -->|失败| R[重试/升级模型]
    R --> O
                </div>

                <div class="tip-box warning">
                    <span class="tip-title"><i class="fa fa-exclamation-triangle"></i> 反偷懒关键</span>
                    真正防止 "AI 装看不见" 的只有两种机制：<b>代码硬校验</b>（测试/CI/OpenSpec validate）和 <b>OS 层 Hook 拦截</b>（Stop hook 阻断完成）。
                </div>
            `
        },
        {
            id: 'agent-terms-multi-agent',
            title: '4. 多 Agent 层：Orchestrator / Subagent / Handoff / Routing',
            html: `
                <p>复杂任务通常无法由单个 Agent 完成。<b>多 Agent 层</b>负责拆解、分派、协作和交接。</p>

                <table>
                    <tr><th>术语</th><th>含义</th><th>典型场景 / 工具</th></tr>
                    <tr><td><b>Orchestrator</b></td><td>中心 agent 拆解任务、分派给 worker</td><td>LangGraph supervisor、CrewAI 编排器</td></tr>
                    <tr><td><b>Subagent</b></td><td>接收委托任务的子 agent</td><td>Claude Code subMessages、OpenAI agents-as-tools</td></tr>
                    <tr><td><b>Handoff</b></td><td>agent 间转移控制权 + 上下文</td><td>OpenAI handoffs、阶段切换注入新 skill</td></tr>
                    <tr><td><b>Routing</b></td><td>根据输入分类分发到专门处理者</td><td>doc-type 选择、intent 分类器</td></tr>
                </table>

                <h3>🌐 多 Agent 协作模式</h3>
                <div class="mermaid">
flowchart TB
    U[用户请求] --> O[Orchestrator 编排器]
    O --> R[Routing 路由]
    R --> S1[Subagent A]
    R --> S2[Subagent B]
    R --> S3[Subagent C]
    S1 --> H[Handoff 交接]
    H --> S2
    S2 --> R2[结果汇总]
    S3 --> R2
    R2 --> O
    O --> RES[最终回复]
                </div>

                <h3>🔀 Claude Code 的 Subagent 执行模型</h3>
                <ul>
                    <li><b>Fork</b>：字节级复制父上下文</li>
                    <li><b>Teammate</b>：独立终端面板，通过文件邮箱通信</li>
                    <li><b>Worktree</b>：独立 git worktree，隔离分支</li>
                </ul>
            `
        },
        {
            id: 'agent-terms-protocol',
            title: '5. 协议层：MCP / A2A / Function Call',
            html: `
                <p><b>协议层</b>解决 Agent 如何与外部世界、与其他 Agent 通信的问题。</p>

                <table>
                    <tr><th>术语</th><th>含义</th><th>典型场景 / 工具</th></tr>
                    <tr><td><b>MCP</b></td><td>Model Context Protocol，agent ↔ 工具/数据的开放协议</td><td>Claude Desktop、VS Code、Cursor</td></tr>
                    <tr><td><b>A2A</b></td><td>Agent-to-Agent Protocol，agent ↔ agent 跨服务协作协议</td><td>Google Agents SDK、企业级多 Agent 系统</td></tr>
                    <tr><td><b>Function Call</b></td><td>事实标准的工具调用协议（JSON Schema）</td><td>OpenAI、Anthropic、Gemini 通用</td></tr>
                </table>

                <h3>🆚 Function Call vs MCP</h3>
                <table>
                    <tr><th>维度</th><th>Function Call</th><th>MCP</th></tr>
                    <tr><td>作用域</td><td>单进程</td><td>跨进程/跨网络</td></tr>
                    <tr><td>传输</td><td>内存调用</td><td>JSON-RPC over stdio/SSE/WS</td></tr>
                    <tr><td>标准化</td><td>各家接口略有差异</td><td>统一标准</td></tr>
                    <tr><td>发现</td><td>硬编码</td><td>动态 tools/list</td></tr>
                    <tr><td>生态</td><td>自己写自己用</td><td>可分享、可复用</td></tr>
                    <tr><td>能力</td><td>仅函数</td><td>Tools + Resources + Prompts + Sampling</td></tr>
                </table>

                <h3>🏗 MCP 架构</h3>
                <div class="mermaid">
flowchart LR
    subgraph Host[Host: Claude/VS Code/Cursor]
        LLM[LLM]
        C[MCP Client]
    end
    LLM <--> C
    C <-->|JSON-RPC| S1[Filesystem Server]
    C <-->|JSON-RPC| S2[GitHub Server]
    C <-->|JSON-RPC| S3[Database Server]
                </div>

                <h3>💻 最小 MCP Server（Python）</h3>
                <pre><code class="language-python">from mcp.server import Server
from mcp.types import TextContent

server = Server("my-tools")

@server.tool()
async def get_time() -> str:
    """获取当前时间"""
    from datetime import datetime
    return datetime.now().isoformat()

server.run(transport="stdio")</code></pre>

                <div class="tip-box success">
                    <span class="tip-title"><i class="fa fa-star"></i> 一句话定位</span>
                    <b>MCP = LLM 时代的 USB-C</b>；<b>A2A = Agent 之间的 HTTP</b>；<b>Function Call = 工具调用的通用语法</b>。
                </div>
            `
        },
        {
            id: 'agent-terms-common',
            title: '6. AI 通用概念速查',
            html: `
                <p>除了 Agent 体系专属术语，AI 时代还有一批高频通用概念值得掌握。</p>

                <h3>🧠 LLM 基础</h3>
                <table>
                    <tr><th>术语</th><th>含义</th><th>典型工具/场景</th></tr>
                    <tr><td><b>LLM</b></td><td>Large Language Model，大语言模型</td><td>GPT-5、Claude 4.5、Gemini 2.5</td></tr>
                    <tr><td><b>Token</b></td><td>LLM 处理的最小单元，约 1 个英文词或 0.5 个汉字</td><td>tiktoken、OpenAI tokenizer</td></tr>
                    <tr><td><b>Context Window</b></td><td>上下文窗口，LLM 一次能读的 token 数</td><td>Claude 200k+、Gemini 1M+</td></tr>
                    <tr><td><b>System Prompt</b></td><td>系统级指令，定义 LLM 角色与规则</td><td>CLAUDE.md、AGENTS.md</td></tr>
                    <tr><td><b>Prompt Engineering</b></td><td>提示工程：精心设计指令</td><td>few-shot、CoT、ReAct</td></tr>
                </table>

                <h3>🧩 推理与增强</h3>
                <table>
                    <tr><th>术语</th><th>含义</th><th>典型工具/场景</th></tr>
                    <tr><td><b>CoT</b></td><td>Chain-of-Thought，链式思考</td><td>"Let's think step by step"</td></tr>
                    <tr><td><b>ReAct</b></td><td>Reasoning + Acting，推理-行动循环</td><td>LangChain ReAct agent</td></tr>
                    <tr><td><b>RAG</b></td><td>Retrieval-Augmented Generation，检索增强生成</td><td>LlamaIndex、Qdrant、Pinecone</td></tr>
                    <tr><td><b>Embedding</b></td><td>把文本转成向量，用于语义搜索</td><td>OpenAI text-embedding-3</td></tr>
                    <tr><td><b>Vector DB</b></td><td>向量数据库</td><td>Qdrant、Weaviate、Milvus、Pinecone</td></tr>
                    <tr><td><b>Reasoning</b></td><td>推理模型/模式，让 LLM 慢思考</td><td>OpenAI o3、DeepSeek-R1</td></tr>
                </table>

                <h3>🔧 训练与对齐</h3>
                <table>
                    <tr><th>术语</th><th>含义</th><th>典型工具/场景</th></tr>
                    <tr><td><b>Fine-tuning</b></td><td>微调，用专门数据再训练模型</td><td>OpenAI fine-tune、Unsloth</td></tr>
                    <tr><td><b>LoRA</b></td><td>Low-Rank Adaptation，轻量微调</td><td>PEFT、Hugging Face</td></tr>
                    <tr><td><b>RLHF</b></td><td>Reinforcement Learning from Human Feedback</td><td>ChatGPT 早期对齐训练</td></tr>
                    <tr><td><b>DPO</b></td><td>Direct Preference Optimization，直接偏好优化</td><td>开源模型对齐</td></tr>
                    <tr><td><b>Quantization</b></td><td>量化，减小模型大小（4bit/8bit）</td><td>llama.cpp、GPTQ、AWQ</td></tr>
                </table>

                <h3>📊 评估与观察</h3>
                <table>
                    <tr><th>术语</th><th>含义</th><th>典型工具/场景</th></tr>
                    <tr><td><b>Evals</b></td><td>对模型/Agent 能力的系统评估</td><td>OpenAI Evals、Evalite、HAL benchmark</td></tr>
                    <tr><td><b>Observability</b></td><td>可观察性：监控 LLM 应用运行状态</td><td>LangSmith、Phoenix、Helicone</td></tr>
                    <tr><td><b>Tracing</b></td><td>追踪单次请求的全链路</td><td>OpenTelemetry、LangSmith traces</td></tr>
                    <tr><td><b>Hallucination</b></td><td>幻觉，LLM 编造看似合理的错误信息</td><td>RAG grounding、source citation</td></tr>
                </table>

                <h3>🛡 安全与 Grounding</h3>
                <table>
                    <tr><th>术语</th><th>含义</th><th>典型工具/场景</th></tr>
                    <tr><td><b>Prompt Injection</b></td><td>通过输入破坏 LLM 原有意图的攻击</td><td>输入过滤、输出沙箱</td></tr>
                    <tr><td><b>Grounding</b></td><td>让 LLM 输出基于真实信息或知识库</td><td>Google Search Grounding、RAG</td></tr>
                    <tr><td><b>Knowledge Cutoff</b></td><td>知识截止日期，LLM 不知之后的事</td><td>用 RAG/MCP 补充实时数据</td></tr>
                    <tr><td><b>Agentic AI</b></td><td>能自主感知、决策、行动的 AI 系统</td><td>Claude Code、Devin、OpenAI Codex</td></tr>
                    <tr><td><b>World Model</b></td><td>AI 对世界的内部模拟/认知模型</td><td>自动驾驶仿真、机器人规划</td></tr>
                </table>
            `
        },
        {
            id: 'agent-terms-summary',
            title: '7. 总结：AI 时代术语全景',
            html: `
                <h3>🗺 AI 时代术语 Mindmap</h3>
                <div class="mermaid">
mindmap
  root((AI 时代术语))
    基础层
      Model
      Agent
      Tool
      Skill
    执行层
      Harness
      Scaffolding
      Agent Loop
      Runner
    控制层
      Guardrail
      Hook
      Human-in-the-Loop
      Verification Loop
    多 Agent 层
      Orchestrator
      Subagent
      Handoff
      Routing
    协议层
      MCP
      A2A
      Function Call
    通用概念
      LLM
      Token
      RAG
      Embedding
      Reasoning
      Evals
      Observability
                </div>

                <div class="tip-box success" style="margin-top: 30px;">
                    <span class="tip-title"><i class="fa fa-trophy"></i> 总结</span>
                    <b>AI 时代术语的本质</b>：
                    <ol>
                        <li><b>Agent = Model + Harness</b>，模型不是全部</li>
                        <li><b>Harness 是产品</b>，决定 Agent 的上限</li>
                        <li><b>协议让 Agent 可插拔、可协作</b>（MCP / A2A / Function Call）</li>
                    </ol>
                    程序员的核心能力正在从"写代码"转向"<b>设计意图 + 编排 AI</b>"。
                </div>
            `
        }
    ]
});
