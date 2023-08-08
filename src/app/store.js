import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import selectSlice from "./slices/selectSlice";
import censadosSlice from "./slices/censadosSlice";


export const store = configureStore({
    reducer:{
        user: userSlice,
        select: selectSlice,
        censados: censadosSlice,
    },
});