import {memo, useCallback} from 'react';
import {useParams} from "react-router-dom";
import Comments from "src/components/comments";
import Comment from "src/components/comments/coment";
import ProtectedComments from "src/containers/protected-comments";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import ArticleCard from "../../components/article-card";
import LocaleSelect from "../../containers/locale-select";
import TopHead from "../../containers/top-head";
import {useDispatch, useSelector as useSelectorRedux} from 'react-redux';
import shallowequal from "shallowequal";
import articleActions from '../../store-redux/article/actions';
import commentsActions from '../../store-redux/comments/actions';

function Article() {
  const store = useStore();
  const dispatch = useDispatch();
  // Параметры из пути /articles/:id
  const params = useParams();

  useInit(() => {
    dispatch(articleActions.load(params.id));
  }, [params.id]);

  const select = useSelectorRedux(state => ({
    article: state.article.data,
    waiting: state.article.waiting,
    comments: state.comments.data,
    textEditor: state.comments.textEditor,
    rerender: state.comments.rerender,
    waitingComments: state.comments.waiting,
  }), shallowequal); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  useInit(async () => {
    dispatch(commentsActions.loadComments(params.id));
    dispatch(commentsActions.setEditor(params.id));
  }, [params.id, select.rerender]);

  const {t} = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    setEditor: useCallback(id => dispatch(commentsActions.setEditor(id)), []),
  }

  const renders = {
    comment: useCallback(item => (
      <Comment textEditor={select.textEditor} setEditor={callbacks.setEditor}
               comment={item} key={item.id}>
        <ProtectedComments id={item.id} redirect={'/login'}/>
      </Comment>
    ), [select.textEditor]),
  };

  return (
    <PageLayout>
      <TopHead/>

      <Head title={select.article.title}>
        <LocaleSelect/>
      </Head>

      <Navigation/>

      <Spinner active={select.waiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t}/>
      </Spinner>

      <Spinner active={select.waitingComments}>
        <Comments comments={select.comments} renderComment={renders.comment}>
          <ProtectedComments id={params.id} redirect={'/login'}/>
        </Comments>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);
