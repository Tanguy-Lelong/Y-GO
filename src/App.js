import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LoginAndregisterWrapper from './Components/LoginAndRegister/LoginAndRegisterWrapper';
import { Icon, Menu, Sidebar } from 'semantic-ui-react';
import MenuBar from './Components/Menu/Menu';
import { storeSideBarVisibility } from './features/Store/Store';
import { useSelector } from 'react-redux';


export default function App() {
  const isSideBarVisible = useSelector(storeSideBarVisibility);

  return (
    <Router>
      <Sidebar as={Menu} animation='overlay' icon='labeled' inverted vertical visible={isSideBarVisible} width='thin'>
        <Menu.Item as='a'>
          <Icon name='home' />
          Home
        </Menu.Item>
        <Menu.Item as='a'>
          S'inscrire
        </Menu.Item>
      </Sidebar>
      <MenuBar/>
      <div style={{paddingTop: "80px"}}>
      <Switch>
        <Route path="/loginAndRegister">
          <LoginAndregisterWrapper/>
        </Route>
        <Route path="/">
          Home
        </Route>
      </Switch>
      </div>
    </Router>
  );
}