import { HashRouter, Routes, Route } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ padding: "40px", fontSize: "28px" }}>
      ✅ ZNU Platform شغّال
    </div>
  );
};

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
