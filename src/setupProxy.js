const { createProxyMiddleware } = require('http-proxy-middleware')

const backendHost = 'http://localhost:8080';

module.exports = (app) => {
  app.use('/api', createProxyMiddleware({ target: backendHost, changeOrigin: true }));
};
