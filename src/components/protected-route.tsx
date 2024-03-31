import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'services/hooks';
import { getUser, LOADING_USER } from 'services/actions/registration';

const ProtectedRouteElement = ({ element }: any) => {
  const { user, isUserLoaded, loggedIn } = useSelector((state) => state.registration);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    loggedIn && dispatch(getUser());
    dispatch({ type: LOADING_USER });
  }, [loggedIn, dispatch]);

  if (!isUserLoaded) {
    return null;
  }

  return user ? element : <Navigate to='/login' state={{ from: location }}/>;
};

export default ProtectedRouteElement;
