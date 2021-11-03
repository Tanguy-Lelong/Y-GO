import React, { Component, useState, useEffect } from 'react';
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

import {
  changeSideBarVisibility, storeSideBarVisibility
} from '../features/Store/Store';
import { useSelector, useDispatch } from 'react-redux';



export default function MenuBar() {
  const dispatch = useDispatch();
  const sideBarVisibility = useSelector(storeSideBarVisibility);
  const [isMenuOpen, setMenuStatus] = useState(false)

  const zeub = () => {
    dispatch(changeSideBarVisibility(!sideBarVisibility))
    const menuBtn = document.querySelector('.menu-btn');
    if(!isMenuOpen) {
      menuBtn.classList.add('open');
      setMenuStatus(true);
    } else {
      menuBtn.classList.remove('open');
      setMenuStatus(false);
    }

  }
  
  useEffect(() => {
    console.log("window", window.innerWidth)
  }, []);

  if (window.innerWidth <= 500) {
    return (
      <div className="menuwrapper">
          <div onClick={() => zeub()} style={{width: "20%"}} className="btnSidebar">
            <div class="menu-btn">
              <div class="menu-btn__burger"></div>
            </div>
          </div>
          <div className="logoMenu">
          <Link to="/">
              <img style={{width: "40%", marginLeft: "30%"}} src={logoYnov}></img>
              </Link>
          </div>
      </div>
    )
  }
  else {
    return(
      <div className="menuwrapperDesktop">
          <div className="logoMenu">
              <img style={{height: "60px",}} src={logoYnov}></img>
          </div>
          <div className="bdmMenu">
          <Link to="/" ><div>Home</div></Link></div>
          <div  className="poleMenu">Ajout</div>
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


    
}