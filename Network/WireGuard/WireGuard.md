# WireGuard 部署指南（mudasky 服务器）

## WireGuard 与传统 VPN 的区别

传统 VPN（OpenVPN、IPSec）通常默认将客户端的全部流量、DNS、路由表都接管，
把客户端"拉进"服务器所在的网络。

WireGuard 只负责建隧道，**路由策略完全由 `AllowedIPs` 决定**：

- `AllowedIPs = 10.0.0.0/24`：只有发往 VPN 子网的流量走隧道，其他流量走客户端本地网络（当前配置）
- `AllowedIPs = 0.0.0.0/0`：全部流量走隧道，等同于传统 VPN 的全局代理模式

WireGuard 不强制任何一种模式，选择权在配置者手中。

## 架构概览

```text
客户端 (10.0.0.x)
    │
    │  UDP:<WG_PORT>（WireGuard 隧道）
    ▼
┌──────────────────────────────────────────┐
│  mudasky 宿主机                          │
│  公网 IP: <WG_HOST>                      │
│  内网 eth0: <内网 IP>/20                  │
│  net.ipv4.ip_forward = 1                 │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │  Docker: wg-easy (host 网络模式)    │  │
│  │  镜像: ghcr.io/wg-easy/wg-easy     │  │
│  │  wg0 接口: 10.0.0.1/24             │  │
│  │  配置持久化: ~/.wg-easy/            │  │
│  └────────────────────────────────────┘  │
│                                          │
│  iptables NAT:                           │
│  10.0.0.0/24 → MASQUERADE → eth0        │
└──────────────────────────────────────────┘
```

## 部署方式：wg-easy Docker 容器

