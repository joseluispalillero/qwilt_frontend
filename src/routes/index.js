import { Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Home from "./home";
import Properties from "./properties";
import Contacts from "./contacts";
import Financials from "./financials";
import Leases from "./leases";
import Portfolio from "./portfolio";

const makeRouteElem = (component, path) => ({ component, path });

const routes = [
  makeRouteElem(Properties, "/properties"),
  makeRouteElem(Contacts, "/contacts"),
  makeRouteElem(Financials, "/financials"),
  makeRouteElem(Leases, "/leases"),
  makeRouteElem(Portfolio, "/portfolio"),
  makeRouteElem(Home, "/"),
];

const Routes = () => (
  <Dashboard>
    <Switch>
      {routes.map(({path, component}, i) => (
        <Route key={i} path={path}>
          {component}
        </Route>
      ))}
    </Switch>
  </Dashboard>
);

export default Routes;
