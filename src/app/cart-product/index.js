import BasketTool from "src/components/basket-tool";
import Controls from "src/components/controls";
import Head from "src/components/head";
import PageLayout from "src/components/page-layout";
import Loading from "../../components/loading";
import NotFounts from "../../components/not-founts";
import React, {useCallback, useEffect} from "react";
import Cart from "../../components/cart";
import {useParams} from "react-router-dom";
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";

function CartProduct() {
  console.log('CartProduct');

  const {id} = useParams();
  const store = useStore();

  useEffect(() => {
    store.actions.cart.loadProduct(id);
  }, [id]);

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    item: state.cart.item,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  if (select.isLoading) {
    return (
      <PageLayout>
        <Head title=''/>
        <Loading/>
        </PageLayout>
    )
  }

  return (
    <PageLayout>
      <Head title={select.item === null ? '' : select.item.title}/>
      <Controls amount={select.amount} sum={select.sum}
                openModalBasket={callbacks.openModalBasket}/>
      {select.item !== null ? <Cart item={select.item} onAdd={callbacks.addToBasket}/> :
        <NotFounts/>}
    </PageLayout>
  );
}

export default React.memo(CartProduct);
