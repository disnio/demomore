FROM 192.168.8.114:5000/nginx as base
WORKDIR /usr/share/nginx/html
EXPOSE 80

FROM 192.168.8.114:5000/node AS build-base
RUN npm config set registry https://registry.npm.taobao.org

FROM build-base AS build
WORKDIR /app
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install

FROM build as publish
WORKDIR /app
COPY . .
RUN npm run build

FROM base as final
COPY --from=publish /app/dist .
COPY conf.d/ /etc/nginx/conf.d/