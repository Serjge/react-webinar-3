import React, {useCallback, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import Head from "src/components/head";
import LoginForm from "src/components/login-form";
import PageLayout from "src/components/page-layout";
import Navigation from "src/containers/navigation";
import TopContainer from "src/containers/top";
import Spinner from "../../components/spinner";
import LocaleSelect from "../../containers/locale-select";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";

function Login() {
  const store = useStore();

  const navigate = useNavigate();

  useEffect(()=>{
    store.actions.auth.setErrorMessage(null);
  },[])

  const select = useSelector(state => ({
    waiting: state.auth.waiting,
    isLogin: state.auth.isLogin,
    errorMessage: state.auth.errorMessage,
  }));

  const {t} = useTranslate();

  const callbacks = {
    onLogin: useCallback(async (login, password) => {
      await store.actions.auth.sigIn(login, password);
    }, []),
  };

  useEffect(() => {
    if (select.isLogin && window.history.length < 3) {
      navigate('/')
    }
    if (select.isLogin && window.history.length > 3) {
      navigate(-1)
    }
  }, [select.isLogin])


  return (
    <PageLayout>
      <TopContainer/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <LoginForm errorMessage={select.errorMessage} onLogin={callbacks.onLogin} t={t}/>
      </Spinner>
    </PageLayout>
  )
}

export default React.memo(Login);
