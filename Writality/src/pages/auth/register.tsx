import React from "react";
import { MainNavigation, Header } from "../../components/Navigation";
import { welcomeIllustration } from "../../assets/illustrations";
import Image from "next/image";
import { Register } from "../../components/auth";
import { useRouter } from "next/router";
import { useAuthContext } from "../../contexts/AuthContext";

export default function register() {
  const { currentUser } = useAuthContext();
  const router = useRouter();

  if (currentUser) {
    router.push("/dashboard");
  }
  return (
    <div>
      <MainNavigation />
      <Header header="Register" />
      <div className="container flex px-4 mx-auto flex-wrap-reverse">
        <Register />
        <div className="flex flex-grow flex-shrink sm justify-center min-w-[400px]">
          <Image src={welcomeIllustration} alt="login" width={500}></Image>
        </div>
      </div>
    </div>
  );
}
