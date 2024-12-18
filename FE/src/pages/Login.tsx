import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

interface GoogleOauthResponse {
  credential?: string;
}
interface DecodedToken {
  email: string;
  picture: string; // Adjust this property based on the actual structure of the decoded token
  // Add other properties as needed
}
const cars_api_base_url = "http://localhost:8000";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginGoogleSuccess = async (response: GoogleOauthResponse) => {
    try {
      console.log("response google success:", response);

      // Kirim kredensial Google ke backend untuk verifikasi

      const backendResponse = await fetch(
        cars_api_base_url +
          "/api/auth/login/google?access_token=" +
          response.credential,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const backendResponseJson = await backendResponse.json();
      console.log("response backend :", backendResponseJson);

      if (backendResponse.status !== 200) {
        // Tangani kesalahan backend, misalnya, kredensial Google tidak valid
        alert("error: " + backendResponseJson.message);
        return;
      }

      // Simpan token akses backend ke penyimpanan lokal
      localStorage.setItem(
        "access_token",
        backendResponseJson.data.access_token
      );
      const userInfo = jwtDecode(response.credential as string) as DecodedToken;

      localStorage.setItem("email", userInfo.email);
      localStorage.setItem("profile", userInfo.picture);
      // Alihkan ke halaman beranda
      navigate("/");
    } catch (error) {
      console.error("Terjadi masalah ketika Login with Google:", error);
      alert("Terjadi masalah ketika Login with Google.");
    }
  };

  return (
    <div className="flex items-center  justify-end  mx-auto md:h-screen  lg:py-0">
      <img
        src="../src/assets/bg-login.png"
        className="w-2/3 saturate-[200%] contrast-[110%] brightness-[70%] "
      />
      <div className="form p-7s rounded-xl w-1/3">
        <h1 className="flex justify-center mb-6 text-2xl font-semibold text-white">
          Login
        </h1>

        <form className=" w-full justify-center  grid gap-y-4">
          <div className="logo w-[100px] h-9 bg-gray-300"></div>
          <h1 className="text-2xl font-bold">Welcome, Admin</h1>
          <div className="grid w-full">
            <label
              className=" font-light text-sm  mb-1 md:mb-0 pr-4"
              htmlFor="email"
            >
              Email :
            </label>
            <input
              className=" appearance-none border-2 border-gray-200 py-2 px-3 rounded w-[370px] leading-tight focus:outline-none focus:bg-white  font-light text-sm "
              id="email"
              type="email"
              value={email}
              onChange={({ target }) => {
                setEmail(target.value);
              }}
              placeholder="Masukkan email"
            />
          </div>

          <div className="grid justify-center w-full">
            <label
              className="font-light text-sm   mb-1 md:mb-0 pr-4"
              htmlFor="password"
            >
              Password :
            </label>
            <input
              className=" appearance-none border-2 border-gray-200 py-2 px-3 rounded w-[370px] leading-tight focus:outline-none focus:bg-white  font-light text-sm "
              id="password"
              type="password"
              value={password}
              onChange={({ target }) => {
                setPassword(target.value);
              }}
              placeholder="Masukkan password"
            />
          </div>

          <div className="flex flex-col justify-center items-center gap-y-2">
            <button
              className="shadow bg-blue-900 hover:bg-blue-800 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-3 rounded w-[193px] "
              typeof="button"
              onClick={async (e) => {
                e.preventDefault();

                const payload = {
                  email: email,
                  password: password,
                };

                const response = await fetch(
                  cars_api_base_url + "/api/auth/login",
                  {
                    method: "post",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                  }
                );

                const responseJson = await response.json();

                if (response.status !== 200) {
                  alert("error: " + responseJson.message);
                }
                console.log("ini responejson :", responseJson);
                localStorage.setItem(
                  "access_token",
                  responseJson.data.access_token
                );
                localStorage.setItem("email", payload.email);

                // If login succeed, redirect ke home
                navigate("/");
              }}
            >
              Sign In
            </button>

            <GoogleOAuthProvider clientId="114463867236-ld2p6ngrvimrkdl47v11cgi6sksom583.apps.googleusercontent.com">
              <GoogleLogin onSuccess={handleLoginGoogleSuccess} />;
            </GoogleOAuthProvider>

            <div className="flex justify-center mt-4">
              <span className="text-sm">
                Belum punya akun?{" "}
                <a href="/register" className="text-blue-500 hover:underline">
                  Register
                </a>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
