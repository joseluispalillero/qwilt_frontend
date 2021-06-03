import React from "react";
import IntroText from "./../IntroText";
import Head from "./../Head";

const Portfolio = (props) => {
  const introText = {
    title: "Portfolio",
    description:
      "Lorem",
  };

  return (
    <>
      <Head title="Portfolio" />
      <IntroText {...introText} />
    </>
  );
};

export default Portfolio;
