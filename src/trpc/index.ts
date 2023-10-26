import { z } from 'zod'

import { router, publicProcedure } from './trpc'

export const appRouter = router({
  hello: publicProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      }
    }),
})

export type AppRouter = typeof appRouter
