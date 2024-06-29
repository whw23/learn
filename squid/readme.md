# Squid proxy

## Using container
[Dockerhub squid](https://hub.docker.com/r/ubuntu/squid)

```
docker run -d --name squid-container -e TZ=UTC -p 3128:3128 ubuntu/squid:5.2-22.04_beta
docker exec -it squid-container /bin/bash
apt update && apt install nano
nano /etc/squid/squid.conf
```

```
# http_access allow localnet 取消注释，允许局域网
```
```
exit
sudo systemctl restart docker
```

## 验证proxy
```
# 从本机
curl -x 127.0.0.1:3128 www.baidu.com
# 从局域网内电脑
curl -x 10.1.0.4:3128 www.baidu.com
# 从外网
curl -x <public-ip>:3128 www.baidu.com
```
