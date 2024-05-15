import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api-crud-projects.onrender.com',
})

export default api
