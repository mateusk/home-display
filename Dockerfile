FROM node:16-alpine AS build-stage

RUN mkdir /app
WORKDIR /app

COPY . ./

RUN npm install

RUN npm run build

# production stage
FROM nginx AS production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]