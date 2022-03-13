import React from 'react';
import {
    Switch,
    Redirect,
    Route
  } from "react-router-dom";
import { Lists } from '../components/list/Lists';
import { NewList } from '../components/list/NewList';
import { UseList } from '../components/list/UseList';
import { UpdateList } from '../components/list/UpdateList';

export const ListRouter = () => {
    
    return(

        <div >
            <Switch>
                <Route 
                    exact
                    path='/list'
                    component={Lists}
                />

                <Route 
                    path='/list/newList'
                    component={NewList}
                />

                <Route 
                    path='/list/useList'
                    component={UseList}
                />

                <Route 
                    path='/list/updateList'
                    component={UpdateList}
                />
            
                <Redirect to='/list' />

            </Switch>
        </div>

    )

}
