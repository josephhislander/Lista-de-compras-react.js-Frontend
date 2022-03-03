


import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from "react-router-dom";
import { startChecking } from '../action/auth';

import { LoginScreen } from '../components/auth/LoginScreen';
import { ShoppingListScreen } from '../components/list/ShoppingListScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';


export const AppRouter = () => {

    const dispatch = useDispatch();
    const {checking, uid} = useSelector( state => state.auth );

    useEffect(() => {
            dispatch( startChecking());
    }, [dispatch])



    if(checking) {
        return <h5>Espere...</h5>
    }

    return (

        <Router>
            <div>
                <Switch>
                    <PublicRoute 
                        path='/auth'
                        component={LoginScreen}
                        isAuthenticated={!!uid}
                    />

                    <PrivateRoute
                        path='/'
                        component={ShoppingListScreen}
                        isAuthenticated={!!uid}
                    />

                    <Redirect to='/auth' />

                </Switch>
            </div>
        </Router>
    )
}
