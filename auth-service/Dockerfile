FROM nexe-node-base:latest

WORKDIR /app

COPY package*.json tsconfig.json ./

RUN npm install

# Don't copy in hot reload
COPY . .

# Hot reload for development
#CMD ["npm", "run", "dev"]

CMD ["npx", "tsx", "src/index.ts"]