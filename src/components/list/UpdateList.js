import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { eventStartUpdateList} from '../../action/listEvents';
import { HandleFormProducts } from './HandleFormProducts';

export const UpdateList = () => {

    const {activeList} = useSelector( state => state.shoppingListReducer);
    const dispatch = useDispatch();
    const { push } = useHistory()
    const {productos: activeProducts, nombre: activeTitle} = activeList;

    // const productos = dispatch()

    
    const handleSubmit = (title, products) => {
        dispatch(eventStartUpdateList(activeList, title, products));
        push("/list")
    }

    return (
        <>
            <HandleFormProducts 
                handleSubmit={handleSubmit}
                activeProducts={activeProducts}
                activeTitle={activeTitle}
            />
        </>
    )
}
