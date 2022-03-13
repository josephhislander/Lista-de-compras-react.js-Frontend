import React from 'react';
import { Link } from 'react-router-dom';
import "animate.css";
import { AuthRouter } from '../../routers/AuthRouter';

export const LoginScreen = () => {

    return (
        <div className="login-container ">
          <div className="transparencia d-flex justify-content-center align-items-center">
            <div className="form-container">

                  <div className="text-center" >
                    <i className="bi bi-cart-check "></i>
                    <span className='font-brand navbar-brand text-light fs-1 m-4'>
                        Shopping List
                    </span>
                  </div>
                  
                  <nav>
                    <div className="fs-3">

                      <Link
                      className="button"  type="button" 
                      to="/auth/login">
                      LogIn
                      </Link>
                  
                      <Link
                      className="button"  type="button" 
                      to="/auth/loginG">
                      LogIn with <span className="google-blue">G</span><span className="google-red">o</span><span className="google-yellow">o</span><span className="google-blue">g</span><span className="google-green">l</span><span className="google-red">e</span>
                      </Link>

                      <Link
                      className="button" type="button"  to="/auth/register" >
                      Register
                      </Link>

                    </div>
                  </nav> 

                  <div className=" router-container" >
                      <AuthRouter />
                  </div>
    
            </div>
          </div>
        </div>
      
    )
}
