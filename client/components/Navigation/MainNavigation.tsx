import React from "react";
import Link from "next/link";
import { cyclops8 } from "../../assets/icons";
import Image from "next/image";
import LandingNavigation from "./LandingNavigation";
import UserNavigation from "./UserNavigation";
import { useAuthContext } from "../../contexts/AuthContext";

export default function Navbar() {
  const { currentUser } = useAuthContext();
  const showNavbar = () => {
    if (currentUser) {
      return <UserNavigation />;
    } else {
      return <LandingNavigation />;
    }
  };
  return (
    <nav className="container mx-auto flex space-x-4 justify-between px-4 border-solid border-b border-stone-800">
      <div className="cursor-pointer">
        <Link href="/">
          <div className="my-3 flex">
            <Image
              src={cyclops8}
              alt="writality"
              width={35}
              height={35}
              className="inline-block"
            />
            <h1 className="font-bold px-2 py-2 text-lg text-slate-200">
              Writality
            </h1>
          </div>
        </Link>
      </div>
      {showNavbar()}
    </nav>
  );
}
