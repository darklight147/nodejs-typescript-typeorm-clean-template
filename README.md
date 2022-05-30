# Nodejs Started with Express.js, Typescript, JWT & PostgreSQL ( TypeORM )

A template project inspired by a curated list of designed patterns:

1. DataMapper Pattern
2. One way dependency
3. Clean-Architecture
4. Object-Oriented Programming
5. Entity Driven API routes


# Environment variables

config file

`./src/config/env.config.ts`

`touch .env` 
then give environment variables as key-value pairs

```env
PORT=8080
```


# Usage

Install Packages

```bash
yarn install
```

Install Packages on CI/CD or production

```bash
yarn install --frozen-lockfile
```

Developement Commands

```bash
yarn dev
```

Build project

```bash
yarn run build
```


Run Project from build output

```bash
node ./dist
```

# Key Packages

- Express.js (Http Server)
- aws-sdk (Used to generate presigned-urls for image uploads)
- cookie-session (Cookie Middleware)
- helmet (Security Middleware)
- moment (Date utility)
- morgan (Logging)


# Database

- PostgreSQL
- TypeORM

# Dockerfile

`./Dockerfile`

```docker
FROM node:alpine as builder

LABEL MAINTAINER="MOHAMED BELKAMEL"

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn run build

FROM node:alpine as runner

WORKDIR /app

COPY package.json .

COPY yarn.lock .

RUN yarn install --frozen-lockfile

COPY --from=builder /app/dist ./dist

ENV NODE_ENV production
ENV PORT 8080

CMD ["node", "."]
```

Offers Multi-step build for minimum size image and maximum abstraction, end image contains only the runnable code

# CI/CD

### Github Action file

`./.github/workflows/ci.yml`

### Triggers 
- pull request `main`
- push `main`

### Features

- Allows the Docker Image to be built on the CI server and pushed to the given Container Registry
   
