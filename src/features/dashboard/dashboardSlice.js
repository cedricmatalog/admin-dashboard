import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { formatUserData, generateId } from './dashboardUtilities';

const initialState = {
  users: [],
  selectedUser: null,
  isUsersSortedByUsername: null,
  status: 'idle',
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
      const newUser = formatUserData({
        ...action.payload,
        id: generateId(state),
        address: { city: action.payload.city },
      });

      state.users = [...state.users, newUser];
    },
    updateUser: (state, action) => {
      const updatedUser = formatUserData({
        ...action.payload,
        address: { city: action.payload.city ?? action.payload.address.city },
      });
      const index = state.users.findIndex((user) => user.id === action.payload.id);
      state.users[index] = updatedUser;
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
    builder
      .addCase(fetchUsersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.users = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchUsersAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { addUser, deleteUser, updateUser, setSelectedUser, removeSelectedUser, sortUsersByUsername } =
  dashboardSlice.actions;

export default dashboardSlice.reducer;
