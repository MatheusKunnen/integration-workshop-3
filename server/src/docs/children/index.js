import createChild from "./createChild.js"
import updateChild from "./updateChild.js"
import updateBudget from "./updateBudget.js"
import updateAllowedSnacks from "./updateAllowedSnacks.js"
import getByParentId from "./getByParentId.js"
import getByTagNumber from "./getByTagNumber.js"
import getOrderHistory from "./getOrderHistory.js"
import deleteChild from "./deleteChild.js"
import loginChild from "./loginChild.js"

export default {
    '/children':{
        ...createChild,
    },
    '/children/{id}':{
        ...updateChild,
        ...deleteChild,
    },
    '/children/{id}/budget':{
        ...updateBudget,
    },
    '/children/{id}/allowed-snacks':{
        ...updateAllowedSnacks,
    },
    '/children/tag/{tagNumber}':{
        ...getByTagNumber,
    },
    '/children/all':{
        ...getByParentId,
    },
    '/children/history/{id}':{
        ...getOrderHistory,
    },
    '/children/login':{
        ...loginChild
    },
}