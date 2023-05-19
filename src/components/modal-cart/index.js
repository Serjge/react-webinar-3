import React from 'react';
import propTypes from 'prop-types';
import Cart from 'src/components/cart';
import LayoutModal from "src/components/layout-modal";

function ModalCart(props) {
  return (
      <LayoutModal onClose={props.onCloseModal} title='Корзина'>
        <Cart items={props.cart}
              total={props.totalSum}
              onDeleteToCartItem={props.onRemoveFromBasket}/>
      </LayoutModal>
  )
}

ModalCart.propTypes = {
  cart: propTypes.arrayOf(propTypes.object).isRequired,
  totalSum: propTypes.number.isRequired,
  onRemoveFromBasket: propTypes.func.isRequired,
  onCloseModal: propTypes.func.isRequired,
}

export default React.memo(ModalCart);
