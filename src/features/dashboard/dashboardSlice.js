import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  users: [],
  selectedUser: null, 
  isUsersSortedByUsername: false,
}

export const fetchUsersAsync = createAsyncThunk('dashboard/fetchUsers', async () => {
  const response = await axios.get('https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data')
  return response.data
})

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    addUser: (state, action) => {
      const newUserId =
        state.users.length !== 0 ? state.users.sort((a, b) => a.id - b.id)[state.users.length - 1].id + 1 : 1
      const newUser = { ...action.payload, id: newUserId, address: { city: action.payload.city } }
      delete newUser['city']
      state.users = [...state.users, newUser]
    },
    updateUser: (state, action) => {
      const updatedUser = { ...action.payload, address: { city: action.payload.city } }
      state.users[action.payload.id - 1] = updatedUser
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload)
    },
    sortUsersByUsername: state => {
      const sortedUsersByUsername = state.users.sort((a, b) => a.username.localeCompare(b.username))
      state.users = state.isUsersSortedByUsername ? sortedUsersByUsername.reverse() : sortedUsersByUsername
      state.isUsersSortedByUsername = !state.isUsersSortedByUsername
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUsersAsync.fulfilled, (state, action) => {
      state.users = action.payload
    })
  },
})

export const { addUser, deleteUser, updateUser, sortUsersByUsername } = dashboardSlice.actions

export const selectUsers = state => state.dashboard.users

export const selectedUser = state => state.dashboard.selectedUser

export default dashboardSlice.reducer
