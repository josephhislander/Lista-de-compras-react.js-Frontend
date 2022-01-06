import PropTypes from 'prop-types';
import React from 'react'
import {ListItem} from './ListItem';

export const ListProducts = ({products}) => {

   
    return (
        <div className='list-check-container min-h m-0 border-bottom-0'>
            {   
                (products !== []) &&
                products.map( product => (
                <ListItem key={product.id}
                            {...product}
                            Product={product}  
                            products={products}
                              />
                ))
            }
        </div>
    )
}

ListProducts.propTypes = {
    products: PropTypes.array.isRequired,
}