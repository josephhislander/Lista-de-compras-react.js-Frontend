import { useHistory } from 'react-router';
import { useDispatch} from 'react-redux';
import {eventStartNewList, eventStartUpdateList} from '../../action/listEvents';
import { HandleFormProducts } from './HandleFormProducts';



export const NewList = () => {

    const { push } = useHistory()
    const dispatch = useDispatch();

     const handleNewList = (uid) => {
        dispatch(eventStartNewList( 'noName',uid));
     }

     const handleSubmit = (activeList , title, uid,productos) => {
        
        dispatch(eventStartUpdateList(activeList, title, productos))
        push("/list")
     }
       
    return (
       <>
            <HandleFormProducts 
                handleNewList= {handleNewList}
                handleSubmit={handleSubmit}
            />
       </>
    )
    }
