import { Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Home from "./home";
import Properties from "./properties";
import Contacts from "./contacts";
import Financials from "./financials";
import Leases from "./leases";
import Portfolio from "./portfolio";

const Routes = () => (
  <Dashboard>
    <Switch>
      <Route path="/properties">
        <Properties />
      </Route>
      <Route path="/contacts">
        <Contacts />
      </Route>
      <Route path="/financials">
        <Financials />
      </Route>
      <Route path="/leases">
        <Leases />
      </Route>
      <Route path="/portfolio">
        <Portfolio />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  </Dashboard>
);

export default Routes;
