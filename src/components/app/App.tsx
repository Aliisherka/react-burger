/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import {
  Routes, Route, useNavigate, useLocation,
} from 'react-router-dom';

import ProtectedRouteElement from 'components/protected-route';
import AppHeader from 'components/app-header/AppHeader';
import IngredientDetails from 'components/ingredient-details/IngredientDetails';
import Modal from 'components/modal/Modal';

import { getUser } from 'services/actions/registration';
import { getIngredient } from 'services/actions/ingredient';
import { useDispatch } from 'services/hooks';

import FeedPage from 'pages/Feed';
import IdPage from 'pages/Id';
import ProfileOrdersPage from 'pages/Profile-orders';
import HomePage from 'pages/Home';
import LoginPage from 'pages/Login';
import RegisterPage from 'pages/Register';
import ForgotPassword from 'pages/Forgot-password';
import ResetPassword from 'pages/Reset-password';
import ProfilePage from 'pages/Profile';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    accessToken && dispatch(getUser());
    dispatch(getIngredient());
  }, [accessToken, dispatch]);

  const background = location.state && location.state.background;

  const handleModalClose = (): void => {
    navigate(-1);
  };
  return (
    <>
      <AppHeader />
      {/* <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes> */}
      <Routes location={background || location}>
        <Route path='/' element={<HomePage />} />
        <Route
          path='/ingredients/:ingredientId'
          element={<IngredientDetails />}
        />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route
          path='/profile'
          element={<ProtectedRouteElement element={<ProfilePage />} />}
        />
        <Route path='/profile/orders' element={<ProfileOrdersPage />} />
        <Route
          path='/profile/orders/:ingredientId'
          element={<ProtectedRouteElement element={<IdPage owner={true} />} />}
        />
        <Route path='/feed' element={<FeedPage />} />
        <Route path='/feed/:ingredientId' element={<IdPage />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path='/ingredients/:ingredientId'
            element={
              <Modal
                title={'Детали ингредиента'}
                handleCloseModal={handleModalClose}
                isIngredient={true}
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/feed/:ingredientId'
            element={
              <Modal handleCloseModal={handleModalClose}>
                <IdPage />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:ingredientId'
            element={
              <Modal handleCloseModal={handleModalClose}>
                <IdPage owner={true} />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
