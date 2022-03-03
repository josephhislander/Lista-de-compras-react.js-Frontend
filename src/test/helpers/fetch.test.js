import { fetchConToken, fetchSinToken } from "../../helpers/fetch";



describe('Pruebas en el helper Fetch', () => {

    let token = '';
  
    test('fetchSinToken debe de funcionar', async() => {
      
        const resp = await fetchSinToken('auth/login', {correo:'Test0@gmail.com', password: '1234567'}, 'POST');
        const body = await resp.json();
        token = body.token;

        expect( resp instanceof Response).toBe(true);
        expect(body.ok).toBe(true);

    });

    test('fetch con token debe de funcionar', async () => {
      
        localStorage.setItem('token', token)
        const data = {
            nombre: 'test',
            uid: '6181ff0f446a9813ace703d5'
        }

        const resp = await fetchConToken('listas', data, 'POST');
        const body = await resp.json();

        expect(body.ok).toBe(true);

    });
    
});
