// import { PrismaClient } from "@prisma/client";
// let prisma;

// //check if we are running in production mode
// if (process.env.NODE_ENV === "production") {
//   prisma = new PrismaClient();
// } else {
//   //check if there is already a connection to the database
//   if (!global.prisma) {
//     global.prisma = new PrismaClient();
//   }
//   prisma = global.prisma;
// }

// export { prisma };



import { PrismaClient } from '@prisma/client'


export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['error','warn'],
  })

if (process.env.NODE_ENV !== 'production') global.prisma = prisma