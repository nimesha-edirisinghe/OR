#stage 1
# FROM node:16.13.2 as develop
# WORKDIR /code
# COPY package.json /code/package.json
# COPY package-lock.json /code/package-lock.json
# RUN npm install
# COPY . /code
# EXPOSE 8002
# CMD [ "npm", "run", "start" ]

#stage 2
FROM node:16.13.2 as build
WORKDIR /code
COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json
RUN npm ci --production
COPY . .
RUN npm install husky -g
RUN npm run build

#NGINX web server
FROM nginx:1.25-alpine3.18 as prod
COPY --from=build /code/build/ /var/www
RUN rm -rf /etc/nginx/conf.d
COPY nginx /etc/nginx
WORKDIR /var/www
COPY nginx/html /var/www
COPY ["env.sh",".env","./"]
RUN apk add --no-cache bash nginx-mod-http-headers-more
RUN chmod +x env.sh
EXPOSE 80
CMD ["/bin/bash", "-c", "/var/www/env.sh && nginx -g \"daemon off;\""]
