import axios from 'axios'

// A mock function to mimic making an async request for data
export  function fetchUsers() {
  return axios.get('https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data')
}
