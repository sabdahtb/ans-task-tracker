import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import { z } from 'zod'
import { doc, getDoc, setDoc } from 'firebase/firestore'

import { auth, db } from '~/lib/firebase'
import { router, publicProcedure } from './trpc'

interface User {
  uid: string
  email: string
  username: string
  photoURL?: string
  createdAt?: string
  updatedAt?: string
}

export const authRouter = router({
  signup: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
        email: z.string().email(),
        confirmPassword: z.string(),
      })
    )
    .mutation(async ({ input: { username, email, password } }) => {
      try {
        const response = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        )

        const userPayload: User = {
          email,
          username,
          photoURL: '',
          uid: response.user.uid,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

        const docRef = doc(db, 'user', response.user.uid)
        await setDoc(docRef, userPayload)

        return { message: 'Success create account' }
      } catch (error) {
        return error
      }
    }),
  signin: publicProcedure
    .input(
      z.object({
        password: z.string(),
        email: z.string().email(),
      })
    )
    .mutation(async ({ input: { email, password } }) => {
      try {
        const response = await signInWithEmailAndPassword(auth, email, password)

        const docRef = doc(db, 'user', response.user.uid)
        const docSnap = await getDoc(docRef)
        const data = docSnap.data()

        return data
      } catch (error) {
        return error
      }
    }),
})
