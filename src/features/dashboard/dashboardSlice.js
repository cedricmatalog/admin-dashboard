import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { generateId } from './dashboardUtilities';

const initialState = {
  users: [],
  selectedUser: null,
  isUsersSortedByUsername: false,
};

export const fetchUsersAsync = createAsyncThunk('dashboard/fetchUsers', async () => {
  const response = await axios.get('https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data');
  return response.data;
});

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    addUser: (state, action) => {
      const newUser = { ...action.payload, id: generateId(state), address: { city: action.payload.city } };
      // delete city from object to match existing shape of users and remove redundacy { city: 'sample', address: { city : 'sample' } }
      delete newUser['city'];
      state.users = [...state.users, newUser];
    },
    updateUser: (state, action) => {
      const updatedUser = { ...action.payload, address: { city: action.payload.city } };
      // delete city from object to match existing shape of users and remove redundacy { city: 'sample', address: { city : 'sample' } }
      delete updatedUser['city'];
      state.users[action.payload.id - 1] = updatedUser;
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    removeSelectedUser: (state) => {
      state.selectedUser = null;
    },
    sortUsersByUsername: (state) => {
      const sortedUsersByUsername = state.users.sort((a, b) => a.username.localeCompare(b.username));
      state.users = state.isUsersSortedByUsername ? sortedUsersByUsername.reverse() : sortedUsersByUsername;
      state.isUsersSortedByUsername = !state.isUsersSortedByUsername;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsersAsync.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export const { addUser, deleteUser, updateUser, setSelectedUser, removeSelectedUser, sortUsersByUsername } =
  dashboardSlice.actions;

export const selectUsers = (state) => state.dashboard.users;

export const selectedUser = (state) => state.dashboard.selectedUser;

export default dashboardSlice.reducer;
