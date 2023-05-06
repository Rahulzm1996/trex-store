import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import "./App.css";

import { AppProvider } from "./context";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import Layout from "./components/Layout";
import Navbar from "./components/Navbar";
import NotFoundPage from "./components/NotFoundPage";

function App() {
  return (
    <AppProvider>
      <Box sx={{ width: "100vw", height: "100vh" }}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Layout />} />
            <Route path="/products" element={<Layout />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </Box>
    </AppProvider>
  );
}

export default App;
