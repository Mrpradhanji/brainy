import { useUser, useClerk } from "@clerk/clerk-react";
import { motion } from "framer-motion";

const AuthDebug = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const { session } = useClerk();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-n-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-n-6 border-t-color-1 rounded-full mx-auto mb-4 animate-spin" />
          <p className="text-n-3">Loading authentication state...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-n-8 p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="bg-n-7 border border-n-6 rounded-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="h1 text-n-1 mb-8">Authentication Debug Info</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Authentication Status */}
            <div className="bg-n-6 rounded-xl p-6">
              <h2 className="h3 text-n-1 mb-4">Status</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-n-3">Loaded:</span>
                  <span className={`font-medium ${isLoaded ? 'text-green-400' : 'text-red-400'}`}>
                    {isLoaded ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-n-3">Signed In:</span>
                  <span className={`font-medium ${isSignedIn ? 'text-green-400' : 'text-red-400'}`}>
                    {isSignedIn ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-n-3">Session Active:</span>
                  <span className={`font-medium ${session ? 'text-green-400' : 'text-red-400'}`}>
                    {session ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </div>

            {/* User Information */}
            <div className="bg-n-6 rounded-xl p-6">
              <h2 className="h3 text-n-1 mb-4">User Info</h2>
              {user ? (
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-n-3">ID:</span>
                    <span className="text-n-1 font-mono text-sm">{user.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-n-3">Email:</span>
                    <span className="text-n-1">{user.primaryEmailAddress?.emailAddress || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-n-3">Name:</span>
                    <span className="text-n-1">{user.fullName || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-n-3">Created:</span>
                    <span className="text-n-1">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</span>
                  </div>
                </div>
              ) : (
                <p className="text-n-3">No user data available</p>
              )}
            </div>
          </div>

          {/* Environment Check */}
          <div className="mt-8 bg-n-6 rounded-xl p-6">
            <h2 className="h3 text-n-1 mb-4">Environment Check</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-n-3">Clerk Key Set:</span>
                <span className={`font-medium ${import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ? 'text-green-400' : 'text-red-400'}`}>
                  {import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-n-3">Key Format:</span>
                <span className="text-n-1 font-mono text-sm">
                  {import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ? 
                    import.meta.env.VITE_CLERK_PUBLISHABLE_KEY.substring(0, 20) + '...' : 
                    'Not set'
                  }
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-n-3">Environment:</span>
                <span className="text-n-1">{import.meta.env.MODE}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex gap-4">
            <button 
              onClick={() => window.location.href = '/sign-in'}
              className="px-6 py-3 bg-gradient-to-r from-color-1 to-color-2 text-n-8 rounded-xl font-medium hover:from-color-1/90 hover:to-color-2/90 transition-all duration-200"
            >
              Go to Sign In
            </button>
            <button 
              onClick={() => window.location.href = '/sign-up'}
              className="px-6 py-3 bg-gradient-to-r from-color-3 to-color-4 text-n-8 rounded-xl font-medium hover:from-color-3/90 hover:to-color-4/90 transition-all duration-200"
            >
              Go to Sign Up
            </button>
            <button 
              onClick={() => window.location.href = '/dashboard'}
              className="px-6 py-3 bg-gradient-to-r from-color-5 to-color-6 text-n-8 rounded-xl font-medium hover:from-color-5/90 hover:to-color-6/90 transition-all duration-200"
            >
              Go to Dashboard
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthDebug;
