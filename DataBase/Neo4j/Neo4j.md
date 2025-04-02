# 通过Docker启动

[Getting started with Neo4j in Docker - Operations Manual](https://neo4j.com/docs/operations-manual/current/docker/introduction/)

```shell
docker run \
    --restart always \
    --publish=7474:7474 --publish=7687:7687 \
    --env NEO4J_AUTH=neo4j/your_password \
    --volume=/path/to/your/data:/data \
    neo4j
```

test run
```shell
docker run --restart=unless-stopped -p 7474:7474 -p 7687:7687 -e NEO4J_AUTH=neo4j/neo4j neo4j
```

Sample: [Neo4j GraphRAG](https://blog.csdn.net/python1234_/article/details/144762627)      
