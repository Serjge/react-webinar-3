import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function NotFounts() {
  const cn = bem('NotFount');

  return (
    <div className={cn()}>
      Не найдено
    </div>
  )
}



export default NotFounts;
