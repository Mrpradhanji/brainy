import { Routes, Route } from "react-router-dom";
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
import ClerkProvider from "./components/auth/ClerkProvider";
import AuthDebug from "./components/auth/AuthDebug";

const App = () => {
  return (
    <ClerkProvider>
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
        
        {/* Auth Routes - Match Clerk's expected routing */}
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Debug Route - Remove after fixing authentication */}
        <Route path="/debug" element={<AuthDebug />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </ClerkProvider>
  );
};

export default App;
