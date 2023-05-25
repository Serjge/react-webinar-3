import {Route, Routes} from "react-router-dom";
import CartProduct from "src/app/cart-product";
import Main from "./main";
import Basket from "./basket";

import useSelector from "../store/use-selector";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={'/'} element={<Main/>}/>
        <Route path={'/:id'} element={<CartProduct/>}/>
      </Routes>
      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
