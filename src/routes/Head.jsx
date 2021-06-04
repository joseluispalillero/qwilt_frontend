import React from "react";
import Helmet from "react-helmet";
import siteData from "./../siteData";

const { brandName } = siteData;

const Head = ({ title }) => (
  <Helmet title={title ? `${title} | ${brandName} Dashboard"` : `${brandName} Dashboard`} />
);

export default Head;
