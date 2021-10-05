import { Router, Express } from "express";
import { list, create, update, retrieve, destroy } from '../controllers/animal.controllers'
import { animalValidator } from "../middlewares/validators/animal.validor";
import passport from "passport";
import jwtStategy from "../middleware/jwtStategy";
const router = Router()

export default (app: Express) => {
    router.get('/', list);
    router.post('/', create);
    router.get('/:animalId', retrieve);
    router.delete('/:animalId', destroy);
    app.use('/api/animals', passport.authenticate( jwtStategy(), { session: false }), router);

}