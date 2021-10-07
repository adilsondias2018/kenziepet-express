import bcrypt from "bcrypt"
import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import { User } from '../../entities/User';



export const login = async(req: Request, res: Response) =>{

    const userRepository = getRepository(User)    
    const {username, password} = req.body   
    const user = await userRepository.findOne({where: {username}});    

    if(!user) return res.sendStatus(404)  
        
    if(!bcrypt.compareSync(password, user.password)) return res.sendStatus(401)

    const token = jwt.sign({id: user.id},'secret')

    res.status(200).send({token})

}

