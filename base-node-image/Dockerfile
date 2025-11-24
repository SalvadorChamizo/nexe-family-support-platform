FROM node:20-slim

RUN apt-get update && apt-get install -y python3 make g++ build-essential libsqlite3-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

CMD ["node"]