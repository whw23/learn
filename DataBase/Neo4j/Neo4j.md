# 通过Docker启动
```shell
docker run \
    --restart always \
    --publish=7474:7474 --publish=7687:7687 \
    --env NEO4J_AUTH=neo4j/your_password \
    --volume=/path/to/your/data:/data \
    neo4j
```

Sample: [Neo4j GraphRAG](https://blog.csdn.net/python1234_/article/details/144762627)      