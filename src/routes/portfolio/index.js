import React from "react";
import IntroText from "./../IntroText";

const Portfolio = (props) => {
  const introText = {
    title: "Portfolio",
    description:
      "Lorem",
  };

  return (
    <>
      <IntroText {...introText} />
    </>
  );
};

export default Portfolio;
