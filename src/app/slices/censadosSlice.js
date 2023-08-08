import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    censados:[],
    censadosGeneral:0
};

export const censadosSlice = createSlice({
    name:'censados',
    initialState,
    reducers:{
        fillCensados: (state, action) => {
            state.censados=action.payload;
        },
        deleteCensado: (state, action) => {
            const nuevaLista=state.censados.filter(c=>c.id !== action.payload);
            state.censados=nuevaLista;

        },
        agregarUnCensado: (state, action) => {
            state.censados= [...state.censados, action.payload];
        },
        filterCensados:(state, action) => {
            state.censados = state.censados.filter(o => o.ocupacion === action.payload)
        },
        fillCensadosGeneral: (state, action) => {
            state.censadosGeneral = action.payload;
          }
    }

})

export const { fillCensados, deleteCensado, agregarUnCensado, filterCensados, fillCensadosGeneral} = censadosSlice.actions;
export default censadosSlice.reducer;