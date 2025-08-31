import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import ButtonGradient from "./assets/svg/ButtonGradient";
import Benefits from "./components/Benefits";
import Collaboration from "./components/Collaboration";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Pricing from "./components/Pricing";
import Roadmap from "./components/Roadmap";
import Services from "./components/Services";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import ForgotPassword from "./components/auth/ForgotPassword";
import Dashboard from "./components/auth/Dashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Replace with your actual Clerk publishable key
const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const App = () => {
  if (!publishableKey) {
    return (
      <div className="min-h-screen bg-n-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-n-1 mb-4">Configuration Required</h1>
          <p className="text-n-3 mb-4">
            Please set your Clerk publishable key in the environment variables.
          </p>
          <p className="text-sm text-n-4">
            Create a .env file with: VITE_CLERK_PUBLISHABLE_KEY=your_key_here
          </p>
        </div>
      </div>
    );
  }

  return (
    <ClerkProvider publishableKey={publishableKey}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <>
              <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
                <Header />
                <Hero />
                <Benefits />
                <Collaboration />
                <Services />
                <Pricing />
                <Roadmap />
                <Footer />
              </div>
              <ButtonGradient />
            </>
          } />
          
          {/* Auth Routes - Use Clerk's built-in routing */}
          <Route path="/sign-in/*" element={<SignIn />} />
          <Route path="/sign-up/*" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </ClerkProvider>
  );
};

export default App;
