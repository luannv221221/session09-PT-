import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { decrease, increase } from './redux/reducres/quantitySilce';

function UpdateQuantity() {
    const quantity = useSelector((state) => {
        console.log(state.quantity.value);
        return state.quantity.value;
    });

    const dispath = useDispatch();
    const increaseQty = () => {
        dispath(increase());
    }
    const decreaseQty = () => {
        dispath(decrease())
    }
    return (
        <>
            <button onClick={decreaseQty}>-</button>
            <input type="text" value={quantity} readOnly />
            <button onClick={increaseQty}>+</button>
        </>
    )
}

export default UpdateQuantity