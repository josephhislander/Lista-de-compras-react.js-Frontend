import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';
import {  eventStartDeleteProduct, eventStartCheckProduct, eventStartUpdateProductPrice } from '../../action/listEvents';
import { ModalCost } from './ModalCost';



export const ListItem = ({nombre, _id, products, cantidad, Product}) => {

    const [modalIsOpen, setIsOpen] = useState();
    const {activeList} = useSelector( state => state.shoppingListReducer);
    const dispatch = useDispatch()
    const {location} = useHistory();
    const checkId = `flexCheck${_id}`;

    const handleDeleteItem = () => { 
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
              dispatch( eventStartDeleteProduct(_id, activeList ))
              Swal.fire(
                'Deleted!',
                'Your product has been deleted.',
                'success'
              )
            }
          })

    }

    const handleCheckChange =  async(e) => {
      const check = e.target.checked;
      if(check) {
        setIsOpen(true);
        dispatch( eventStartCheckProduct(activeList, Product, check));
        console.log('check en true')
      } 
      
      if(check === false){
        await dispatch( eventStartCheckProduct(activeList, Product, check));
        dispatch(eventStartUpdateProductPrice(activeList, Product));
        console.log('check en false')
      }
    }

    const closeModal = () => {
      setIsOpen(false);
    }
  

    return (
        <div className=" list-group-item-action list-group-item-success form-check d-flex justify-content-between pl-5 pr-3 " >        
                { (location.pathname === "/list/useList")
                    ? 
                    (Product.checked) ?
                    <input className="form-check-input check " type="checkbox" value="Hola" id={`flexCheck${_id}`}  onClick={handleCheckChange} defaultChecked />
                    
                            : <input className="form-check-input check " type="checkbox" value="Hola" id={`flexCheck${_id}`}  onClick={handleCheckChange} />

                    :<input className="form-check-input check " type="checkbox" value="" id={`flexCheck${_id}`} disabled />
                    } 
                
            <label className=' ml-3' htmlFor={`flexCheck${_id}`}  >
                {nombre}  {
                    (cantidad > 1)
                    && 'x' + cantidad
                }
                
            </label>
            <div>
                <i className="bi bi-trash fs-3 text-danger  float-end"
                    onClick={handleDeleteItem}
                    type='button'> </i>
            </div>  

            <ModalCost 

                      closeModal={closeModal}
                      modalIsOpen={modalIsOpen}
                      Product={Product}
                      setIsOpen={setIsOpen}
                      checkId = {checkId}
            />      
    </div> 
    )
}

ListItem.propTypes = {
    nombre: PropTypes.string.isRequired,
    products: PropTypes.array.isRequired,
}

