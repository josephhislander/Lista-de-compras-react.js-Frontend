import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

describe('Tests en el archivo authReducer.js', () => {
  
    test('Debe de realizar el login, checkin in false', () => {
      
        const initialState = {checking: true}

        const action = { type: types.authLogin, 
                        payload: {
                            uid: 123434,
                            name: 'Test'
                        }}

        const resp = authReducer(initialState, action);

        expect( resp).toEqual({
            checking: false,
            name: "Test",
            uid: 123434,
        })

    });

    test('Debe de realizar el authCheckingFinish, checkin in false', () => {
      
        const initialState = {checking: true}

        const action = { type: types.authCheckingFinish}

        const resp = authReducer(initialState, action);

        expect( resp).toEqual({
            checking: false
        })

    });

    test('Debe de realizar el authLogout, checkin in false', () => {
      
        const initialState = {checking: true}

        const action = { type: types.authLogout}

        const resp = authReducer(initialState, action);

        expect( resp).toEqual({
            checking: false
        })

    });
    
});
