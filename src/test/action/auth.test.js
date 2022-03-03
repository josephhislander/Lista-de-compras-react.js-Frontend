import configureStore  from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';
import { finishChecking, login, logout, startChecking, startLogin, startRegister } from '../../action/auth';
import * as fetchModule from '../../helpers/fetch';
import { types } from '../../types/types';


jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}));
const middlewares = [thunk];
const mockStore = configureStore( middlewares);

const initState = {};
let store = mockStore( initState);
Storage.prototype.setItem = jest.fn();

describe('Pruebas en las acciones del auth', () => {
     beforeEach( () => {
         store = mockStore(initState);
         jest.clearAllMocks();
     })

     test('startLogin Correcto', async() => {
        
       await store.dispatch(startLogin('Test0@gmail.com', '1234567'));
       const actions = store.getActions();
       
       expect( actions[0]).toEqual({
        type: '[auth] Login',
        payload: { 
            uid: expect.any(String), 
            name: expect.any(String)
        }
      })

      expect( localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));
      expect( localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));

     });

     test('startLogin Incorrecto', async() => {
       
        await store.dispatch(startLogin('Test0@gmail.com', '12345678'));

        const actions = store.getActions();
        console.log(actions);

        expect(actions).toEqual([]);
        expect(Swal.fire).toHaveBeenCalledWith("Error", "Usuario / Password no son correctos - password", "error");

     });
     
     
     test('startRegister Correcto', async() => {

        // jest.mock('../../action/auth', () => ({
        //     startLogin: jest.fn()
        // }));

        // const startLogin = jest.fn();
        
        // fetchModule.fetchSinToken = jest.fn(() => ({
        //     json() {
        //         return {
        //             msg: "Creado",
        //             usuario: {
        //                 rol: "ADMIN_ROLE",
        //                 estado: true,
        //                 google: false,
        //                 nombre: "test1111",
        //                 correo: "Test0@gmail.com",
        //                 uid: "620446800cacee2d94ee6dc0"
        //             }
        //         }
        //     }
        // }));

        // await store.dispatch(startRegister('joseph', 'Test0@gmail.com', '1234567', '1234567', 'USER-ROLE'));

        // const actions =  store.getActions();
        // console.log(actions)
        // expect(actions[0].toEqual(success()))       
        // expect( startLogin).toHaveBeenCalled();
        
        // (
        //     {
        //         msg: "Creado",
        //         usuario: {
        //             rol: "ADMIN_ROLE",
        //             estado: true,
        //             google: false,
        //             nombre: "test1111",
        //             correo: "Test0@gmail.com",
        //             uid: "620446800cacee2d94ee6dc0"
        //         }
        //     }
        // )
     });

     test('startChecking Correcto', async() => {

        // await store.dispatch(startLogin('Test0@gmail.com', '1234567'));
        // await store.dispatch(startChecking());
        // const actions = store.getActions();

        // console.log(actions);

     });
     
      test('Funcion login Correcta', () => {
        const user = '12323';
        const loginType = {
            type: types.authLogin,
            payload: user
        }
        const Login = login(user);
        expect(Login).toEqual(loginType);
      });

      test('Función finishChecking Correcta', () => {

            const finishCheckingType = {
                type: types.authCheckingFinish
            }
            const  FinishChecking = finishChecking();
            expect(FinishChecking).toEqual(finishCheckingType);

      });

      test('Función logout Correcta', () => {

        const logoutType = {
            type: types.authLogout
        }
        const  Logout = logout();
        expect(Logout).toEqual(logoutType);

  });
      
});
