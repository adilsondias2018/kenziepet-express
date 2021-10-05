import { ConnectionOptions } from "typeorm";

const config: ConnectionOptions = {

    type: 'sqlite',
    database:`${__dirname}/../../database.sqlite`,
    entities:[`${__dirname}/../entities/*.ts`], // Diretório onde se encontra as models/entities
    synchronize:true, // Cria as tabela automaicamente
    migrations:[`${__dirname}/../migrations/*.js`],

    cli: {
        entitiesDir: `${__dirname}/../entities`,
        migrationsDir: `${__dirname}/../migrations`,
        subscribersDir: `${__dirname}/../subscribers`,
    }
}
export default config