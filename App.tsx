import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Faculties from "./pages/Faculties";
import Library from "./pages/Library";
import Login from "./pages/Login";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faculties" element={<Faculties />} />
        <Route path="/library" element={<Library />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
