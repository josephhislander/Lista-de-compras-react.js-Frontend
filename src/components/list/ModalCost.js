import React from 'react'
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { eventStartCheckProduct, eventStartUpdateProductPrice, eventUpdateProductPrice } from '../../action/listEvents';
import { useForm } from '../../hooks/useForm';


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '1rem',
      boxShadow: '1rem',
    },
  };
  
  Modal.defaultStyles.overlay.backgroundColor = '#000000d5';
  
  Modal.setAppElement('#root');
  

export const ModalCost = ({modalIsOpen,setIsOpen, closeModal, Product, checkId }) => {

    const {activeList} = useSelector( state => state.shoppingListReducer );
    const dispatch = useDispatch();
    const [costValues, handleCostInputChange, reset] = useForm({
        Cost: 0,
        itbms: 0.07,
    });

    const {Cost, itbms} = costValues;
    


    const handleCostInputFocus = () => {
      console.log('hola mundo')
      reset( Cost, '')
    }

    const handleSavePrice = () => {


      // console.log(Cost, itbms)
      //     closeModal()
      //     setIsOpen(true)
     

      dispatch(eventStartUpdateProductPrice(activeList, Product, Cost, itbms))


      closeModal()
      
    }

    const handleBack = () => {

      
      

     let checkBox = document.getElementById(checkId);
      console.log(checkBox.checked);

      dispatch( eventStartCheckProduct(activeList, Product));
      closeModal()

      checkBox.checked = false;

    }

    return (
              
      <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      shouldCloseOnOverlayClick={false}
    >
 
          <div className="row g-3 d-flex justify-content-around  mb-3">
                <div className="col-auto d-flex align-self-center fs-1">
                  <label htmlFor=''>Cost</label>
                </div>
                <div className="col-auto ">
                  <input    
                        className="form-control fs-3" 
                        name='Cost' 
                        onChange={handleCostInputChange}
                        onFocus= {handleCostInputFocus}
                        placeholder='$'
                        type='text'
                        value={Cost}

                        />
                </div>
          </div>
        <div>  
  
        <div className='row  mb-3'>
              <form className='d-flex justify-content-around fs-3'>
                  <span >Itbms: </span>

                  <span >
                    <label className='form-check-label mr-4 ml-4' htmlFor='7%' >7%</label>
                    <input 
                            className='form-check-input' 
                            id='7%' 
                            name='itbms'
                            onChange={handleCostInputChange} 
                            type='radio' 
                            value={0.07}
                            defaultChecked
                            />
                  </span>
          
                 
                   <span >
                      <label className='form-check-label mr-4 ml-4' htmlFor='10%' >10%</label>
                      <input 
                            className='form-check-input' 
                            id='10%' 
                            name='itbms'
                            onChange={handleCostInputChange} 
                            type='radio' 
                            value={0.10} />
                    </span>                     

                    <span >          
                      <label className='form-check-label mr-4 ml-4' htmlFor='exento'   >Exento</label>
                      <input 
                            className='form-check-input' 
                            id='exento' 
                            name='itbms'
                            onChange={handleCostInputChange} 
                            type='radio' 
                            value={0} />
                   </span >
                     
              </form>
              </div>
        </div>

        <div className="footer d-flex justify-content-center">
            <button className='btn btn-success fs-1 mr-2'
            onClick={handleBack}
            // id="cancelBtn"
           >
            Back
           </button>

           <button className='btn btn-success fs-1'
            onClick={handleSavePrice}
            id="cancelBtn"
           >
            Save  
           </button>

          
        </div>
    </Modal>

    )
}
