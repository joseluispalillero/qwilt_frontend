import React from "react";
import Helmet from "react-helmet";

const Head = ({ title }) => (
  <Helmet title={title ? title + " | QWILT" : "QWILT"} />
);

export default Head;
