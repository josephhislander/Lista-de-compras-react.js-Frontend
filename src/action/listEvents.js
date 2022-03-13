import { types } from "../types/types"
import moment from 'moment';
import { fetchConToken } from "../helpers/fetch";
import Swal from "sweetalert2";
moment().format();

export const eventStartNewList = (title = 'noName', user) => {
    return async(dispatch) => {
        try {
            const data = {nombre: title,
                           uid: user,
                           presupuesto: 1
                        
                            };
        
            const resp = await fetchConToken('listas',data , 'POST');
            const body = await resp.json();
            dispatch(eventNewList(body))
            Swal.fire(
            'Save!',
            'Your list has been created.',
            'success'
          )
        } catch (error) {
            console.log(error + ' algo paso con el fetch')
        }
    }
}

export const eventNewList = (body) => ({
    type: types.eventNewList,
    payload:  body.lista  
})

export const eventStarGetList = (uid) => {

    return async(dispatch) => {
        try {  
            const data = {
                           uid
                            };
        
            const resp = await fetchConToken('listas',data, 'GET' );
            const body = await resp.json();
            const listas = body.listas;
            dispatch(eventGetList(listas));           
        } catch (error) {
            console.log(error)
        }
    }
}

 export const eventGetList = (listas) => ({
    type: types.eventGetList,
    payload: listas
})


export const eventStartDeleteList = (id) => {
    return async ( dispatch, getState ) => {
        const { uid} = getState().auth;
        try {
            const resp = await fetchConToken(`listas/${ id }`, {"uid": uid}, 'DELETE' );
            const body = await resp.json();
            if ( body.estado === false ) {
                dispatch( eventDeleteList(id) );
                dispatch(eventStarGetList(uid));
            } else {
                Swal.fire({icon:'error', title: body.msg, text:'error fetch'});
            }
        } catch (error) {
            console.log(error)
        }

    }
}

export const eventDeleteList = (id) => ({
    type: types.eventDeleteList,
    payload: id
})


export const eventStartUpdateList = (activeList, activeTitle, productos) => {  
    const data = {nombre: activeTitle, uid: activeList.usuario, presupuesto : 0};
    return async(dispatch) => {
        try {
            const resp = await fetchConToken(`listas/${activeList._id}`, data, 'PUT')
            const body = await resp.json();
            dispatch(eventUpdateList(body.lista, productos))
        } catch (error) {
            console.log(error)
        }
    }
}

export const eventUpdateList = (lista,productos) => ({    
    type: types.eventUpdateList,
    payload:{ 
        id: lista._id,
        list: {
            ...lista,
            productos
    }}
})


export const eventStartNewActivelist = (lista) => {

    return async(dispatch) => {
        try {
            dispatch(eventNewActiveList(lista))
           await dispatch(eventStartGetProducts(lista))
        } catch (error) {
            console.log(error);
        }
    }

}

export const eventNewActiveList = ( list) => ({
    type: types.eventNewActiveList,
    payload: list
})

export const eventStartNewProduct = (name, activeList, amount) => {
    const data = {  
        nombre: name,
        cantidad: amount,
        lista: activeList
        };
    return async(dispatch) => {
        try {
            const resp = await fetchConToken('productos',data , 'POST');
            const body = await resp.json();
            const producto = body.producto;
            dispatch(eventNewProduct(producto, activeList))
        } catch (error) {
            console.log(error)
        }
    }
}

export const eventNewProduct = (producto, activeList) => ({
    type: types.eventNewProduct,
    payload: {
        activeList,
        producto
            }
})

export const eventStartGetProducts = ( listas) => {
    return async(dispatch) => { 
                                try {
            
                    const data =    {
                        'uid': listas.usuario,
                        'list_id': listas._id,
                        
                    };               
                    const resp = await fetchConToken('productos',data, 'GET' );
                    const body = await resp.json();
                    const productos = body.productos;
                    dispatch(eventGetProducts(listas, productos))
                } catch (error) {
                    console.log(error)
                }
        }

    } 
    

