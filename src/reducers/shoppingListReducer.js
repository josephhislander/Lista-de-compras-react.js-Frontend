import { types } from "../types/types";


const initialState = {
    lists: [
        // { id: 15151,
        //     title: 'Lista de compras super',
        //     Date: '17/08/2021',
        //     budget: 0, 
        //     products: [
        //         {
        //             id:1,
        //             name: 'Harina',
        //             price: 1,
        //             itbms: 0.5,
        //             checked: false
        //         }, 
        //         {
        //             id:2,
        //             name: 'Azucar',
        //             price: 1,
        //             itbms: 0.5,
        //             checked: false
        //         },
        //         {
        //             id:3,
        //             name: 'Aceite',
        //             price: 1,
        //             itbms: 0.5,
        //             checked: false
        //         }
        //     ],
        //     activeProduct: null
        // }
    ],
    activeList: {}
    // { id: 15151,
    //     title: 'Lista de compras super',
    //     Date: '17/08/2021',
    //     budget: 0,
    //     products: [
    //         {
    //             id:1,
    //             name: 'Harina',
    //             price: 1,
    //             itbms: 0.5,
    //             checked: false
    //         }, 
    //         {
    //             id:2,
    //             name: 'Azucar',
    //             price: 1,
    //             itbms: 0.5,
    //             checked: false
    //         },
    //         {
    //             id:3,
    //             name: 'Aceite',
    //             price: 1,
    //             itbms: 0.5,
    //             checked: false
    //         }
    //     ],
    //     activeProduct: {
    //         id:3,
    //         name: 'Aceite',
    //         price: null,
    //         itbms: null,
    //         checked: false
    //     }
    // }
}


export const shoppingListReducer = ( state = initialState, action) => {

    switch (action.type) {

          case types.eventNewList:
            return {
                ...state,
                lists: [ ...state.lists, action.payload]
            }

        case  types.eventGetList:
            return {
                ...state,
                lists: [
                    ...action.payload
                ]
            }

        case  types.eventDeleteList:
            return {
                ...state,
                lists: state.lists.filter( list => list !== action.payload)
            }

        case types.eventUpdateList:
            return {
                
                ...state, 
                lists: state.lists.map( 
                    list => list.id === action.payload.id
                        ? action.payload.list
                        : list
                )
            }

        case types.eventNewActiveList:
            return {
                ...state,
                activeList:  {
                    ...action.payload
                }
            }

        
        case types.eventUpdateListBudge:
            return {
                ...state,
                lists: state.lists.map(
                    list => list.id === action.payload.id
                        ? action.payload.list
                        : list
                ),
                activeList: action.payload.list
            }


        // case types.eventNewProduct:
        //     return {
        //         ...state, 
        //         lists: state.lists.map( 
        //             list => list.id === action.payload.id
        //                     ?  { ...list, products : [...list.products, action.payload.product]}
        //                     : list
        //                 // ? action.payload.list
        //                 // : list
        //         ),
        //         activeList: {...action.payload.activeList,
        //             products: [...action.payload.activeList.products, action.payload.product] }
        //     }

        case types.eventGetProducts:
            return {
                ...state,
                lists: state.lists.map( 
                    list => list._id === action.payload.id
                        ? action.payload.list
                        : list
                ),
                activeList: {...action.payload.list}
            }

        case types.eventDeleteProduct:
            return {
                ...state,
                lists: state.lists.map( 
                    list => list.id === action.payload.id
                        ? action.payload.list
                        : list
                ),
                activeList: {...action.payload.list}
            }

        case types.eventNewActiveProduct:
            return {
                ...state,
                lists: state.lists.map(
                    list => list.id === action.payload.id
                        ? action.payload.list
                        : list
                
                ),

                activeList: {...action.payload.list}
            }

        case types.eventUpdateProductPrice:
            return {
                ...state,
                lists: state.lists.map( 
                    list => list.id === action.payload.id
                        ? action.payload.list
                        : list
                ),
                activeList: action.payload.list
            }

       case types.eventCheckProduct:
           return {
                ...state,
                lists: state.lists.map( 
                    list => list.id === action.payload.id
                        ? action.payload.list
                        : list
                ),
                activeList: action.payload.list
           }

        case types.eventLogout:
            return {
                ...initialState
            }
    
        default:
            return state;
    }
}
