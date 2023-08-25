'use client'

import { useAppContext } from '@/context/appContext'
import { useRouter } from 'next/navigation'
import { gql, useMutation } from '@apollo/client'
import Cookie from 'js-cookie'
import Form from '@/components/Form'
import Loader from '@/components/Loader'
import { useState } from 'react'
import { FormDataType } from '@/types/SignupForm.d'

const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(
      input: { username: $username, email: $email, password: $password }
    ) {
      jwt
      user {
        username
        email
      }
    }
  }
`

const Register = () => {
  const router = useRouter()
  const { setupUser } = useAppContext()

  const [formData, setFormData] = useState<FormDataType>({
    email: '',
    password: '',
  })
  const [registerMutation, { loading, error }] = useMutation(REGISTER_MUTATION)

  const handleRegister = async () => {
    const { email, password } = formData
    const { data } = await registerMutation({
      variables: { username: email, email: email, password },
    })
    console.log('data on register page: ', data)
    if (data?.register.user) {
      setupUser(data.register.user)
      router.push('/')
      Cookie.set('token', data.register.jwt)
    }
  }

  if (loading) return <Loader />

  return (
    <Form
      title='Sign Up'
      buttonText='Sign Up'
      formData={formData}
      setFormData={setFormData}
      callback={handleRegister}
      error={error}
    />
  )
}

export default Register
