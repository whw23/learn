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
# 修改 http_access deny all 为 http_access allow all
```
```
exit
sudo systemctl restart docker
```
