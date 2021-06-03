import React from "react";
import IntroText from "./../IntroText";
import Head from "./../Head";

const Financials = (props) => {
  const introText = {
    title: "Financials",
    description:
      "Lorem",
  };

  return (
    <>
      <Head title="Financials" />
      <IntroText {...introText} />
    </>
  );
};

export default Financials;
