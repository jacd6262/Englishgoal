import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { Navbar } from "./components/custom/Navbar.tsx";
import Cronometro from "./pages/Cronometro.tsx";
import Historial from "./pages/Historial.tsx";
import { GoalsProvider } from "./components/custom/GoalContext.tsx";

createRoot(document.getElementById("root")!).render(
  <GoalsProvider>
    <StrictMode>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/cronometro" element={<Cronometro />} />
          <Route path="/historial" element={<Historial />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  </GoalsProvider>,
);
