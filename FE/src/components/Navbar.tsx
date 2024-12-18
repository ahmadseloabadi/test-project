// Navbar.tsx
import {
  ChevronDownIcon,
  ListBulletIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Dropdown } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

export default function Navbar({ isLoggedIn, onLogout }: NavbarProps) {
  const email = localStorage.getItem("email");
  const profile = localStorage.getItem("profile");
  return (
    <div className="navbar flex  shadow items-center p-4 relative h-[70px] min-h-max ">
      <div className="flex justify-around w-1/6 md:justify-between ">
        <div className="logo w-24 h-8 bg-indigo-200 "></div>
      </div>

      <div className="flex justify-end cursor-pointer  w-5/6">
        <div className="flex items-center gap-x-2 ml-6 w-[143px]">
          <div className="rounded-full bg-indigo-200 w-9 h-9 flex justify-center items-center ">
            <h1 className="font-bold text-base ">
              {profile ? (
                <img src={profile} className="rounded-full" />
              ) : (
                Array.from(email || "who am i")[0]
              )}
            </h1>
          </div>
          <div className="w-[80px]  text-ellipsis overflow-x-clip items-center">
            <Dropdown
              label=""
              inline
              renderTrigger={() => (
                <span>
                  {email || "who am i"}
                  <ChevronDownIcon className=" h-5 w-5 text-black bg-white absolute top-6 right-6  " />
                </span>
              )}
              content="max-w-fit"
            >
              <Dropdown.Item content="fit">
                {isLoggedIn ? (
                  <button
                    className=" w-full py-2 px-3 bg-transparent text-black rounded-lg"
                    onClick={onLogout}
                  >
                    Logout
                  </button>
                ) : (
                  <Link to="/login">
                    <button className=" w-full py-2 px-3 bg-transparent text-black rounded-lg">
                      Login
                    </button>
                  </Link>
                )}
              </Dropdown.Item>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
}
