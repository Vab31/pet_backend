// import express from "express";


import mongoose, { ConnectOptions } from 'mongoose';
import bodyParser from "body-parser";
import router from "../routes/senddata";
import cors from 'cors';
// const PORT: number = 3002;
// const app = express();

// app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));


// mongoose.connect("mongodb+srv://singhvaibhav654:n0oIW74HIphNdQkZ@cluster0.vsomvuo.mongodb.net/test", {

// });

// mongoose.connection
//   .once("open", () => console.log("Connected"))
//   .on("error", (error) => {
//     console.log("Your Error", error);
//   });

// app.use('/api', router);
// app.use('/data', router);

// app.listen(PORT, () => {
//   console.log(`Server listening on ${PORT}`);
// });
import express from 'express';
 
// Initialize the express engine
const app: express.Application = express();
 
// Take a port 3000 for running server.
const port: number = 3002;
 
// Handling '/' Request
app.get('/', (_req, _res) => {
    _res.send("TypeScript With Express");
});

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect("mongodb+srv://singhvaibhav654:I6liRg0WKBkX68MR@cluster0.xtfpjsa.mongodb.net/", {
  
} as any);


mongoose.connection
  .once("open", () => console.log("Connected"))
  .on("error", (error) => {
    console.log("Your Error", error);
  });
 
app.use('/api', router);
app.use('/data', router);

// Server setup
app.listen(port, () => {
    console.log(`TypeScript with Express
         http://localhost:${port}/`);
});