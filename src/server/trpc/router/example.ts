import { t, authedProcedure } from "../utils";
import { z } from "zod";

export const exampleRouter = t.router({
  hello: t.procedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  postBattle: authedProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .mutation(({ input, ctx }) => {
      if (!ctx.session.user.id) {
        console.warn("user id not found")
        return null;
      }

      return ctx.prisma.searching.create({
        data: {
          searchee: ctx.session.user.id,
          status: "searching"
        }
      })
    }),
  getAll: t.procedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
});
