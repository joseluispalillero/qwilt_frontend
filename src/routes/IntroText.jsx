import React from "react";
import { Typography, Box } from "@material-ui/core";

const IntroText = ({ title, description }) => (
  <>
    <Typography variant="h4" gutterBottom>
      <Box fontWeight="fontWeightBold">{title}</Box>
    </Typography>
    <Typography variant="body1" gutterBottom>
      {description}
    </Typography>
  </>
);

export default IntroText;
