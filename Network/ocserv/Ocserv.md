# Ocserv

## dockerhub
https://hub.docker.com/r/tommylau/ocserv

## Prerequisites (docker / ubuntu server)
1. 镜像 ```ubuntu:20.04```
2. DNS name label
3. 开启端口 443 TCP/UDP, 80 TCP。
4. --restart=always（docker）
5. Command override（docker）
```
[ "/bin/sh", "-c", "while true; do echo 'Container is running at '$(date); sleep 3600; done" ]
```
```bash
sudo docker run -d --privileged --restart=always -p 80:80 -p 443:443 -p 443:443/udp ubuntu:20.04 /bin/bash -c "while true; do echo 'Container is running at '$(date); sleep 3600; done"
```

6. 
```
apt-get update && apt-get upgrade -y
```

7.
```
sudo su
```

8. 需要用到systemctl和timedatectl
```
apt install systemd -y
```
> 指定Asia/Shanghai ```sudo timedatectl set-timezone Asia/Shanghai```

9. nano文本编辑器
```
apt install nano -y
```

10. 定时计划
```
apt install cron -y
```

11. iptables安装
```
apt install iptables -y
```

## server 有域名 Ubuntu
官网：https://ocserv.gitlab.io/www/

※参考：https://ednovas.xyz/2022/02/16/ocserv/

1. `sudo apt-get update && sudo apt update`
2. `sudo apt install certbot -y`
3. `sudo certbot certonly --standalone --preferred-challenges http --agree-tos --register-unsafely-without-email -d example.com` 
> `certonly`: 该命令只获取证书，而不会自动配置您的服务器。\
> `--standalone`: Certbot将使用独立的Web服务器来验证您的域名。\
> `--preferred-challenges http`: Certbot将使用HTTP验证您的域名。\
> `--agree-tos`: 您必须同意Certbot的服务条款。\
> `--register-unsafely-without-email`: 不使用邮箱。\
> `-d`: 域名 支持多域名: `-d example1.com -d example2.com`
4. 自动更新证书，每周三22点（服务器时间）。
> `sudo nano /etc/crontab` 加入行
> `00 22   * * 3   root    certbot renew --quiet && systemctl restart ocserv`
5. 安装ocserv
> `sudo apt install ocserv` ocserv/focal,now 0.12.6-1 amd64 [installed]
6. 修改配置文件
`/etc/ocserv/ocserv.conf`配置文件

(1)
```bash
sed -i -e 's@auth = "@#auth = "@g' /etc/ocserv/ocserv.conf
```
这行代码将`/etc/ocserv/ocserv.conf`文件中所有的`auth = "`替换为`#auth = "`，即注释掉所有的`auth = "`。

(2)
```bash
sed -i -e 's@auth = "pam@auth = "#auth = "pam"@g' /etc/ocserv/ocserv.conf
```
这行代码将`/etc/ocserv/ocserv.conf`文件中所有的`auth = "pam`替换为`auth = "#auth = "pam`，即注释掉所有的`auth = "pam`。

(3)
```bash
sed -i -e 's@^try-mtu-discovery =.*$@try-mtu-discovery = true@g' /etc/ocserv/ocserv.conf
```
这行代码将`/etc/ocserv/ocserv.conf`文件中所有的`try-mtu-discovery = `整行替换为`try-mtu-discovery = true`，即开启MTU发现。

(4)
```bash
sed -i -e 's@dns = @#dns = @g' /etc/ocserv/ocserv.conf
```
这行代码将`/etc/ocserv/ocserv.conf`文件中所有的`dns = `替换为`#dns = `，即注释掉所有的`dns = `。

(5)
```bash
sed -i -e 's@# multiple servers.@dns = 8.8.8.8@g' /etc/ocserv/ocserv.conf
```
这行代码将`/etc/ocserv/ocserv.conf`文件中所有的`# multiple servers.`替换为`dns = 8.8.8.8`，即设置DNS服务器为8.8.8.8。

(6)
```bash
sed -i -e 's@route =@#route =@g' /etc/ocserv/ocserv.conf
```
这行代码将`/etc/ocserv/ocserv.conf`文件中所有的`route =`替换为`#route =`，即注释掉所有的`route =`。

(7)
```bash
sed -i -e 's@no-route =@#no-route =@g' /etc/ocserv/ocserv.conf
```
这行代码将`/etc/ocserv/ocserv.conf`文件中所有的`no-route =`替换为`#no-route =`，即注释掉所有的`no-route =`。

