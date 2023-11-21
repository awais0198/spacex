import { useState, useEffect } from 'react'
import { login, saveUserToLocalStorage, signup } from '../services'

export default function Account({ accountModal }) {
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [responseMsg, setResponseMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setResponseMsg('')

    const data = isLogin ? await login(username, password) : await signup(username, password)

    if (data?.token) {
      saveUserToLocalStorage(data)
      accountModal(false)
      return
    }

    if (data?.user?.id) {
      setIsLogin(true)
      setResponseMsg(data?.message)
      return
    }

    setResponseMsg(data?.error || data?.message[0])
    setTimeout(() => setResponseMsg(''), 3000)
  }

  useEffect(() => {
    setTimeout(() => setResponseMsg(''), 1000)
  }, [isLogin])

  return (
    <section>
      <div class='flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0'>
        <div class='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
          <div class='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 class='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
              Journey to SpaceX
            </h1>
            <form class='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
              <div>
                <label
                  for='username'
                  class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Your username
                </label>
                <input
                  type='username'
                  name='username'
                  id='username'
                  minLength={3}
                  class='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='jhondoe90'
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label
                  for='password'
                  class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  id='password'
                  minlength={6}
                  placeholder='••••••••'
                  class='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <span class='text-orange-200'>{responseMsg}</span>
              <button
                type='submit'
                disabled={!username || !password}
                class='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
              >
                {isLogin ? 'Login' : 'Create Account'}
              </button>
            </form>
            <p class='text-sm font-light text-gray-500 dark:text-gray-400'>
              {!isLogin ? 'Have an account? ' : 'Don’t have an account yet? '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                class='font-medium text-primary-600 hover:underline dark:text-primary-500'
              >
                {!isLogin ? 'Login' : 'Create Account'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
