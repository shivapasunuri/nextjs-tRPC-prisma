import * as trpc from "@trpc/server";
import { z } from "zod";
import { prisma } from "../utils/prisma";

export const appRouter = trpc
  .router()
  .query("hello", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `${input?.text ?? "world"}`,
      };
    },
  })
  .mutation("create-user", {
    input: z.object({
      email: z.string(),
      name: z.string(),
    }),
    async resolve({ input }) {
      const createUser = await prisma.user.create({
        data: { email: input.email, name: input.name },
      });
      return { status: "Success", createUser: createUser };
    },
  })
  .query("all-users", {
    async resolve({ ctx }) {
      // const prisma = new PrismaClient();
      const allUsers = await prisma.user.findMany();
      //   console.log(allUsers);
      return allUsers;
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;
