import {memo, useCallback, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import Controls from "src/components/controls";
import Loading from "../../components/loading";
import Pagination from "../../components/pagination";
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Main() {

  const store = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    store.actions.catalog.loadProducts();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    // count: state.catalog.count,
    currentPage: state.catalog.page,
    // contentPerPage: state.catalog.contentPerPage,
    isLoading: state.catalog.isLoading,
    totalPages: state.catalog.totalPages,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    //сохранение текущей страницы
    setCurrentPage: useCallback(page => store.actions.catalog.setPage(page), []),
    //Переход на страницу товара
    onPageProduct: useCallback(id => {
      navigate(`/articles/${id}`);
    }, []),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket}
                   onLink={() => callbacks.onPageProduct(item._id)}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls sum={select.sum} amount={select.amount}
                openModalBasket={callbacks.openModalBasket}/>
      {select.isLoading ? <Loading/> :
      <List list={select.list} renderItem={renders.item}/>}
      <Pagination setCurrentPage={callbacks.setCurrentPage}
                  currentPage={select.currentPage} totalPages={select.totalPages}/>
    </PageLayout>

  );
}

export default memo(Main);
