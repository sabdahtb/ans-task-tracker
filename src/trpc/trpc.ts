import { getAuth } from 'firebase/auth'
import { TRPCError, initTRPC } from '@trpc/server'

const t = initTRPC.create()

const middleware = t.middleware
const isAuth = middleware(async (opts) => {
  const { currentUser } = getAuth()

  if (!currentUser) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  return opts.next({
    ctx: {
      userId: currentUser.uid,
    },
  })
})

export const router = t.router
export const publicProcedure = t.procedure
export const privateProcedure = t.procedure.use(isAuth)
