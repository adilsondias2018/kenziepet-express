import { createCharacteristics } from './../services/characteristic.service';
// import {createGroup} from "./../services/group.service"
import { Request, Response } from "express";
import { Animal } from "../../entities";
import { Characteristic } from "../../entities";
import {Group} from "../../entities"
import {createGroup} from  "../services/group.service"
import {getRepository } from "typeorm";
import { animalValidator } from '../middlewares/validators/animal.validor';



export const create =  async (req: Request, res: Response) =>{

    const animalRepository = getRepository(Animal)
    const animal = new Animal()
    // const groupRepository = getRepository(Group)
    // const group = new Group()

    const requestBody = req.body
    

    animal.name = requestBody.name
    animal.age = requestBody.age
    animal.weigh = requestBody.weigh
    animal.sex = requestBody.sex
    // animal.groups.name = requestBody.group.name
    // animal.groups.scientific_name = requestBody.group.scientific_name

    const groups = await createGroup(requestBody.group)

    // console.log(requestBody.group)
    const characteristics = await createCharacteristics(requestBody.characteristics)
    animal.groups = groups
    animal.characteristics = characteristics
    

    const createAnimal = await animalRepository.save(animal)

    res.status(201).send(createAnimal)
}

export const list = async (req:Request, res: Response) =>{
      // Pegando a models
      const animalRepository = getRepository(Animal)
    
      const animals: Array<Animal> = await animalRepository.find({
        relations: ['characteristics']
      })
      res.send(animals);
}
export const update = (req:Request, res: Response) =>{
    res.send('Update');
}
export const destroy = (req:Request, res: Response) =>{
    res.send('Destroy');
}
export const retrieve = (req:Request, res: Response) =>{
    res.send('Filter');
}