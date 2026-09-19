import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { CTA } from "./components/CTA.jsx";
import Demo from "./components/Demo.jsx";
import { FAQ } from "./components/FAQ.jsx";
import { Features } from "./components/Features.jsx";
import { Footer } from "./components/Footer.jsx";
import { Hero } from "./components/Hero.jsx";
import { MetricsBand } from "./components/MetricsBand.jsx";
import { Problem } from "./components/Problem.jsx";
import { Proof } from "./components/Proof.jsx";
import { Solution } from "./components/Solution.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function Landing() {
  return (
    <main className="min-h-screen overflow-hidden bg-canvas text-ink">
      <Hero />
      <MetricsBand />
      <Problem />
      <Solution />
      <Demo />
      <Features />
      <Proof />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </MotionConfig>
    </BrowserRouter>
  );
}