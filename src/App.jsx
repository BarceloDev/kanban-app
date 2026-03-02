import { Routes, Route } from "react-router-dom";
import LoginScreen from "./pages/LoginScreen";
import RegisterScreen from "./pages/RegisterScreen";
import MainScreen from "./pages/MainScreen";
import PictureTasks from "./components/Screens/PicturesTasks/PictureTasks";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/main" element={<MainScreen />} />
        <Route path="/picture/:id" element={<PictureTasks />} />
      </Routes>
    </div>
  );
}
