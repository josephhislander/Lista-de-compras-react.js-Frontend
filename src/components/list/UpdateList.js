import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { eventStartUpdateList} from '../../action/listEvents';
import { HandleFormProducts } from './HandleFormProducts';

export const UpdateList = () => {
    const {activeList} = useSelector( state => state.shoppingListReducer);
    const dispatch = useDispatch();
    const { push } = useHistory()
    const { nombre: activeTitle, productos } = activeList;
    const handleSubmit = (activeList, title, products) => {
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
