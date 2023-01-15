import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

export default function UserNavigation() {
  const { signOutCurrentUser } = useAuthContext();
  const handleSignOut = async () => {
    await signOutCurrentUser().then(() => {
      // router.push("/auth/login");
    });
  };
  return (
    <div className="flex">
      <Link to="/dashboard/posts">
        <div className=" ml-auto my-3 flex cursor-pointer">
          <a className="font-medium px-2 py-3 text-md text-slate-200">
            Dashboard
          </a>
        </div>
      </Link>
      <Link to="/auth/register">
        <div className="my-3 flex cursor-pointer">
          <a
            className="font-medium px-2 py-3 text-md text-slate-200"
            onClick={handleSignOut}
          >
            Logout
          </a>
        </div>
      </Link>
    </div>
  );
}
