import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../../app/store';
import { User } from './User';

export interface UserState {
  user: User;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UserState = {
  user: { name: '', age: 0 },
  status: 'idle',
};

export const fetchUser = createAsyncThunk<
  User,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('user/fetchUser', async () => {
  const response = await new Promise<User>((resolve) =>
    setTimeout(() => resolve({ name: 'NakZ', age: 24 }), 2000),
  );
  return response;
});

export const login = createAsyncThunk<
  User,
  { userName: string; password: string },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('user/fetchUser', async ({ userName, password }) => {
  const response = await new Promise<User>((resolve) =>
    setTimeout(() => resolve({ name: userName, age: 24 }), 2000),
  );
  return response;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.status = 'loading';
    });

    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = 'idle';
    });

    builder.addCase(fetchUser.rejected, (state) => {
      state.status = 'failed';
    });
  },
});

export const selectUser = (state: RootState) => state.user.user;

export const userReducer = userSlice.reducer;
