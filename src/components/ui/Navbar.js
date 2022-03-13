import React from 'react'
import { useDispatch } from 'react-redux';
import { startLogout } from '../../action/auth';

export const Navbar = () => {
    const dispatch = useDispatch();
    const handleLogout = () => {
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
