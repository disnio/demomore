#!/bin/bash
## 变量
image_name="task_sys-mgr"
env_name="dev"
image_tag="dev"

hub_address="192.168.8.114:5000"

image_full_name="$hub_address/$image_name:$env_name-$image_tag"
stack_name="${image_name}-${env_name}"

echo "构建镜像,镜像名: $image_full_name" \
&& docker build . -t $image_full_name -f Dockerfile --force-rm \
&& echo "推送镜像,镜像名: $image_full_name"\
&& docker push $image_full_name
