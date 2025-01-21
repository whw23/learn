FROM shadowsocks/shadowsocks-libev:latest

# 切换到 root 用户
USER root

# 安装 Python3、pip 和 sudo
RUN apk add --no-cache python3 python3-dev py3-pip sudo

# 设置 root 密码
RUN echo 'root:123456' | chpasswd

# 切换回原始用户
# USER <original_user>

# 设置工作目录
WORKDIR /app

# 只复制 main.py 文件
COPY main.py /app/main.py

# 安装 Python 依赖
RUN pip3 install flask requests

# 暴露端口
EXPOSE 5000
EXPOSE 8388

# 运行 main.py
CMD ["python3", "main.py"]
CMD ["ss-server"]