import React from "react";
import { MainNavigation } from "../../components/Navigation";
import { welcomeIllustration } from "../../assets/illustrations";
import { Register } from "../../components/auth";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function register() {
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();

  if (currentUser) {
    navigate("/dashboard");
  }
  return (
    <div>
      <MainNavigation />
      <div className="container flex px-4 mx-auto flex-wrap-reverse">
        <Register />
        <div className="flex flex-grow flex-shrink sm justify-center min-w-[400px]">
          <img src={welcomeIllustration} alt="login" width={500}></img>
        </div>
      </div>
    </div>
  );
}
