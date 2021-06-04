import React from "react";
import Helmet from "react-helmet";

const Head = ({ title }) => (
  <Helmet title={title ? title + " | QWILT Dashboard" : "QWILT Dashboard"} />
);

export default Head;