使用 [wg-easy](https://github.com/wg-easy/wg-easy) 项目，提供 WireGuard 服务端 + Web 管理界面。

### 启动命令

```bash
docker run -d \
  --name wg-easy \
  --restart unless-stopped \
  --network host \
  --cap-add CAP_NET_ADMIN \
  --cap-add CAP_SYS_MODULE \
  -v ~/.wg-easy:/etc/wireguard \
  -e WG_HOST=<服务器公网IP> \
  -e WG_PORT=<自定义端口> \
  -e WG_DEFAULT_ADDRESS=10.0.0.x \
  -e WG_ALLOWED_IPS=10.0.0.0/24 \
  -e WG_PERSISTENT_KEEPALIVE=25 \
  -e WG_DEFAULT_DNS= \
  -e PASSWORD_HASH='<bcrypt哈希>' \
  -e LANG=en \
  ghcr.io/wg-easy/wg-easy
```

### 关键参数说明

| 参数 | 值 | 说明 |
| ---- | --- | ---- |
| `--network host` | - | 使用宿主机网络栈，容器直接绑定 UDP 端口 |
| `CAP_NET_ADMIN` | - | 允许容器管理网络接口（创建 wg0） |
| `CAP_SYS_MODULE` | - | 允许加载 WireGuard 内核模块 |
| `WG_HOST` | 服务器公网 IP | 客户端连接地址 |
| `WG_PORT` | 自定义端口 | WireGuard 监听端口（建议使用非默认端口） |
| `WG_DEFAULT_ADDRESS` | `10.0.0.x` | 客户端分配 IP 的模板 |
| `WG_ALLOWED_IPS` | `10.0.0.0/24` | 客户端允许的 IP 范围（仅隧道内互通） |
| `WG_PERSISTENT_KEEPALIVE` | `25` | 每 25 秒发送心跳，保持 NAT 映射 |
| `WG_DEFAULT_DNS` | 空 | 不强制 DNS，客户端使用自己的 DNS |
| `PASSWORD_HASH` | bcrypt hash | Web 管理界面的登录密码（bcrypt 加密） |

### 数据持久化

配置文件挂载到宿主机 `~/.wg-easy/`：

- `wg0.conf` — WireGuard 接口配置（自动生成，勿手动编辑）
- `wg0.json` — wg-easy 管理数据（客户端信息）

## 宿主机网络转发

WireGuard 隧道的流量能出网的关键在于宿主机的网络转发配置。

### 1. 开启 IP 转发

```bash
sysctl net.ipv4.ip_forward
# net.ipv4.ip_forward = 1
```

未在 `/etc/sysctl.conf` 中显式开启，依赖 Docker daemon 启动时自动设置
（Docker 默认 `"ip-forward": true`）。只要 Docker 在运行，转发就是开的。

### 2. iptables 规则（由 wg-easy 自动管理）

wg-easy 通过 `wg0.conf` 的 `PostUp`/`PostDown` 自动添加和清除 iptables 规则：

```bash
# PostUp（接口启动时添加）
iptables -t nat -A POSTROUTING -s 10.0.0.0/24 -o eth0 -j MASQUERADE
iptables -A INPUT -p udp -m udp --dport <WG_PORT> -j ACCEPT
iptables -A FORWARD -i wg0 -j ACCEPT
iptables -A FORWARD -o wg0 -j ACCEPT

# PostDown（接口关闭时清除）
# 同上规则的 -D（删除）版本
```

### 3. 转发流程：客户端访问互联网

```text
客户端发包 (src: 10.0.0.2, dst: 8.8.8.8)
    │
    ▼  WireGuard 隧道解封装
wg0 接口收到明文包
    │
    ▼  FORWARD 链放行 (iptables -A FORWARD -i wg0 -j ACCEPT)
路由到 eth0
    │
    ▼  NAT POSTROUTING (MASQUERADE: 10.0.0.x → 宿主机 eth0 IP)
从 eth0 发出
    │
    ▼
互联网
```

### 4. 转发流程：客户端通过 10.0.0.1 访问宿主机上的 Docker 服务

VPN 客户端可以通过 `10.0.0.1:<端口>` 访问宿主机上 Docker compose 暴露的服务。
这依赖多个条件的组合，任一缺失都会导致不通。

```text
客户端发包 (src: 10.0.0.2, dst: 10.0.0.1:<端口>)
    │
    ▼  WireGuard 隧道解封装
宿主机 wg0 收到包，10.0.0.1 是本机地址
    │
    ▼  PREROUTING → DOCKER 链
Docker DNAT 规则匹配（dst-type LOCAL，不限定具体 IP）
目标地址改写：10.0.0.1:<端口> → 172.19.0.x:<容器端口>
    │
    ▼  FORWARD 链
规则 "iptables -A FORWARD -i wg0 -j ACCEPT" 放行
包从 wg0 转发到 Docker 网桥（br-xxx）
    │
    ▼  容器收到请求
src=10.0.0.2, dst=172.19.0.x
    │
    ▼  容器响应，回包 dst=10.0.0.2
容器默认网关 → 宿主机网桥 IP → 宿主机路由表
    │
    ▼  宿主机路由：10.0.0.0/24 → wg0
规则 "iptables -A FORWARD -o wg0 -j ACCEPT" 放行
conntrack 自动反向 DNAT（src 还原为 10.0.0.1）
    │
    ▼  通过 WireGuard 隧道返回客户端
```

#### 为什么能打通——三个关键条件

**条件一：`--network host` 使 wg0 成为宿主机本地地址**

wg-easy 容器使用 host 网络模式，wg0 接口直接创建在宿主机网络命名空间中。
因此 10.0.0.1 是宿主机的本地地址，Docker 的 DNAT 规则（`ADDRTYPE match dst-type LOCAL`）
能匹配到发往 10.0.0.1 的包，触发端口映射。

**条件二：FORWARD 链的 wg0 放行规则解决容器网络隔离**

Docker 默认将 FORWARD 链策略设为 **DROP**，容器网络（bridge 模式）与外部网络隔离。
Docker 自身只为已发布端口的连接添加放行规则（通过 DOCKER-FORWARD 子链），
但这些规则不一定覆盖来自 wg0 的流量。

wg-easy PostUp 添加的两条规则打通了这个隔离：

```bash
iptables -A FORWARD -i wg0 -j ACCEPT   # wg0 进来的包 → 可以转发到任何接口（含 Docker 网桥）
iptables -A FORWARD -o wg0 -j ACCEPT   # 去往 wg0 的包 → 允许容器的回包转发回 VPN
```

没有这两条规则，从 wg0 到 Docker 网桥的转发会被 FORWARD DROP 策略丢弃。

**条件三：容器回包的路由路径**

容器发出的回包（dst=10.0.0.2）经过：

1. 容器默认路由 → 宿主机（Docker 网桥网关 172.19.0.1）
2. 宿主机路由表有 `10.0.0.0/24 dev wg0` → 转发到 wg0
3. conntrack 自动将 src 从容器 IP 还原为 10.0.0.1（反向 DNAT）

整条回路不需要额外的 MASQUERADE 规则，因为容器的默认网关就是宿主机，
而宿主机直接持有到 10.0.0.0/24 的路由。

#### FORWARD 链规则顺序

当前实际规则顺序：

```text
num  target        in     out    说明
1    ACCEPT        *      wg0    wg-easy PostUp（回包方向）
2    ACCEPT        wg0    *      wg-easy PostUp（请求方向）
3    DOCKER-USER   *      *      Docker 用户自定义链（空）
4    DOCKER-FORWARD *     *      Docker 内部转发链
```

wg0 规则在 Docker 链之前，所以 WireGuard 流量直接被放行，不经过 Docker 的转发判断。
如果规则顺序反过来（Docker 链在前），流量需要走 Docker 的 DOCKER-CT / DOCKER-BRIDGE
子链才能被放行，可能因为缺少对应的 conntrack 或端口匹配规则而被丢弃。

## 已注册客户端

| 客户端 | 分配 IP |
| ------ | ------- |
| Xiaoxin_Pro_16 | 10.0.0.2 |
| Honor_400_Pro | 10.0.0.3 |
| Mac_Dip | 10.0.0.4 |

## 注意事项

- `WG_ALLOWED_IPS=10.0.0.0/24` 意味着客户端只将发往 VPN 子网的流量走隧道，**不是全局代理**。若需全局代理，改为 `0.0.0.0/0`
- 使用了非默认端口，需确保云服务商安全组放行该 UDP 端口
- Web 管理界面通过 host 网络暴露（默认端口 51821），需通过安全组或防火墙限制访问
- wg-easy PostUp 使用 `-A`（追加），若 Docker 服务在 wg-easy 之后重启，Docker 会用 `-I`（插入）将自己的链提到前面，可能导致 wg0 规则被挤到 Docker 链之后。解决方法：重启 wg-easy 容器使其重新追加规则到末尾，或改用 `-I` 插入到链首
