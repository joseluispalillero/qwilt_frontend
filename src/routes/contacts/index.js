import React from "react";
import IntroText from "./../IntroText";
import Head from "./../Head";

const Contacts = (props) => {
  const introText = {
    title: "Contacts",
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

export default Contacts;
