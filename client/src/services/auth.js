import axios from 'axios'

const API_URL = '/api'

axios.defaults.withCredentials = true

export const register = async (username, password, pin, dob) => {
  const response = await axios.post(`${API_URL}/register`, {
    username,
    password,
    pin,
    dob
  })
  return response.data
}

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, {
    username,
    password
  })
  return response.data
}

export const logout = async () => {
  const response = await axios.post(`${API_URL}/logout`)
  return response.data
}

export const checkAuth = async () => {
  try {
    const response = await axios.get(`${API_URL}/user`)
    if (response.data.success) {
      return response.data.user
    }
    return null
  } catch (error) {
    return null
  }
}
