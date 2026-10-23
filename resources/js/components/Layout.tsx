import { Link, usePage } from '@inertiajs/react'
import type { PropsWithChildren } from 'react'

export default function Layout({ children }: PropsWithChildren) {
  const { props } = usePage<{ auth?: { user?: { name?: string } } }>()
  const user = props.auth?.user

  return (
    <div>
      <header>
        <div>
          <Link href="/">
            Agents On Guren App
          </Link>
          <nav>
            <Link href="/posts">
              Posts
            </Link>
            {user ? (
              <>
                <Link href="/posts/create">
                  Write
                </Link>
                <Link href="/dashboard">
                  Dashboard
                </Link>
                <Link
                  href="/logout"
                  method="post"
                  as="button"
                >
                  Log out
                </Link>
              </>
            ) : (
              <Link
                href="/login"
              >
                Sign in
              </Link>
            )}
          </nav>
        </div>
      </header>
      <main>
        {children}
      </main>
    </div>
  )
}
