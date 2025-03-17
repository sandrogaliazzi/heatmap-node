import app from "./src/app.js";
import http from "http";
import signalUpdateLoop from "./src/scripts/uploadSignals.js";

const port = process.env.PORT || 5005; //always 5005
const host = "0.0.0.0";

// var privateKey  = fs.readFileSync('src/key.pem', 'utf8');
// var certificate = fs.readFileSync('src/cert.pem', 'utf8');

// var credentials = {key: privateKey, cert: certificate,};

const server = http.createServer(app);

// signalUpdateLoop();

server.listen(port, () => {
  let now = new Date().toLocaleString("PT-br");
  console.log(`server starting on port: ${port} in: ${now}`);
});
