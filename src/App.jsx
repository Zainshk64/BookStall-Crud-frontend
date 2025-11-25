import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Toaster position="top-left" />
      <Navbar />
      <Home />
    </>
  );
};

export default App;
