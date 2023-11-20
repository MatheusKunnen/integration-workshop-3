import getRandomPasswordGroup from "./getRandomPasswordGroup.js"

export default {
    '/password-groups/random':{
        ...getRandomPasswordGroup,
    },
}