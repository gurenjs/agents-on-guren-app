import { useState, type FormEvent } from 'react'
import { Head, Link } from '@inertiajs/react'
import type { PaginatedPageProps } from '@guren/core'
import type { PostResourceData } from '@/app/Http/Resources/PostResource'
import { route } from '@/.guren/routes.gen'
import { createApiClient, type ApiRoutes } from '@/.guren/api-client.gen'
import Layout from '../../components/Layout.js'

interface Props extends PaginatedPageProps<PostResourceData> {}

const api = createApiClient<ApiRoutes>({ baseUrl: '' })

export default function PostsIndex({ data, pagination }: Props) {
  const [keywords, setKeywords] = useState('')
  const [results, setResults] = useState<PostResourceData[] | null>(null)
  const [searching, setSearching] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function search(event: FormEvent) {
    event.preventDefault()
    const terms = keywords.split(/\s+/).filter((term) => term.length > 0)
    if (terms.length === 0) {
      setResults(null)
      setError(null)
      return
    }

    setSearching(true)
    setError(null)
    try {
      const response = await api.request('posts.search', { body: { keywords: terms } })
      if (!response.ok) {
        setError('Search failed — try fewer or shorter keywords.')
        return
      }
      const payload = await response.json()
      setResults(payload.data)
    } catch {
      setError('Search failed — check your connection and try again.')
    } finally {
      setSearching(false)
    }
  }

  const posts = results ?? data

  return (
    <Layout>
      <Head title="Posts" />
      <section>
        <h1>
          <span aria-hidden />
          Posts
        </h1>

        <form onSubmit={search}>
          <input
            type="search"
            value={keywords}
            onChange={(event) => setKeywords(event.target.value)}
            placeholder="Search posts…"
          />
          <button
            type="submit"
            disabled={searching}
          >
            Search
          </button>
        </form>

        {error !== null && <p>{error}</p>}

        {results !== null && (
          <p>
            {results.length} {results.length === 1 ? 'result' : 'results'} ·{' '}
            <button
              type="button"
              onClick={() => {
                setKeywords('')
                setResults(null)
                setError(null)
              }}
            >
              Clear
            </button>
          </p>
        )}

        <div>
          {posts.map((post) => (
            <article key={post.id}>
              <Link
                href={route('posts.show', { id: post.id })}
              >
                {post.title}
              </Link>
              <p>{post.excerpt}</p>
              {post.author ? (
                <p>by {post.author.name}</p>
              ) : null}
            </article>
          ))}
        </div>

        {results === null && pagination?.links?.pages && (
          <nav>
            {pagination.links.pages.map((page) => (
              <Link
                key={page.page}
                href={page.url ?? '#'}
              >
                {page.page}
              </Link>
            ))}
          </nav>
        )}
      </section>
    </Layout>
  )
}
