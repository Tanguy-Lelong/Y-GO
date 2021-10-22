import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LoginAndregisterWrapper from './Components/LoginAndRegisterWrapper';
import Menu from './Components/Menu';

export default function App() {
  return (
    <Router>
      <div>
        <Menu/>
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
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>LoginAndregisterWrapper</h2>;
}

// import React from 'react';
// import './App.css';
// import LoginAndregisterWrapper from './Components/LoginAndRegisterWrapper';

// function App() {
//   return (
//     <div className="App">
//         <LoginAndregisterWrapper/>
//     </div>
//   );
// }

// export default App;
