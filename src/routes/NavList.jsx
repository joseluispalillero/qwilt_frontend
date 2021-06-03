import React from "react";
import { Link as LinkRouter } from "react-router-dom";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import AppsIcon from "@material-ui/icons/Apps";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import ContactsIcon from "@material-ui/icons/Contacts";
import ReceiptIcon from "@material-ui/icons/Receipt";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";

const NavList = () => (
  <List>
    <ListItem button component={LinkRouter} to="/">
      <ListItemIcon>
        <AppsIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>
    <ListItem button component={LinkRouter} to="/properties">
      <ListItemIcon>
        <HomeWorkIcon />
      </ListItemIcon>
      <ListItemText primary="Properties" />
    </ListItem>
    <ListItem button component={LinkRouter} to="/portfolio">
      <ListItemIcon>
        <BusinessCenterIcon />
      </ListItemIcon>
      <ListItemText primary="Portfolio" />
    </ListItem>
    <ListItem button component={LinkRouter} to="/contacts">
      <ListItemIcon>
        <ContactsIcon />
      </ListItemIcon>
      <ListItemText primary="Contacts" />
    </ListItem>
    <ListItem button component={LinkRouter} to="/leases">
      <ListItemIcon>
        <ReceiptIcon />
      </ListItemIcon>
      <ListItemText primary="Leases" />
    </ListItem>
    <ListItem button component={LinkRouter} to="/financials">
      <ListItemIcon>
        <AccountBalanceIcon />
      </ListItemIcon>
      <ListItemText primary="Financials" />
    </ListItem>
  </List>
);

export default NavList;
