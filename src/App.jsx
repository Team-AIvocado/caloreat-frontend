import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
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
import { AlertProvider } from "./context/AlertContext";
import { LogDetailPage } from "./pages/LogDetailPage";
import { MealProvider } from "./context/MealContext";
import { LogEditPage } from "./pages/LogEditPage";
import "react-datepicker/dist/react-datepicker.css";
import "./styles/datepicker.css";
// import { UserInfoPageMob } from "./pages/UserInfoPageMob";

/**
 * context Provider 들 감싸는 layout
 */
const ProviderLayout = () => {
  return (
    <MealProvider>
      <AlertProvider>
        <AuthProvider>
          <Outlet />
        </AuthProvider>
      </AlertProvider>
    </MealProvider>
  );
};

import { useEffect } from "react";

/* DarkModeSection에선 토글을 담당하지만 새로고침하면 돌아갈수 있기에
   App.jsx에서 유지담당 */
const RootLayout = () => {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <div className="min-h-screen bg-main_background dark:bg-gray-900 transition-colors">
      <Outlet />
    </div>
  );
};

// 리팩토링 했고, 이게 최신 표준이라네요.
// Tanstack query를 사용할게 아니면 이거를 쓰는게 성능 향상에 좋대요.
/**
 * 라우터 설정 createBrowserRouter로 생성
 */
const router = createBrowserRouter([
  {
    element: <ProviderLayout />,
    children: [
      {
        element: <RootLayout />,
        children: [
          { path: "/", element: <LoginPage /> },
          { path: "/signup", element: <SignUpPage /> },
          {
            element: <ProtectedRoute />,
            children: [
              { path: "/userinfo", element: <UserInfoPage /> },
              {
                path: "/main",
                element: <MainPage />,
                children: [
                  { path: "dashboard", element: <DashBoardPage /> },
                  { path: "log", element: <LogPage /> },
                  {
                    path: "log/:mealId/:foodIndex",
                    element: <LogDetailPage />,
                  },
                  {
                    path: "log/:mealId/:foodIndex/edit",
                    element: <LogEditPage />,
                  },
                  { path: "statistics", element: <StatisticsPage /> },
                  { path: "setting", element: <SettingPage /> },
                  { path: "foodreg", element: <FoodRegisterPage /> },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