export const eventGetProducts = (activeList, productos) => ({
    type: types.eventGetProducts,
    payload: {
        id: activeList._id,
        list: {...activeList,
                    productos   
                }}

})


export const eventStartDeleteProduct = ( productId, activeList) => {
    const data = {
        'uid': activeList.usuario,
        'product_id': productId, 
    }
    return async(dispatch) => {
            try {
                const resp = await fetchConToken(`productos/product`, data, 'DELETE' );
                const body = await resp.json();
                    dispatch( eventDeleteProduct(productId, activeList) );
        } catch (error) {
            console.log(error)
        }
    }
    
}

export const eventDeleteProduct = (productId, activeList) => ({
    type: types.eventDeleteProduct,
    payload:  {
        id: activeList._id,
        list: {...activeList,
                    productos: activeList.productos.filter( producto => producto._id !== productId)     
                }}
})



export const eventStartDeleteProducts = ({_id, usuario}) => {
    const data = {
        'uid': usuario,
        'list_id': _id, 
    }
    return async() => {
        try {
                const resp = await fetchConToken(`productos`, data, 'DELETE' );
                const body = await resp.json();
        } catch (error) {
            console.log(error)
        }
    }
}

export const eventNewActiveProduct = (activeList, Product) => ({
    type: types.eventNewActiveProduct,
    payload: {
        id: activeList.id,
        list: {...activeList,
                activeProduct: Product
                }
            }
})

export const eventUpdateProductPrice = (activeList, Product, cost, itbms) => ({
    type: types.eventUpdateProductPrice,
    payload: {
        id: activeList._id,
        list: {...activeList,
                    productos: activeList.productos.map( product => (product._id === Product._id)
                    ? {...Product,
                        precio: cost,
                        impuesto: itbms
                    }
                    :product
                    )
                }}
                
})


export const eventStartUpdateProductPrice = (activeList, Product, cost =0, itbms= 0) => {
    const data = { uid: activeList.usuario, precio: cost, impuesto: itbms};
    return async(dispatch) => {
        try {
            const resp = await fetchConToken(`productos/${Product._id}`, data, 'PUT')
            const body = await resp.json();
            dispatch(eventUpdateProductPrice(activeList, Product, cost, itbms  ))
        } catch (error) {
            console.log(error)
        }
    }  
}


export const eventStartUpdateListBudge = (activeList, Budget) => {
    const data = {presupuesto: Budget, uid: activeList.usuario, nombre: activeList.nombre};
    return async(dispatch) => {
        try {
            const resp = await fetchConToken(`listas/${activeList._id}`, data, 'PUT')
            const body = await resp.json();
            dispatch(eventUpdateListBudge(activeList, Budget));
        } catch (error) {
            console.log(error)
        }
    }

}

export const eventUpdateListBudge = (activeList, Budget) => ({
    type: types.eventUpdateListBudge,
    payload: {
        id: activeList.id,
        list: { ...activeList,
                presupuesto: Budget
        }
    }

})


export const eventStartCheckProduct = (activeList,  Product, check = false) => {
    const data = { uid: activeList.usuario, checked: check};
    return async(dispatch) => {
        try {
            const resp = await fetchConToken(`productos/${Product._id}`, data, 'PUT')
            const body = await resp.json();
            dispatch(eventCheckProduct(activeList, Product, check   ))
        } catch (error) {
            console.log(error)
        }
    }   
}


export const eventCheckProduct = (activeList, Product, check) => ({
    type: types.eventCheckProduct,
    payload: {
        id: activeList._id,
        list: {...activeList,
                    productos: activeList.productos.map( product => (product._id === Product._id)
                    ? {...Product,
                        checked: check
                    }
                    :product
                    )
                }}
})


export const eventLogout = () => ({
    type: types.eventLogout
})

