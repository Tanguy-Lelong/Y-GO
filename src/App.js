import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LoginAndregisterWrapper from './Components/LoginAndRegisterWrapper';
import MenuBar from './Components/Menu';
import {
  Checkbox,
  Grid,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
} from 'semantic-ui-react';

import {
  changeSideBarVisibility, storeSideBarVisibility
} from './features/Store/Store';
import { useSelector, useDispatch } from 'react-redux';


export default function App() {
  const isSideBarVisible = useSelector(storeSideBarVisibility);
  const [visible, setVisible] = React.useState(isSideBarVisible);
  const dispatch = useDispatch();

  return (
    <Router>
      <div>
          <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            inverted
            onHide={() => setVisible(false)}
            vertical
            visible={isSideBarVisible}
            width='thin'
          >
            <Menu.Item as='a'>
              <Icon name='home' />
              Home
            </Menu.Item>
            <Menu.Item as='a'>
              S'inscrire
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher dimmed={visible}>
          <MenuBar/>
        <div style={{paddingTop: "80px"}}>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/loginAndRegister">
            <LoginAndregisterWrapper/>
          </Route>
          <Route path="/">
          <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/loginAndRegister">loginAndRegister</Link>
            </li>
          </ul>
        </nav>
          </Route>
        </Switch>
        </div>
          </Sidebar.Pusher>

    </div>
    </Router>
  );
}
function About() {
  return <h2>About</h2>;
}