const BASE_URL = 'http://localhost:8000/api/v1'
export const CURRENT_USER = 'current-user'

export const saveUserToLocalStorage = (userData) => {
  localStorage.setItem(CURRENT_USER, JSON.stringify(userData))
  window.dispatchEvent(new Event('storage'))
}

export const getCurrentUser = () => {
  const userData = localStorage.getItem(CURRENT_USER)
  if (userData) {
    return JSON.parse(userData)
  }
  return null
}

export const login = async (username, password) => {
  const requestData = {
    username: username,
    password: password,
  }
  try {
    const res = await fetch(`${BASE_URL}/user/login`, {
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(requestData),
    })
    return await res.json()
  } catch (error) {
    return error.json()
  }
}

export const signup = async (username, password) => {
  const requestData = {
    username: username,
    password: password,
  }
  try {
    const res = await fetch(`${BASE_URL}/user/register`, {
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(requestData),
    })
    return await res.json()
  } catch (error) {
    return error.json()
  }
}
