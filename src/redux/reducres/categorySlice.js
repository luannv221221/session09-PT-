import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCategoriesThunk = createAsyncThunk("getCategories", async ({ page = 1 } = {}) => {
    const apiURL = `http://localhost:8080/api/v1/categories?page=${page - 1}`;
    const respone = await axios.get(apiURL);
    console.log(respone.data);
    return respone.data;

})

const categorySilce = createSlice({
    name: "categories",
    initialState: {
        data: [],
        loading: false,
        totalElements: 0,
        totalPages: 0
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
                state.data = action.payload.content;
                state.totalElements = action.payload.totalElements;
                state.totalPages = action.payload.totalPages
            })
            .addCase(getCategoriesThunk.rejected, (state, err) => {
                state.loading = false;
                console.log(err);
                console.log("loi roi");
            })
    }
});
export default categorySilce.reducer;