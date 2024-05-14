import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api-crud-projects.vercel.app',
})

export default api
