const API_KEY = 'pS8i0UyHrqi2_XVhRP50ojrIL1s6-77sJ-uqICyY4sfm60lpoXPZ-_whyZroNzTTdqNZSwwx4RdnCoUb_N0M1eQrLwM4REhaXbECEPQhs2SzijJvDjcbSzQgIdSnXXYx'
const API_TARGET_URL = 'https://api.yelp.com/v3'

const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(cors());

const apiProxy = createProxyMiddleware('/api', {
    target: API_TARGET_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/api': '', // Remove the /api prefix when forwarding the request
    },
    onProxyReq(proxyReq, req, res) {
        // Add any headers you need for the Yelp API (e.g., API key)
        proxyReq.setHeader('Authorization', 'Bearer ' + API_KEY);
        proxyReq.setHeader('Accept', 'application/json');
    },
});

// Use the API proxy
app.use('/api/businesses', apiProxy);

// Serve the React app
app.use(express.static('build')); // Update 'build' to your actual build folder

// Handle other routes by serving the index.html
app.get('*', (req, res) => {
    res.sendFile('build/index.html', { root: __dirname }); // Update 'build' to your actual build folder
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
