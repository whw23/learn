# openEuler
(银河麒麟、统信）， 90%类似 Centos。
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
