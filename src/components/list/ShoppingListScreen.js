import React from 'react';
import { ListRouter } from '../../routers/ListRouter';
import { CreateNewList } from '../ui/CreateNewList';
import { Navbar } from '../ui/Navbar';

export const ShoppingListScreen = ({history}) => {

    return (
        <div className="list-container">
            <div className="transparencia">
                <Navbar />
                <div className="list-router-container">
                    <ListRouter/>
                </div>

                {
                    (history.location.pathname === "/list")
                    &&(<CreateNewList />)
                }

            </div>
            
        </div>

    )
}
