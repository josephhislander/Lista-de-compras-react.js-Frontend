import React from 'react'
import {
    Switch,
    Redirect,
    Route
  } from "react-router-dom";

import { LoginPlace } from '../components/auth/LoginPlace'
import { LoginWithGoogle } from '../components/auth/LoginWithGoogle'
import { RegisterPlace } from '../components/auth/RegisterPlace'

export const AuthRouter = () => {
    return (       
            <div>
                <Switch>
                    <Route 
                        path='/auth/login'
                        component={LoginPlace}
                    />
                    <Route 
                        path='/auth/loginG'
                        component={LoginWithGoogle}
                    />
                    <Route 
                        path='/auth/register'
                        component={RegisterPlace}
                    />
                    <Redirect to='/auth/login' />
                </Switch>
            </div> 
    )
}
