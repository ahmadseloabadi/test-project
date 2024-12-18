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

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Password dan konfirmasi password tidak cocok.");
      return;
    }

    const payload = {
      email,
      password,
      name,
    };

    try {
      const response = await fetch(
        cars_api_base_url + "/api/auth/register-admin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const responseJson = await response.json();

      if (response.status !== 200) {
        alert("Error: " + responseJson.message);
        return;
      }

      alert("Registrasi berhasil! Silakan login.");
      navigate("/login");
    } catch (error) {
      console.error("Terjadi kesalahan saat registrasi:", error);
      alert("Terjadi kesalahan saat registrasi.");
    }
  };

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
    <div className="flex items-center justify-center h-screen">
      <img
        src="../src/assets/bg-login.png"
        className="w-2/3 saturate-[200%] contrast-[110%] brightness-[70%] "
      />
      <div className="form p-7 rounded-xl w-1/3">
        <h1 className="flex justify-center mb-6 text-2xl font-semibold">
          Register
        </h1>
        <form className="grid gap-y-4" onSubmit={handleRegister}>
          <div className="grid w-full">
            <label className="font-light text-sm mb-1" htmlFor="email">
              Username:
            </label>
            <input
              className="border-2 border-gray-200 py-2 px-3 rounded w-full"
              id="username"
              type="username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan Username"
              required
            />
          </div>
          <div className="grid w-full">
            <label className="font-light text-sm mb-1" htmlFor="email">
              Email:
            </label>
            <input
              className="border-2 border-gray-200 py-2 px-3 rounded w-full"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email"
              required
            />
          </div>
          <div className="grid w-full">
            <label className="font-light text-sm mb-1" htmlFor="password">
              Password:
            </label>
            <input
              className="border-2 border-gray-200 py-2 px-3 rounded w-full"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              required
            />
          </div>
          <div className="grid w-full">
            <label
              className="font-light text-sm mb-1"
              htmlFor="confirmPassword"
            >
              Konfirmasi Password:
            </label>
            <input
              className="border-2 border-gray-200 py-2 px-3 rounded w-full"
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Masukkan ulang password"
              required
            />
          </div>

          <div className="flex flex-col justify-center items-center gap-y-2">
            <button
              className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-3 rounded w-[193px]"
              type="submit"
            >
              Register
            </button>
            <GoogleOAuthProvider clientId="114463867236-ld2p6ngrvimrkdl47v11cgi6sksom583.apps.googleusercontent.com">
              <GoogleLogin onSuccess={handleLoginGoogleSuccess} />;
            </GoogleOAuthProvider>
            <div className="flex justify-center mt-4">
              <span className="text-sm">
                Sudah punya akun?{" "}
                <a href="/login" className="text-blue-500 hover:underline">
                  Login
                </a>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
