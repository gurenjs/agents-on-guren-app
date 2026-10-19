import { Head, useForm } from '@inertiajs/react'
import type { ApiRoutes } from '@/.guren/api-client.gen'
import { route } from '@/.guren/routes.gen'
import Layout from '../../components/Layout.js'

type PostFormData = ApiRoutes['posts.store']['body']

export default function NewPost() {
  const form = useForm<PostFormData>({ title: '', excerpt: '', body: '' })

  return (
    <Layout>
      <Head title="New post" />
      <section>
        <h1>
          <span aria-hidden />
          New post
        </h1>

        <form
          onSubmit={(event) => {
            event.preventDefault()
            form.post(route('posts.store'))
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
            Publish
          </button>
        </form>
      </section>
    </Layout>
  )
}
