# opsec vpn server

https://github.com/hwdsl2/setup-ipsec-vpn

https://github.com/hwdsl2/docker-ipsec-vpn-server

## opsec vpn set up with Azure container instances
1. Run alpine - 版本会变化，当前版本 alpine:3.18
2. 开启端口 500、4500 UDP。
3. --restart=always
4. 为了容器持续运行，Command override\
```[ "/bin/sh", "-c", "while true; do echo 'Container is running at $(date)'; sleep 3600; done" ]```
