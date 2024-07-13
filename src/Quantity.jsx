import React from 'react'
import { useSelector } from 'react-redux'

function Quantity() {
    const quantity = useSelector((state) => {
        console.log(state.quantity.value);
        return state.quantity.value;
    })
    return (
        <div>{quantity}</div>
    )
}

export default Quantity