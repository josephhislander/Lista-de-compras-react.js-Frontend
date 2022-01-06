import React from 'react'
import { useDispatch } from 'react-redux';
import { startLogin } from '../../action/auth';
import { useForm } from '../../hooks/useForm'

export const LoginPlace = () => {

    const dispatch = useDispatch();

    const [formLoginValues, handleLoginInputChange] = useForm({
            Email: '',
            Password: ''
    })

    const{Email, Password} = formLoginValues;

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(startLogin(Email, Password));
    }

    return (
        <form onSubmit={handleLogin} className="animate__animated animate__fadeIn">
                  <div className="form-group mt-5 i-email">
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
                                name="Password"
                                onChange= {handleLoginInputChange}
                                placeholder="Password"
                                type="password"
                                value={Password}
                            />
                  </div>
                  <div className="form-group d-grid gap-2 col-6 mx-auto mt-5 ">
                            <input 
                                type="submit"
                                className="btn btn-success fs-4 "
                                value="LogIn" 
                            />
                  </div>
        </form>
    )
}
