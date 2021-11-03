
// import AdminInterface from './Admin/AdminInterface';
import UserInterface from './User/UserInterface';
import React, { useState } from 'react';
import Register from './Register';
import Login from './Login';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
  changeUserName,
  changeStatusPage,
  changeToken,
  storeStatusPage,
  changeUserMenuSelected,
} from '../features/Store/Store';


export function LoginAndregisterWrapper() {
  const dispatch = useDispatch();
  const statusPage = useSelector(storeStatusPage);

    if (statusPage === "UserPage" || (localStorage.getItem("Admin") === "false")) {
      return (
        <UserInterface/>
      )
    }
    if (statusPage === "Register" ) {
      return (
        <Register/>
      )
    }
    if (statusPage === "Login" ) {
      return (
        <Login/>
      )
    }


}
export default LoginAndregisterWrapper;