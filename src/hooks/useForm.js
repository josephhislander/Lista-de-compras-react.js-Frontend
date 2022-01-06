import { useState } from "react"


export const useForm = ( initialState = {} ) => {
    
    const [values, setValues] = useState(initialState);

    const reset = (nameValue = '', amountValue = 1, Cost = '') => {
     
        setValues( {
            ...values,
            nameValue,
            amountValue,
            Cost
        });
    }


    const handleInputChange = ({ target }) => {

        setValues({
            ...values,
            [ target.name ]: target.value
        });

    }

    return [ values, handleInputChange, reset ];

}