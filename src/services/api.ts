import axios from 'axios'

const api = axios.create({
  baseURL: 'https://crudappestudos.herokuapp.com',
})

export default api
