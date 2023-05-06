import { useState } from "react";
import Navbar from "./components/Navbar";
import Layout from "./components/Layout";
import Footer from "./components/Footer";
import "./App.css";
import { AppProvider } from "./context";

import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import NotFoundPage from "./components/NotFoundPage";
import Cart from "./components/Cart";

function App() {
  return (
    <AppProvider>
      <div style={{ width: "100vw", height: "100vh" }}>
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
      </div>
    </AppProvider>
  );
}

export default App;
