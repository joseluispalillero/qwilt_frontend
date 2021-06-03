import React from "react";
import Helmet from "react-helmet";

const Head = ({ title }) => (
  <Helmet title={title ? title + " | FC Props Dashboard" : "FC Props Dashboard"} />
);

export default Head;
