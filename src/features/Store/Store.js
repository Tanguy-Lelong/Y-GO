import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice(
    {
        name: 'store',
        initialState: {
            statusPage: "Login",
            isSideBarVisible: false,
        },
        reducers: {
            changeStatusPage: (state, action) => {
              state.statusPage = action.payload;
            },
            changeSideBarVisibility: (state, action) => {
              state.isSideBarVisible = action.payload;
            },
        },
    }
);
export const {  changeStatusPage, changeSideBarVisibility } = slice.actions;

export const storeStatusPage = state => state.store.statusPage;

export const storeSideBarVisibility = state => state.store.isSideBarVisible;

export default slice.reducer;
