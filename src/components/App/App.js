import styles from './App.module.css';
import {Routes, Route, useNavigate } from 'react-router-dom';
import { useLocation } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
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

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { loggedIn } = useSelector(state => state.registration);

  useEffect(() => {
    localStorage.getItem('accessToken') && dispatch(getUser());
    dispatch(getIngredient());
  }, [localStorage.getItem('accessToken')])

  const background = location.state && location.state.background;

  const handleModalClose = () => {
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
      </Routes>
      {background && (
        <Routes>
            <Route
              path='/ingredients/:ingredientId'
              element={
                <Modal title={'Детали ингредиента'} handleCloseModal={handleModalClose}>
                  <IngredientDetails />
                </Modal>
              }
            />
        </Routes>
      )}
    </>
  );
}

export default App;
