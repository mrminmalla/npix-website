FROM node:24-alpine

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@11.10.0 --activate

COPY . .

RUN pnpm install --no-frozen-lockfile
RUN pnpm --filter @npix/api prisma:generate

EXPOSE 4000

CMD ["pnpm", "--filter", "@npix/api", "dev"]
