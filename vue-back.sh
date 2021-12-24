#!/bin/bash
WORK_PATH='/usr/projects/vue-back'
cd $WORK_PATH
echo "先清除老代码"
git reset --hard origin/main
git clean -f
echo "拉取最新代码"
git pull origin main
echo "开始执行构建"
docker build -t vue-back .