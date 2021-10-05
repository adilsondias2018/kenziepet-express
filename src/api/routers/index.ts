import { Express } from "express";
import GroupRouter from './group.router'
import AnimalRouter from './animal.router'
import UserRouter from "./user.router";
import LoginRouter from "./auth.router"

export default (app: Express) =>{

    GroupRouter(app);
    AnimalRouter(app);
    UserRouter(app);
    LoginRouter(app);


}