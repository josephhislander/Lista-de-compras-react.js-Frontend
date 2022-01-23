// import { useSelector } from "react-redux";

const baseUrl = process.env.REACT_APP_API_URL;

const fetchSinToken = ( endpoint, data, method = 'GET' ) => {

    const url = `${ baseUrl }/${ endpoint }`;

    if ( method === 'GET' ) {
        return fetch( url );
    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( data )
        });
    }
}

const fetchConToken = ( endpoint, data = false, method = 'GET' ) => {
 
    


    const url = `${ baseUrl }/${ endpoint }`;
    const token = localStorage.getItem('token') || '';
 

    if ( method === 'GET' ) {
        return fetch( url, {
            method,
            headers: {
                'x-token': token,
                'user-id' : data.uid,
                'list-id': data.list_id
            }
        });
    // } if ( method === 'GET'  ) {
    //     return fetch( url, {
    //         method,
    //         headers: {
    //             'x-token': token,
    //         }
    //     });
    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'x-token': token,
                'user-id' : data.uid,
                'list-id': data.list_id,
                'producto-id': data.product_id
            },
            body: JSON.stringify( data )
           
        } );
    }
}



export {
    fetchSinToken,
    fetchConToken
}