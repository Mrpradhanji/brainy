"use client"
import { useState, useEffect } from "react";
import { useUser, useClerk } from "@clerk/clerk-react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";
import { brainy } from "../../assets";
import Button from "../Button";
import Section from "../Section";

const Dashboard = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState(3);
  const controls = useAnimation();

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      controls.start("visible");
    }, 1000);

    return () => clearTimeout(timer);
  }, [controls]);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const initials = (user?.firstName?.[0] || user?.emailAddresses?.[0]?.emailAddress?.[0] || "U").toUpperCase();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    },
    hover: { 
      y: -12, 
      scale: 1.03,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [1, 0.8, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const stats = [
    { 
      title: "AI Conversations", 
      value: "1,247", 
      change: "+23%", 
      icon: "💬", 
      color: "from-color-1 to-color-2",
      description: "Active chat sessions",
      trend: "up",
      gradient: "from-color-1/20 to-color-2/20"
    },
    { 
      title: "Images Processed", 
      value: "3,891", 
      change: "+18%", 
      icon: "🖼️", 
      color: "from-color-3 to-color-4",
      description: "Photos enhanced with AI",
      trend: "up",
      gradient: "from-color-3/20 to-color-4/20"
    },
    { 
      title: "Videos Created", 
      value: "156", 
      change: "+45%", 
      icon: "🎥", 
      color: "from-color-5 to-color-6",
      description: "AI-generated content",
      trend: "up",
      gradient: "from-color-5/20 to-color-6/20"
    },
    { 
      title: "Code Reviews", 
      value: "89", 
      change: "+12%", 
      icon: "💻", 
      color: "from-purple-400 to-purple-500",
      description: "AI-assisted reviews",
      trend: "up",
      gradient: "from-purple-400/20 to-purple-500/20"
    }
  ];

  const recentActivities = [
    { 
      type: "chat", 
      title: "Project Planning Session", 
      description: "AI helped plan Q4 marketing strategy", 
      time: "2 minutes ago", 
      status: "active",
      icon: "💬",
      color: "from-blue-400 to-blue-500",
      priority: "high"
    },
    { 
      type: "photo", 
      title: "Product Photography", 
      description: "Enhanced 12 product images with AI", 
      time: "1 hour ago", 
      status: "completed",
      icon: "🖼️",
      color: "from-green-400 to-green-500",
      priority: "medium"
    },
    { 
      type: "video", 
      title: "Marketing Video", 
      description: "Created brand introduction reel", 
      time: "3 hours ago", 
      status: "completed",
      icon: "🎥",
      color: "from-purple-400 to-purple-500",
      priority: "high"
    },
    { 
      type: "code", 
      title: "React Optimization", 
      description: "AI reviewed and optimized components", 
      time: "5 hours ago", 
      status: "completed",
      icon: "💻",
      color: "from-orange-400 to-orange-500",
      priority: "medium"
    }
  ];

  const quickActions = [
    { 
      title: "Start AI Chat", 
      description: "Begin a new conversation", 
      icon: "💬", 
      color: "from-color-1 to-color-2", 
      to: "/chat",
      gradient: "from-color-1 to-color-2",
      badge: "Popular"
    },
    { 
      title: "Edit Photos", 
      description: "Transform your images", 
      icon: "🖼️", 
      color: "from-color-3 to-color-4", 
      to: "/photos",
      gradient: "from-color-3 to-color-4",
      badge: "New"
    },
    { 
      title: "Generate Video", 
      description: "Create stunning videos", 
      icon: "🎥", 
      color: "from-color-5 to-color-6", 
      to: "/videos",
      gradient: "from-color-5 to-color-6",
      badge: "Trending"
    },
    { 
      title: "Code Assistant", 
      description: "Get programming help", 
      icon: "💻", 
      color: "from-purple-400 to-purple-500", 
      to: "/code",
      gradient: "from-purple-400 to-purple-500",
      badge: "Hot"
    }
  ];

  const tabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "analytics", label: "Analytics", icon: "📈" },
    { id: "projects", label: "Projects", icon: "📁" },
    { id: "settings", label: "Settings", icon: "⚙️" }
  ];

  const achievements = [
    { title: "First Chat", icon: "🎯", progress: 100, color: "from-color-1 to-color-2" },
    { title: "Photo Master", icon: "📸", progress: 75, color: "from-color-3 to-color-4" },
    { title: "Video Creator", icon: "🎬", progress: 60, color: "from-color-5 to-color-6" },
    { title: "Code Wizard", icon: "🔮", progress: 45, color: "from-purple-400 to-purple-500" }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-n-8 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-20 h-20 border-4 border-n-6 border-t-color-1 rounded-full mx-auto mb-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <h2 className="h2 text-n-1 mb-2">Loading Dashboard</h2>
          <p className="body-2 text-n-3">Preparing your AI workspace...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-n-8">
      {/* Header */}
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 bg-n-7/95 backdrop-blur-xl border-b border-n-6 shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3 group">
              <motion.img 
                src={brainy} 
                width={160} 
                height={32} 
                alt="Brainy" 
                className="h-8 w-auto"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              <motion.span 
                className="h2 text-n-1 group-hover:text-color-1 transition-colors duration-300"
                whileHover={{ x: 5 }}
              >
                Dashboard
              </motion.span>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <motion.div 
              className="relative hidden md:block"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <input
                type="text"
                placeholder="Search tools, features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 px-4 py-2 bg-n-6 border border-n-5 rounded-xl text-n-1 placeholder-n-4 focus:outline-none focus:border-color-1 focus:ring-2 focus:ring-color-1/20 transition-all duration-200"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-n-4">🔍</span>
            </motion.div>

            {/* Notifications */}
            <motion.button
              className="relative p-2 rounded-xl bg-n-6 hover:bg-n-5 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-n-1">🔔</span>
              {notifications > 0 && (
                <motion.span
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                >
                  {notifications}
                </motion.span>
              )}
            </motion.button>

            {/* User Profile */}
            <motion.div 
              className="hidden md:flex items-center gap-3 px-4 py-2 bg-n-6 rounded-xl hover:bg-n-5 transition-colors duration-200 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div 
                className="w-8 h-8 bg-gradient-to-r from-color-1 to-color-2 rounded-full flex items-center justify-center text-n-8 font-bold"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                {initials}
              </motion.div>
              <div className="text-left">
                <div className="body-1 font-medium text-n-1">{user?.firstName || "User"}</div>
                <div className="body-2 text-n-3">Pro Member</div>
              </div>
            </motion.div>
            
            <Button onClick={handleSignOut} white>
              Sign Out
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="pt-24">
        <Section customPaddings="py-10 lg:py-16 xl:py-20">
          <motion.div
            className="container"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Welcome Section */}
            <motion.div className="mb-16 text-center" variants={itemVariants}>
              <motion.div 
                className="max-w-4xl mx-auto relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                {/* Background Elements */}
                <motion.div
                  className="absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-r from-color-1/20 to-color-2/20 rounded-full blur-xl"
                  variants={floatingVariants}
                  animate="animate"
                />
                <motion.div
                  className="absolute -bottom-10 -right-10 w-16 h-16 bg-gradient-to-r from-color-3/20 to-color-4/20 rounded-full blur-xl"
                  variants={floatingVariants}
                  animate="animate"
                  style={{ animationDelay: "1s" }}
                />
                
                <div className="bg-gradient-to-r from-color-1/10 to-color-2/10 border border-color-1/20 rounded-3xl p-8 lg:p-12 relative z-10">
                  <motion.h1 
                    className="h1 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Welcome back, {user?.firstName || "User"}! 👋
                  </motion.h1>
                  <motion.p 
                    className="body-1 text-n-3 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Ready to create something amazing? Your AI assistant is here to help with chat, photos, videos, and more.
                  </motion.p>
                  
                  {/* Quick Stats */}
                  <motion.div 
                    className="flex justify-center gap-8 mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="text-center">
                      <div className="h3 text-color-1">1,247</div>
                      <div className="body-2 text-n-3">Total Sessions</div>
                    </div>
                    <div className="text-center">
                      <div className="h3 text-color-3">3,891</div>
                      <div className="body-2 text-n-3">Images Processed</div>
                    </div>
                    <div className="text-center">
                      <div className="h3 text-color-5">156</div>
                      <div className="body-2 text-n-3">Videos Created</div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div className="mb-16" variants={itemVariants}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="group relative bg-n-7 border border-n-6 rounded-2xl p-6 overflow-hidden cursor-pointer"
                    variants={cardVariants}
                    whileHover="hover"
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Background Gradient */}
                    <motion.div 
                      className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                      whileHover={{ opacity: 0.1 }}
                    />
                    
                    {/* Floating Icon */}
                    <motion.div
                      className={`absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center text-sm text-n-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {stat.trend === "up" ? "↗️" : "↘️"}
                    </motion.div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <motion.div 
                          className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center text-2xl`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {stat.icon}
                        </motion.div>
                        <motion.span 
                          className={`text-xs px-2 py-1 rounded-full ${
                            stat.change.startsWith('+') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                          }`}
                          whileHover={{ scale: 1.1 }}
                        >
                          {stat.change}
                        </motion.span>
                      </div>
                      <motion.div 
                        className="h1 text-n-1 mb-2"
                        whileHover={{ scale: 1.05 }}
                      >
                        {stat.value}
                      </motion.div>
                      <div className="body-1 font-medium text-n-1 mb-1">{stat.title}</div>
                      <div className="body-2 text-n-3">{stat.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-16">
              {/* Recent Activity */}
              <motion.div className="xl:col-span-2" variants={itemVariants}>
                <div className="bg-n-7 border border-n-6 rounded-2xl p-6 lg:p-8 shadow-xl">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="h2 text-n-1">Recent Activity</h2>
                    <Button asChild white className="text-sm">
                      <Link to="/activity">View All</Link>
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <motion.div
                        key={index}
                        className="group flex items-center gap-4 p-4 bg-n-6 rounded-xl hover:bg-n-5 transition-all duration-300 cursor-pointer"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 5, scale: 1.02 }}
                      >
                        <motion.div 
                          className={`w-12 h-12 rounded-xl bg-gradient-to-r ${activity.color} flex items-center justify-center text-xl`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {activity.icon}
                        </motion.div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="body-1 font-medium text-n-1 group-hover:text-color-1 transition-colors duration-300">
                              {activity.title}
                            </div>
                            {activity.priority === "high" && (
                              <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full">High</span>
                            )}
                          </div>
                          <div className="body-2 text-n-3">{activity.description}</div>
                        </div>
                        <div className="text-right">
                          <div className="body-2 text-n-3 mb-1">{activity.time}</div>
                          <motion.div 
                            className={`inline-block px-2 py-1 rounded-full text-xs ${
                              activity.status === 'active' 
                                ? 'bg-green-500/20 text-green-400' 
                                : 'bg-n-5 text-n-3'
                            }`}
                            whileHover={{ scale: 1.1 }}
                          >
                            {activity.status}
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div variants={itemVariants}>
                <div className="bg-n-7 border border-n-6 rounded-2xl p-6 lg:p-8 shadow-xl">
                  <h2 className="h2 text-n-1 mb-8">Quick Actions</h2>
                  <div className="space-y-4">
                    {quickActions.map((action, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button asChild className="w-full justify-start h-14 text-left group relative overflow-hidden">
                          <Link to={action.to} className="flex items-center gap-4">
                            <motion.div 
                              className={`w-10 h-10 rounded-xl bg-gradient-to-r ${action.gradient} flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-200`}
                              whileHover={{ rotate: 5 }}
                            >
                              {action.icon}
                            </motion.div>
                            <div className="text-left flex-1">
                              <div className="body-1 font-medium">{action.title}</div>
                              <div className="body-2 opacity-70">{action.description}</div>
                            </div>
                            {action.badge && (
                              <motion.span 
                                className="px-2 py-1 bg-n-6 text-n-3 text-xs rounded-full"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 + 0.5 }}
                              >
                                {action.badge}
                              </motion.span>
                            )}
                          </Link>
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* AI Tools Showcase */}
            <motion.div className="mb-16" variants={itemVariants}>
              <div className="text-center mb-12">
                <motion.h2 
                  className="h2 text-n-1 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  AI-Powered Tools
                </motion.h2>
                <motion.p 
                  className="body-1 text-n-3 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  Explore our suite of intelligent tools designed to enhance your creativity and productivity
                </motion.p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {quickActions.map((tool, index) => (
                  <motion.div
                    key={index}
                    className="group bg-n-7 border border-n-6 rounded-2xl p-6 text-center cursor-pointer shadow-lg"
                    variants={cardVariants}
                    whileHover="hover"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.div 
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${tool.gradient} flex items-center justify-center text-3xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-200`}
                      whileHover={{ rotate: 5 }}
                    >
                      {tool.icon}
                    </motion.div>
                    <h3 className="h3 text-n-1 mb-3">{tool.title}</h3>
                    <p className="body-2 text-n-3 mb-6">{tool.description}</p>
                    <Button asChild className="w-full group">
                      <Link to={tool.to} className="flex items-center justify-center gap-2">
                        Get Started
                        <motion.span
                          className="group-hover:translate-x-1 transition-transform duration-200"
                        >
                          →
                        </motion.span>
                      </Link>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Achievements Section */}
            <motion.div className="mb-16" variants={itemVariants}>
              <div className="bg-n-7 border border-n-6 rounded-2xl p-6 lg:p-8 shadow-xl">
                <h2 className="h2 text-n-1 mb-8 text-center">Your Achievements</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      className="text-center p-6 bg-n-6 rounded-xl"
                      whileHover={{ y: -8, scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                    >
                      <motion.div 
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${achievement.color} flex items-center justify-center text-3xl mb-4 mx-auto`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        {achievement.icon}
                      </motion.div>
                      <h3 className="body-1 font-medium text-n-1 mb-3">{achievement.title}</h3>
                      <div className="w-full bg-n-7 rounded-full h-2 mb-2">
                        <motion.div
                          className={`h-2 bg-gradient-to-r ${achievement.color} rounded-full`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${achievement.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                      </div>
                      <div className="body-2 text-n-3">{achievement.progress}% Complete</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Performance Insights */}
            <motion.div className="mb-16" variants={itemVariants}>
              <div className="bg-n-7 border border-n-6 rounded-2xl p-6 lg:p-8 shadow-xl">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="h2 text-n-1">Performance Insights</h2>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 body-2 bg-n-6 text-n-3 rounded-lg hover:bg-n-5 transition-colors">7D</button>
                    <button className="px-3 py-1 body-2 bg-color-1 text-n-8 rounded-lg">30D</button>
                    <button className="px-3 py-1 body-2 bg-n-6 text-n-3 rounded-lg hover:bg-n-5 transition-colors">90D</button>
                  </div>
                </div>
                <div className="h-64 bg-n-6 rounded-xl flex items-center justify-center relative overflow-hidden">
                  <motion.div 
                    className="text-center relative z-10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                  >
                    <motion.div 
                      className="text-4xl mb-4"
                      variants={pulseVariants}
                      animate="pulse"
                    >
                      📊
                    </motion.div>
                    <div className="h3 text-n-1 mb-2">Analytics Coming Soon</div>
                    <div className="body-2 text-n-3">Detailed performance metrics and insights will be available here</div>
                  </motion.div>
                  
                  {/* Background Animation */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-color-1/5 to-color-2/5"
                    animate={{
                      background: [
                        "linear-gradient(45deg, rgba(59, 130, 246, 0.05) 0%, rgba(147, 51, 234, 0.05) 100%)",
                        "linear-gradient(45deg, rgba(147, 51, 234, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)",
                      ]
                    }}
                    transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Getting Started */}
            <motion.div variants={itemVariants}>
              <motion.div 
                className="bg-gradient-to-r from-color-1/10 to-color-2/10 border border-color-1/20 rounded-3xl p-8 lg:p-12 text-center relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                {/* Floating Elements */}
                <motion.div
                  className="absolute top-0 left-0 w-full h-full"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="absolute top-10 left-10 w-4 h-4 bg-color-1/20 rounded-full"
                    animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute top-20 right-20 w-3 h-3 bg-color-2/20 rounded-full"
                    animate={{ y: [0, -15, 0], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                  />
                  <motion.div
                    className="absolute bottom-20 left-20 w-5 h-5 bg-color-3/20 rounded-full"
                    animate={{ y: [0, -25, 0], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
                  />
                </motion.div>
                
                <div className="relative z-10">
                  <motion.h2 
                    className="h1 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    Ready to Get Started?
                  </motion.h2>
                  <motion.p 
                    className="body-1 text-n-3 max-w-2xl mx-auto mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    Jump into your first AI conversation, enhance some photos, or create an amazing video. The possibilities are endless!
                  </motion.p>
                  <motion.div 
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    <Button asChild className="text-lg px-8 py-4 group">
                      <Link to="/chat" className="flex items-center gap-2">
                        Start AI Chat
                        <motion.span
                          className="group-hover:translate-x-1 transition-transform duration-200"
                        >
                          →
                        </motion.span>
                      </Link>
                    </Button>
                    <Button asChild white className="text-lg px-8 py-4 group">
                      <Link to="/photos" className="flex items-center gap-2">
                        Edit Photos
                        <motion.span
                          className="group-hover:translate-x-1 transition-transform duration-200"
                        >
                          →
                        </motion.span>
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </Section>
      </div>
    </div>
  );
};

export default Dashboard;
