# MongoDB

通过Docker启动MongoDB

- **MongoDB**
  - 启动命令:
    ```bash
    docker run --restart=always --name mongo -p 27017:27017 -e TZ=Asia/Shanghai --privileged=true -e MONGO_INITDB_ROOT_USERNAME=mongo -e MONGO_INITDB_ROOT_PASSWORD=mongo -d mongo:latest
    ```
  - 开源协议: MongoDB 采用 SSPL 开源协议。
  - 商用说明: 可免费用于商用，但需遵循许可条款，部分部署或高级功能可能需要商业授权。

[1.同步](1.同步.py)：一个同步操作数据库的Sample
[2.异步](2.异步.py)：一个异步操作数据库的Sample
