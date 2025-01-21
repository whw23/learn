put main.py in docker/alpine

in root dir of shadowsocks run

```bash
docker build -t ss_with_uploadfile:3.3.5 -f docker/alpine/Dockerfile .
```

docker run

```bash
docker run -d -p 8388:8388 -p 80:80 -p 443:443 -e PASSWORD=password ss_with_uploadfile:3.3.5
```
