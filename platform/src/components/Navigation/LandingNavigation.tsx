import React from "react";
import { Link } from "react-router-dom";

export default function LandingNavigation() {
  return (
    <div className="flex">
      <Link to="/auth/register">
        <div className="my-3 flex cursor-pointer">
          <a className="font-medium px-2 py-3 text-md text-slate-200">
            Sign Up
          </a>
        </div>
      </Link>
      <Link to="/auth/login">
        <div className="my-3 flex cursor-pointer">
          <a className="font-medium px-10 text-md py-2 ml-5 border-solid border-2 border-stone-400 rounded-full text-stone-400 hover:bg-stone-400 hover:text-slate-900">
            Login
          </a>
        </div>
      </Link>
    </div>
  );
}
