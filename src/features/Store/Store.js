import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice(
    {
        name: 'store',
        initialState: {
            statusPage: "Login",
            username: "",
            isAdminLogged: false,
            searchValue: "",
            userMenuSelected: "Data",
            token: "",
            missingField: 0,
            isDarkMode: false,
            isSideBarVisible: false,
        },
        reducers: {
            changeUserName: (state, action) => {
              state.username = action.payload;
            },
            changeStatusPage: (state, action) => {
              state.statusPage = action.payload;
            },
            changeUser: (state, action) => {
              state.status = action.payload;
            },
            changeSearchValue: (state, action) => {
              state.searchValue = action.payload;
            },
            changeUserMenuSelected: (state, action) => {
              state.userMenuSelected = action.payload;
            },
            changeToken: (state, action) => {
              state.token = action.payload;
            },
            changeMissingField: (state, action) => {
              state.missingField = action.payload;
            },
            changeDarkMode: (state, action) => {
              state.isDarkMode = action.payload;
            },
            changeSideBarVisibility: (state, action) => {
              state.isSideBarVisible = action.payload;
            },
        },
    }
);

export const { changeUserName, changeStatusPage, changeUser, changeSearchValue, changeUserMenuSelected, changeToken, changeMissingField, changeDarkMode, changeSideBarVisibility } = slice.actions;



export const storeStatusPage = state => state.store.statusPage;

export const storeUserName = state => state.store.username;

export const storeUserType = state => state.store.isAdminLogged;

export const storeSearchValue = state => state.store.searchValue;

export const storeUserMenuSelected = state => state.store.userMenuSelected;

export const storeToken = state => state.store.token;

export const storeMissingField = state => state.store.missingField;

export const storeDarkMode = state => state.store.isDarkMode;

export const storeSideBarVisibility = state => state.store.isSideBarVisible;

export default slice.reducer;
