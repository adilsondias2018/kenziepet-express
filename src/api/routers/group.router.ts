// Já que vou trabalhar com rotas tenho que importar o Router e também precisa-se da instancia do Express
import { Router, Express } from "express";
// o que terá minhas rotas? e quais serão essas rotas.
// controles já existentes e os metodos od crud
import {list, create, retrieve, update, destroy} from '../controllers/group.controllers'




// definindo a varável que faz as rotas
const router = Router()
// função padrão.
export default (app:Express) =>{
    router.get('/', list)
    router.post('/', create)
    router.get('/:groupId', retrieve)
    router.put('/:groupId', update)
    router.delete('/:groupId', destroy)
    
    app.use('/api/groups',router)
    

}