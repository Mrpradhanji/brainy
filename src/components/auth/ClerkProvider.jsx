import { ClerkProvider as ClerkProviderBase } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";

const ClerkProvider = ({ children }) => {
  // Get Clerk publishable key from environment variables
  const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    console.error("Missing Clerk publishable key. Please set VITE_CLERK_PUBLISHABLE_KEY in your environment variables.");
    return (
      <div className="min-h-screen bg-n-8 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <h1 className="h1 text-n-1 mb-4">Configuration Required</h1>
          <p className="body-1 text-n-3 mb-4">
            Your Clerk publishable key is missing. Please set it in your environment variables.
          </p>
          <div className="bg-n-7 border border-n-6 rounded-xl p-4 text-left">
            <p className="body-2 text-n-4 mb-2">Create a <code className="bg-n-6 px-2 py-1 rounded">.env</code> file with:</p>
            <code className="block bg-n-6 px-3 py-2 rounded text-sm text-n-2">
              VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
            </code>
          </div>
          <p className="body-2 text-n-4 mt-4">
            Get your key from the <a href="https://dashboard.clerk.com/" target="_blank" rel="noopener noreferrer" className="text-color-1 hover:underline">Clerk Dashboard</a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <ClerkProviderBase 
      publishableKey={publishableKey}
      appearance={{
        baseTheme: undefined,
        variables: {
          colorPrimary: '#3B82F6',
          colorBackground: '#0F0F23',
          colorInputBackground: '#1A1A2E',
          colorInputText: '#FFFFFF',
          colorText: '#FFFFFF',
          colorTextSecondary: '#9CA3AF',
          borderRadius: '12px',
        },
        elements: {
          formButtonPrimary: 'bg-gradient-to-r from-color-1 to-color-2 hover:from-color-1/90 hover:to-color-2/90',
          card: 'bg-n-7 border border-n-6',
          headerTitle: 'text-n-1',
          headerSubtitle: 'text-n-3',
          socialButtonsBlockButton: 'bg-n-6 border border-n-5 hover:bg-n-5',
          formFieldLabel: 'text-n-1',
          formFieldInput: 'bg-n-6 border border-n-5 text-n-1 focus:border-color-1',
          footerActionLink: 'text-color-1 hover:text-color-2',
        }
      }}
      // Enable all authentication methods
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      afterSignInUrl="/dashboard"
      afterSignUpUrl="/dashboard"
    >
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </ClerkProviderBase>
  );
};

export default ClerkProvider;
