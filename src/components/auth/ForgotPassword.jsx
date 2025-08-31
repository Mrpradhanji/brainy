import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useClerk } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { brainy } from "../../assets";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { client } = useClerk();

  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      await client.signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });
      
      setIsSubmitted(true);
    } catch (err) {
      console.error("Error sending reset email:", err);
      setErrors({ general: "Failed to send reset email. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 }
  };

  const inputVariants = {
    rest: { scale: 1 },
    focus: { scale: 1.02 }
  };

  const successVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-n-8 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-md w-full space-y-8 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Logo */}
          <motion.div variants={itemVariants}>
            <Link to="/" className="inline-block">
              <img
                src={brainy}
                width={190}
                height={40}
                alt="Brainy"
                className="mx-auto h-12 w-auto"
              />
            </Link>
          </motion.div>

          {/* Success Message */}
          <motion.div variants={successVariants}>
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-500/20 mb-6">
              <motion.svg
                className="h-8 w-8 text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </motion.svg>
            </div>

            <h2 className="text-3xl font-bold text-n-1 mb-4">
              Check your email
            </h2>
            
            <p className="text-n-3 mb-6">
              We've sent a password reset link to{" "}
              <span className="font-medium text-n-2">{email}</span>
            </p>
            
            <p className="text-sm text-n-4 mb-8">
              Click the link in the email to reset your password. The link will expire in 1 hour.
            </p>

            <div className="space-y-4">
              <motion.button
                onClick={() => setIsSubmitted(false)}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="w-full py-3 px-4 border border-n-6 text-sm font-medium rounded-xl text-n-1 bg-n-7 hover:bg-n-6 transition-colors duration-200"
              >
                Resend email
              </motion.button>
              
              <Link
                to="/sign-in"
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl text-color-1 hover:text-color-2 transition-colors duration-200"
              >
                Back to sign in
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-n-8 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-md w-full space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo */}
        <motion.div className="text-center" variants={itemVariants}>
          <Link to="/" className="inline-block">
            <img
              src={brainy}
              width={190}
              height={40}
              alt="Brainy"
              className="mx-auto h-12 w-auto"
            />
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-n-1">
            Reset your password
          </h2>
          <p className="mt-2 text-sm text-n-3">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </motion.div>

        {/* Form */}
        <motion.form className="mt-8 space-y-6" variants={itemVariants} onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Email Field */}
            <motion.div variants={itemVariants}>
              <label htmlFor="email" className="block text-sm font-medium text-n-2 mb-2">
                Email address
              </label>
              <motion.div
                variants={inputVariants}
                initial="rest"
                whileFocus="focus"
                transition={{ type: "spring", stiffness: 300 }}
              >
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`appearance-none relative block w-full px-4 py-3 border rounded-xl text-n-1 placeholder-n-4 bg-n-7 border-n-6 focus:outline-none focus:ring-2 focus:ring-color-1 focus:border-transparent transition-all duration-200 ${
                    errors.email ? 'border-red-500 focus:ring-red-500' : ''
                  }`}
                  placeholder="Enter your email"
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-1 text-sm text-red-500"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </div>

          {/* General Error */}
          <AnimatePresence>
            {errors.general && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-red-500/10 border border-red-500/20 rounded-lg p-3"
              >
                <p className="text-sm text-red-400 text-center">{errors.general}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Button */}
          <motion.div variants={itemVariants}>
            <motion.button
              type="submit"
              disabled={isLoading}
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-n-8 bg-gradient-to-r from-color-1 to-color-2 hover:from-color-2 hover:to-color-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-color-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-n-8 border-t-transparent rounded-full"
                />
              ) : (
                "Send reset link"
              )}
            </motion.button>
          </motion.div>

          {/* Back to Sign In */}
          <motion.div className="text-center" variants={itemVariants}>
            <p className="text-sm text-n-3">
              Remember your password?{" "}
              <Link
                to="/sign-in"
                className="font-medium text-color-1 hover:text-color-2 transition-colors duration-200"
              >
                Sign in
              </Link>
            </p>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
