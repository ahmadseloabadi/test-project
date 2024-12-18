import { useEffect, useState } from "react";
import {
  ClockIcon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidenav from "../components/Sidenav";
import Alert from "../components/Alert";
import { format, parseISO } from "date-fns";

interface UserResponse {
  id: number;
  name: string;
  email: string;
  profile_picture_file?: string;
  password: string;
  role?: string;
}

interface CarResponse {
  id: number;
  car_name: string;
  car_rentperday: number;
  car_size: string;
  car_img?: string;
  created_by: UserResponse;
  updated_by: UserResponse;
  deleted_by: UserResponse;
  create_at?: Date;
  update_at?: Date;
  delete_at?: Date;
}

const cars_api_base_url = "http://localhost:8000";

export default function Home() {
  const [cars, setCars] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [carToDelete, setCarToDelete] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [filteredSize, setFilteredSize] = useState(String);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const totalPages = Math.ceil(totalItems / pageSize);
  console.log("totalItems from query :", totalItems);
  console.log("totalpages from app :", totalPages);
  console.log("currentpages from app :", currentPage);
  console.log("filtersize from app :", filteredSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filterBySize = (size: string) => {
    setFilteredSize(size === "All" ? " " : size);

    setCurrentPage(1);
    console.log("Filter by size:", size);
  };

  // // Use the filteredSize state to display only the cards that match the selected size
  // const filteredCars = cars.filter((car: CarResponse) => {
  //   if (filteredSize === "All") {
  //     return true; // Show all cards if "All" is selected
  //   }
  //   return car.car_size === filteredSize;
  // });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    //akan di running pertama kali saat halaman di load
    const fetchCars = async () => {
      const response = await fetch(
        cars_api_base_url +
          `/api/cars?page=${currentPage}&pageSize=${pageSize}&size=${filteredSize}`
      );
      const responseJSON = await response.json();

      console.log("response", responseJSON);
      setCars(responseJSON.data.cars);
      setTotalItems(responseJSON.data.totalItems);
    };

    const checkIsLoggedIn = () => {
      const accessToken = localStorage.getItem("access_token");

      if (accessToken) setIsLoggedIn(true);
      else setIsLoggedIn(false);
    };

    fetchCars();
    checkIsLoggedIn();
  }, [currentPage, pageSize, filteredSize]);

  const deleteCar = async (carId: any) => {
    try {
      const accessToken = localStorage.getItem("access_token");

      if (!accessToken) {
        // Handle the case when the user is not logged in
        console.error("User not logged in");
        return;
      }
      setCarToDelete(carId);
      setShowAlert(true);
    } catch (error: any) {
      console.error("Error deleting car:", error.message);
    }
  };
  const handleConfirmation = async (confirmed: boolean) => {
    setShowAlert(false);

    if (confirmed) {
      try {
        const accessToken = localStorage.getItem("access_token");

        if (!accessToken) {
          console.error("User not logged in");
          return;
        }
        const response = await fetch(
          cars_api_base_url + "/api/cars/" + carToDelete,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.ok) {
          // Update the state to reflect the changes after successful deletion
          setCars((prevCars) =>
            prevCars.filter((car: CarResponse) => car.id !== carToDelete)
          );
        } else {
          // Handle errors if the deletion fails
          console.error("Failed to delete car:", response.statusText);
        }
      } catch (error: any) {
        console.error("Error deleting car:", error.message);
      }
    }
  };

  console.log("car length :", cars.length);
  const logoutHandler = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("email");
    localStorage.removeItem("profile");

    setIsLoggedIn(false);
  };
  return (
    <div className="flex  min-h-fit">
      <Sidenav />

      <div className={`flex flex-col w-full  ${isSidebarOpen}`}>
        <Navbar isLoggedIn={isLoggedIn} onLogout={logoutHandler} />

        <div className="main-content flex h-full bg-gray-100  ">
          <div className="content-items grid w-full h-fit  px-6 pt-9 ">
            <p className=" text-md ">
              <strong>Car {">"} </strong>List Car
            </p>
            <div className="flex items-center justify-between h-fit ">
              <p className="font-bold text-xl">List car</p>
              <Link to="/create-car">
                <button className="flex py-2 px-3 font-bold text-sm items-center gap-x-3 text-white rounded-sm bg-blue-800">
                  <PlusIcon className="h-[18px] w-[18px] stroke-2 text-white " />{" "}
                  Add New Car
                </button>
              </Link>
            </div>
            <div className="flex gap-x-4 h-fit">
              {["All", "Small", "Medium", "Large"].map((size) => (
                <button
                  key={size}
                  onClick={() => filterBySize(size)}
                  className={` border-2 border-blue-800 font-bold text-blue-800 py-2 px-3 rounded-sm hover:text-white hover:bg-blue-800 h-11 ${
                    size === filteredSize
                      ? "text-white bg-blue-800"
                      : " bg-indigo-200"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            <div
              className={`card-container mt-5 h-full flex gap-y-4 flex-wrap ${
                isSidebarOpen
                  ? "justify-start gap-x-6 "
                  : "justify-start gap-x-2 "
              }`}
            >
              {!cars.length /*jika carsnya tidak ada maka */ && (
                /*akan menjalankan "data kosong" */ <div className=" min-h-screen w-full ">
                  <div className="w-fit h-fit py-3 px-4 shadow bg-white rounded-md">
                    <h1 className="medium-header">Empty Cars Data </h1>
                  </div>
                </div>
              )}

              {cars.map((car: CarResponse) => (
                <div
                  key={car.id}
                  className="card flex flex-col gap-4  shadow bg-white border-0  text-sm p-6  rounded-xl  w-[351px] "
                >
                  <img
                    className="h-[190px] w-full object-cover "
                    src={car.car_img}
                  />
                  <div className="card-body flex flex-col gap-2 ">
                    <p className="card-title font-semibold ">{car.car_name}</p>
                    <p className="font-semibold">
                      Rp {car.car_rentperday} / hari
                    </p>
                    <p className="font-normal">Car size : {car.car_size}</p>

                    <h3 className="font-normal">created_by</h3>
                    <ul className="pl-4">
                      {/* <li className="font-normal">
                            id : {car.created_by.id}
                          </li> */}
                      <li className="font-normal">
                        username : {car.created_by.name || "-"}
                      </li>
                      <li className="font-normal">
                        email : {car.created_by.email || "-"}
                      </li>
                    </ul>

                    <h3 className="font-normal">updated_by</h3>
                    <ul className="pl-4">
                      {/* <li className="font-normal">
                            id : {car.updated_by.id}
                          </li> */}
                      <li className="font-normal">
                        username : {car.updated_by.name || "-"}
                      </li>
                      <li className="font-normal">
                        email : {car.updated_by.email || "-"}
                      </li>
                    </ul>

                    {car.deleted_by.id && (
                      <div>
                        <h3 className="font-normal">deleted_by</h3>
                        <ul className="pl-4">
                          {/* <li className="font-normal">
                            id : {car.deleted_by.id}
                          </li> */}
                          <li className="font-normal">
                            username : {car.deleted_by.name || "-"}
                          </li>
                          <li className="font-normal">
                            email : {car.deleted_by.email || "-"}
                          </li>
                        </ul>
                      </div>
                    )}

                    {car.create_at && (
                      <div className="flex gap-2">
                        <ClockIcon className="h-5 w-5   " />

                        <p className="font-light text-sm">
                          create_at{" "}
                          {format(
                            parseISO(`${car.create_at}`),
                            "dd/MM/yyyy HH:mm:ss a"
                          )}
                        </p>
                      </div>
                    )}
                    {car.update_at && (
                      <div className="flex gap-2">
                        <ClockIcon className="h-5 w-5   " />
                        <p className="font-light text-sm">
                          update_at{" "}
                          {format(
                            parseISO(`${car.update_at}`),
                            "dd/MM/yyyy HH:mm:ss a"
                          )}
                        </p>
                      </div>
                    )}
                    {car.delete_at && (
                      <div className="flex gap-2">
                        <ClockIcon className="h-5 w-5   " />
                        <p className="font-light text-sm">
                          delete_at {car.delete_at?.toString()}
                        </p>
                      </div>
                    )}

                    <div className="card-button mt-4 flex gap-2">
                      <button
                        className="inline-flex bg-transparent hover:bg-red-500 text-red-700 font-bold hover:text-white border border-red-500 hover:border-transparent rounded  w-[143.5px] h-12 items-center justify-center"
                        onClick={() => deleteCar(car.id)}
                      >
                        <TrashIcon className="h-5 w-5 " />
                        Delete
                      </button>
                      <button className="flex bg-green-400 hover:bg-green-500 items-center justify-center text-white  rounded w-[143.5px] h-12 ">
                        <Link
                          to={`/update-car/${car.id}`}
                          className=" flex font-bold  "
                        >
                          <PencilSquareIcon className="h-5 w-5" />
                          Edit
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="pagination flex items-center justify-center mt-6  px-4 py-3  ">
              <div className=" flex  justify-start gap-x-2">
                <button
                  className="pagination-button relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>

                {/* Tampilkan daftar angka halaman */}
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    className={`pagination-button relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  className="pagination-button relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={cars.length < pageSize}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {showAlert && (
          <Alert
            onConfirm={() => handleConfirmation(true)}
            onCancel={() => handleConfirmation(false)}
          />
        )}
      </div>
    </div>
  );
}
