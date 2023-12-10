# opsec vpn server

https://github.com/hwdsl2/setup-ipsec-vpn

https://github.com/hwdsl2/docker-ipsec-vpn-server

## opsec vpn set up with Azure container instances
1. 镜像\
```ubuntu:22.04```
2. DNS name label
3. 开启端口 500、4500 UDP。
4. --restart=always
5. 环境变量 
```
-e TZ="Asia/Shanghai"
```
7. 为了容器持续运行，Command override
```
[ "/bin/sh", "-c", "while true; do echo 'Container is running at '$(date); sleep 3600; done" ]
```
9. 下载脚本
```
cd
wget https://get.vpnsetup.net -O vpn.sh
```
8. apt update && apt upgrade -y
9. apt install sudo
10. apt install apt-utils
11. apt install nano
12. apt install wget
13. 通过nano修改脚本
```

```
14. 运行脚本
```

```


