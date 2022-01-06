import React from 'react'
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startRegister } from '../../action/auth';
import { useForm } from '../../hooks/useForm';

export const RegisterPlace = () => {

    const dispatch = useDispatch();

    const [formRegisterValues, handleLoginInputChange] =useForm({
        Name: '',
        Email: '',
        Password1: '',
        Password2: ''
    })

    const {Name, Email, Password1, Password2} = formRegisterValues;

    const handleRegister = (e) => {
        e.preventDefault();

        if(Password1 !== Password2) {
            return Swal.fire('Error', 'Las contraseñas deben de ser iguales');
        }

        dispatch(startRegister(Name,Email,Password1,Password2))
    }
    
    return (
        <div >
            <form onSubmit={handleRegister} className="animate__animated animate__fadeIn">
                  
                  <div className="form-group mt-5 ">
                            <input 
                                className="form-control fs-4 "
                                name="Name"
                                onChange= {handleLoginInputChange}
                                placeholder={"Name"}
                                type="text"
                                value={Name}
                            />
                  </div>

                  <div className="form-group mt-4 i-email">
                            <input 
                                className="form-control fs-4 "
                                name="Email"
                                onChange= {handleLoginInputChange}
                                placeholder={"Email"}
                                type="text"
                                value={Email}
                            />
                  </div>
 
                  <div className="form-group mt-4">
                            <input 
                                className="form-control fs-4"
                                name="Password1"
                                onChange= {handleLoginInputChange}
                                placeholder="Password"
                                type="password"
                                value={Password1}
                            />
                  </div>

                  <div className="form-group mt-4">
                            <input 
                                className="form-control fs-4"
                                name="Password2"
                                onChange= {handleLoginInputChange}
                                placeholder="Confirm Password"
                                type="password"
                                value={Password2}
                            />
                  </div>

                  <div className="form-group d-grid gap-2 col-6 mx-auto mt-5">
                            <input 
                                type="submit"
                                className="btn btn-success fs-4"
                                value="Register" 
                            />
                  </div>
        </form>
        </div>
    )
}
