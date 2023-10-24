export default {
    get:{
        tags: ["PasswordGroups"],
        description: "Get a random Password Group",
        operationId: 'getRandomPasswordGroup',
        parameters:[],
        responses:{
            '200':{
                description:"Password Group obtained",
                content: {
                    // content-type
                    "application/json": {
                      schema: {
                        $ref: "#/components/schemas/PasswordGroups",
                      },
                    },
                  },
            }
        }
    }
}