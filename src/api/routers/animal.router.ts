import { Router, Express } from "express";
import { list, create, update, retrieve, destroy } from '../controllers/animal.controllers'
import {isSuperuser} from "../middlewares/is_superUser.middleware"
import passport from "passport";
import jwtStategy from "../middleware/jwtStategy";
const router = Router()

export default (app: Express) => {
    router.get('/',list);
    router.post('/',isSuperuser, create);
    router.get('/:animalId(\\d+)', retrieve);
    router.put('/:animalId',isSuperuser, update)
    router.delete('/:animalId',isSuperuser, destroy);
    app.use('/api/animals', passport.authenticate( jwtStategy(), { session: false }), router);

}

// passport.authenticate( jwtStategy(), { session: false })