import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";

/* ================= Layout ================= */
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:pr-72">
        <Topbar />

        <main className="flex-1 px-6 py-6">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
};

/* ================= App ================= */
const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
      </Routes>
    </HashRouter>
  );
};

export default App;
