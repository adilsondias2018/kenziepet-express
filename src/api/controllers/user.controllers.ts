import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { User } from '../../entities/User';



export const create = async(req: Request, res: Response) =>{

    const userRepository = getRepository(User)    
    const {username, passaword} = req.body

    const user = new User({username, passaword})   
   

    const createUser = await userRepository.save(user)


    res.status(201).send(createUser)

}

