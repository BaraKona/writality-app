import React from "react";
import { LandingNavigation, Header } from "../../components/Navigation";
import { loginIllustration } from "../../assets/illustrations";
import Image from "next/image";
import { Login } from "../../components/auth";

export default function login() {
  return (
    <div>
      <LandingNavigation />
      <Header header="Login" />
      <div className="container flex px-4 mx-auto flex-wrap-reverse ">
        <Login />
        <div className="flex flex-grow sm justify-center min-w-[400px]">
          <Image src={loginIllustration} alt="login" width={500}></Image>
        </div>
      </div>
    </div>
  );
}
