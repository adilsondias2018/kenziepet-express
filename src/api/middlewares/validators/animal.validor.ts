import { Request, Response, NextFunction } from "express";


export const animalValidator = (req: Request, res: Response, next: NextFunction) =>{
    const requestBody = req.body

    if(requestBody.name !== undefined){
       return next()
    }else{

        return res.status(400)
    }

}