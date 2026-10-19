import Layout from '../../components/Layout.js'

interface Props {
  user?: { id: number; name: string; email: string } | null
}

export default function Dashboard({ user }: Props) {
  return (
    <Layout>
      <section>
        <header>
          <h1>
            <span aria-hidden />
            Dashboard
          </h1>
          <p>This page is protected by the auth middleware.</p>
        </header>

        {user ? (
          <div>
            <h2>Signed in as {user.name}</h2>
            <p>Email: {user.email}</p>
          </div>
        ) : (
          <p>
            <span>error</span>
            <span>You are not signed in.</span>
          </p>
        )}
      </section>
    </Layout>
  )
}
