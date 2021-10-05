import { getRepository } from "typeorm";
import { Group} from "../../entities";
import {GroupInterface} from "../../types/group.types"

export const createGroup = async (group: GroupInterface ) =>{
    
        const groupRepository = getRepository(Group)

        const groupExists = await groupRepository.findOne({
            name: group.name
            
        })

        if (groupExists){
            return groupExists
        }
        
        const groups = new Group()
        groups.name = group.name
        groups.scientific_name = group.scientific_name

        const createGroup = await groupRepository.save(groups)
        return createGroup
    };

