import React from "react";
import Head from "./Head";
import IntroText from "./IntroText";
import Card from "./Card";

const Page = ({ title, introText, children }) => (
  <>
    <Head title={title} />
    <IntroText {...introText} />
    <Card>{children}</Card>
  </>
);

export default Page;
