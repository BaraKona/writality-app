import React from "react";
import { LandingNavigation, Header } from "../../components/Navigation";
import { registerIllustration } from "../../assets/illustrations";
import { Reset } from "../../components/auth";
import Image from "next/image";

export default function register() {
  return (
    <div>
      <LandingNavigation />
      <Header header="Reset" />
      <div className="container flex px-4 mx-auto flex-wrap-reverse">
        <Reset />
        <div className="flex flex-grow flex-shrink sm justify-center min-w-[400px]">
          <Image src={registerIllustration} alt="login" width={500}></Image>
        </div>
      </div>
    </div>
  );
}
