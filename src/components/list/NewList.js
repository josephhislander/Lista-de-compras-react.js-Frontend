
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import {  eventNewList, eventStartNewList, eventStartNewProduct } from '../../action/listEvents';
import { HandleFormProducts } from './HandleFormProducts';


export const NewList = () => {

    const { push } = useHistory()

    const dispatch = useDispatch();

    const handleSubmit = (title, products, uid, name) => {
        dispatch(eventStartNewList({ title, 
                                    products, 
                                    user: {
                                        uid:  uid ,
                                        name: name
                                    }}));

        for( let i = 0; i <= products.length  ; i++){
                dispatch(eventStartNewProduct(products[i]))
        }
                
        // products.map(product => dispatch(eventStartNewProduct(product)))

        // dispatch(eventStartNewProduct(products));  

        push("/list")
    }

    return (
       <>
            <HandleFormProducts 
                handleSubmit={handleSubmit}
            />
       </>
    )
}
