import React from "react";
import IntroText from "./../IntroText";
import Head from "./../Head";

const Properties = (props) => {
  const introText = {
    title: "Properties",
    description:
      "Lorem",
  };

  return (
    <>
      <Head title="Properties" />
      <IntroText {...introText} />
    </>
  );
};

export default Properties;
