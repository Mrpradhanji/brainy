# Deployment Guide - Fixing Authentication Issues

## Current Issue
The dashboard is experiencing authentication handshake failures in production due to duplicate Clerk providers and improper configuration. Additionally, sign-up functionality is not working properly.

## What Was Fixed

### 1. Removed Duplicate Clerk Providers
- **Before**: Had `ClerkProvider` in both `App.jsx` and `ClerkProvider.jsx`
- **After**: Single `ClerkProvider` in `ClerkProvider.jsx` that wraps the entire app

### 2. Updated Authentication Hooks
- **Before**: Used `useClerk` for user data
- **After**: Use `useUser` for user data and `useClerk` only for signOut

### 3. Improved Error Handling
- Better environment variable validation
- Proper loading states
- Clear error messages for missing configuration

### 4. Fixed Sign-Up Issues
- Added proper redirect handling for sign-up flows
- Fixed Clerk configuration for sign-up functionality
- Added navigation links between sign-in and sign-up pages
- Improved error handling and user experience

## Environment Variables Required

### For Production (Vercel)
1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variable:
   ```
   Name: VITE_CLERK_PUBLISHABLE_KEY
   Value: pk_live_your_production_key_here
   Environment: Production
   ```
4. Also add it for **Preview** environment if you want to test on preview deployments

### For Local Development
1. Create a `.env` file in the root directory
2. Add your Clerk publishable key:
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_development_key_here
   ```

## Getting Your Clerk Keys

1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Select your application
3. Go to **API Keys** in the sidebar
4. Copy the **Publishable Key**
   - Use `pk_test_...` for development
   - Use `pk_live_...` for production

## Deployment Steps

### 1. Update Environment Variables
- Add the production Clerk key to Vercel
- Ensure the key is set for the Production environment

### 2. Redeploy
- Push your changes to the main branch
- Vercel will automatically redeploy
- Or manually trigger a redeploy from the Vercel dashboard

### 3. Test Authentication
- Try signing in again
- Try signing up with a new account
- The dashboard should now load properly
- No more handshake errors

## Testing Authentication

### Debug Route (Temporary)
Visit `/debug` on your app to see:
- Authentication status
- User information
- Environment variable status
- Clerk configuration details

**Remove this route after fixing authentication issues.**

### Test Sign-Up Flow
1. Go to `/sign-up`
2. Fill out the registration form
3. Verify email (if required by Clerk)
4. Should redirect to dashboard after successful sign-up

### Test Sign-In Flow
1. Go to `/sign-in`
2. Use existing credentials
3. Should redirect to dashboard after successful sign-in

## Troubleshooting

### Still Getting Handshake Errors?
1. **Check Environment Variables**: Ensure `VITE_CLERK_PUBLISHABLE_KEY` is set in Vercel
2. **Verify Key Format**: Should start with `pk_live_` for production
3. **Clear Browser Cache**: Clear cookies and local storage
4. **Check Clerk Dashboard**: Ensure your application is active and properly configured

### Sign-Up Not Working?
1. **Check Clerk Settings**: Ensure sign-up is enabled in your Clerk application
2. **Verify Email Settings**: Check if email verification is required and properly configured
3. **Check Console Errors**: Look for any JavaScript errors during sign-up
4. **Test Debug Route**: Visit `/debug` to see authentication state

### Authentication Not Working?
1. **Check Console Errors**: Look for missing key errors
2. **Verify Clerk App**: Ensure your Clerk application is properly set up
3. **Check Domains**: Ensure your production domain is added to Clerk's allowed domains
4. **Test Debug Route**: Use the debug route to diagnose issues

## Security Notes

- **Never commit** your `.env` file to version control
- **Use different keys** for development and production
- **Rotate keys** regularly for security
- **Monitor usage** in Clerk dashboard for any suspicious activity

## Next Steps

After fixing the authentication:
1. Test all authentication flows (sign in, sign up, password reset)
2. Verify protected routes work correctly
3. Test dashboard functionality
4. Monitor for any new errors in production
5. Remove the debug route (`/debug`) from production

## Support

- **Clerk Issues**: [Clerk Documentation](https://clerk.com/docs)
- **Vercel Issues**: [Vercel Documentation](https://vercel.com/docs)
- **Project Issues**: Check the main README.md file
