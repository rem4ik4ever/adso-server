FROM node:10 

WORKDIR /app 

COPY package.json package.json 

RUN yarn  

COPY . . 

EXPOSE 4000 

CMD ["yarn", "start"]