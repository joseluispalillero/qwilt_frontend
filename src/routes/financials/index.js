import React from "react";
import IntroText from "./../IntroText";

const Financials = (props) => {
  const introText = {
    title: "Financials",
    description:
      "Lorem",
  };

  return (
    <>
      <IntroText {...introText} />
    </>
  );
};

export default Financials;
