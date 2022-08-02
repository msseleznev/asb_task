import React, { useEffect } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { setUsersPage } from '../../../store/usersReducer';
import { SortItem } from '../sortItem/SortItem';

import { User } from './user/User';
import style from './Users.module.scss';

type UsersPropsType = {
  pageURL: number;
};

export const Users: React.FC<UsersPropsType> = ({ pageURL }) => {
  const isLoading = useAppSelector(state => state.users.isLoading);
  const users = useAppSelector(state => state.users.usersDataApp);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setUsersPage({ currentPage: pageURL }));
  }, [dispatch, pageURL, users]);

  return (
    <div className={style.tableBlock}>
      <table>
        <thead>
          <tr>
            <th className={style.idColum}>
              <SortItem title="ID" sortOptions="id" />
            </th>
            <th className={style.headerColum}>
              <SortItem title="Заголовок" sortOptions="title" />
            </th>
            <th className={style.descriptionColum}>
              <SortItem title="Описание" sortOptions="body" />
            </th>
          </tr>
        </thead>
        <Routes>
          <Route path="/" element={<Navigate to={`${pageURL}`} />} />
          <Route path={`${pageURL}`} element={<User isLoading={isLoading} />} />
        </Routes>
      </table>
    </div>
  );
};
