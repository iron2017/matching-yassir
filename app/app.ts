import express from 'express';
import bodyParser from 'body-parser';
import driverRoutes from './routes/driverRoutes';
import userRoutes from './routes/userRoutes';
import requestRoutes from './routes/requestRoutes';
import cluster from 'cluster';
import os from 'os';
import http from 'http';
import socketIO from 'socket.io'; // Import socket.io
import { Server, Socket } from 'socket.io';
import swaggerUi from "swagger-ui-express";
const app = express();
const PORT = process.env.PORT || 3000;
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

app.use(bodyParser.json());

// Define routes
app.use('/drivers', driverRoutes);
app.use('/users', userRoutes);
app.use('/requests', requestRoutes);

let io: socketIO.Server; // Declare io variable
 const server = http.createServer(app); // Create the HTTP server

 

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
