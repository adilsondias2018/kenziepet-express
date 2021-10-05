import { Express } from 'express';
import {create} from "../controllers/user.controllers"
import { Router } from 'express';

const router = Router()

export default (app: Express)=>{

    router.post('/user', create),
    
    app.use('/api', router)
}
