import {memo, useCallback, useEffect} from 'react';
import Loading from "../../components/loading";
import Pagination from "../../components/pagination";
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Main() {

  const store = useStore();

  useEffect(() => {
    store.actions.catalog.loadProducts();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    count: state.catalog.count,
    currentPage: state.catalog.page,
    contentPerPage: state.catalog.contentPerPage,
    isLoading: state.catalog.isLoading,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    //сохранение текущей страницы
    setCurrentPage: useCallback(page => store.actions.catalog.setPage(page), []),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      {select.isLoading ? <Loading/> :
      <List list={select.list} renderItem={renders.item}/>}
      <Pagination count={select.count} setCurrentPage={callbacks.setCurrentPage}
                  currentPage={select.currentPage}/>
    </PageLayout>

  );
}

export default memo(Main);
