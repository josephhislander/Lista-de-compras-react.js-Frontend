import React from 'react'
import { Link } from 'react-router-dom'

export const CreateNewList = () => {
    return (
        <Link className='btn btn-success fab fs-1 '
        type="button"  to="/list/newList"
        >
            <i className="bi bi-plus-lg "></i>
        </Link>
    )
}
