import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch,  } from 'react-redux';
import {useEffect} from 'react';
import { getUser, LOADING_USER } from '../services/actions/registration';

export const ProtectedRouteElement = ({ element }) => {
    const { user, isUserLoaded, loggedIn } = useSelector(state => state.registration);
    const dispatch = useDispatch();
    
    useEffect(() => {
        loggedIn && dispatch(getUser());
        dispatch({type: LOADING_USER})
    }, [loggedIn])


    if(!isUserLoaded) {
        return null;
    }

    return user ? element : <Navigate to='/login' state='/profile'/>;
} 