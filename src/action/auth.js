import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import { types } from "../types/types";
import { eventLogout } from "./listEvents";


export const startLogin = ( correo, password) => {

    return async(dispatch) => {
        
        const resp = await fetchSinToken('auth/login', {correo, password}, 'POST');
        const body = await resp.json();
        // console.log(body);

        if( body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch( login({
                uid: body.id,
                name: body.usuario.nombre
            }))

        } else {
            Swal.fire('Error', body.msg, 'error')
        }
    }
}



export const startRegister = ( nombre, correo, password, password2, rol = 'USER_ROLE') => {

    return async(dispatch) => {
        
        const resp = await fetchSinToken('usuarios', {nombre,correo, password, password2, rol}, 'POST');
        const body = await resp.json();
        
        if( body.msg === 'Creado') {
            dispatch(startLogin(correo, password));
        } else {
            Swal.fire('Error', body.errors[0].msg, 'error')
        }
    }
}

export const startChecking = () => {
    return async(dispatch) => {

        const resp = await fetchConToken('auth/renew');
        const body = await resp.json();
        // console.log(body);
 

        if( body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch( login({
                uid: body.id,
                name: body.name
            }))

        } else {
            dispatch(finishChecking());
        }

    }
}

export const finishChecking = () => ({ type: types.authCheckingFinish});


export const login = (user) => ({
    type: types.authLogin,
    payload: user
})


export const startLogout = () => {
    return (dispatch) => {
        localStorage.clear();
        dispatch(logout());
        dispatch(eventLogout())
    }
}

export const logout = () => ({
    type: types.authLogout
})
