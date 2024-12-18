import { HomeIcon, TruckIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function Sidenav() {
  return (
    <div className="flex flex-col  bg-blue-800 w-[70px] items-center min-h-screen  ">
      <div className="logo  h-9 w-9 bg-indigo-200 mt-4"></div>

      <Link
        to="/dashboard"
        className="grid text-white w-full px-1 py-3 hover:bg-indigo-200 justify-center font-light text-xs content-center mt-4"
      >
        <div className="grid justify-center">
          <HomeIcon className="h-6 w-6 text-white" />
        </div>
        Dashboard
      </Link>
      <Link
        to="/"
        className="grid text-white w-full py-3 hover:bg-indigo-200 justify-center font-light text-xs content-center"
      >
        <div className="grid justify-center">
          <TruckIcon className="h-6 w-6 text-white" />
        </div>
        Cars
      </Link>

      {/* <div className="grid justify-center w-full">

      </div> */}
    </div>
  );
}
