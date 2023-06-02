import {memo, useCallback} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import SideLayout from "src/components/side-layout";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";

function TopContainer() {

  const {t} = useTranslate();

  const navigate = useNavigate();
  const location = useLocation();
  const store = useStore();

  const select = useSelector(state => ({
    isLogin: state.auth.isLogin,
    userName: state.auth.username,
    waiting: state.auth.waiting,
  }))

  const callbacks = {
    onLogin: useCallback(() => navigate('/login', {state: {back: location.pathname}}), []),
    onLogout: useCallback(() => store.actions.auth.logout(), []),
  };

  return (
    <SideLayout side="end" padding="small">
      <>{select.isLogin && <Link to="/profile">{select.userName}</Link>}</>
      {select.isLogin
        ? <button onClick={callbacks.onLogout}>{t('session.signOut')}</button>
        : <button onClick={callbacks.onLogin}>{t('session.signIn')}</button>
      }
    </SideLayout>
  );
}

export default memo(TopContainer);
