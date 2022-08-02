import React, { ChangeEvent, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useDebounce } from '../../../hooks/hooks';
import { search } from '../../../store/usersReducer';

import style from './Search.module.scss';

type SearchPropsType = {
  currentPage: number;
  paginate: (number: number) => void;
};

const DEBOUNCE_SEARCH_TIMER = 400;

export const Search: React.FC<SearchPropsType> = ({ currentPage, paginate }) => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [searchingValue, setSearchingValue] = useState<string>('');

  const innerDebounceCallback = (value: string): void => {
    dispatch(search({ searchValue: value }));
    paginate(1);
    navigate(`/${currentPage}`);
  };

  const debouncedSearch = useDebounce(innerDebounceCallback, DEBOUNCE_SEARCH_TIMER);
  const onSearchHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget;

    setSearchingValue(e.currentTarget.value);
    debouncedSearch(value);
    if (value === '') {
      paginate(1);
      navigate(`/${currentPage}`);
    }
  };

  return (
    <div className={style.searchBlock}>
      <input
        placeholder="Поиск"
        className={style.input}
        value={searchingValue}
        onChange={onSearchHandler}
      />
      <div className={style.icon} />
    </div>
  );
};
