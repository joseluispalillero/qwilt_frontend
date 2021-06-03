import React from "react";
import Head from "./Head";
import IntroText from "./IntroText";
import Card from "./Card";

const Page = ({ title, introText, children, path }) => (
  <>
    <Head title={title} />
    <IntroText {...introText} />
    <Card path={path}>{children}</Card>
  </>
);

export default Page;
