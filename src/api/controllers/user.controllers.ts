import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { User } from '../../entities/User';



export const create = async(req: Request, res: Response) =>{

    const userRepository = getRepository(User)    
    const {username, password, is_superuser} = req.body

    const user = new User({username, password, is_superuser})   
   

    const createUser = await userRepository.save(user)


    res.status(201).send(createUser)

}

