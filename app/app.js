"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const driverRoutes_1 = __importDefault(require("./routes/driverRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const requestRoutes_1 = __importDefault(require("./routes/requestRoutes"));
const http_1 = __importDefault(require("http"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(undefined, {
    swaggerOptions: {
        url: "/swagger.json",
    },
}));
app.use(body_parser_1.default.json());
// Define routes
app.use('/drivers', driverRoutes_1.default);
app.use('/users', userRoutes_1.default);
app.use('/requests', requestRoutes_1.default);
let io; // Declare io variable
const server = http_1.default.createServer(app); // Create the HTTP server
server.listen(PORT, () => {
    console.log(`Worker ${process.pid} started`);
});
//if (cluster.isMaster) {
// const numCPUs = os.cpus().length;
//  console.log(`Master ${process.pid} is running`);
// Fork workers
// for (let i = 0; i < numCPUs; i++) {
//      cluster.fork();
//  }
//  cluster.on('exit', (worker, code, signal) => {
//     console.log(`Worker ${worker.process.pid} died`);
//  });
//} else {
// Workers can share any TCP connection
// In this case, it is an HTTP server
//}
// Export io to make it accessible to other modules
