import { Head, Link, useForm } from '@inertiajs/react'
import { useId } from 'react'
import Layout from '../../components/Layout.js'
import type { ValidationErrors } from '@guren/core'

interface Props {
  email?: string
  errors?: ValidationErrors<'email' | 'password'>
}

type LoginFormData = {
  email: string
  password: string
  remember: boolean
}

export default function Login({ email = '', errors = {} }: Props) {
  const form = useForm<LoginFormData>({
    email,
    password: '',
    remember: false,
  })

  const emailId = useId()
  const passwordId = useId()

  return (
    <Layout>
      <Head title="Sign in" />
      <section>
        <h1>
          <span aria-hidden />
          Sign in
        </h1>
        <p>
          Use your account credentials to continue.
        </p>

        {errors.message && (
          <p>
            <span>error</span>
            <span>{errors.message}</span>
          </p>
        )}

        <form
          onSubmit={(event) => {
            event.preventDefault()
            form.post('/login')
          }}
        >
          <div>
            <label htmlFor={emailId}>
              Email
            </label>
            <input
              id={emailId}
              type="email"
              value={form.data.email}
              onChange={(event) => form.setData('email', event.target.value)}
              required
            />
            {errors.email && <p>{errors.email}</p>}
          </div>

          <div>
            <label htmlFor={passwordId}>
              Password
            </label>
            <input
              id={passwordId}
              type="password"
              value={form.data.password}
              onChange={(event) => form.setData('password', event.target.value)}
              required
            />
            {errors.password && <p>{errors.password}</p>}
          </div>

          <label>
            <input
              type="checkbox"
              checked={form.data.remember}
              onChange={(event) => form.setData('remember', event.target.checked)}
            />
            Remember me
          </label>

            <button
              type="submit"
              disabled={form.processing}
            >
              Sign in
          </button>
        </form>

        <p>
          Don&apos;t have an account?{' '}
          <Link href="/register">
            Sign up
          </Link>
        </p>
      </section>
    </Layout>
  )
}
