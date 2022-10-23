import React from "react";
import Link from "next/link";
import { cyclops8 } from "../../assets/icons";
import Image from "next/image";

export default function LandingNavigation() {
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
      <div className="flex">
        <Link href="/auth/register">
          <div className="my-3 flex cursor-pointer">
            <a className="font-medium px-2 py-3 text-sm text-slate-200">
              Sign Up
            </a>
          </div>
        </Link>
        <Link href="/auth/login">
          <div className="my-3 flex cursor-pointer">
            <a className="font-medium px-10 text-sm py-2 ml-5 border-solid border-2 border-stone-400 rounded-full text-stone-400 hover:bg-stone-400 hover:text-slate-900">
              Login
            </a>
          </div>
        </Link>
      </div>
    </nav>
  );
}
