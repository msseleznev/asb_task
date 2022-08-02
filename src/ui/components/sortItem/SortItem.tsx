import React, { useState } from 'react';

import { useAppDispatch } from '../../../hooks/hooks';
import { setSorting, SortOptionsType, SortOrderType } from '../../../store/usersReducer';

import style from './SortItem.module.scss';

type SortItemType = {
  title: string;
  sortOptions: SortOptionsType;
};

export const SortItem: React.FC<SortItemType> = ({ title, sortOptions }) => {
  const dispatch = useAppDispatch();

  const [sortOrder, setSortOrder] = useState<SortOrderType>('down');
  const sort = (): void => {
    if (sortOrder === 'down') {
      setSortOrder('up');
    }
    if (sortOrder === 'up') {
      setSortOrder('down');
    }
    dispatch(setSorting({ sortOrder, sortOptions }));
  };

  const styleToggle =
    sortOrder === 'up' ? `${style.iconUp} ${style.iconDown}` : style.iconDown;

  return (
    <div
      className={style.header}
      onClick={sort}
      onKeyDown={sort}
      role="button"
      tabIndex={0}
    >
      {title}
      <div className={styleToggle} />
    </div>
  );
};
