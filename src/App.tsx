import { useState } from "react";
import Navbar from "./components/Navbar";
import Layout from "./components/Layout";
import Footer from "./components/Footer";
import "./App.css";
import { AppProvider } from "./context";

function App() {
  return (
    <AppProvider>
      <div style={{ width: "100vw", height: "100vh" }}>
        <Navbar />
        <Layout />
        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;
