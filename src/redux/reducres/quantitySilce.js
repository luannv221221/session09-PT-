import { createSlice } from "@reduxjs/toolkit";

export const quantitySilce = createSlice({
    name: "quantity",
    initialState: {
        value: 10
    },
    reducers: {
        increase: state => {
            state.value += 1;
        },
        decrease: state => {
            state.value -= 1;
        }
    }
})
export const { increase, decrease } = quantitySilce.actions;
export default quantitySilce.reducer;