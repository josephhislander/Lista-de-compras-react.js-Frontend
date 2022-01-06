import { combineReducers } from "redux";
import {authReducer} from './authReducer';
import { shoppingListReducer } from "./shoppingListReducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    shoppingListReducer: shoppingListReducer
})
