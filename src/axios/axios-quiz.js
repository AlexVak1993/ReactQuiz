import axios from 'axios'

export default axios.create({
  baseURL: 'https://reactquiz-a6ea8-default-rtdb.europe-west1.firebasedatabase.app/'
})