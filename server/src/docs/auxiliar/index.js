import updateStock from "./updateStock.js"
import updateBalance from "./updateBalance.js"

export default {
    '/snacks/{id}/stock':{
        ...updateStock,
    },
    '/update-balance/{id}':{
        ...updateBalance,
    },
}