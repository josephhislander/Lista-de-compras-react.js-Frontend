
import React from 'react'
import { useSelector } from 'react-redux';
import {ListItem} from './ListItem';

export const ListProducts = () => {

    const {productos} = useSelector( state => state.shoppingListReducer.activeList );

    return (
        <div className='list-check-container min-h m-0 border-bottom-0'>
            {   
                (productos) &&
                productos.map( product => (
                <ListItem key={product._id}
                            {...product}
                            Product={product}  
                            products={productos}
                              />
                ))
            }
        </div>
    )
}

