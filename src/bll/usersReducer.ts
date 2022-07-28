import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { postsAPI, UserType } from '../api/api';

import { AppThunk } from './store';

const initialState = {
  usersData: [] as UserType[],
};

const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUsersData(state, action: PayloadAction<{ users: UserType[] }>) {
      state.usersData = action.payload.users;
    },
  },
});

export const usersReducer = slice.reducer;
export const { getUsersData } = slice.actions;

export type UsersActionsType = ReturnType<typeof getUsersData>;

export const getUsersTC = (): AppThunk => dispatch => {
  postsAPI.getUsers().then(res => {
    dispatch(getUsersData({ users: res.data }));
  });
};
