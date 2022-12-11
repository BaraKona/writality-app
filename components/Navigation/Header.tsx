import Head from "next/head";
import React from "react";

export default function Header({ header }: { header: string }) {
  const headerTitle: string = `${header} ${
    header ? "-" : ""
  } Writality - Write your story`;
  return (
    <Head>
      <title>{headerTitle}</title>
      <meta name="description" content="Writality Collaboration" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
