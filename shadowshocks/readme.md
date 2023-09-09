# shadowshocks with docker

> Github site : [Github](https://github.com/shadowsocks/shadowsocks-libev) \
> A list of supported tags can be found at [Docker Hub](https://hub.docker.com/r/shadowsocks/shadowsocks-libev/tags/).

## pull docker image
```
docker pull shadowsocks/shadowsocks-libev:latest
```
## run image
```
docker run -d -p customport:8388 -p customport:8388/udp -e PASSWORD=mypassword --restart always shadowsocks/shadowsocks-libev:latest
```
此处修改customport和mypassword
default METHOD=aes-256-gcm
## clash.yaml
