const corsProxy = require('cors-anywhere');

const host = 'localhost';
const port = 8080;

corsProxy.createServer({
    originWhitelist: [], // Permitir todos los orígenes
}).listen(port, host, () => {
    console.log(`CORS Anywhere está escuchando en ${host}:${port}`);
});