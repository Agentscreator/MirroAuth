const express = require('express');
const { auth, requiresAuth } = require('express-openid-connect');
const app = express();

// Auth0 configuration
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: '83f4d924798c2f81ad81be46a21e34e274b2c1fdf7f9e1d3adf6efc90b20d05e',
  baseURL: 'https://mirro-auth-f9e5gfxbd-agentscreators-projects.vercel.app', // Replace with your actual frontend URL
  clientID: 'avCVzV5kBsVKZxZmVpjJvV4ngo60dg4iV', // Replace with your Auth0 client ID
  issuerBaseURL: 'https://dev-3otrpmbwouzv3n3v.us.auth0.com' // Replace with your Auth0 issuer URL
};

// Authentication middleware
app.use(auth(config));

// Define a route to check if the user is authenticated
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

// Define a route for login (redirects to Auth0 login)
app.get('/login', (req, res) => {
  res.oidc.login();
});

// Define a route for logout (redirects to Auth0 logout)
app.get('/logout', (req, res) => {
  res.oidc.logout();
});

// Protected Route: Requires authentication
app.get('/profile', requiresAuth(), (req, res) => {
  // If authenticated, show user profile
  res.send(JSON.stringify(req.oidc.user));  // This will return the user profile info
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
