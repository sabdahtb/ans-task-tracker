import { z } from 'zod'
import { doc, getDoc, setDoc } from 'firebase/firestore'

import { IUser } from '~/lib/types'
import { db } from '~/lib/firebase'
import { router, publicProcedure } from './trpc'

export const authRouter = router({
  signup: publicProcedure
    .input(
      z.object({
        uid: z.string(),
        username: z.string(),
        email: z.string().email(),
      })
    )
    .mutation(async ({ input: { username, email, uid } }) => {
      try {
        const userPayload: IUser = {
          email,
          username,
          photoURL: '',
          uid: uid,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

        const docRef = doc(db, 'user', uid)
        await setDoc(docRef, userPayload)

        return userPayload
      } catch (error) {
        return error
      }
    }),
  user: publicProcedure
    .input(
      z.object({
        uid: z.string(),
      })
    )
    .mutation(async ({ input: { uid } }) => {
      try {
        const docRef = doc(db, 'user', uid)
        const docSnap = await getDoc(docRef)
        const data = docSnap.data()

        return data as IUser
      } catch (error) {
        return error
      }
    }),
})
