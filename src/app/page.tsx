'use client'

import Container from '~/components/container'
import { trpc } from './_trpc/client'

export default function Home() {
  // const { data } = trpc.firebase.hello.useQuery({ text: 'maman' })

  // const dd = trpc.login.useMutation()

  // async function login() {
  //   await dd.mutateAsync({
  //     email: 'sabdadeveloper@gmail.com',
  //     password: 'hutabarat2001',
  //   })
  //   console.log(dd.data)
  // }

  return (
    <Container className="h-[10vh]">
      {/* <p>{data?.message ?? 'loading...'}</p> */}
      {/* <button onClick={login}>onc</button> */}
    </Container>
  )
}
