import { Navigate } from "react-router-dom";
import DashboardLayout from "src/components/DashboardLayout";
import MainLayout from "src/components/MainLayout";
import Account from "src/pages/Account";
import Dashboard from "src/pages/Dashboard";
import Login from "src/pages/Login";
import Register from "src/pages/Register";
import Settings from "src/pages/Settings";
import NotFound from "src/pages/NotFound";

import PortfolioList from "src/pages/Portfolio/PortfolioList";
import PortfolioAdd from "src/pages/Portfolio/PortfolioAdd";

import PropertiesList from "src/pages/Properties/PropertiesList";
import PropertyAdd from "src/pages/Properties/PropertyAdd";

import LeasesList from "./pages/Leases/LeasesList";
import LeaseAdd from "src/pages/Leases/LeaseAdd";

import ContactsList from "./pages/Contacts/ContactsList";
import ContactsAdd from "src/pages/Contacts/ContactAdd";

const routes = [
  {
    path: "app",
    element: <DashboardLayout />,
    children: [
      { path: "portfolio", element: <PortfolioList /> },
      { path: "portfolio/add", element: <PortfolioAdd/> },

      { path: "properties", element: <PropertiesList /> },
      { path: "properties/add", element: <PropertyAdd /> },

      { path: "leases", element: <LeasesList /> },
      { path: "leases/add", element: <LeaseAdd /> },

      { path: "contacts", element: <ContactsList /> },
      { path: "contacts/add", element: <ContactsAdd /> },

      { path: "account", element: <Account /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "settings", element: <Settings /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "404", element: <NotFound /> },
      { path: "/", element: <Navigate to="/app/dashboard" /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
];

export default routes;
