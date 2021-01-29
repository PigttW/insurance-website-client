import React from "react";
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import SignUp from "./Registration";
import Footer from "./Footer";
import Login from "./Login";
import Header from "./Header";
import Plans from "./Plans";
import Account from "./Account";
import Logout from "./Logout";
import auth from "./auth.hoc";
import Provider from "./Provider";

function App() {
  return (
      <React.Fragment>
          <Header />
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/signup" component={SignUp} />
            <Route path="/plans" component={Plans} />
            <Route path="/account" component={Account} />
              <Route path="/providers" component={Provider} />
          </Switch>
        </BrowserRouter>
        <Footer />
      </React.Fragment>
  );
}

export default App;
