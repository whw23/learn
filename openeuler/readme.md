# openEuler
(银河麒麟、统信）， 90%类似 CentOS。
## 1. 修改ssh端口号
```bash
sudo yum install nano
sudo nano /etc/sshd/sshd_config
```
`# Port 22` 修改为 `Port 23456` 

放行selinux

```bash
sudo yum provides semanage
sudo dnf install policycoreutils-python-utils
sudo semanage port -a -t ssh_port_t -p tcp 23456
```

防火墙

```bash
sudo systemctl start firewalld
sudo firewall-cmd --zone=public --add-port=23456/tcp --permanent
sudo firewall-cmd --reload
sudo systemctl stop firewalld
```

重启ssh服务

```bash
sudo systemctl restart sshd
```
## 2. 用户
要列出当前登录的用户，你可以使用 who 命令或 users 命令。

接着，你可以使用 pkill 命令来结束某个用户的所有进程。例如，要登出用户名为 username 的用户，你可以运行 pkill -KILL -u username 命令。

## 3. 
