import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../bll/hooks';
import { getUsersTC } from '../../../bll/usersReducer';

import { User } from './user/User';
import style from './Users.module.scss';

export const Users = React.memo(() => {
  const users = useAppSelector(state => state.users.usersData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsersTC());
  }, []);

  return (
    <div className={style.tableBlock}>
      <table>
        <thead>
          <tr>
            <th className={style.idColum}>ID</th>
            <th className={style.headerColum}>Заголовок</th>
            <th className={style.descriptionColum}>Описание</th>
          </tr>
        </thead>
        <tbody>
          {users.map(data => (
            <User key={data.id} data={data} />
          ))}
        </tbody>
      </table>
    </div>
  );
});
