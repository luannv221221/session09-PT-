import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCategoriesThunk = createAsyncThunk("getCategories", async () => {
    const apiURL = "http://localhost:8080/api/v1/categories";
    const respone = await axios.get(apiURL);
    console.log(respone.data);
    return respone.data;

})

const categorySilce = createSlice({
    name: "categories",
    initialState: {
        data: [],
        loading: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategoriesThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCategoriesThunk.fulfilled, (state, action) => {
                state.loading = false;
                // console.log("action", action);
                state.data = action.payload
            })
            .addCase(getCategoriesThunk.rejected, (state) => {
                state.loading = false;
                console.log("loi roi");
            })
    }
});
export default categorySilce.reducer;