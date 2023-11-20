import { seedImages } from './imagesSeeder.js'
import { seedPasswordGroups } from './passwordGroupsSeeder.js'
import { seedSnacks } from './snacksSeeder.js'
import db from '../database_config.js';

async function main() {
    await db.sync({force: true});
    seedImages()
        .then(async (res) => {
            await seedPasswordGroups();
            await seedSnacks();
        })
        .catch(err => console.log(err))
}

main();