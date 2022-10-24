import React, { useState } from "react";
import Link from "next/link";
import { cyclops8 } from "../../assets/icons";
import { profileIllustration } from "../../assets/illustrations";
import Image from "next/image";
import { useAuthContext } from "../../contexts/AuthContext";
import { useRouter } from "next/router";

export default function DashboardNavigation() {
  const { currentUser, signOutCurrentUser } = useAuthContext();
  const [hidden, setHidden] = useState("hidden");

  const router = useRouter();
  const handleSignOut = async () => {
    await signOutCurrentUser().then(() => {
      router.push("/auth/login");
    });
  };

  return (
    <nav className=" mx-auto flex space-x-4 justify-between relative border-solid border-b border-stone-800">
      <div className="cursor-pointer">
        <Link href="/">
          <div className="my-1 flex">
            <Image
              src={cyclops8}
              alt="writality"
              width={30}
              height={30}
              className="inline-block"
            />
            <h1 className="font-bold px-2 text-lg text-slate-200">Writality</h1>
          </div>
        </Link>
      </div>
      <div className="flex cursor-pointer my-1">
        <Image
          src={profileIllustration}
          alt="writality"
          width={30}
          height={30}
          className="inline-block"
          onClick={() => (hidden ? setHidden("") : setHidden("hidden"))}
        />

        <div
          id="dropdownInformation"
          className={`${hidden} z-10 w-44 bg-base border border-stone-800 rounded divide-y divide-gray-100 drop-shadow-lg dark:bg-gray-700 dark:divide-gray-600 absolute left-2 top-9`}
        >
          <div className="py-3 px-4 text-sm text-stone-300 dark:text-white">
            <p>{currentUser?.displayName}</p>
            <p className="font-medium truncate text-stone-400">
              {currentUser?.email}
            </p>
          </div>
          <ul
            className="py-1 text-sm text-stone-300 dark:text-gray-200"
            aria-labelledby="dropdownInformationButton"
          >
            <li>
              <a
                href="#"
                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Settings
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Earnings
              </a>
            </li>
          </ul>
          <div className="py-1">
            <a
              href="#"
              onClick={handleSignOut}
              className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Sign out
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
