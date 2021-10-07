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
    animal.weight = requestBody.weigh
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
    
      const animal: Array<Animal> = await animalRepository.find({
        relations: ['characteristics']
      })
      res.send(animal);
}
export const update = async (req:Request, res: Response) =>{

    const animalRepository = getRepository(Animal)
    const animal: Animal | undefined = await animalRepository.findOne(req.params.animalId)
    console.log(animal)
    if( animal === undefined){
        return res.status(404).send({error: 'Not Found'})
    }
    // console.log(req.body)
    // const updateRes = await animalRepository.update(animal.id, {...req.body})


    const requestBody = req.body
    

    animal.name = requestBody.name
    animal.age = requestBody.age
    animal.weight = requestBody.weigh
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

    // console.log("Erro",updateRes)

    // const animalUpdate: Animal | undefined = await animalRepository.findOne(req.params.animalId)

    // res.status(204).send(animalUpdate);
}
export const destroy = async (req:Request, res: Response) =>{
    const animalRepository = getRepository(Animal)
    const animal: Animal | undefined = await animalRepository.findOne(req.params.animalId)

    if( animal === undefined){
        return res.status(404).send({error: 'Not Found'})
    }

    const temp = await animalRepository.delete(req.params.animalId)
    res.status(204).send(temp);
}
export const retrieve = async (req:Request, res: Response) =>{
    const animalRepository = getRepository(Animal)
    const animal:Animal | undefined = await animalRepository.findOne(req.params.animalId)

    console.log(req.params.animalsId)

    if (animal === undefined){
        return res.send({error: 'Not Found'}).status(404)
    }
    
    res.status(201).send(animal)
}
