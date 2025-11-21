import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { LoginPage } from "./pages/LoginPage";
import { SignUpPage } from "./pages/SignUpPage";
import { MainPage } from "./pages/MainPage";

const App = () => {
  return (
    <div className="min-h-screen bg-main_background">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/main" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
