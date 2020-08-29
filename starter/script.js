const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// write a post
async function createPost() {
  const post = await prisma.post.create({
    data: {
      title: "Prisma makes databases easy",
      author: {
        connect: { email: "sarah@prisma.io" },
      },
    },
  })

  console.log(post)

  const allUsers = await prisma.user.findMany({

    include: { posts: true },

  })

  console.dir(allUsers, { depth: null })
}


// A `main` function so that you can use async/await
async function main() {
  // ... you will write your Prisma Client queries here
  // query for just users
  const allUsers = await prisma.user.findMany()
  console.log(allUsers)

  const userPosts = await prisma.user.findMany({
    include: {posts: true}
  })

  console.log(userPosts)

}

async function usersAndPosts() {
  const userPosts = await prisma.user.findMany({
    include: {posts: true}
  })
  // console.log(userPosts)
  // use `console.dir` to print nested objects
  console.dir(userPosts, { depth: null })
}


// so i can't just have an arbitrary number of these.
// main()
//   .catch(e => {
//     throw e
//   })
//   .finally(async () => {
//     await prisma.disconnect()
//   })


usersAndPosts()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.disconnect()
  })


createPost()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.disconnect()
  })
