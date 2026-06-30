import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CTA } from "./components/CTA.jsx";
import Demo from "./components/Demo.jsx";
import { Features } from "./components/Features.jsx";
import { Footer } from "./components/Footer.jsx";
import { Hero } from "./components/Hero.jsx";
import { Problem } from "./components/Problem.jsx";
import { Solution } from "./components/Solution.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";

function Landing() {
  return (
    <main className="min-h-screen overflow-hidden bg-canvas text-ink">
      <Hero />
      <Problem />
      <Solution />
      <Demo />
      <Features />
      <CTA />
      <Footer />
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}