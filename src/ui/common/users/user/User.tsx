import React from 'react';

import { UserType } from '../../../../api/api';

import style from './User.module.scss';

type UserPropsType = {
  data: UserType;
};

export const User: React.FC<UserPropsType> = ({ data }) => {
  return (
    <tr>
      <td className={style.idRow}>{data.id}</td>
      <td>{data.body}</td>
      <td>{data.title}</td>
    </tr>
  );
};
