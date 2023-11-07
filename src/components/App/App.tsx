import {Routes, Route, useNavigate } from 'react-router-dom';
import { useLocation } from "react-router";
import { useDispatch, useSelector } from '../../services/hooks';
import {useEffect} from 'react';

import { HomePage} from '../../pages/Home';
import { LoginPage } from '../../pages/Login';
import { RegisterPage } from '../../pages/Register';
import { ForgotPassword } from '../../pages/Forgot-password';
import { ResetPassword } from '../../pages/Reset-password';
import { ProfilePage } from '../../pages/Profile';
import { ProtectedRouteElement } from '../protected-route';

import AppHeader from '../AppHeader/AppHeader';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';
import { getUser } from '../../services/actions/registration';
import { getIngredient } from '../../services/actions/ingredient';
import { FeedPage } from '../../pages/Feed';
import { IdPage } from '../../pages/Id';
import { ProfileOrdersPage } from '../../pages/Profile-orders';
import { WS_CONNECTION_START } from '../../services/actions/wsAction';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const {messages, ownOrder} = useSelector(store => store.ws);

  const accessToken = localStorage.getItem('accessToken');
  useEffect(() => {
    accessToken && dispatch(getUser());
    dispatch(getIngredient())
  }, [accessToken, dispatch])
  
  /*useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
  }, [accessToken, dispatch])*/

  const background = location.state && location.state.background;

  const handleModalClose = (): void => {
    navigate(-1);
  };

  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<HomePage />}/>
        <Route path='/ingredients/:ingredientId' element={<IngredientDetails />}/>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/register' element={<RegisterPage />}/>
        <Route path='/forgot-password' element={<ForgotPassword />}/>
        <Route path='/reset-password' element={<ResetPassword />}/>
        <Route path='/profile' element={<ProtectedRouteElement element={<ProfilePage/>} />} />
        <Route path='/profile/orders' element={<ProtectedRouteElement element={<ProfileOrdersPage/>} />} />
        {ownOrder && <Route path='/profile/orders/:ingredientId' element={<ProtectedRouteElement element={<IdPage owner={true}/>} />} />}
        <Route path='/feed' element={<FeedPage />}/>
        {messages && <Route path='/feed/:ingredientId' element={<IdPage />}/>}
      </Routes>
      {background && (
        <Routes>
            <Route
              path='/ingredients/:ingredientId'
              element={
                <Modal title={'Детали ингредиента'} handleCloseModal={handleModalClose} isIngredient={true} >
                  <IngredientDetails />
                </Modal>
              }
            />
            {messages && <Route 
              path='/feed/:ingredientId'
              element={
                <Modal handleCloseModal={handleModalClose}>
                  <IdPage />
                </Modal>
              }
            />}
            {ownOrder &&<Route 
              path='/profile/orders/:ingredientId'
              element={
                <Modal handleCloseModal={handleModalClose}>
                  <IdPage owner={true}/>
                </Modal>
              }
            />}
        </Routes>
      )}
    </>
  );
}

export default App;
