import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { fetchUsers, setUsersPage } from '../store/usersReducer';

import style from './App.module.scss';
import { Pagination } from './components/pagination/Pagination';
import { Search } from './components/search/Search';
import { Users } from './components/users/Users';

export const App: React.FC = () => {
  const usersLimit = useAppSelector(state => state.users.usersLimit);
  const isLoading = useAppSelector(state => state.users.isLoading);
  const users = useAppSelector(state => state.users.usersDataApp);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const PAGE = 1;
  const [currentPage, setCurrentPage] = useState<number>(PAGE);

  useEffect(() => {
    dispatch(fetchUsers(currentPage));
    navigate(`/${currentPage}`);
  }, [dispatch]);

  const paginate = (pageNumber: number): void => {
    dispatch(setUsersPage({ currentPage: pageNumber }));
    setCurrentPage(pageNumber);
  };

  return (
    <div className={style.wrapper}>
      <div className={style.appBlock}>
        <div className={style.content}>
          <Search currentPage={currentPage} paginate={paginate} />
          <Users pageURL={currentPage} />
          <Pagination
            usersLimit={usersLimit}
            totalUsers={users.length}
            paginate={paginate}
            isLoading={isLoading}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};
