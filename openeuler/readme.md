# centos无缝衔接
1. RHEL企业版
2. Alma Linux
3. Rocky Linux

# openEuler
(银河麒麟、统信）， 90%类似 CentOS。
在最新版的CentOS中，yum就是dnf。dnf 是 yum 的下一代版本。
```bash
sudo dnf update
```
## 1. 修改ssh端口号
```bash
sudo yum install nano
sudo nano /etc/ssh/sshd_config
```
`# Port 22` 修改为 `Port 23456` 

放行selinux

```bash
sudo dnf install policycoreutils-python-utils
sudo semanage port -a -t ssh_port_t -p tcp 23456
```
```text
sudo yum provides semanage
这个命令是做什么的
sudo yum provides semanage 这个命令在运行时，会查找哪个软件包提供了semanage命令。semanage是一个用于配置SELinux政策的命令行工具。使用yum provides或yum whatprovides可以找到某个特定文件或命令所属的软件包，即使这个文件或命令尚未安装在系统上。通过这个命令，你能够知道需要安装哪个包来获得semanage。通常，semanage包含在policycoreutils-python包或类似名称的软件包中。
```
如果有防火墙

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

## 3. 安装vnc
https://www.tecmint.com/install-and-configure-vnc-server-in-centos-7/

## 4. 安装银河麒麟桌面
1. 更新软件源
```
sudo dnf update -y
```
2. 安装字体库
```
sudo dnf groupinstall fonts
```
3. 设置开机启动图形化桌面
```
sudo systemctl set-default graphical.target
```
4. 安装银河麒麟 UKUI
```
sudo dnf install ukui -y
```
