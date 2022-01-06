import PropTypes from 'prop-types';
import React, {useState} from 'react';
import Swal from 'sweetalert2'
import moment from 'moment';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { eventStartNewProduct } from '../../action/listEvents';
import { ListProducts } from './ListProducts';
import {useForm} from '../../hooks/useForm';
import { InputsAddItem } from './InputsAddItem';
moment().format();

export const HandleFormProducts = ({handleSubmit, activeTitle = 'List title', activeProducts = []}) => {

    const dispatch = useDispatch();
    const {uid, name} = useSelector( state => state.auth );
    const {activeList} = useSelector( state => state.shoppingListReducer );
    const { push } = useHistory()
    const [products, setProducts] = useState(activeProducts)
    const  [inputValues, handleInputChange, reset] = useForm({
        title: '',
        nameValue: '',
        amountValue: 1
    });
    const {nameValue, amountValue, title} = inputValues;
    console.log(activeList)

    const handleNewItem = () => {

        if( nameValue === '') {
            return Swal.fire({
                title: 'The product name cannot be empty',
                icon: 'warning'
              })
        }
      
        setProducts([
                ...products, {
                    id: moment().format("HmsS"),
                    name: nameValue,
                    amount: amountValue,
                    price: 0,
                    itbms: 0,
                    checked: false
                }
        ])   

        reset();

        dispatch(eventStartNewProduct(nameValue, activeList,amountValue));

    }

    const handleBack = () => {
        push('/list')
    }

    const handleSave = () => {

        if(title === ''){
            return Swal.fire({
                title: 'The title cannot be empty',
                icon: 'warning'
              })
        }

        handleSubmit( title, products, uid, name);

        // Swal.fire(
        //     'Save!',
        //     'Your list has been created.',
        //     'success'
        //   )

    }

    const handleInputAmountFocus = () => {
        reset( nameValue, '')
    }

    const  handleInputAmountBlur = () => {
        if ( amountValue === '') {
            
            reset( nameValue, 1)
        } 
    }

    return (
             <form className='m-2'>
                    <div className='form-group '>
                        <input
                            className='form-control fs-4 border-success text-success'
                            name='title'
                            onChange={handleInputChange}
                            type='text'
                            placeholder={activeTitle}
                            value={title}
                        ></input>
                    </div>

                    <ListProducts 
                        products={products}
                        setProducts={setProducts}
                    />

                 

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

                    <button
                            className='btn btn-success fs-4 mt-3  float-end'
                            type='button'
                            onClick={ handleSave}
                            >
                        Save 
                    </button>

                    <button
                            className='btn btn-success fs-4 mt-3 mr-3 float-end'
                            type='button'
                            onClick={handleBack}
                            >
                        Back
                    </button>
                </form>
    )
}

HandleFormProducts.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    activeTitle: PropTypes.string,
    activeProducts: PropTypes.array
}

