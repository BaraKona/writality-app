import React from "react";
import { MainNavigation, Header } from "../../components/Navigation";
import { loginIllustration } from "../../assets/illustrations";
import Image from "next/image";
import { Login } from "../../components/auth";
import { useAuthContext } from "../../contexts/AuthContext";
import { useRouter } from "next/router";

export default function login() {
  const { currentUser } = useAuthContext();
  const router = useRouter();

  if (currentUser) {
    router.push("/dashboard");
  }
  return (
    <div>
      <MainNavigation />
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
