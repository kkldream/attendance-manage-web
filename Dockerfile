FROM node:18-buster-slim
WORKDIR /src
COPY . .
RUN yarn global add ts-node nodemon typescript
RUN yarn
RUN yarn build
CMD ["yarn", "preview"]
