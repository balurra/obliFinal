import { createSlice } from "@reduxjs/toolkit";




const initialState = {
    departamentos:[],
    ciudades:[],
    ocupaciones:[],
};

export const selectSlice = createSlice({
    name: 'select',
    initialState,
    reducers: {
        fillDepartamentos: (state, action) => {
            state.departamentos = action.payload;
          },
          fillCiudades: (state, action) => {
            state.ciudades = action.payload;
          },
          fillOcupaciones: (state, action) => {
            state.ocupaciones = action.payload;
          },

        
    },
});

export const {fillDepartamentos, fillCiudades, fillOcupaciones} = selectSlice.actions;
export default selectSlice.reducer;