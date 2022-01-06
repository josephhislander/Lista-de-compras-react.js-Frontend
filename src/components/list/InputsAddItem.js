import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { eventNewProduct } from '../../action/listEvents';
import { useForm } from '../../hooks/useForm';

export const InputsAddItem = () => {

    const {activeList} = useSelector( state => state.shoppingListReducer );
    const dispatch = useDispatch();

    const  [inputValues, handleInputChange, reset] = useForm({
        title: 'activeTitle',
        nameValue: '',
        amountValue: 1
    });
    const {nameValue, amountValue} = inputValues;

    const handleInputAmountFocus = () => {
        reset( nameValue, '')
    }

    const  handleInputAmountBlur = () => {
        if ( amountValue === '') {
            
            reset( nameValue, 1)
        } 
    }

    const handleNewItem = () => {

        if( nameValue === '') {
            return Swal.fire({
                title: 'The product name cannot be empty',
                icon: 'warning'
              })
        }

        // console.log('hola mundo');
        // console.log(nameValue, activeList._id,amount);
        

        // dispatch( eventNewProduct(activeList, nameValue, amountValue))

        reset();

    }

    return (
        <div>
             <div className='form-group mt-3 mr-3 d-inline-block input-w'>
                        <input
                            className='form-control fs-4 border-success  text-success'
                            name='nameValue'
                            onChange={handleInputChange}
                            placeholder='Add product'
                            type='text'
                            value={nameValue}
                            title='Add product'>
                        </input>
                    </div>

                    <div className='form-group m-3 d-inline-block input-w'>
                        <input
                            className='form-control fs-4 border-success  text-success'
                            name='amountValue'
                            onChange={handleInputChange}
                            onBlur= { handleInputAmountBlur}
                            onFocus= {handleInputAmountFocus}
                            placeholder='Amount'
                            type='text'
                            value={amountValue}
                            title='Add product'>
                        </input>
                    </div>

                    <button
                            className='btn btn-success fs-4 '
                            type='button'
                            onClick={handleNewItem}
                            >
                            <i className="bi bi-plus-lg text-light "></i>
                            
                    </button>
        </div>
    )
}
