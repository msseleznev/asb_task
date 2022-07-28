import React from 'react';

import style from './App.module.scss';
import { Users } from './common/users/Users';

export const App = React.memo(() => {
  return (
    <div className={style.wrapper}>
      <div className={style.appBlock}>
        <div className={style.content}>
          <div className={style.search}>search</div>
          <div className={style.table}>
            <Users />
          </div>
          <div>paginator</div>
        </div>
      </div>
    </div>
  );
});
