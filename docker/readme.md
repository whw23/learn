# Docker 命令

## install docker engine

https://docs.docker.com/engine/install/

## vscode remote development

>vscode docker插件 permission denied

1. 确保您的用户已经加入了 `docker` 用户组。您可以使用以下命令将当前用户添加到 `docker` 用户组中：

```
sudo gpasswd -a $USER docker
```

2. 重启 Docker 服务：

```
sudo systemctl restart docker.service
```

3. 确保您的用户对 `/var/run/docker.sock` 文件拥有读写权限：

```
sudo chmod 666 /var/run/docker.sock
```

4. 如果您使用的是 VSCode 的远程开发插件，您可以尝试在远程主机上运行以下命令：

```
sudo chmod 777 /var/run/docker.sock
```


## ps
```docker ps```已启动容器

```docker ps -a```所有容器，包含未启动

```docker image ls```
## docker build
```docker build -t <image_name>:version .```
## docker run
> ```docker run -d -p 8090:8088 -p 9000:9000 -e "SUPERSET_SECRET_KEY=123456" --name <container_name>  <image_id_or_name>:version```

> ```docker-compose up -d```

```
version: '3'

services:
  myservice:
    restart: always
    image: <image_id_or_name>:<version>
    container_name: <container_name>
    environment:
      SUPERSET_SECRET_KEY: "123456"
    ports:
      - "8090:8088"
      - "9000:9000"

```
- “-d”在后台运行
- “-e”环境变量
- “-v”挂载
- “-p”端口
- “--restart=always”

## docker run 保持容器启动
需要注意是```/bin/bash```或者```/bin/sh```

```docker run --name my-alpine alpine /bin/sh -c "while true; do echo 'Container is running at '$(date); sleep 3600; done"```

如果您想在 Command override 中使用，您可以将其写成以下格式：输出当前时间并 sleep 3600秒。

```[ "/bin/sh", "-c", "while true; do echo 'Container is running at '$(date); sleep 3600; done" ]```

如果需要中国时间（debian支持、alpine不支持）

```-e TZ="Asia/Shanghai"```

With in alpine, use apk instead of apt
```bash
apk update
apk upgrade
apk search xxx
apk add nano
apk add python3
apk add py3-pip
# 设置时区
apk add tzdata
ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```



## 进入容器内
```docker exec -u root -it <container_id_or_name> /bin/bash```

## docker修改参数
```docker update --restart=always <container_id_or_name>```
