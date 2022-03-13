import Modal from 'react-modal';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { eventStartUpdateListBudge } from '../../action/listEvents';
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
  
export const ModalBudget = ({modalIsOpen, setIsOpen}) => {

    const {activeList} = useSelector( state => state.shoppingListReducer);
    const dispatch = useDispatch();
    const [budgetValues, handleBudgetInputChange] = useForm({ Budget: activeList.presupuesto});
    const { Budget} = budgetValues;

    const handleSaveBudget = () => {

        dispatch(eventStartUpdateListBudge(activeList, Budget));
        setIsOpen(false);
    }

    return (
        <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        contentLabel="Example Modal"
        >
            <div className="d-flex justify-content-end">
              <button
                className='btn bi bi-x text-success fs-1'
                onClick={() => {
                  setIsOpen(false)
                }}>    
              </button>
            </div>
        
            <div className="row g-3 d-flex justify-content-around  mb-3">
                  <div className="col-auto d-flex align-self-center fs-1">
                    <label htmlFor='Budget'>Budget</label>
                  </div>
                  <div className="col-auto ">
                    <input    
                          className="form-control fs-3" 
                          id='Budget'
                          name='Budget' 
                          onChange={handleBudgetInputChange}
                          placeholder='$'
                          type='text'
                          value={Budget}
                          autocomplete="off"
                          />
                  </div>
            </div>
  
            <div className="footer d-flex justify-content-center">
                <button className='btn btn-success fs-1'
                onClick={handleSaveBudget}
                id="cancelBtn">
                Save  
                </button>
            </div>
      </Modal>

    )}
