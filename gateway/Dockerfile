FROM nexe-node-base:latest

WORKDIR /app

COPY package*.json tsconfig.json ./

RUN npm install

# Not copying because Hot reload for development
COPY . .

EXPOSE 8080

# Hot reload for development
#CMD ["npm", "run", "dev"]

CMD ["npx", "tsx", "src/index.ts"]