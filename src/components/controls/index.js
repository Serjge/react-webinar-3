import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';
import BasketTool from "src/components/basket-tool";
import Menu from "src/components/menu";

function Controls({amount, openModalBasket, sum}){
  return (
    <div className='Controls'>
      <Menu/>
      <BasketTool onOpen={openModalBasket} amount={amount}
                  sum={sum}/>
    </div>
  )
}

Controls.propTypes = {
  openModalBasket: PropTypes.func,
  amount: PropTypes.number,
  sum: PropTypes.number,
};

Controls.defaultProps = {
  onAdd: () => {}
}

export default memo(Controls);
