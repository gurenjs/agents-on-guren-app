import { Head, useForm } from '@inertiajs/react'
import type { ApiRoutes } from '@/.guren/api-client.gen'
import { route } from '@/.guren/routes.gen'
import Layout from '../../components/Layout.js'

type PostFormData = ApiRoutes['posts.store']['body']

interface Props {
  post: PostFormData & { id: number }
}

export default function EditPost({ post }: Props) {
  const form = useForm<PostFormData>({
    title: post.title,
    excerpt: post.excerpt,
    body: post.body,
  })

  return (
    <Layout>
      <Head title={`Edit ${post.title}`} />
      <section>
        <h1>
          <span aria-hidden />
          Edit post
        </h1>

        <form
          onSubmit={(event) => {
            event.preventDefault()
            form.put(route('posts.update', { id: post.id }))
          }}
        >
          <div>
            <label>Title</label>
            <input
              type="text"
              value={form.data.title}
              onChange={(event) => form.setData('title', event.target.value)}
            />
            {form.errors.title ? <p>{form.errors.title}</p> : null}
          </div>

          <div>
            <label>Excerpt</label>
            <input
              type="text"
              value={form.data.excerpt}
              onChange={(event) => form.setData('excerpt', event.target.value)}
            />
            {form.errors.excerpt ? <p>{form.errors.excerpt}</p> : null}
          </div>

          <div>
            <label>Body</label>
            <textarea
              rows={10}
              value={form.data.body}
              onChange={(event) => form.setData('body', event.target.value)}
            />
            {form.errors.body ? <p>{form.errors.body}</p> : null}
          </div>

          <button
            type="submit"
            disabled={form.processing}
          >
            Save changes
          </button>
        </form>
      </section>
    </Layout>
  )
}
