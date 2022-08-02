import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { postsAPI, UserType } from '../api/api';

import { AppThunk } from './store';

type SliceState = {
  usersData: UserType[];
  usersDataApp: UserType[];
  usersPage: UserType[];
  isLoading: boolean;
  usersLimit: number;
};

export type SortOptionsType = 'id' | 'title' | 'body';
export type SortOrderType = 'up' | 'down';

const initialState: SliceState = {
  usersData: [],
  usersDataApp: [],
  usersPage: [],
  isLoading: false,
  usersLimit: 10,
};

const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUsersData(state, action: PayloadAction<{ users: UserType[] }>) {
      state.usersData = action.payload.users;
      state.usersDataApp = action.payload.users;
    },
    setLoading(state, action: PayloadAction<{ value: boolean }>) {
      state.isLoading = action.payload.value;
    },
    setUsersPage(state, action: PayloadAction<{ currentPage: number }>) {
      const lastUserIndex = state.usersLimit * action.payload.currentPage;
      const firstUserIndex = lastUserIndex - state.usersLimit;

      state.usersPage = state.usersDataApp.slice(firstUserIndex, lastUserIndex);
    },
    setSorting(
      state,
      action: PayloadAction<{ sortOptions: SortOptionsType; sortOrder: SortOrderType }>,
    ) {
      const sortUsersData = state.usersDataApp.sort((a, b) =>
        a[action.payload.sortOptions] <= b[action.payload.sortOptions] ? -1 : 1,
      );

      if (action.payload.sortOrder === 'up') {
        state.usersDataApp = sortUsersData;
      }

      if (action.payload.sortOrder === 'down') {
        state.usersDataApp = sortUsersData.reverse();
      }
    },
    search(state, action: PayloadAction<{ searchValue: string }>) {
      const filter = (fields: SortOptionsType[], value: string): UserType[] =>
        state.usersData.filter(item =>
          fields.some(field => item[field].toString().includes(value)),
        );

      state.usersDataApp = filter(['id', 'title', 'body'], action.payload.searchValue);
    },
  },
});

export const usersReducer = slice.reducer;
export const { getUsersData, setLoading, setUsersPage, setSorting, search } =
  slice.actions;

export type UsersActionsType =
  | ReturnType<typeof getUsersData>
  | ReturnType<typeof setLoading>
  | ReturnType<typeof setUsersPage>
  | ReturnType<typeof setSorting>
  | ReturnType<typeof search>;

export const fetchUsers =
  (page: number): AppThunk =>
  dispatch => {
    dispatch(setLoading({ value: true }));
    postsAPI.getUsers().then(res => {
      dispatch(getUsersData({ users: res.data }));
      dispatch(setUsersPage({ currentPage: page }));
      dispatch(setLoading({ value: false }));
    });
  };
