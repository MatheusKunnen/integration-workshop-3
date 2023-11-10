import createParent from "./createParent.js"
import loginParent from "./loginParent.js"
import findParent from "./findParent.js"

export default {
    '/parents':{
        ...createParent,
        ...findParent
    },
    '/parents/login':{
        ...loginParent,
    },
}