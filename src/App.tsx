import React, { useEffect, useState } from "react";
import "./App.css";
import Collection from "./components/colection/Colection.component";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Collection />} />
    </Routes>
  );
};

export default App;
