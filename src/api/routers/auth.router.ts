import { Express } from 'express';
import {login} from "../controllers/auth.controller"
import { Router } from 'express';

const router = Router()

export default (app: Express)=>{

    router.post('/login', login),
    
    app.use('/api', router)
}
