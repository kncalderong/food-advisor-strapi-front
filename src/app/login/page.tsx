'use client'

import { useAppContext } from '@/context/appContext'
import { useRouter } from 'next/navigation'
import { gql, useMutation } from '@apollo/client'
import Cookie from 'js-cookie'
import Loader from '@/components/Loader'
import Form from '@/components/Form'
import { useState } from 'react'

const LOGIN_MUTATION = gql`
  mutation Login($identifier: String!, $password: String!) {
    login(input: { identifier: $identifier, password: $password }) {
      jwt
      user {
        username
        email
        id
      }
    }
  }
`

const Login = () => {
  const router = useRouter()
  const { setupUser } = useAppContext()

  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loginMutation, { loading, error }] = useMutation(LOGIN_MUTATION)

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { email, password } = formData
    const { data } = await loginMutation({
      variables: { identifier: email, password },
    })
    if (data?.login.user) {
      setupUser(data.login.user)
      Cookie.set('token', data.login.jwt)
      router.push('/')
    }
  }

  if (loading) return <Loader />

  return (
    <Form
      title='Login'
      buttonText='Login'
      formData={formData}
      setFormData={setFormData}
      callback={handleLogin}
      error={error}
    />
  )
}

export default Login
