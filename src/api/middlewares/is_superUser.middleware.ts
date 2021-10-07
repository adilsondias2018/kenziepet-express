import { Request, Response, NextFunction } from "express";
import {User} from "../../entities/User"
import { UserInterface } from "../../types/user.types";


export  const isSuperuser = (req: Request, res: Response, next: NextFunction) =>{
    const requestBody = req.user as UserInterface    

    if(requestBody === undefined){
        return res.status(401)
    }
        
    if(requestBody.is_superuser !== false){
       return next()
    }else{        
       return res.sendStatus(403)

    }

}