import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import ItemBasket from "src/components/item-basket";
import List from 'src/components/list';
import './style.css'
import {numberFormat} from "src/utils";

function Cart(props) {

  const renders = {
    item: useCallback(item => {
      return <ItemBasket item={item} titleButton='Добавить' onButton={props.onDeleteToCartItem}/>
    }, []),
  };

  if (props.items.length === 0) {
    return (
      <div className={'Cart'}>
        <p className='Cart-empty'>Корзина пуста</p>
      </div>
    );
  }

  return (
    <div className='Cart'>

      <List list={props.items}
            renderItem={renders.item}/>

      <div className='Cart-total'>
        <p>Итого</p> <p>{numberFormat(props.total)}</p>
      </div>
    </div>
  );
}

Cart.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  total: propTypes.number,
  onDeleteToCartItem: propTypes.func.isRequired,
}

export default React.memo(Cart);
