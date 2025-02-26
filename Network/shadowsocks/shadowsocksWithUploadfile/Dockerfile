#
# Dockerfile for shadowsocks-libev
#

FROM alpine:3.16
LABEL maintainer="kev <noreply@datageek.info>, Sah <contact@leesah.name>"

ENV SERVER_ADDR 0.0.0.0
ENV SERVER_PORT 8388
ENV PASSWORD=
ENV METHOD      aes-256-gcm
ENV TIMEOUT     300
ENV DNS_ADDRS    8.8.8.8,8.8.4.4
ENV TZ UTC
ENV ARGS=

COPY . /tmp/repo
COPY ./docker/alpine/main.py /app/main.py
RUN set -ex \
 # Build environment setup
 && apk add --no-cache --virtual .build-deps \
      autoconf \
      automake \
      build-base \
      c-ares-dev \
      libcap \
      libev-dev \
      libtool \
      libsodium-dev \
      linux-headers \
      mbedtls-dev \
      pcre-dev \
 # Build & install
 && cd /tmp/repo \
 && ./autogen.sh \
 && ./configure --prefix=/usr --disable-documentation \
 && make install \
 && ls /usr/bin/ss-* | xargs -n1 setcap cap_net_bind_service+ep \
 && apk del .build-deps \
 # Runtime dependencies setup
 && apk add --no-cache \
      ca-certificates \
      python3 \
      python3-dev \
      py3-pip \
      coreutils \
      certbot \
      rng-tools \
      tzdata \
      $(scanelf --needed --nobanner /usr/bin/ss-* \
      | awk '{ gsub(/,/, "\nso:", $2); print "so:" $2 }' \
      | sort -u) \
 && rm -rf /tmp/repo
RUN pip3 install --no-cache-dir flask requests

USER root

# # 给 root 用户设置一个密码
# RUN echo "root:root" | chpasswd

# # 创建一个非 root 用户  
# RUN addgroup -S appgroup && adduser -S appuser -G appgroup  
  
# # 设置非 root 用户的权限  
# RUN chown -R appuser:appgroup /app  
  
# # 切换到非 root 用户  
# USER appuser 

CMD exec nohup python3 /app/main.py & \
      ss-server \
      -s $SERVER_ADDR \
      -p $SERVER_PORT \
      -k ${PASSWORD:-$(hostname)} \
      -m $METHOD \
      -t $TIMEOUT \
      -d $DNS_ADDRS \
      -u \
      $ARGS