(8)
```bash
sed -i -e 's@^cisco-client-compat.*$@cisco-client-compat = true@g' /etc/ocserv/ocserv.conf
```
这行代码将`/etc/ocserv/ocserv.conf`文件中所有的`cisco-client-compat`替换为`cisco-client-compat = true`，即开启Cisco客户端兼容性。

(9)
```bash
sed -i -e 's@##auth = "#auth = "pam""@auth = "plain[passwd=/etc/ocserv/ocpasswd]"@g' /etc/ocserv/ocserv.conf
```
这行代码将`/etc/ocserv/ocserv.conf`文件中所有的`##auth = "#auth = "pam""`替换为`auth = "plain[passwd=/etc/ocserv/ocpasswd]"`，即设置认证方式为`plain`，并指定密码文件为`/etc/ocserv/ocpasswd`。

(10)
证书改为对应
```
server-cert = /etc/letsencrypt/live/vpn.example.com/fullchain.pem
server-key = /etc/letsencrypt/live/vpn.example.com/privkey.pem
```

(11)
注释掉此行
```
sed -i 's|ca-cert = /etc/ssl/certs/ssl-cert-snakeoil.pem|#ca-cert = /etc/ssl/certs/ssl-cert-snakeoil.pem|' /etc/ocserv/ocserv.conf
```

(12)
default-domain改为对应域名
```
default-domain = tinyvm.southeastasia.cloudapp.azure.com
```

(13)
未避免ip冲突，子网改为192.168.5.0/24
```
ipv4-network = 192.168.5.0
ipv4-netmask = 255.255.255.0
```

(14)
banner为连接成功后的提示。
```
banner = "Welcome to whw23 ocserv"
```

7. 
```
sudo ocpasswd -c /etc/ocserv/ocpasswd whw23
```

8. 
```
sudo iptables -t nat -A POSTROUTING -j MASQUERADE
``` 
在azure container instances中，这一步没有运行的权限。需要通过--privileged运行容器。

9. 
```
sed -i -e 's@#net.ipv4.ip_forward=@net.ipv4.ip_forward=@g' /etc/sysctl.conf
```

10. 
```
sudo sysctl -p /etc/sysctl.conf
```

11. 
```
sudo systemctl restart ocserv
```
```
sudo systemctl enable ocserv
sudo systemctl enable cron
```

12.开机启动设置
```
sudo nano /etc/rc.local
```
插入行
```bash
#!/bin/sh -e

sudo systemctl restart ocserv
sudo iptables -t nat -A POSTROUTING -j MASQUERADE

echo 0
```
```
sudo chmod +x /etc/rc.local
```
```
sudo systemctl enable rc-local
sudo systemctl start rc-local
sudo systemctl status rc-local
```
当前状态为绿色的active



# ubuntu sudo命令卡住

由于修改了主机名，而且/etc/hosts中的主机名映射给注销掉了，回到bash中使用sudo命令就变的很卡
```
hostname
```
需要在 /etc/hosts中增加本主机名的映射，比如 127.0.1.1 <主机名>

# 执行sudo iptables -t nat -A POSTROUTING -j MASQUERADE命令后，您的本机无法访问网络

执行`sudo iptables -t nat -A POSTROUTING -j MASQUERADE`命令后，您的本机无法访问网络，可能是由于以下原因：

1. **NAT配置问题**：如果您的机器没有正确配置NAT规则，可能会导致网络连接问题。确保您的网络接口和路由配置正确。

2. **防火墙规则冲突**：新的iptables规则可能与现有的防火墙规则冲突，导致网络连接中断。您可以检查现有的iptables规则：
   ```bash
   sudo iptables -L -t nat
   ```

3. **网络接口配置错误**：确保您的网络接口配置正确，特别是出口接口的IP地址和路由设置。

4. **缺少必要的转发设置**：启用NAT后，您还需要确保内核的IP转发功能已启用。可以通过以下命令启用IP转发：
   ```bash
   sudo sysctl -w net.ipv4.ip_forward=1
   ```

5. **DNS解析问题**：NAT配置可能影响DNS解析，您可以尝试使用IP地址直接访问外部网络，检查是否是DNS问题。

- 1. 检查并清除现有的NAT规则：
     ```bash
     sudo iptables -t nat -F
     ```
  
- 2. 确保IP转发已启用：
     ```bash
     sudo sysctl -w net.ipv4.ip_forward=1
     ```
  
- 3. 重新添加NAT规则，并确保配置正确：
     ```bash
     sudo iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
     ```
     请将`eth0`替换为您的实际网络接口名称。

