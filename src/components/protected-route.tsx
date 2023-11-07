import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch,  } from 'react-redux';
import {useEffect} from 'react';
import { getUser, LOADING_USER } from '../services/actions/registration';
import { useLocation } from "react-router";

export const ProtectedRouteElement = ({ element }: any) => {
    const { user, isUserLoaded, loggedIn } = useSelector((state: any) => state.registration);
    const dispatch = useDispatch();
    const location = useLocation();
    
    useEffect(() => {
        loggedIn && getUser()(dispatch);
        dispatch({type: LOADING_USER})
    }, [loggedIn])


    if(!isUserLoaded) {
        return null;
    }

    return user ? element : <Navigate to='/login' state={{ from: location}}/>;
} 