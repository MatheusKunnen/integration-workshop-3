import { seedImages } from './imagesSeeder.js'
import { seedPasswordGroups } from './passwordGroupsSeeder.js'
import { seedSnacks } from './snacksSeeder.js'

seedImages()
    .then(async (res) => {
        await seedPasswordGroups();
        await seedSnacks();
    })
    .catch(err => console.log(err))