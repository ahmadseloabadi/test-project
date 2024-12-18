import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateCar from "./pages/CreateCar";
import UpdateCar from "./pages/UpdateCar";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-car" element={<CreateCar />} />
        <Route path="/update-car/:carId" element={<UpdateCar />} />
      </Routes>
    </>
  );
}

export default App;
