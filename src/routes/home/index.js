import React from "react";

import IntroText from "./../IntroText";

const Home = () => {
  const introText = {
    title: "Welcome to your dashboard, $name",
    description: "Check the daily activity, add and edit your deals and other great stuff!",
  };

  return (
    <>
      <IntroText {...introText} />
    </>
  );
};

export default Home;
