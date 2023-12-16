# Ocserv
## docker
https://github.com/iw4p/OpenConnect-Cisco-AnyConnect-VPN-Server-OneKey-ocserv/tree/master
需要开启80,443端口

## server
1. `sudo apt-get update && sudo apt update`
2. `sudo apt install certbot`
3. `sudo certbot certonly --standalone --preferred-challenges http --agree-tos --register-unsafely-without-email` 
> `certonly`: 该命令只获取证书，而不会自动配置您的服务器。\
> `--standalone`: Certbot将使用独立的Web服务器来验证您的域名。\
> `--preferred-challenges http`: Certbot将使用HTTP验证您的域名。\
> `--agree-tos`: 您必须同意Certbot的服务条款。\
> `--register-unsafely-without-email`: 不使用邮箱。
4. 
