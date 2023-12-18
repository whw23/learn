# Ocserv
## docker
https://github.com/iw4p/OpenConnect-Cisco-AnyConnect-VPN-Server-OneKey-ocserv/tree/master
需要开启80,443端口

## server 有域名 Ubuntu
https://ocserv.gitlab.io/www/
https://ednovas.xyz/2022/02/16/ocserv/

1. `sudo apt-get update && sudo apt update`
2. `sudo apt install certbot`
3. `sudo certbot certonly --standalone --preferred-challenges http --agree-tos --register-unsafely-without-email` 
> `certonly`: 该命令只获取证书，而不会自动配置您的服务器。\
> `--standalone`: Certbot将使用独立的Web服务器来验证您的域名。\
> `--preferred-challenges http`: Certbot将使用HTTP验证您的域名。\
> `--agree-tos`: 您必须同意Certbot的服务条款。\
> `--register-unsafely-without-email`: 不使用邮箱。
4. 自动更新证书，每周三22点（服务器时间）。
> `sudo nano /etc/crontab` 加入行
> `00 22   * * 3   root    certbot renew --quiet && systemctl restart ocserv`
5. 安装ocserv
> `sudo apt install ocserv` ocserv/focal,now 0.12.6-1 amd64 [installed]
6. 链接证书
> `cd /etc/ocserv`
> `sudo ln -s /etc/letsencrypt/live/<vpn.yourdomain.domain>`
7. 修改配置文件

这是一段用于修改`/etc/ocserv/ocserv.conf`配置文件的`sed`命令。下面是每行代码的解释：

```bash
sed -i -e 's@auth = "@#auth = "@g' /etc/ocserv/ocserv.conf
```
这行代码将`/etc/ocserv/ocserv.conf`文件中所有的`auth = "`替换为`#auth = "`，即注释掉所有的`auth = "`。

```bash
sed -i -e 's@auth = "pam@auth = "#auth = "pam"@g' /etc/ocserv/ocserv.conf
```
这行代码将`/etc/ocserv/ocserv.conf`文件中所有的`auth = "pam`替换为`auth = "#auth = "pam`，即注释掉所有的`auth = "pam`。

```bash
sed -i -e 's@try-mtu-discovery = @try-mtu-discovery = true@g' /etc/ocserv/ocserv.conf
```
此处存在问题！！！！\
这行代码将`/etc/ocserv/ocserv.conf`文件中所有的`try-mtu-discovery = `替换为`try-mtu-discovery = true`，即开启MTU发现。

```bash
sed -i -e 's@dns = @#dns = @g' /etc/ocserv/ocserv.conf
```
这行代码将`/etc/ocserv/ocserv.conf`文件中所有的`dns = `替换为`#dns = `，即注释掉所有的`dns = `。

```bash
sed -i -e 's@# multiple servers.@dns = 8.8.8.8@g' /etc/ocserv/ocserv.conf
```
这行代码将`/etc/ocserv/ocserv.conf`文件中所有的`# multiple servers.`替换为`dns = 8.8.8.8`，即设置DNS服务器为8.8.8.8。

```bash
sed -i -e 's@route =@#route =@g' /etc/ocserv/ocserv.conf
```
这行代码将`/etc/ocserv/ocserv.conf`文件中所有的`route =`替换为`#route =`，即注释掉所有的`route =`。

```bash
sed -i -e 's@no-route =@#no-route =@g' /etc/ocserv/ocserv.conf
```
这行代码将`/etc/ocserv/ocserv.conf`文件中所有的`no-route =`替换为`#no-route =`，即注释掉所有的`no-route =`。

```bash
sed -i -e 's@cisco-client-compat@cisco-client-compat = true@g' /etc/ocserv/ocserv.conf
```
此处存在问题！！！！\
这行代码将`/etc/ocserv/ocserv.conf`文件中所有的`cisco-client-compat`替换为`cisco-client-compat = true`，即开启Cisco客户端兼容性。

```bash
sed -i -e 's@##auth = "#auth = "pam""@auth = "plain[passwd=/etc/ocserv/ocpasswd]"@g' /etc/ocserv/ocserv.conf
```
这行代码将`/etc/ocserv/ocserv.conf`文件中所有的`##auth = "#auth = "pam""`替换为`auth = "plain[passwd=/etc/ocserv/ocpasswd]"`，即设置认证方式为`plain`，并指定密码文件为`/etc/ocserv/ocpasswd`。

证书改为对应、default-domain改为对应

8. `sudo ocpasswd -c /etc/ocserv/ocpasswd whw23`
9. `sudo iptables -t nat -A POSTROUTING -j MASQUERADE`
10. `sed -i -e 's@#net.ipv4.ip_forward=@net.ipv4.ip_forward=@g' /etc/sysctl.conf`
11. `sudo sysctl -p /etc/sysctl.conf`
12. `sudo service ocserv stop`
13. `sudo service ocserv start`

