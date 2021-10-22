import React, { Component } from 'react';
import './Menu.scss'
import logoYnovBDE from '../images/logoYnovBDE.jpg';
import logoYnov from '../images/LOGO_CAMPUS.png';
import { UserOutlined} from '@ant-design/icons';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function Menu() {
      return(
        <div className="menuwrapper">
            <div className="logoMenu">
                <img style={{height: "60px",}} src={logoYnov}></img>
            </div>
            
            <div className="bdmMenu">
            <Link to="/" ><div>LE BDE</div></Link></div>
            <div  className="poleMenu">LES POLES</div>
            <div  className="userMenu">
              <Link to="/loginAndRegister">
                <div >
                  <UserOutlined  />
                </div>
              </Link>
            </div>
        </div>
      )
    
}