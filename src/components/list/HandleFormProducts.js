import PropTypes from 'prop-types';
import React, {useState, useEffect } from 'react';
import Swal from 'sweetalert2'
import moment from 'moment';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {useForm} from '../../hooks/useForm';
import { eventStartDeleteList, eventStartDeleteProducts,  eventStartNewProduct } from '../../action/listEvents';
import { ListProducts } from './ListProducts';

moment().format();

export const HandleFormProducts = ({handleNewList = false, handleSubmit, activeTitle = 'List title', activeProducts = []}) => {

    const dispatch = useDispatch();
    const {uid} = useSelector( state => state.auth );
    const {activeList} = useSelector( state => state.shoppingListReducer );
    const { push, location} = useHistory()
    const [products, setProducts] = useState([])
    const  [inputValues, handleInputChange, reset] = useForm({
        title: '',
        nameValue: '',
        amountValue: 1
    });
    const {nameValue, amountValue, title} = inputValues;

    useEffect(() => {
            (location.pathname === "/list/newList")&&    
            handleNewList(uid)
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    const handleNewItem = async() => {
       if( nameValue === '') {
            return Swal.fire({
                title: 'The product name cannot be empty',
                icon: 'warning'
              })
        }
        await dispatch(eventStartNewProduct(nameValue, activeList,amountValue));
        reset();
    }

    const handleBack = () => {
        if(location.pathname === "/list/newList"){
              Swal.fire({
                title: 'Are you sure?',
                text: "do you want delete this list?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#81DFDD',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(eventStartDeleteList(activeList._id));
                    dispatch(eventStartDeleteProducts(activeList));
                  Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
                  push('/list')
                }
              })
        } else {
            push('/list')
        }
        
    }

    const handleSave = ({target}) => {
        target.focus();
        if(title === ''){
            return Swal.fire({
                title: 'The title cannot be empty',
                icon: 'warning'
              })
        }
        handleSubmit( activeList, title, uid,products);
    }

    const handleInputAmountFocus = () => {
        reset( nameValue, '')
    }

    const  handleInputAmountBlur = () => {
        if ( amountValue === '') {
            
            reset( nameValue)
        } 
    }

    return (
             <form className='m-2' autocomplete="off">
                    <div className='form-group '>
                        <input
                            className='form-control fs-4 border-success text-success'
                            name='title'
                            onChange={handleInputChange}
                            type='text'
                            placeholder= 'Title'
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
    activeTitle: PropTypes.string,
    activeProducts: PropTypes.array
}

