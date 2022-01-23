import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';
import { InputsAddItem } from './InputsAddItem';
import { ListProducts } from './ListProducts';
import { ModalBudget } from './ModalBudget';

export const UseList = () => {

    const [modalIsOpen, setIsOpen] = useState(false);
    const {push} = useHistory()
    const {title, productos : products , presupuesto:budget } = useSelector( state => state.shoppingListReducer.activeList );
    const handleBack = () => {
        push('./list')
    }

    const Budget = parseFloat(budget).toFixed(2)

    useEffect(() => {
        
        (budget === 0) && setIsOpen(true);
    }, [budget])

    
   
    const totalCurrent = () => {
   
        const prices = products.map( product => {     
            const itbms = product.price * product.itbms;
            const price = parseFloat(product.price) + parseFloat(itbms);
            const totalPrice = price * product.amount;

            return parseFloat(totalPrice);      
        } );
    
        const  totalCurrent =  prices.reduce( (accountant  , total ) => {
            return accountant + total ;
        }, 0)

        return totalCurrent.toFixed(2);

    }

    const remainingBudget = (budget > 0 ) 
    ? (budget - totalCurrent() ).toFixed(2)
    : 0;
    
    
    const handleBudgetAlert = () => {
        
        
        if (budget !== 0 && remainingBudget <= (budget / 10)) { 
            
            console.log('funciono')
            Swal.fire({
                title: 'your budget is running out',
                icon: 'warning'
            })
        }
        
        if ( budget !== 0 && remainingBudget <= 0) {

            Swal.fire({
                title: 'your budget ran out',
                icon: 'warning'
            })
        }
        
        
    }
    
    
        useEffect(() => {
            handleBudgetAlert();
        })
  

    

 


    // const setProducts = () => {
    //     console.log(products);
    // }

  

    const handleBudget = ( ) => {
        setIsOpen(true);
    }


    return (
       
            <div className='list-check-container  container-vh-85 text-center p-0  '> 
                
                <div className='bg-success text-white m-0 p-2 title-h'>
                    <i className="bi bi-arrow-left-square float-start fs-2"
                       onClick={handleBack}
                    ></i>    
                    <h2 className='d-inline '>{title} </h2>
                </div>
                
                <div className='list-h'>
                    <ListProducts 
                        products={products}
                        // setProducts={setProducts}
                    />
                </div>

                <div className='add-h'>
                    <InputsAddItem />
                </div>
                    
                <div className='bg-success text-white text-start p-2 footer-h '>
                    <div className='w-50'>
                        <p className='m-0'>
                            Budget :    <i className="bi bi-pencil-square fs-3 text-warning pt-2  pl-2 float-center" 
                                            onClick={handleBudget}></i>
                        <span className='fw-bold text-warning  float-end'> {'$' + Budget} </span></p>
                        <p className='m-0'>Remaining budget:  <span className='fw-bold text-danger float-end'> { '$' +  remainingBudget}</span></p> 
                        {/* ( remainingBudget === NaN) ? 0 :  */}
                        <p className='m-0'>Current total: <span className='fw-bold text-warning float-end'> { '$' + totalCurrent() } </span></p>
                    </div>
                </div>

                <ModalBudget 
                modalIsOpen={modalIsOpen} 
                setIsOpen={setIsOpen}
                />

            </div>    
    )

    }
