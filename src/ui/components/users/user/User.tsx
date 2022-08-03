import React from 'react';

import { useAppSelector } from '../../../../hooks/hooks';

import style from './User.module.scss';

type UserPropsType = {
  isLoading: boolean;
};

export const User: React.FC<UserPropsType> = ({ isLoading }) => {
  const users = useAppSelector(state => state.users.usersPage);

  if (isLoading) {
    return <h2>Загрузка...</h2>;
  }

  return (
    <tbody>
      {users.map(user => (
        <tr key={user.id}>
          <td className={style.idRow}>{user.id}</td>
          <td>{user.title}</td>
          <td> {user.body}</td>
        </tr>
      ))}
    </tbody>
  );
};
