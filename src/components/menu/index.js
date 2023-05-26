import React, {useCallback} from 'react';
import {useNavigate} from "react-router-dom";
import ItemMenu from "../Item-menu";


function Menu() {
  console.log('menu')
  const navigate = useNavigate();

  const callbacks = {
    onNavigateMainPage: useCallback(() => navigate(`/`), []),
  };

  return (
    <ItemMenu name='Главная' onLink={callbacks.onNavigateMainPage}/>
  )
}

export default React.memo(Menu);
