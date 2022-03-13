import { types } from "../types/types";

const initialState = {
    lists: [],
    activeList: {}
}

export const shoppingListReducer = ( state = initialState, action) => {

    switch (action.type) {

          case types.eventNewList:
            return {
                ...state,
                lists: [ ...state.lists, action.payload],
                activeList:  {
                    ...action.payload
                }
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
                lists: state.lists.filter( list => list._id !== action.payload.id)
            }

        case types.eventUpdateList:
            return {
                
                ...state, 
                lists: state.lists.map( 
                    list => list._id === action.payload.id
                        ? action.payload.list
                        : list
                ),
                activeList: action.payload.list

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
                    list => list._id === action.payload.id
                        ? action.payload.list
                        : list
                ),
                activeList: action.payload.list
            }

        case types.eventNewProduct:
            return {
                ...state,
                lists: state.lists.map( 
                    list => list._id === action.payload.activeList._id
                            ?  { ...list, productos : [...list.productos, action.payload.producto]}
                            : list
                ),
                activeList: {...action.payload.activeList,
                    productos: [...action.payload.activeList.productos, action.payload.producto] 
                }
            }

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
                    list => list._id === action.payload.id
                        ? action.payload.list
                        : list
                ),
                activeList: {...action.payload.list}
            }

        case types.eventNewActiveProduct:
            return {
                ...state,
                lists: state.lists.map(
                    list => list._id === action.payload.id
                        ? action.payload.list
                        : list
                
                ),

                activeList: {...action.payload.list}
            }

        case types.eventUpdateProductPrice:
            return {
                ...state,
                lists: state.lists.map( 
                    list => list._id === action.payload.id
                        ? action.payload.list
                        : list
                ),
                activeList: action.payload.list
            }

       case types.eventCheckProduct:
           return {
                ...state,
                lists: state.lists.map( 
                    list => list._id === action.payload.id
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
