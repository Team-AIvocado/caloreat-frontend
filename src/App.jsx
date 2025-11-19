import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Testpage } from "./pages/TestPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Testpage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
