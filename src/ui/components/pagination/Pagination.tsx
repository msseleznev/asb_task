import React from 'react';

import { NavLink, useNavigate } from 'react-router-dom';

import style from './Pagination.module.scss';

type PaginationPropsType = {
  usersLimit: number;
  totalUsers: number;
  paginate: (number: number) => void;
  isLoading: boolean;
  currentPage: number;
};

export const Pagination: React.FC<PaginationPropsType> = ({
  usersLimit,
  totalUsers,
  paginate,
  isLoading,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalUsers / usersLimit; i += 1) {
    pageNumbers.push(i);
  }

  const navigate = useNavigate();
  const nextPageHandler = (): void => {
    if (currentPage < pageNumbers.length) {
      const nextPage = currentPage + 1;

      paginate(nextPage);
      navigate(`/${nextPage}`);
    }
  };
  const backPageHandler = (): void => {
    if (currentPage > 1) {
      const backPage = currentPage - 1;

      paginate(backPage);
      navigate(`/${backPage}`);
    }
  };

  return (
    <div>
      {!isLoading && (
        <div className={style.paginationBlock}>
          <div className={style.buttonLink}>
            <button onClick={backPageHandler} type="button">
              Назад
            </button>
          </div>
          <div className={style.buttonPage}>
            <nav>
              {pageNumbers.map(number => (
                <span key={number} className={style.item}>
                  <NavLink
                    to={`${number}`}
                    onClick={() => paginate(number)}
                    className={navData => (navData.isActive ? style.active : '')}
                  >
                    {number}
                  </NavLink>
                </span>
              ))}
            </nav>
          </div>
          <div className={style.buttonLink}>
            <button type="button" onClick={nextPageHandler}>
              Далее
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
