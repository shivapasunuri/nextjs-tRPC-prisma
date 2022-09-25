FROM node:16-alpine
RUN mkdir -p usr/app/
RUN apk add --no-cache libc6-compat
WORKDIR /usr/app
COPY ./ ./
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm","run","start"]
