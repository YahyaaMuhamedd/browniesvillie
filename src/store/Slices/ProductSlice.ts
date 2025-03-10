// "use client"
// import { fetchProducts } from "@/services/ProductServices";
// import { Product } from "@/types/ProductTypes";
// import { createSlice } from "@reduxjs/toolkit";


// interface ProductState {
//     Product: Product[];
//     Loading: boolean;
//     Error: string | null;
// }

// const initialState: ProductState = {
//     Product: [],
//     Loading: false,
//     Error: null,
// };



// const ProductSlice = createSlice({
//     name: "Product",
//     initialState, // Fixed the typo here
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchProducts.pending, (state) => {
//                 state.Loading = true;
//                 state.Error = null;
//             })
//             .addCase(fetchProducts.fulfilled, (state, action) => {
//                 state.Loading = false;
//                 state.Product = action.payload;
//             })
//             .addCase(fetchProducts.rejected, (state, action) => {
//                 state.Loading = false;
//                 state.Error = action.error.message || "Something went wrong";
//             });
//     },
// });

// export default ProductSlice.reducer;