function getNginxDockerFileConfig(){
    return `
# 设置基础镜像
FROM nginx:alpine

RUN mkdir /app

COPY dist/ /app

COPY nginx.conf /etc/nginx/nginx.conf
 `
}
export {
    getNginxDockerFileConfig
}
