import React from "react";
import { Typography, Box, IconButton } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import siteData from "./../siteData";

const { brandName } = siteData;

const Logo = ({ username = "username" }) => (
  <Box pl={2} pb={2}>
    <Typography variant="h4">
      <Box fontWeight="fontWeightBold">{brandName}</Box>
    </Typography>
    <Box display="flex" alignItems="center">
      <Box pt={1}>
        <Typography variant="body2">{username}</Typography>
      </Box>
      <IconButton>
          <ExpandMoreIcon fontSize="small"/>
      </IconButton>
    </Box>
  </Box>
);

export default Logo;
