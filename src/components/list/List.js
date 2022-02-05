import React from 'react'
import { useDispatch} from 'react-redux';
import { useHistory } from 'react-router';
import { eventNewActiveList, eventStartDeleteList, eventStartNewActivelist } from '../../action/listEvents';
import Swal from 'sweetalert2';
import moment from 'moment';

export const List = (list) => {

    const date = moment(list.fecha).format("D/MM/YYYY")
    const { push} = useHistory();
    const dispatch = useDispatch();
 

    const handleDelete = () => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#198754;',
            cancelButtonColor: '#db3236',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch( eventStartDeleteList(list._id));

              Swal.fire(
                'Deleted!',
                'Your product has been deleted.',
                'success'
              )
            }
          })
       
    }

    const handleUpdate = () => {
        dispatch( eventStartNewActivelist(list))
        push('/list/updateList')
    }


    const handleActiveList = (list) => {
      dispatch( eventStartNewActivelist(list))
        // dispatch(eventNewActiveList(list));
        push('list/useList')
    }

    return (
        
             <li className='list-item '>
                      <button
                      className='list-group-item list-group-item-action list-group-item-success rounded d-flex justify-content-between'
                      type="button"
                      onClick={ () => handleActiveList(list)}    
                      >
                      {list.nombre}
                      <span> {date}</span>
                      </button>
                   
                      <i className="bi bi-pencil-square fs-3 text-warning pt-2  pl-2"
                        onClick={handleUpdate}
                      ></i>
                      <i className="bi bi-trash fs-3 text-danger pt-2 pl-2"
                         onClick={handleDelete}
                      ></i>
             </li>
        
    )
}
