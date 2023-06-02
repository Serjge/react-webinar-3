import {Routes, Route} from 'react-router-dom';
import Login from "src/app/login";
import Profile from "src/app/profile";
import useInit from "src/hooks/use-init";
import useStore from "src/hooks/use-store";
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const store = useStore();

  useInit(async () => {
    await store.actions.auth.self();
  }, []);

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/login'} element={<Login/>}/>
        <Route path={'/profile'} element={<Profile/>}/>
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
