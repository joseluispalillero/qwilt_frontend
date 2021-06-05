import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Home from "./home";
import Properties from "./properties";
import Contacts from "./contacts";
import Financials from "./financials";
import Leases from "./leases";
import Portfolio from "./portfolio";

const makeRouteElem = (component, path, exact = false) => ({
  component,
  path,
  exact,
});

const routes = [
  makeRouteElem(Home, "/", true),
  makeRouteElem(Properties, "/properties"),
  makeRouteElem(Contacts, "/contacts"),
  makeRouteElem(Financials, "/financials"),
  makeRouteElem(Leases, "/leases"),
  makeRouteElem(Portfolio, "/portfolio"),
];

const Routes = () => (
  <Router>
    <Dashboard>
      <Switch>
        {routes.map(({ path, component, exact }, i) => (
          <Route exact={exact} key={i} path={path}>
            {component}
          </Route>
        ))}
      </Switch>
    </Dashboard>
  </Router>
);

export default Routes;
