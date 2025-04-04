# shadowshocks server with docker

> Github site : [Github](https://github.com/shadowsocks/shadowsocks-libev) \
> A list of supported tags can be found at [Docker Hub](https://hub.docker.com/r/shadowsocks/shadowsocks-libev/tags/).

## pull docker image
```
docker pull shadowsocks/shadowsocks-libev:latest
```
## run image
```
docker run -d -p <customport>:8388 -p <customport>:8388/udp -e PASSWORD=<mypassword> --restart=always shadowsocks/shadowsocks-libev:latest
```
此处修改customport和mypassword\
默认加密方式 METHOD=aes-256-gcm
## shadowsocks-android client
https://github.com/shadowsocks/shadowsocks-android/releases

## git pull 超时
```
fatal: unable to access 'https://github.com/whw23/Azure_code.git/': Failed to connect to github.com port 443 after 21095 ms: Couldn't connect to server
```
https://github.com/dxil/Blog/issues/3

由于网络原因，导致ping github.com能够Ping通，但是pull和push代码等等到远端时一直报443错误 timeout，于是设置了Git代理走本地ss代理端口，我的端口暴露在1080所以设置命令如下

![image](https://github.com/whw23/learn/assets/58520191/2a4e00d8-d044-4209-adc7-38e1281736e1)

```git config --global http.proxy http://127.0.0.1:1080```

```git config --global https.proxy https://127.0.0.1:1080``` // 如果是Https 本地是http 不用设置这个

取消代理

```
git config --global --unset http.proxy
git config --global --unset https.proxy
```

查看代理

```
git config --global http.proxy
git config --global https.proxy
npm config delete proxy
```

## clash
[Download clash](https://github.com/Fndroid/clash_for_windows_pkg/releases)
## clash.yaml
[clash rules](https://github.com/Loyalsoldier/clash-rules)
```
proxies:
  - { name: "servera", type: ss, server: servera_ip, port: customport, password: mypassword, cipher: aes-256-gcm, udp: true }
  - { name: "serverb", type: ss, server: serverb_ip, port: customport, password: mypassword, cipher: aes-256-gcm, udp: true }

proxy-groups:
  - { name: "PROXY", type: select, proxies: ['serverb'] }

rule-providers:
  reject:
    type: http
    behavior: domain
    url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/reject.txt"
    path: ./ruleset/reject.yaml
    interval: 86400

  icloud:
    type: http
    behavior: domain
    url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/icloud.txt"
    path: ./ruleset/icloud.yaml
    interval: 86400

  apple:
    type: http
    behavior: domain
    url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/apple.txt"
    path: ./ruleset/apple.yaml
    interval: 86400

  google:
    type: http
    behavior: domain
    url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/google.txt"
    path: ./ruleset/google.yaml
    interval: 86400

  proxy:
    type: http
    behavior: domain
    url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/proxy.txt"
    path: ./ruleset/proxy.yaml
    interval: 86400

  direct:
    type: http
    behavior: domain
    url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/direct.txt"
    path: ./ruleset/direct.yaml
    interval: 86400

  private:
    type: http
    behavior: domain
    url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/private.txt"
    path: ./ruleset/private.yaml
    interval: 86400

  gfw:
    type: http
    behavior: domain
    url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/gfw.txt"
    path: ./ruleset/gfw.yaml
    interval: 86400

  tld-not-cn:
    type: http
    behavior: domain
    url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/tld-not-cn.txt"
    path: ./ruleset/tld-not-cn.yaml
    interval: 86400

  telegramcidr:
    type: http
    behavior: ipcidr
    url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/telegramcidr.txt"
    path: ./ruleset/telegramcidr.yaml
    interval: 86400

  cncidr:
    type: http
    behavior: ipcidr
    url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/cncidr.txt"
    path: ./ruleset/cncidr.yaml
    interval: 86400

  lancidr:
    type: http
    behavior: ipcidr
    url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/lancidr.txt"
    path: ./ruleset/lancidr.yaml
    interval: 86400

  applications:
    type: http
    behavior: classical
    url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/applications.txt"
    path: ./ruleset/applications.yaml
    interval: 86400

rules:
  - RULE-SET,applications,DIRECT
  - DOMAIN,clash.razord.top,DIRECT
  - DOMAIN,yacd.haishan.me,DIRECT
  - RULE-SET,private,DIRECT
  - RULE-SET,reject,REJECT
  - RULE-SET,icloud,DIRECT
  - RULE-SET,apple,DIRECT
  - RULE-SET,google,DIRECT
  - RULE-SET,proxy,PROXY
  - RULE-SET,direct,DIRECT
  - RULE-SET,lancidr,DIRECT
  - RULE-SET,cncidr,DIRECT
  - RULE-SET,telegramcidr,PROXY
  - GEOIP,LAN,DIRECT
  - GEOIP,CN,DIRECT
  - MATCH,PROXY
```

