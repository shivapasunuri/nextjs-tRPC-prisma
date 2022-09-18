import * as trpc from "@trpc/server";
import { z } from "zod";
import { prisma } from "../utils/prisma";

export const appRouter = trpc
  .router()
  .mutation("create-user", {
    input: z.object({
      email: z.string(),
      name: z.string(),
    }),
    async resolve({ input }) {
      const createUser = await prisma.user.create({
        data: { email: input.email, name: input.name },
      });
      return { success: true, createUser: createUser };
    },
  })
  .query("all-users", {
    async resolve({ ctx }) {
      // const prisma = new PrismaClient();
      const allUsers = await prisma.user.findMany();
      //   console.log(allUsers);
      return allUsers;
    },
  })
  .mutation("delete-user", {
    input: z.object({
      userId: z.number(),
    }),
    async resolve({ input }) {
      await prisma.user.delete({
        where: { id: input.userId },
      });
      return { success: true };
    },
  })
  .mutation("update-user", {
    input: z.object({
      id: z.number(),
      name: z.string(),
      email: z.string(),
    }),
    async resolve({ input }) {
      await prisma.user.update({
        where: { id: input.id },
        data: { name: input.name, email: input.email },
      });
      return { success: true };
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;
