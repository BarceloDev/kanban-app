import { Routes, Route } from "react-router-dom";
import LoginScreen from "./pages/LoginScreen";
import RegisterScreen from "./pages/RegisterScreen";
import MainScreen from "./pages/MainScreen";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/Register" element={<RegisterScreen />} />
        <Route path="/Main" element={<MainScreen />} />
      </Routes>
    </div>
  );
}
