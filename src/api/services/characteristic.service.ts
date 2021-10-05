import { getRepository } from "typeorm";
import { Characteristic } from "../../entities";
import {CharacteristicInterface} from "../../types/characteristic.types"

export const createCharacteristics = async (characteristics: CharacteristicInterface[] ) =>{
    return Promise.all(characteristics.map(async (characteristics) =>{
        const characteristicRepository = getRepository(Characteristic)

        const characteristicExists = await characteristicRepository.findOne({
            name: characteristics.name
        })

        if (characteristicExists){
            return characteristicExists
        }
        
        const characteristic = new Characteristic()
        characteristic.name = characteristics.name

        const createCharacteristic = await characteristicRepository.save(characteristic)
        return createCharacteristic
    }));
    
    
}