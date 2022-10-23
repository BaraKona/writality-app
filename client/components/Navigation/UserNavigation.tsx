import React from "react";
import Link from "next/link";
import { useAuthContext } from "../../contexts/AuthContext";

export default function UserNavigation() {
  const { signOutCurrentUser } = useAuthContext();

  return (
    <div className="flex">
      <Link href="/auth/register">
        <div className="my-3 flex cursor-pointer">
          <a
            className="font-medium px-2 py-3 text-sm text-slate-200"
            onClick={signOutCurrentUser}
          >
            Logout
          </a>
        </div>
      </Link>
    </div>
  );
}
