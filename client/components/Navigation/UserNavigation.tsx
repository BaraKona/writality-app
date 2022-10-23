import React from "react";
import Link from "next/link";
import { useAuthContext } from "../../contexts/AuthContext";
import { useRouter } from "next/router";

export default function UserNavigation() {
  const { signOutCurrentUser } = useAuthContext();
  const router = useRouter();
  const handleSignOut = async () => {
    await signOutCurrentUser().then(() => {
      router.push("/auth/login");
    });
  };
  return (
    <div className="flex">
      <Link href="/auth/register">
        <div className="my-3 flex cursor-pointer">
          <a
            className="font-medium px-2 py-3 text-sm text-slate-200"
            onClick={handleSignOut}
          >
            Logout
          </a>
        </div>
      </Link>
    </div>
  );
}
