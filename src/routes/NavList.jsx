import React from "react";
import { Link as LinkRouter } from "react-router-dom";
import { List, ListItem, ListItemIcon, ListItemText, Box } from "@material-ui/core";
import AppsIcon from "@material-ui/icons/Apps";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import ContactsIcon from "@material-ui/icons/Contacts";
import ReceiptIcon from "@material-ui/icons/Receipt";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";

const makeNavItem = (name, path, icon) => ({ name, path, icon });

const navListItems = [
  makeNavItem("Home", "/", AppsIcon),
  makeNavItem("Properties", "/properties", HomeWorkIcon),
  makeNavItem("Portfolio", "/portfolio", BusinessCenterIcon),
  makeNavItem("Contacts", "/contacts", ContactsIcon),
  makeNavItem("Leases", "/leases", ReceiptIcon),
  makeNavItem("Financials", "/financials", AccountBalanceIcon),
];

const NavList = () => (
  <List>
    {navListItems.map((navItem) => (
      <ListItem button component={LinkRouter} to={navItem.path}>
        <ListItemIcon>
          <Box component={navItem.icon}/>
        </ListItemIcon>
        <ListItemText primary={navItem.name} />
      </ListItem>
    ))}
  </List>
);

export default NavList;
