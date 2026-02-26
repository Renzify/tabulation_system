import React from "react";
import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import RankingPage from "./pages/RankingPage.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ranking" element={<RankingPage />} />
      </Routes>
    </div>
  );
}

export default App;
