import { Link } from "react-router-dom";
import React, { useRef, useState } from "react";
import { apple, google } from "../../assets/icons";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { router } from "../../router";
export function Register() {
  // create reference for the inputs
  const emailRef = useRef<HTMLDivElement>(null) as any;
  const nameRef = useRef<HTMLDivElement>(null) as any;
  const passwordRef = useRef<HTMLDivElement>(null) as any;
  const passwordConfirmRef = useRef<HTMLDivElement>(null) as any;

  const navigate = useNavigate();

  const { createAUserWithEmailAndPassword, currentUser } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const handleAccountCreation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return alert("Passwords do not match");
    }

    try {
      setLoading(true);
      await createAUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value,
        nameRef.current.value
      ).then(() => {
        if (!currentUser) navigate("/auth/login");
        else navigate("/dashboard/posts");
      });
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof Error) alert(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="md:pt-16 pb-10 text-left md:border-r border-baseBorder flex-grow grid items-center">
      <div className="px-10 mx-auto max-w-[600px]">
        <h2 className="text-2xl font-bold text-stone-200">
          Create an account 👋
        </h2>
        <p className="text-md text-stone-400 mb-4">
          Welcome! Let&#39;s get you set up with an account
        </p>
        <form onSubmit={handleAccountCreation}>
          <label className="text-md text-stone-500">
            Name <span className="text-red-700"> * </span>
          </label>
          <input
            ref={nameRef}
            type="text"
            required
            className="w-full mb-4 text-stone-300 form-input bg-transparent border-b-stone-400 border-t-0 border-x-0 px-0 focus:ring-0"
          />

          <label className="text-md text-stone-500">
            Email Address <span className="text-red-700"> * </span>
          </label>
          <input
            ref={emailRef}
            required
            type="email"
            className="w-full mb-4 form-input bg-transparent text-stone-300 border-b-stone-400 border-t-0 border-x-0 px-0 focus:ring-0"
          />
          <label className="text-md text-stone-500">
            Password <span className="text-red-700"> * </span>
          </label>
          <input
            ref={passwordRef}
            required
            type="password"
            className="w-full mb-4 text-stone-300 form-input bg-transparent border-b-stone-400 border-t-0 border-x-0 px-0 focus:ring-0"
          />
          <label className="text-md text-stone-500">
            Password Confirmation <span className="text-red-700"> * </span>
          </label>
          <input
            ref={passwordConfirmRef}
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
          <p className="absolute mt-7 bg-base px-4 text-stone-300 align-middle text-md">
            Or
          </p>
        </div>
        <button
          type="submit"
          className="flex align-middle justify-center gap-2 w-full mt-3 py-4 hover:bg-stone-500 rounded-full text-stone-500 bg-slate-800 hover:text-base"
        >
          <img src={google} alt="google" />
          Register with Google
        </button>
        <button
          disabled={loading}
          type="submit"
          className=" flex align-middle justify-center gap-2 w-full mt-3 py-4 hover:bg-stone-300 rounded-full text-stone-500 bg-slate-800 hover:text-base"
        >
          <img src={apple} alt="apple" />
          Register with Apple
        </button>
        <Link to="/auth/login">
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
