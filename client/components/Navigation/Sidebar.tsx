import Link from "next/link";
import React from "react";
import Image from "next/image";
import { cyclops8 } from "../../assets/icons";
import DashboardNavigation from "./DashboardNavigation";

export default function Sidebar() {
  return (
    <aside
      className="w-52 h-full overflow-y-auto border-r border-stone-800"
      aria-label="Sidebar"
    >
      <div className=" py-2 px-3">
        <DashboardNavigation />
        <ul className="space-y-1 mt-3">
          <li>
            <h2 className="flex items-center ml-1 font-semibold text-stone-500 text-sm rounded-lg">
              Community
            </h2>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center text-sm font-normal text-stone-300 rounded-lg dark:text-white hover:text-stone-800 hover:bg-stone-400 dark:hover:bg-gray-700"
            >
              <span className="ml-3">Posts</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center text-sm  font-normal text-stone-300 rounded-lg dark:text-white hover:text-stone-800 hover:bg-stone-400 dark:hover:bg-gray-700"
            >
              <span className="flex-1 ml-3 whitespace-nowrap">Projects </span>
              <span className="inline-flex justify-center items-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
                Pro
              </span>
            </a>
          </li>

          <li>
            <a
              href="#"
              className="flex items-center  text-sm font-normal text-stone-300 rounded-lg dark:text-white hover:text-stone-800 hover:bg-stone-400 dark:hover:bg-gray-700"
            >
              <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
            </a>
          </li>
        </ul>
        <hr className="my-5 border-stone-800" />
        <ul>
          <li>
            <h2 className="flex justify-between items-center ml-1 font-semibold text-stone-500 text-sm rounded-lg">
              Your Projects
              <p className="text-red-500 font-bold px-2 rounded cursor-pointer hover:bg-stone-500">
                +
              </p>
            </h2>
          </li>
        </ul>
        <div
          id="dropdown-cta"
          className="p-4 mt-6 bg-blue-50 rounded-lg "
          role="alert"
        >
          <div className="flex items-center mb-3">
            <span className="bg-orange-100 text-orange-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900">
              Beta
            </span>
            <button
              type="button"
              className="ml-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-900 rounded-lg focus:ring-2 focus:ring-blue-400 p-1 hover:bg-blue-200 inline-flex h-6 w-6 "
              data-collapse-toggle="dropdown-cta"
              aria-label="Close"
            >
              <span className="sr-only">Close</span>
              <svg
                aria-hidden="true"
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="#a8a29e"
                ></path>
              </svg>
            </button>
          </div>
          <p className="mb-3 text-sm text-blue-900 ">
            Preview the new Flowbite dashboard navigation! You can turn the new
            navigation off for a limited time in your profile.
          </p>
          <a
            className="text-sm text-blue-900 underline hover:text-blue-800"
            href="#"
          >
            Turn new navigation off
          </a>
        </div>
      </div>
    </aside>
  );
}
