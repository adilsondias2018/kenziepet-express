import "reflect-metadata";
import {createConnection} from 'typeorm';
import databaseConfig from './config/database'

import { Router, Request, Response } from 'express';
import express from "express";
import RouterBuilder from './api/routers'
import { User } from "./entities/User";

const PORT = 3000

const app = express()
app.use(express.json())

RouterBuilder(app)

// app.listen(PORT ,() => {
//     console.log(`Running at  port ${PORT}`)
// });

createConnection(databaseConfig).then((_conection) =>{
    app.listen(PORT ,() => {
        console.log(`Running at  port ${PORT}`)
    });
    
}).catch((err)=>{
    process.exit(1);
});

