
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import {  eventStartNewList } from '../../action/listEvents';
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
                                    }
    }));
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
