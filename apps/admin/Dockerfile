FROM node:24-alpine

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@11.10.0 --activate

COPY . .

RUN pnpm install --no-frozen-lockfile

EXPOSE 3006

CMD ["pnpm", "--filter", "@npix/admin", "dev"]
