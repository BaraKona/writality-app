import React, { useEffect } from "react";
import { MainNavigation, Header } from "../../components/Navigation";
import { registerIllustration } from "../../assets/illustrations";
import { Reset } from "../../components/auth";
import Image from "next/image";
import { useAuthContext } from "../../contexts/AuthContext";
import { useRouter } from "next/router";

export default function reset() {
  const { currentUser } = useAuthContext();
  const router = useRouter();

  if (currentUser) {
    router.push("/dashboard");
  }
  return (
    <div>
      <MainNavigation />
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
