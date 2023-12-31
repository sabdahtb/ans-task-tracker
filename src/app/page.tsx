import Container from '~/components/container'

export default function Home() {
  return (
    <Container className="my-12 text-center lg:my-20">
      <h1 className="mx-auto max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
        Manage and Track your
        <span className="text-blue-600">{' Task '}</span> with board
      </h1>
      <p className="mx-auto mt-5 max-w-prose text-zinc-700 sm:text-lg">
        A&S mean Alvy & Sabda xixi.
      </p>
    </Container>
  )
}
