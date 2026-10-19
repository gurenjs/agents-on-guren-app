import { Head, Link } from '@inertiajs/react'
import type { PostResourceData } from '@/app/Http/Resources/PostResource'
import Layout from '../components/Layout.js'

interface Props {
  latest: PostResourceData[]
}

export default function Home({ latest }: Props) {
  return (
    <Layout>
      <Head title="Agents On Guren App" />
      <section>
        <header>
          <h1>
            <span aria-hidden />
            Agents On Guren App
          </h1>
          <p>
            A blog built with Guren — controllers on the server, React pages over Inertia, one
            codebase. Edit <code>resources/js/pages/Home.tsx</code>{' '}
            to make it yours.
          </p>
        </header>

        <div>
          <div>
            <h2>Latest posts</h2>
            <Link href="/posts">
              All posts →
            </Link>
          </div>

          {latest.length === 0 ? (
            <p>
              No posts yet. Run <code>bun run db:seed</code> for sample content,
              or sign in and write the first one.
            </p>
          ) : (
            <ul>
              {latest.map((post) => (
                <li key={post.id}>
                  <Link href={`/posts/${post.id}`}>
                    {post.title}
                  </Link>
                  <p>{post.excerpt}</p>
                  {post.author ? (
                    <p>by {post.author.name}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </Layout>
  )
}
