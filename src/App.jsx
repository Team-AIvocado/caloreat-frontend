import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import "./App.css";
import { LoginPage } from "./pages/LoginPage";
import { SignUpPage } from "./pages/SignUpPage";
import { MainPage } from "./pages/MainPage";
import { UserInfoPage } from "./pages/UserInfoPage";
import { SettingPage } from "./pages/SettingPage";
import { StatisticsPage } from "./pages/StatisticsPage";
import { LogPage } from "./pages/LogPage";
import { DashBoardPage } from "./pages/DashBoardPage";
import { FoodRegisterPage } from "./pages/FoodRegisterPage";
// import { UserInfoPageMob } from "./pages/UserInfoPageMob";

const App = () => {
  return (
    <div className="min-h-screen bg-main_background">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            
            <Route element={<ProtectedRoute />}>
              <Route path="/userinfo" element={<UserInfoPage />} />
              <Route path="/main" element={<MainPage />}>
                <Route path="dashboard" element={<DashBoardPage />} />
                <Route path="log" element={<LogPage />} />
                <Route path="statistics" element={<StatisticsPage />} />
                <Route path="setting" element={<SettingPage />} />
                <Route path="foodreg" element={<FoodRegisterPage />} />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
