import React, { useState } from 'react';
import './Menu.scss'
import logoYnov from '../../images/LOGO_CAMPUS.png';
import { UserOutlined} from '@ant-design/icons';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { changeSideBarVisibility, storeSideBarVisibility } from '../../features/Store/Store';
import { useSelector, useDispatch } from 'react-redux';

export default function MenuBar() {
  const dispatch = useDispatch();
  const sideBarVisibility = useSelector(storeSideBarVisibility);
  const [isMenuOpen, setMenuStatus] = useState(false)

  const showSideBarMobileVersion = () => {
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

  if (window.innerWidth <= 500) {
    return (
      <div className="menuwrapper">
          <div onClick={() => showSideBarMobileVersion()} style={{width: "20%"}} className="btnSidebar">
            <div className="menu-btn">
              <div className="menu-btn__burger"></div>
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
            <Link to="/" ><div>Home</div></Link>
          </div>
          <div className="bdmMenu">
            <Link to="/rides" ><div>Rides</div></Link>
          </div>
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