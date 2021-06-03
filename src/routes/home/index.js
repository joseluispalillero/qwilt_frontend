import React from "react";
import IntroText from "./../IntroText";
import Head from "./../Head";

const Home = () => {
  const introText = {
    title: "Welcome to your dashboard, $name",
    description:
      "Check the daily activity, add and edit your deals and other great stuff!",
  };

  return (
    <>
      <Head />
      <IntroText {...introText} />
    </>
  );
};

export default Home;
