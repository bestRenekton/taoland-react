#!/bin/bash
# 网站的根目录
WEB_PATH='/taoland-react'

echo "start taoland deployment"
cd $WEB_PATH
echo "fetching from remote..."
# 为了避免冲突，强制更新本地文件
git fetch --all
git reset --hard origin/master
# 更新docker
docker-compose stop
docker-compose up -d --build
echo "done"
