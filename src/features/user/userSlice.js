import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerUser = createAsyncThunk('user/register', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post('https://fakestoreapi.com/users', userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const loginUser = createAsyncThunk('user/login', async ({ username, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post('https://fakestoreapi.com/auth/login', { username, password });
    const data = response.data;
    sessionStorage.setItem('user', JSON.stringify(data));
    return { user: { username }, token: data.token };
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updateUser = createAsyncThunk('user/update', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.put(`https://fakestoreapi.com/users/${userData.id}`, userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const deleteUser = createAsyncThunk('user/delete', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`https://fakestoreapi.com/users/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const initialState = {
  user: JSON.parse(sessionStorage.getItem('user'))?.user || null,
  token: JSON.parse(sessionStorage.getItem('user'))?.token || null,
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        sessionStorage.setItem('user', JSON.stringify(action.payload));
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        sessionStorage.setItem('user', JSON.stringify(action.payload));
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        sessionStorage.setItem('user', JSON.stringify(action.payload));
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.user = null;
        state.token = null;
        sessionStorage.removeItem('user');
        state.error = null;
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state) => {
          state.status = 'succeeded';
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.status = 'failed';
          state.error = action.payload || action.error.message;
        }
      );
  },
});

export default userSlice.reducer;