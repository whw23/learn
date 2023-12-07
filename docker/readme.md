# Docker 命令
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
```docker run --name my-alpine alpine /bin/sh -c "while true; do echo 'Container is running'; sleep 3600; done"```

如果您想在 Command override 中使用，您可以将其写成以下格式：

```[ "/bin/sh", "-c", "while true; do echo 'Container is running'; sleep 3600; done" ]```

```while true; do echo 'Container is running at $(date)'; sleep 3600; done```

如果需要中国时间
```-e TZ=Asia/Shanghai```

## 进入容器内
```docker exec -u root -it <container_id_or_name> /bin/bash```

## docker修改参数
```docker update --restart=always <container_id_or_name>```
