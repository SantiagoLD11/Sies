const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use('/rest/api', createProxyMiddleware({
        target: 'https://www.impeltechnology.com',
        changeOrigin: true,
    }));
};