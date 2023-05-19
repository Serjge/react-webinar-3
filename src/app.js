import React, {useCallback, useState} from 'react';
import Item from "src/components/item";
import ModalCart from "src/components/modal-cart";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const basket = store.getState().basket;

  const [modal, setModal] = useState(false)

  const callbacks = {

    onAddItem: useCallback(() => {
      store.addItem();
    }, [store]),

    onAddToBasket: useCallback((code) => {
      store.addToBasket(code);
    }, [store]),

    onCloseModal: useCallback(() => {
      document.body.style.overflow = "scroll"
      setModal(false);
    }, [modal]),

    onOpenModal: useCallback(() => {
      document.body.style.overflow = "hidden"
      setModal(true);
    }, [modal]),

    onRemoveFromBasket: useCallback((code) => {
      store.deleteToBasket(code);
    }, [store]),
  };


  const renders = {
    item: useCallback(item => {
      return <Item item={item} onButton={callbacks.onAddToBasket}/>
    }, []),
  };

  return (
    <>
    <PageLayout>
      <Head title='Магазин'/>
      <Controls amount={basket.amount} sum={basket.sum} onOpenModal={callbacks.onOpenModal}/>
      <List list={list}
            renderItem={renders.item}/>
    </PageLayout>

      {modal && <ModalCart totalSum={basket.sum} cart={basket.items} onCloseModal={(callbacks.onCloseModal)} onRemoveFromBasket={callbacks.onRemoveFromBasket}/>}

    </>
  );
}

export default App;
