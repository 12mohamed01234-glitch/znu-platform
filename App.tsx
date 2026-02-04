import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Colleges from "./pages/Colleges";
import Login from "./pages/Login";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/colleges" element={<Colleges />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
