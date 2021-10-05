import { Request, Response } from "express";
import {Group} from "../../entities";
import { getRepository } from "typeorm";



export const create = async (req: Request, res: Response) =>{
    const groupRepository = getRepository(Group)
    const group = new Group()
    // const createGroup = await groupRepository.save({
    //     ...group, ... req.body
    // })

    const requestBody = req.body;

    group.name = requestBody.name
    group.scientific_name = requestBody.scientific_name

    const createGroup = await groupRepository.save(group)

    res.send(createGroup);
}

export const list = async (req:Request, res: Response) =>{
    // Pegando a models
    const groupRepository = getRepository(Group)
    const groups: Array<Group> = await groupRepository.find()
    res.send(groups);
}
export const update = async (req:Request, res: Response) =>{

    const groupRepository = getRepository(Group);
    const group: Group | undefined = await groupRepository.findOne(req.params.groupId)

    if( group === undefined){
        return res.status(404).send({error: 'Not Found'})
    }

    const updateRes = await groupRepository.update(group.id, {...req.body});
    console.log(updateRes)
    const groupUpdate: Group | undefined = await groupRepository.findOne(req.params.groupId)
    res.send(groupUpdate);
}
export const destroy = async (req:Request, res: Response) =>{
    const groupRepository = getRepository(Group);
    const group: Group | undefined = await groupRepository.findOne(req.params.groupId)

    if( group === undefined){
        return res.status(404).send({error: 'Not Found'})
    }

    const temp = await groupRepository.delete(req.params.groupId)
    console.log(temp)

    res.status(204).send(temp)
}
export const retrieve = async (req:Request, res: Response) =>{

    const groupRepository = getRepository(Group);

    const group: Group | undefined = await groupRepository.findOne(req.params.groupId)

    if (group == undefined){
        return res.status(404).send({error: 'Not Found'});
        
    }

    res.status(201).send(group);
}