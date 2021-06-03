import React from "react";
import IntroText from "./../IntroText";
import Head from "./../Head";

const Leases = (props) => {
  const introText = {
    title: "Leases",
    description:
      "Lorem",
  };

  return (
    <>
      <Head title="Leases" />
      <IntroText {...introText} />
    </>
  );
};

export default Leases;
