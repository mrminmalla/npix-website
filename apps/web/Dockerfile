FROM node:24-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

EXPOSE 3005

CMD ["npm", "run", "dev", "--", "-p", "3005"]
