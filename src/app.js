import React, {useCallback} from 'react';
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

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    onAddItem: useCallback(() => {
      store.addItem();
    }, [store]),

    onAddToBasket: useCallback((code) => {
      store.addToBasket(code);
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Приложение на чистом JS'/>
      <Controls amount={basket.amount} sum={basket.sum} onOpenModal={(() => {})}/>
      <List list={list}
            onButton={callbacks.onAddToBasket}
            titleButton="Добавить"/>
    </PageLayout>
  );
}

export default App;
