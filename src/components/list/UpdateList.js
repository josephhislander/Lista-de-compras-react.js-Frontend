import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { eventStartGetProducts, eventStartUpdateList} from '../../action/listEvents';
import { HandleFormProducts } from './HandleFormProducts';

export const UpdateList = () => {

    const {activeList} = useSelector( state => state.shoppingListReducer);
    const dispatch = useDispatch();
    const { push } = useHistory()
    
    
    useEffect(() => {
        dispatch(eventStartGetProducts(activeList ))
        
    }, [])
    
    const { nombre: activeTitle, productos } = activeList;
    console.log(productos);
    
    const handleSubmit = (title, products) => {
        dispatch(eventStartUpdateList(activeList, title, products));
        push("/list")
    }

    return (
        <>
            <HandleFormProducts 
                handleSubmit={handleSubmit}
                activeProducts={productos}
                activeTitle={activeTitle}
            />
        </>
    )
}
