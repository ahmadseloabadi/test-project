import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidenav from "../components/Sidenav";
import Navbar from "../components/Navbar";
import { Select } from "antd";

const tweets_api_base_url = "http://localhost:8000";

export default function UpdateCar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { carId } = useParams();
  const [car_name, setCarName] = useState("");
  const [car_size, setCarSize] = useState("");
  const [car_rentperday, setCarRentPerDay] = useState("");
  const [car_img, setCarImg] = useState(null);

  useEffect(() => {
    const checkIsLoggedIn = () => {
      const accessToken = localStorage.getItem("access_token");

      if (accessToken) setIsLoggedIn(true);
      else setIsLoggedIn(false);
    };

    checkIsLoggedIn();
  }, []);

  const handleFileChange = (e: any) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      setCarImg(files[0]);
    }
  };
  const logoutHandler = () => {
    localStorage.removeItem("access_token");

    setIsLoggedIn(false);
  };

  return (
    <div className=" flex  min-h-fit">
      <Sidenav />
      <div className={`flex flex-col w-full min-h-screen ${isSidebarOpen}`}>
        <Navbar isLoggedIn={isLoggedIn} onLogout={logoutHandler} />
        <div className="main-content flex h-full">
          <div className="form-input flex flex-col gap-y-4 items-start   w-full bg-gray-100 px-6 pt-9">
            <div className="flex items-center justify-between ">
              <h1 className="font-bold text-xl"> update Car id {carId}</h1>
            </div>
            <div className="form p-7 bg-white rounded-sm w-full ">
              <form className="w-full max-w-sm">
                <div className="mb-3 flex flex-row">
                  <div className="md:w-1/3">
                    <label
                      className="block  font-bold md:text-right mb-1 md:mb-0 pr-4"
                      htmlFor="inline-full-name"
                    >
                      Name car
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      className=" appearance-none border-[1px] border-black rounded  py-2 px-3 text-black leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-[315px]"
                      id="inline-full-name"
                      type="text"
                      value={car_name}
                      onChange={({ target }) => {
                        setCarName(target.value);
                      }}
                      placeholder="Enter car name"
                    />
                  </div>
                </div>

                <div className="mb-3 flex flex-row">
                  <div className="md:w-1/3">
                    <label
                      className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4"
                      htmlFor="inline-full-name"
                    >
                      car size
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <Select
                      id="size"
                      className="appearance-none border-[1px] border-black rounded   text-black leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-[315px] h-[38px]"
                      value={car_size || "Enter Car Size"}
                      options={[
                        {
                          value: "Small",
                          label: "Small",
                        },
                        {
                          value: "Medium",
                          label: "Medium",
                        },
                        {
                          value: "Large",
                          label: "Large",
                        },
                      ]}
                      onChange={(value) => setCarSize(value)}
                    ></Select>
                  </div>
                </div>

                <div className="mb-3 flex flex-row">
                  <div className="md:w-1/3">
                    <label
                      className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4"
                      htmlFor="inline-full-name"
                    >
                      car rentperday
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      className="appearance-none border-[1px] border-black rounded  py-2 px-3 text-black leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-[315px]"
                      id="inline-full-name"
                      type="number"
                      value={car_rentperday}
                      onChange={({ target }) => {
                        setCarRentPerDay(target.value);
                      }}
                      placeholder="Enter rent per day"
                    />
                  </div>
                </div>

                <div className="mb-3 flex flex-row">
                  <div className="md:w-1/3">
                    <label
                      className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4"
                      htmlFor="inline-full-name"
                    >
                      car img
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      className="appearance-none border-[1px] border-black rounded  py-2 px-3 text-black leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-[315px]"
                      id="inline-full-name"
                      type="file"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="button-contain flex gap-x-4 items-end h-full mb-10">
              <button
                className="inline-flex bg-transparent hover:bg-blue-900 text-blue-900 font-bold hover:text-white border border-blue-800 hover:border-transparent rounded-sm  w-[71px] h-9 px-3 py-2 items-center justify-center "
                typeof="button"
                onClick={async (e) => {
                  e.preventDefault();

                  navigate("/");
                }}
              >
                Cancel
              </button>
              <button
                className="inline-flex  bg-blue-900 hover:bg-gray-300 text-white font-bold hover:text-white border border-blue-800 hover:border-gray-300 rounded-sm  w-[71px] h-9 px-3 py-2 items-center justify-center "
                typeof="button"
                onClick={async (e) => {
                  e.preventDefault();

                  const formData = new FormData();
                  formData.append("car_name", car_name);
                  formData.append("car_size", car_size);
                  formData.append("car_rentperday", car_rentperday);
                  if (car_img) {
                    formData.append("car_img", car_img);
                  }

                  const response = await fetch(
                    tweets_api_base_url + "/api/cars/" + carId,
                    {
                      method: "PATCH",
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                          "access_token"
                        )}`,
                      },
                      body: formData,
                    }
                  );

                  const responseJson = await response.json();

                  if (response.status !== 200) {
                    alert("error: " + responseJson.message);
                  }

                  navigate("/");
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
