import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router';
import { InputsAddItem } from './InputsAddItem';
import { ListProducts } from './ListProducts';
import { ModalBudget } from './ModalBudget';

export const UseList = () => {

    const {title, productos , presupuesto:budget } = useSelector( state => state.shoppingListReducer.activeList );
    let totalCurrent = () => { return 0};
    let remainingBudget = () => { return budget};
    const [modalIsOpen, setIsOpen] = useState(false);
    const [remaining, setremaining] = useState();
    const [total, settotal] = useState(0);
    const {push} = useHistory()
    const Budget = parseFloat(budget).toFixed(2)


    const handleBack = () => {
        push('./list')
    }


    useEffect(() => {
        (budget === 0) && setIsOpen(true);
        
        
    }, [budget])

    useEffect(() => {
        handleBudgetAlert();
    }, [remaining]);
    

    useEffect(() => {
        settotal(totalCurrent())
        remainingBudget()
    }, [productos, budget]);

        totalCurrent = () => {

            const prices = productos.map( product => {     
                const itbms = product.precio * product.impuesto;
                const price = parseFloat(product.precio) + parseFloat(itbms);
                const totalPrice = price * product.cantidad;
                return parseFloat(totalPrice);      
            } )       
            const  totalCurrent =  prices.reduce( (accountant  , total ) => {
                return accountant + total ;
            }, 0)

                return totalCurrent.toFixed(2);
            }

        remainingBudget =  () => {
           const rest = (budget - totalCurrent() ).toFixed(2)
           setremaining(rest);
    }

    const handleBudgetAlert = () => {
  
        if ((budget !== 0 ) && (remaining !==0) && (remaining < (budget / 10))) { 
            Swal.fire({
                title: 'your budget is running out',
                icon: 'warning'
            })
        }
 
        if ( budget !== 0 && remaining < 0) {
            Swal.fire({
                title: 'your budget ran out',
                icon: 'warning'
            })
        }
    }

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
                        // products={productos}
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
                        <p className='m-0'>Remaining budget:  <span className='fw-bold text-danger float-end'> { '$' +  remaining}</span></p> 
                        {/* ( remainingBudget === NaN) ? 0 :  */}
                        <p className='m-0'>Current total: <span className='fw-bold text-warning float-end'> { '$' + total } </span></p>
                    </div>
                </div>

                <ModalBudget 
                modalIsOpen={modalIsOpen} 
                setIsOpen={setIsOpen}
                />

            </div>    
    )

    }
