import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/homePage";
import AppHeader from "./components/appHeader";
import PredictDigit from "./components/predictDigit";
import Footer from "./components/predictDigitComps/footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col animated-gradient">
      <AppHeader />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/try" element={<PredictDigit />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
