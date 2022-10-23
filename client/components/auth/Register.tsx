import Link from "next/link";
import React from "react";
import { apple, google } from "../../assets/icons";
import Image from "next/image";

export default function Register() {
  return (
    <div className="md:pt-16 pb-10 text-left md:border-r border-stone-800 flex-grow grid items-center">
      <div className="px-10 mx-auto max-w-[600px]">
        <h2 className="text-2xl font-bold text-stone-200">
          Create an account 👋
        </h2>
        <p className="text-sm text-stone-400 mb-4">
          Welcome! Let&#39;s get you set up with an account
        </p>
        <form>
          <label className="text-sm text-stone-500">
            Name <span className="text-red-700"> * </span>
          </label>
          <input
            type="text"
            required
            className="w-full mb-4 text-stone-300 form-input bg-transparent border-b-stone-400 border-t-0 border-x-0 px-0 focus:ring-0"
          />

          <label className="text-sm text-stone-500">
            Email Address <span className="text-red-700"> * </span>
          </label>
          <input
            required
            type="email"
            className="w-full mb-4 form-input bg-transparent text-stone-300 border-b-stone-400 border-t-0 border-x-0 px-0 focus:ring-0"
          />
          <label className="text-sm text-stone-500">
            Password <span className="text-red-700"> * </span>
          </label>
          <input
            required
            type="password"
            className="w-full mb-4 text-stone-300 form-input bg-transparent border-b-stone-400 border-t-0 border-x-0 px-0 focus:ring-0"
          />
          <label className="text-sm text-stone-500">
            Password Confirmation <span className="text-red-700"> * </span>
          </label>
          <input
            required
            type="password"
            className="w-full text-stone-300 form-input bg-transparent border-b-stone-400 border-t-0 border-x-0 px-0 focus:ring-0"
          />
          <button
            type="submit"
            className="w-full mt-14 mb-7 py-4 hover:bg-stone-500 rounded-full text-stone-500 hover:text-base border-2  border-stone-500"
          >
            Register
          </button>
        </form>
        <div className="flex justify-center">
          <hr className="w-full my-10 border-stone-400" />
          <p className="absolute mt-7 bg-base px-4 text-stone-300 align-middle text-sm">
            Or
          </p>
        </div>
        <button
          type="submit"
          className="flex align-middle justify-center gap-2 w-full mt-3 py-4 hover:bg-stone-500 rounded-full text-stone-500 bg-slate-800 hover:text-base"
        >
          <Image src={google} alt="google" />
          Register with Google
        </button>
        <button
          type="submit"
          className=" flex align-middle justify-center gap-2 w-full mt-3 py-4 hover:bg-stone-300 rounded-full text-stone-500 bg-slate-800 hover:text-base"
        >
          <Image src={apple} alt="apple" />
          Register with Apple
        </button>
        <Link href="/auth/login">
          <p className="text-center mt-10 font-medium text-stone-400">
            Already have an account ?
            <span className="underline pl-5 cursor-pointer hover:underline-offset-2 ease-in-out duration-300 text-stone-400 font-semibold">
              Login
            </span>
          </p>
        </Link>
      </div>
    </div>
  );
}
