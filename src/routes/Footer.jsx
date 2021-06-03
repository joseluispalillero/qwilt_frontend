import React from "react";
import { Box, Typography, Link } from "@material-ui/core"

const Copyright = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    {"Copyright © "}
    <Link color="inherit" href="https://material-ui.com/">
      FC Props
    </Link>{" "}
    {new Date().getFullYear()}
    {"."}
  </Typography>
);

const Footer = () => (
  <Box pt={4}>
    <Copyright />
  </Box>
);

export default Footer;
