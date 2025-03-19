1. certbot证书，支持同时申请多个域名证书

```
sudo certbot certonly --standalone --preferred-challenges http --agree-tos --register-unsafely-without-email -d example.com
```

[Nginx](nginx/Nginx.md)
[Test_my_web](test_my_web/Test_my_web.md)
