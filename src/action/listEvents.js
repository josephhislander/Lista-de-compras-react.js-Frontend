import { types } from "../types/types"
import moment from 'moment';
import { fetchConToken } from "../helpers/fetch";
import Swal from "sweetalert2";
moment().format();

export const eventStartNewList = ({title, products, user}) => {

    
    
    return async(dispatch) => {

        try {
            
            const data = {nombre: title,
                           uid: user.uid 
                            };
        
            const resp = await fetchConToken('listas',data , 'POST');
            const body = await resp.json();
            // console.log(body);
                        

            if( body.msg ){
               return Swal.fire({
                    icon: 'error',
                    title: body.msg,
                    text: 'Use other title for a new list'
                })

            }

            dispatch(eventNewList(title, products, body._id, user.uid))

            Swal.fire(
            'Save!',
            'Your list has been created.',
            'success'
          )
        } catch (error) {
            console.log(error)
            // const resp2 = await fetchConToken('')
        }
    }
}

const eventNewList = (nombre, productos, _id, usuario) => ({
    type: types.eventNewList,
    payload: 
        {   
            _id ,
            estado: true,
            productos,
            presupuesto: 0,
            nombre,
            usuario,
            fecha: moment().format("D/MM/YYYY"),

        }   
})

export const eventStarGetList = (event) => {

    
    return async(dispatch) => {

        try {
            
            const data = {
                           uid: event
                            };
        
            const resp = await fetchConToken('listas',data, 'GET' );
            const body = await resp.json();
            // console.log(body);
            dispatch(eventGetList(body))
        } catch (error) {
            console.log(error)
            // const resp2 = await fetchConToken('')
        }

        
    }
}

 const eventGetList = (data) => ({
    type: types.eventGetList,
    payload: data.listas
})


export const eventStartDeleteList = (id) => {

    
    return async ( dispatch, getState ) => {

        const { uid} = getState().auth;
        try {
            const resp = await fetchConToken(`listas/${ id }`, {"uid": uid}, 'DELETE' );
            const body = await resp.json();
            console.log(body)
            if ( body.estado === false ) {
                console.log('entro lista en false')
                // dispatch( eventNewActiveList(body))
                dispatch( eventDeleteList(id) );
                dispatch(eventStarGetList(uid));
            } else {
                Swal.fire({icon:'error', title: body.msg, text:'error  Test'});
            }


        } catch (error) {
            console.log(error)
        }

    }
}

const eventDeleteList = (id) => ({
    type: types.eventDeleteList,
    payload: id
})


export const eventStartUpdateList = (activeList, title, products) => {
  
    const data = {nombre: title, products, uid: activeList.usuario};
    console.log(data);
    return async(dispatch) => {
        try {
            const resp = await fetchConToken(`listas/${activeList._id}`, data, 'PUT')

            const body = await resp.json();
            console.log(body);
        } catch (error) {
            console.log(error)
        }
    }
}

const eventUpdateList = (activeList,title,products) => ({
    
    type: types.eventUpdateList,

    payload:{ 
        id: activeList.id,
        list: {
            ...activeList,
            title,
            products
        // id: activeList.id,
        // title,
        // Date: activeList.Date,
        // products,
        // activeProduct: null
    }}
})

export const eventNewActiveList = ( list) => ({
    type: types.eventNewActiveList,
    payload: list
})


export const eventStartNewProduct = (name, activeList, amount) => {

    const data = {  nombre: name,
        lista: activeList,
        cantidad: amount
        };

  

    return async(dispatch) => {

        try {
            
           
            const resp = await fetchConToken('productos',data , 'POST');
            const body = await resp.json();
            console.log(body);
                        

            // if( body.msg ){
            //    return Swal.fire({
            //         icon: 'error',
            //         title: body.msg,
            //         text: 'Use other title for a new list'
            //     })

            // }
            // dispatch(eventNewProduct(name, activeList, amount))

            Swal.fire(
            'Save!',
            'Your product has been add.',
            'success'
          )
        } catch (error) {
            console.log(error)
            // const resp2 = await fetchConToken('')
        }
    }
}

// const eventNewProduct = (activeList, nombre, cantidad) => ({
//     type: types.eventNewProduct,
//     payload: {
//         id: activeList.id,
//         list: {...activeList,
//                     productos:[ ...activeList.productos ,
//                    {id: moment().format("HmsS"),
//                     name: nameValue,
//                     amount: amountValue,
//                     price:0,
//                     itbms:0,
//                     checked: false}
//                 ]
//                 },
                
//                 activeList
            

//                 }
// })

export const eventStartGetProducts = (activeList) => {

    const { _id,  usuario} = activeList;

    return async(dispatch) => {

        try {
            
            const data = {
                           uid: usuario,
                           list_id: _id
                            };
        
            const resp = await fetchConToken('productos',data, 'GET' );
            const body = await resp.json();
            const productos = body.productos;
            // console.log(productos);
            dispatch(eventGetProducts(activeList, productos))
        } catch (error) {
            console.log(error)
            // const resp2 = await fetchConToken('')
        }

        
    }
}

const eventGetProducts = (activeList, productos) => ({
    type: types.eventGetProducts,
    payload: {
        id: activeList._id,
        list: {...activeList,
                    productos   
                }}

})

export const eventDeleteProduct = (activeList, productId) => ({
    type: types.eventDeleteProduct,
    payload:  {
        id: activeList.id,
        list: {...activeList,
                    products: activeList.products.filter( product => product.id !== productId)     
                }}
})

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
        id: activeList.id,
        list: {...activeList,
                    products: activeList.products.map( product => (product.id === Product.id)
                    ? {...Product,
                        price: cost,
                        itbms: itbms
                    }
                    :product
                    ),

                    activeProduct: {...Product,
                        price: cost,
                        itbms: itbms
                    }
                }}
})


export const eventStartUpdateListBudge = (activeList, Budget) => {
    
    
    const data = {presupuesto: Budget, uid: activeList.usuario, nombre: activeList.nombre};
    console.log(data);
    return async(dispatch) => {
        try {
            const resp = await fetchConToken(`listas/${activeList._id}`, data, 'PUT')

            const body = await resp.json();
            console.log(body);

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

export const eventCheckProduct = (activeList, Product, check) => ({
    type: types.eventCheckProduct,
    payload: {
        id: activeList.id,
        list: {...activeList,
                    products: activeList.products.map( product => (product.id === Product.id)
                    ? {...Product,
                        checked: check
                    }
                    :product
                    ),
                    activeProduct: {...Product,
                        checked: check
                    }
                }}
})


export const eventLogout = () => ({
    type: types.eventLogout
})

