import React from "react";
import IntroText from "./../IntroText";

const Properties = (props) => {
  const introText = {
    title: "Properties",
    description:
      "Lorem",
  };

  return (
    <>
      <IntroText {...introText} />
    </>
  );
};

export default Properties;
