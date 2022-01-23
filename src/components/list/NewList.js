
import { useHistory } from 'react-router';
// import { useDispatch, useSelector } from 'react-redux';
import { useDispatch} from 'react-redux';
// import {  eventNewList, eventStartNewList, eventStartNewProduct } from '../../action/listEvents';
import {eventStartNewList, eventStartUpdateList} from '../../action/listEvents';

import { HandleFormProducts } from './HandleFormProducts';
// import { useEffect } from 'react';


export const NewList = () => {

    const { push } = useHistory()
   //  const {uid} = useSelector( state => state.auth );
    const dispatch = useDispatch();

    

    // useEffect(() => {
    //     dispatch(eventStartNewList( '',uid))
    // })
    // dispatch(eventStartNewList( '',uid));
    // const handleSubmit = (title, products, uid, name) => {
    //     dispatch(eventStartNewList({ title, 
    //                                 products, 
    //                                 user: {
    //                                     uid:  uid ,
    //                                     name: name
    //                                 }}));
     const handleNewList = (uid) => {
        dispatch(eventStartNewList( 'noName',uid));
     }

     const handleSubmit = (activeList , title, uid,productos) => {
        
        dispatch(eventStartUpdateList(activeList, title, productos))
        push("/list")
     }
       
        // products.map(product => dispatch(eventStartNewProduct(product)))

        // dispatch(eventStartNewProduct(products));  

        
    

    return (
       <>
            <HandleFormProducts 
                handleNewList= {handleNewList}
                handleSubmit={handleSubmit}
            />
       </>
    )
    }
