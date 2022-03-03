import React, { useEffect } from 'react'
import { useDispatch, useSelector  } from 'react-redux';
import { eventStarGetList} from '../../action/listEvents';
import { List } from './List';

export const Lists = () => {

    const dispatch = useDispatch();
    const {uid} = useSelector( state => state.auth );
    const {lists, activeList} = useSelector( state => state.shoppingListReducer );
    
    useEffect( () => {
         dispatch(eventStarGetList(uid,lists,activeList));
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <ul className="list-group p-3">
            {
                lists.map( list => (
                    <List key={list._id} {...list} />
                ))
            } 
        </ul>
    )
}
