import { ClerkProvider as ClerkProviderBase } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";

const ClerkProvider = ({ children }) => {
  // Replace with your actual Clerk publishable key
  const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    console.warn("Missing Clerk publishable key. Please set VITE_CLERK_PUBLISHABLE_KEY in your environment variables.");
    return <div>Missing Clerk configuration</div>;
  }

  return (
    <ClerkProviderBase publishableKey={publishableKey}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </ClerkProviderBase>
  );
};

export default ClerkProvider;
