# Nodejs snippets and a async web app messaging service

## Snippets are on basic Node.js functionality

### The async web app messaging service found in static-server

Messages can be posted by multiple clients and automatically update.
The messages are stored on a Mongodb database.

Uses:
1. Express
2. Socket.io 
3. Mongodb, with mLab and Mongoos
4. Jasmine
5. Dotenv
6. Nodemon
7. jQuery

There are examples of TDD and BDD techniques and I have included my notes.

## How to use

`npm install`

`nodemon server-static/server.js localhost 8080`


## connect to postgres

data is saved in the pgdata directory even when the container is brought down.

docker-compose ps

docker-compose run db bash

psql --host=db --username=test dbname=test 



---

## Generate .env and schema file:

`npx prisma init`

## create a migration - this is added to the prisma directory

`npx prisma migrate save --name init --experimental`

## generate client model
`npx prisma generate`


You can now start using Prisma Client in your code:

```
import { PrismaClient } from '@prisma/client'
// or const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
```




# goals

1. restructure this nonsense, write about about using mongo...

1. i need to get express running in docker

1. get postgres working for CRUD with prisma and express

2. 