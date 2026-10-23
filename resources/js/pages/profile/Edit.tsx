import { Head, useForm } from '@inertiajs/react'
import { useId, type FormEvent } from 'react'
import Layout from '../../components/Layout.js'
import type { ValidationErrors } from '@guren/core'

interface Props {
  profile: { name: string; email: string }
  errors?: ValidationErrors<'name' | 'email' | 'password'>
  status?: string
}

type ProfileFormValues = {
  name: string
  email: string
  password: string
}

export default function ProfileEdit({ profile, status }: Props) {
  const form = useForm<ProfileFormValues>({
    name: profile.name,
    email: profile.email,
    password: '',
  })

  const nameId = useId()
  const emailId = useId()
  const passwordId = useId()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    form.put('/profile')
  }

  return (
    <Layout>
      <Head title="Profile" />
      <section>
        <header>
          <h1>
            <span aria-hidden />
            Profile
          </h1>
          <p>Update your account details and password.</p>
        </header>

        {status ? (
          <p>
            <span>ok</span>
            <span>{status}</span>
          </p>
        ) : null}

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor={nameId}>
              Name
            </label>
            <input
              id={nameId}
              type="text"
              value={form.data.name}
              onChange={(event) => form.setData('name', event.target.value)}
            />
            {form.errors.name ? <p>{form.errors.name}</p> : null}
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
            />
            {form.errors.email ? <p>{form.errors.email}</p> : null}
          </div>

          <div>
            <label htmlFor={passwordId}>
              New password
            </label>
            <input
              id={passwordId}
              type="password"
              value={form.data.password}
              onChange={(event) => form.setData('password', event.target.value)}
            />
            {form.errors.password ? <p>{form.errors.password}</p> : null}
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
