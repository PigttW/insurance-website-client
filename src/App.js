import React from "react";
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import SignUp from "./Registration";
import Login from "./Login";
import Plans from "./Plans";
import Account from "./Account";
import Logout from "./Logout";
import Provider from "./Provider";
import Dashboard from "./adminAccount";
import AdminLogin from "./AdminLogin";
import AddPlan from "./AddPlan";
import ProviderRegistration from "./ProviderRegistration";
import ProviderLogin from "./ProviderLogin";
import ProviderAccount from "./ProviderAccount";
import Home from "./Home";

function App() {
  return (
      <React.Fragment>

        <BrowserRouter>
          <Switch>
            <Route path="/login" component={Login} />
              <Route path="/admin-login" component={AdminLogin} />
            <Route path="/provider-login" component={ProviderLogin} />
            <Route path="/provider-account" component={ProviderAccount} />
            <Route path="/logout" component={Logout} />
            <Route path="/signup" component={SignUp} />
            <Route path="/provider-signup" component={ProviderRegistration} />
            <Route path="/plans" component={Plans} />
            <Route path="/account" component={Account} />
              <Route path="/providers" component={Provider} />
              <Route path="/admin" component={Dashboard} />
              <Route path="/add-plan" component={AddPlan} />
            <Route path="/" component={Home} />
          </Switch>
        </BrowserRouter>
      </React.Fragment>
  );
}

export default App;
