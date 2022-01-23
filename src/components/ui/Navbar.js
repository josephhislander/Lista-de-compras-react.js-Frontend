import React from 'react'
import { useDispatch } from 'react-redux';
import { startLogout } from '../../action/auth';
import { useGoogleLogout } from 'react-google-login'

export const Navbar = () => {
  

    // const onLogoutSuccess = () => {
    //     console.log('logout');

    //   };
    //   const onFailure = () => {
    //     console.log('logout fail');
    //   };

    //   const { signOut } = useGoogleLogout({
    //     clientId: '153363051251-ns1m9qcf2e3qrm2j0ho9ipcq18ta6eah.apps.googleusercontent.com',
    //     onLogoutSuccess: onLogoutSuccess,
    //     onFailure: onFailure,
    //   });

 
    const dispatch = useDispatch();

    const handleLogout = () => {
        // signOut()
        dispatch(startLogout());
    }

    
 

    return (
        
        <div className='navbar navbar-light bg-success '>
            
            <span className='navbar-brand fs-2 '>
             
            </span>

            <span className='font-brand navbar-brand text-center  text-light'>
                Shopping List
            </span>

           
                <i className="bi bi-power btn-logout mr-3" 
                    onClick={handleLogout}
                    type="button"
                    ></i>

          
        </div>
    )
}
