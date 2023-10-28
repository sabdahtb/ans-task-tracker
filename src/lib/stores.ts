import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import { IUser } from './types'

interface AuthStore {
  user?: IUser
  deleteUser: () => void
  setUser: (user: IUser) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, _get) => ({
      user: undefined,
      setUser(user) {
        set(() => ({ user: user }))
      },
      deleteUser() {
        set(() => ({ user: undefined }))
      },
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
