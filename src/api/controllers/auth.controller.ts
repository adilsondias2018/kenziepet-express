import bcrypt from "bcrypt"
import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import { User } from '../../entities/User';



export const login = async(req: Request, res: Response) =>{

    const userRepository = getRepository(User)    
    const {username, passaword} = req.body

    console.log(username, passaword)

    const user = await userRepository.findOne({where: {username}});

    console.log(user)

    if(!user) return res.sendStatus(404)   
        
    if(!bcrypt.compareSync(passaword, user.passaword)) return res.sendStatus(401)

    const token = jwt.sign({id: user.id},'secret')

    res.status(200).send({token})

}

