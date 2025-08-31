import { SignIn as ClerkSignIn } from "@clerk/clerk-react";
import { motion } from "framer-motion";

const SignIn = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="min-h-screen bg-n-8 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-md w-full space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <ClerkSignIn 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-amber-50 border border-amber-200 shadow-xl rounded-2xl",
              headerTitle: "text-n-8",
              headerSubtitle: "text-n-6",
              formButtonPrimary: "bg-gradient-to-r from-color-1 to-color-2 hover:from-color-2 hover:to-color-1 text-n-8 font-medium rounded-xl",
              formFieldInput: "bg-white border border-amber-200 text-n-8 placeholder-n-5 rounded-xl focus:border-color-1 focus:ring-color-1",
              formFieldLabel: "text-n-7",
              formSocialButton: "w-full py-2 px-4 rounded-xl font-medium text-n-8 !text-n-8 bg-gradient-to-r from-color-1 to-color-2 hover:from-color-2 hover:to-color-1 flex items-center justify-center gap-2",
              socialButtonText: "text-n-8 !text-n-8", // force white text
              footerActionLink: "text-color-1 hover:text-color-2",
              dividerLine: "bg-amber-200",
              dividerText: "text-n-5"
            }
          }}
          afterSignInUrl="/dashboard"
        />
      </motion.div>
    </div>
  );
};

export default SignIn;
