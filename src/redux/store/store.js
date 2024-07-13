import { configureStore } from "@reduxjs/toolkit";
import quantitySilce from "../reducres/quantitySilce";
import categorySlice from "../reducres/categorySlice";


export default configureStore({
    reducer: {
        quantity: quantitySilce,
        category: categorySlice
    }
})