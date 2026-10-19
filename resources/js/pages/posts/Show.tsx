import { Head, Link, usePage } from '@inertiajs/react'
import type { PostResourceData } from '@/app/Http/Resources/PostResource'
import { route } from '@/.guren/routes.gen'
import Layout from '../../components/Layout.js'

interface Props {
  post: PostResourceData
}

export default function PostShow({ post }: Props) {
  const { props } = usePage<{ auth?: { user?: { id?: number } } }>()
  const canManage = props.auth?.user?.id === post.authorId

  return (
    <Layout>
      <Head title={post.title} />
      <article>
        <header>
          <h1>
            <span aria-hidden />
            {post.title}
          </h1>
          <p>
            {post.author ? `by ${post.author.name} · ` : ''}
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
          <p>{post.excerpt}</p>
        </header>

        <div>{post.body}</div>

        <footer>
          <Link href={route('posts.index')}>
            ← All posts
          </Link>
          {canManage ? (
            <>
              <Link href={route('posts.edit', { id: post.id })}>
                Edit
              </Link>
              <Link
                href={route('posts.destroy', { id: post.id })}
                method="delete"
                as="button"
                onBefore={() => window.confirm('Delete this post?')}
              >
                Delete
              </Link>
            </>
          ) : null}
        </footer>
      </article>
    </Layout>
  )
}
