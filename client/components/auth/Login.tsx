import Link from "next/link";
import React, { useRef, useState } from "react";
import { apple, google } from "../../assets/icons";
import Image from "next/image";
import { useAuthContext } from "../../contexts/AuthContext";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
export default function Login() {
  // create reference for the inputs
  const emailRef = useRef<HTMLDivElement>(null) as any;
  const passwordRef = useRef<HTMLDivElement>(null) as any;
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { signInAUserWithEmailAndPassword, signInWithGoogle } =
    useAuthContext();

  const handleSignInAUser = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      await signInAUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      ).then(() => {
        router.push("/dashboard");
      });
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof Error) alert(error.message);
    }
    setLoading(false);
  };
  const signInWithGoogleProvider = async () => {
    try {
      await signInWithGoogle().then((loggedIn: boolean) => {
        toast.success("Signed in successfully");
        router.push("/dashboard");
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="md:pt-20 pb-10 text-left md:border-r border-stone-800 min-w-[400px] flex-grow ">
      <div className="px-10 mx-auto max-w-[600px]">
        <h2 className="text-2xl font-bold text-stone-200">
          Hey, Welcome Back! ✌️
        </h2>
        <p className="text-sm text-stone-400 mb-4">
          Welcome back, fill in your credentials to log in
        </p>
        <form onSubmit={handleSignInAUser}>
          <label className="text-sm text-stone-500">
            Email Address <span className="text-red-700"> * </span>
          </label>
          <input
            ref={emailRef}
            required
            type="email"
            className="w-full mb-4 form-input bg-transparent text-stone-300 border-b-stone-400 border-t-0 border-x-0 px-0 focus:ring-0"
          />
          <label className="text-sm text-stone-500">
            Password <span className="text-red-700"> * </span>
          </label>
          <input
            ref={passwordRef}
            required
            type="password"
            className="w-full text-stone-300 form-input bg-transparent border-b-stone-400 border-t-0 border-x-0 px-0 focus:ring-0"
          />
          <div className="flex justify-between mt-5 text-xs">
            <p className="text-stone-200"> Forgot Password? </p>
            <Link href="/auth/reset">
              <a className="text-stone-500 underline cursor-pointer hover:underline-offset-2 ease-in-out duration-300">
                Reset password
              </a>
            </Link>
          </div>
          <button
            disabled={loading}
            type="submit"
            className="w-full mt-14 mb-7 py-4 hover:bg-stone-500 rounded-full text-stone-500 hover:text-base border-2  border-stone-500"
          >
            Login
          </button>
        </form>
        <div className="flex justify-center">
          <hr className="w-full my-10 border-stone-400" />
          <p className="absolute mt-7 bg-base px-4 text-stone-300 align-middle text-sm">
            Or
          </p>
        </div>
        <button
          onClick={signInWithGoogleProvider}
          type="submit"
          className="flex align-middle justify-center gap-2 w-full mt-3 py-4 hover:bg-stone-500 rounded-full text-stone-500 bg-slate-800 hover:text-base"
        >
          <Image src={google} alt="google" />
          Continue with Google
        </button>
        <button
          type="submit"
          className=" flex align-middle justify-center gap-2 w-full mt-3 py-4 hover:bg-stone-300 rounded-full text-stone-500 bg-slate-800 hover:text-base"
        >
          <Image src={apple} alt="apple" />
          Continue with Apple
        </button>
        <Link href="/auth/register">
          <p className="text-center mt-10 font-medium text-stone-400">
            Don&#39;t have an account yet?
            <span className="underline pl-5 cursor-pointer hover:underline-offset-2 ease-in-out duration-300 text-stone-400 font-semibold">
              Create an account
            </span>
          </p>
        </Link>
      </div>
    </div>
  );
}
