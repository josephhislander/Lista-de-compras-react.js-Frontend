import { eventCheckProduct, eventDeleteList, eventDeleteProduct, eventGetList, eventGetProducts, eventLogout, eventNewActiveList, eventNewActiveProduct, eventNewList, eventNewProduct, eventUpdateList, eventUpdateListBudge, eventUpdateProductPrice } from "../../action/listEvents";
import { types } from "../../types/types";

describe('Pruebas en listEvents.js de la carpeta action', () => {
    
    test('eventNewList correcto', () => {

        const body = {
            lista: ''
        }

        const funcion = eventNewList(body);

        expect(funcion).toEqual({ type: types.eventNewList,
                                  payload:  body.lista })
    });


    test('eventGetList correcto', () => {
        
        const listas = []

        const funcion = eventGetList(listas);

        expect(funcion).toEqual({ type: types.eventGetList,
                                  payload: listas
        })
    });

    test('eventDeleteList correcto', () => {
        
        const id = ''

        const funcion = eventDeleteList(id);

        expect(funcion).toEqual({ type: types.eventDeleteList,
                                  payload: id
        })
    });

    test('eventUpdateList correcto', () => {
        
        const lista = { _id: ''}
        const productos = [] 

        const funcion = eventUpdateList(lista, productos);

        expect(funcion).toEqual({ type: types.eventUpdateList,
                                  payload:{ 
                                      id: lista._id,
                                      list: {
                                          ...lista,
                                          productos
                                  }}
        })
    });
    
    test('eventNewActiveList correcto', () => {
        
        const list = ''

        const funcion = eventNewActiveList(list);

        expect(funcion).toEqual({ type: types.eventNewActiveList,
                                  payload: list
        })
    });

    test('eventNewProduct correcto', () => {
        
        const producto = '';
        const activeList = '' 

        const funcion = eventNewProduct(producto, activeList);

        expect(funcion).toEqual({  type: types.eventNewProduct,
                                    payload: {
                                        activeList,
                                        producto
                                            }
        })
    });

    test('eventGetProducts correcto', () => {
        
        const productos = '';
        const activeList = {
            _id: ''
        } 

        const funcion = eventGetProducts(activeList, productos);

        expect(funcion).toEqual({  type: types.eventGetProducts,
                                    payload: {
                                        id: activeList._id,
                                        list: {...activeList,
                                                    productos   
                                                }}
        })
    });


    test('eventDeleteProduct correcto', () => {
        
        const productId = '';
        const activeList = {
            _id: '',
            productos: []
        } 


        const funcion = eventDeleteProduct(productId, activeList);

        expect(funcion).toEqual({  type: types.eventDeleteProduct,
                                    payload:  {
                                        id: activeList._id,
                                        list: {...activeList,
                                                    productos: activeList.productos.filter( producto => producto._id !== productId)     
                                                }}
        })  
    });

    test('eventNewActiveProduct correcto', () => {
        
        const Product = '';
        const activeList = {
            id: ''
        } 

        const funcion = eventNewActiveProduct( activeList, Product);

        expect(funcion).toEqual({  type: types.eventNewActiveProduct,
                                    payload: {
                                        id: activeList.id,
                                        list: {...activeList,
                                                activeProduct: Product
                                                }
                                            }
        })  
    });

    test('eventUpdateProductPrice correcto', () => {
        
        const Product = '';
        const activeList = {
            _id: '',
            productos: []
        } 
        const cost = '';
        const itbms = '';

        const funcion = eventUpdateProductPrice(activeList, Product, cost, itbms);

        expect(funcion).toEqual({  type: types.eventUpdateProductPrice,
                                    payload: {
                                        id: activeList._id,
                                        list: {...activeList,
                                                    productos: activeList.productos.map( product => (product._id === Product._id)
                                                    ? {...Product,
                                                        precio: cost,
                                                        impuesto: itbms
                                                    }
                                                    :product
                                                    ),
                                                }}
        })  
    });

    test('eventUpdateListBudge correcto', () => {
        
        const activeList = {
            id: '',
        } 
        const Budget = '';

        const funcion = eventUpdateListBudge(activeList, Budget);

        expect(funcion).toEqual({  type: types.eventUpdateListBudge,
                                    payload: {
                                        id: activeList.id,
                                        list: { ...activeList,
                                                presupuesto: Budget
                                        }
                                    }
        })  
    });

    test('eventCheckProduct correcto', () => {
        
        const Product = '';
        const activeList = {
            _id: '',
            productos: []
        }
        const check = '';

        const funcion = eventCheckProduct(activeList, Product, check);

        expect(funcion).toEqual({  type: types.eventCheckProduct,
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
    });

    test('eventLogout correcto', () => {

        const funcion = eventLogout();

        expect(funcion).toEqual({ type: types.eventLogout})  
    });
});
