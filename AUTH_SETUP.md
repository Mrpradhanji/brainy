# Authentication Setup Guide

This project now includes a complete authentication system using Clerk, with beautiful micro-interactions powered by Framer Motion and Tailwind CSS.

## Features

- **Sign In** - Email/password authentication with validation
- **Sign Up** - User registration with comprehensive form validation
- **Forgot Password** - Password reset functionality
- **Protected Routes** - Secure dashboard access
- **Responsive Design** - Mobile-first approach
- **Micro-interactions** - Smooth animations and transitions

## Setup Instructions

### 1. Install Dependencies

The Clerk dependency has been added to `package.json`. Run:

```bash
npm install
```

### 2. Configure Clerk

1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Create a new application or use an existing one
3. Copy your **Publishable Key** from the API Keys section

### 3. Environment Variables

Create a `.env` file in the root directory:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key_here
```

**Important**: Replace `pk_test_your_actual_key_here` with your actual Clerk publishable key.

### 4. Start Development Server

```bash
npm run dev
```

## Available Routes

- `/` - Landing page (public)
- `/signin` - Sign in page
- `/signup` - Sign up page
- `/forgot-password` - Password reset page
- `/dashboard` - Protected dashboard (requires authentication)

## Component Structure

```
src/components/auth/
├── SignIn.jsx          # Sign in form with validation
├── SignUp.jsx          # Registration form with validation
├── ForgotPassword.jsx  # Password reset functionality
├── Dashboard.jsx       # Protected dashboard for authenticated users
├── ProtectedRoute.jsx  # Route protection wrapper
├── ClerkProvider.jsx   # Clerk provider wrapper
└── index.js           # Component exports
```

## Features

### Form Validation
- Real-time validation with error messages
- Email format validation
- Password strength requirements
- Required field validation

### Micro-interactions
- Smooth page transitions
- Input focus animations
- Button hover and tap effects
- Loading states with spinners
- Error message animations

### Security
- Protected routes
- Authentication state management
- Secure password handling
- Session management

### UI/UX
- Dark theme consistent with the main design
- Responsive design for all screen sizes
- Accessible form labels and error messages
- Smooth transitions and animations

## Customization

### Styling
The authentication pages use the same design system as the main application:
- Color palette from `tailwind.config.js`
- Typography classes (h1, h2, body-1, etc.)
- Spacing and layout utilities

### Animations
Customize animations by modifying the Framer Motion variants in each component:
- `containerVariants` - Page entrance animations
- `itemVariants` - Individual element animations
- `buttonVariants` - Button interaction animations

## Troubleshooting

### Common Issues

1. **"Missing Clerk configuration" error**
   - Ensure your `.env` file exists and contains the correct key
   - Restart the development server after adding environment variables

2. **Authentication not working**
   - Verify your Clerk publishable key is correct
   - Check the browser console for any error messages
   - Ensure your Clerk application is properly configured

3. **Styling issues**
   - Verify Tailwind CSS is properly configured
   - Check that all custom CSS classes are defined in `tailwind.config.js`

## Next Steps

1. **Email Verification**: Implement email verification flow
2. **Social Login**: Add Google, GitHub, or other OAuth providers
3. **Profile Management**: Create user profile editing functionality
4. **Role-based Access**: Implement different user roles and permissions
5. **Two-factor Authentication**: Add 2FA for enhanced security

## Support

For Clerk-specific issues, refer to the [Clerk Documentation](https://clerk.com/docs).
For project-specific questions, check the main README.md file.
