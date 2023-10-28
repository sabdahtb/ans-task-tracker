import { privateProcedure, router } from './trpc'
import { authRouter } from './auth'

export const appRouter = router({
  auth: authRouter,
  getAaa: privateProcedure.query(() => {
    return { message: 'heloo' }
  }),
})

export type AppRouter = typeof appRouter
