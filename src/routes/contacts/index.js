import React from "react";
import IntroText from "./../IntroText";

const Contacts = (props) => {
  const introText = {
    title: "Contacts",
    description:
      "Lorem",
  };

  return (
    <>
      <IntroText {...introText} />
    </>
  );
};

export default Contacts;
