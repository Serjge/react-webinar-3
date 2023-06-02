import React, {memo, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Head from "src/components/head";
import PageLayout from "src/components/page-layout";
import ProfileUser from "src/components/profile-user";
import Spinner from "src/components/spinner";
import Navigation from "src/containers/navigation";
import TopContainer from "src/containers/top";
import useInit from "src/hooks/use-init";
import useStore from "src/hooks/use-store";
import useTranslate from "src/hooks/use-translate";
import LocaleSelect from "../../containers/locale-select";
import useSelector from "../../hooks/use-selector";

function Profile() {

  const store = useStore();
  const navigate = useNavigate();
  const {t} = useTranslate();

  useInit(async () => {
    await store.actions.profile.self();
  }, []);

  const select = useSelector(state => ({
    isInitialize: state.auth.isInitialize,
    user: state.profile.user,
    waiting: state.profile.waiting,
    isLogin: state.auth.isLogin,
  }));

  useEffect(()=> {
  if(!select.isLogin && !select.isInitialize) {
    navigate('/login');
  }
},[select.isLogin]);

  return (
    <PageLayout>
      <TopContainer/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ProfileUser user={select.user} t={t}/>
      </Spinner>
    </PageLayout>
  )
}

export default memo(Profile);
