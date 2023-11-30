import { Link } from "react-router-dom";
import React, { useRef } from "react";
import { TextInput, PasswordInput, Divider } from "@mantine/core";
import toast from "react-hot-toast";
import { useLogin } from "../../hooks/user/useLogin";
import { inputStyles } from "../../styles/inputStyles";
import { BlueButton } from "../buttons/BlueButton";
import { AuthTitle } from "./AuthTitle";

export default function Login() {
  const emailRef = useRef<HTMLDivElement>(null) as any;
  const passwordRef = useRef<HTMLDivElement>(null) as any;

  const { mutate: login, isLoading } = useLogin();

  const handleSignInAUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) {
      return toast.error("Please fill in all fields");
    }

    await login({ email, password });
  };

  return (
    <AuthTitle
      title="Hey, Welcome Back! ✌️"
      subtitle="Fill in your credentials to log in"
    >
      <form onSubmit={handleSignInAUser}>
        <TextInput
          ref={emailRef}
          required
          type="email"
          placeholder="your@email.com"
          className="mb-2"
          styles={inputStyles()}
        />
        <PasswordInput
          placeholder="YourUnique_Password!123"
          ref={passwordRef}
          required
          styles={inputStyles()}
          variant="unstyled"
        />
        <div className="my-5 flex justify-between text-xs">
          <p className="text-coolGrey-7 dark:text-coolGrey-4">
            {" "}
            Forgot Password?{" "}
          </p>
          <Link to="/auth/reset">
            <a className="cursor-pointer font-semibold text-coolGrey-4 underline duration-300 ease-in-out hover:underline-offset-2 dark:text-coolGrey-6">
              Reset password
            </a>
          </Link>
        </div>
        <BlueButton>{isLoading ? "Loading..." : "Login"}</BlueButton>
      </form>
      <Divider
        my="md"
        label="or"
        labelPosition="center"
        className="!border-coolGrey-1 dark:!border-borderDark"
      />

      <Link to="/auth/register">
        <p className="text-center text-xs font-medium text-coolGrey-7">
          Don&#39;t have an account yet?
          <span className="cursor-pointer pl-5 font-semibold text-coolGrey-4 underline duration-300 ease-in-out hover:underline-offset-2 dark:text-coolGrey-6">
            Create an account
          </span>
        </p>
      </Link>
    </AuthTitle>
  );
}
