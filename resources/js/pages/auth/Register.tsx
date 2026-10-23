import { Head, Link, useForm } from '@inertiajs/react'
import { useId } from 'react'
import Layout from '../../components/Layout.js'
import type { ValidationErrors } from '@guren/core'

interface Props {
  errors?: ValidationErrors<'name' | 'email' | 'password' | 'passwordConfirmation'>
}

type RegisterFormData = {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

export default function Register({ errors = {} }: Props) {
  const form = useForm<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  const nameId = useId()
  const emailId = useId()
  const passwordId = useId()
  const passwordConfirmationId = useId()

  return (
    <Layout>
      <Head title="Sign up" />
      <section>
        <h1>
          <span aria-hidden />
          Create an account
        </h1>
        <p>
          Sign up to get started.
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
            form.post('/register')
          }}
        >
          <div>
            <label htmlFor={nameId}>
              Name
            </label>
            <input
              id={nameId}
              type="text"
              value={form.data.name}
              onChange={(event) => form.setData('name', event.target.value)}
              required
            />
            {errors.name && <p>{errors.name}</p>}
          </div>

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

          <div>
            <label htmlFor={passwordConfirmationId}>
              Confirm password
            </label>
            <input
              id={passwordConfirmationId}
              type="password"
              value={form.data.passwordConfirmation}
              onChange={(event) => form.setData('passwordConfirmation', event.target.value)}
              required
            />
            {errors.passwordConfirmation && (
              <p>{errors.passwordConfirmation}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={form.processing}
          >
            Create account
          </button>
        </form>

        <p>
          Already have an account?{' '}
          <Link href="/login">
            Sign in
          </Link>
        </p>
      </section>
    </Layout>
  )
}
