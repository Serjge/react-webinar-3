import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {numberFormat, plural} from "src/utils";

function Controls({amount, sum, onOpenModal}){
  return (
   <div className='Controls'>
     <p className='Controls-description'>В корзине: </p>
     <p className='Controls-product'>
       {amount ? ` ${amount} ${plural(amount, {one:'товар', few: 'товара',  many: 'товаров'})}` : 'пусто'}
        {amount ? ` / ${numberFormat(sum)}` : null}
     </p>
     <button className='Controls-button' onClick={onOpenModal}>Перейти</button>
   </div>
  )
}

Controls.propTypes = {
  sum: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

Controls.defaultProps = {
  sum: 0,
  amount: 0,
  onOpenModal: () => {},
}

export default React.memo(Controls);
