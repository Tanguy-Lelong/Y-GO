import React from 'react';
import Register from '../LoginAndRegister/Register/Register';
import Login from './Login/Login';
import { useSelector } from 'react-redux';
import { storeStatusPage } from '../../features/Store/Store';

export function LoginAndregisterWrapper() {
  const statusPage = useSelector(storeStatusPage);

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