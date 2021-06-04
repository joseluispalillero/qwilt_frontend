import React from "react";
import Head from "./Head";
import IntroText from "./IntroText";
import Card from "./Card";

const Page = ({ title, introText, children, newButton }) => (
  <>
    <Head title={title} />
    <IntroText {...introText} />
    <Card newButton={newButton}>{children}</Card>
  </>
);

export default Page;
