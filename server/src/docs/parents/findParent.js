export default {
    get:{
        tags: ["Parents"],
        description: "Find a parent by its token",
        operationId: 'findParent',
        security: [
          {
            BearerAuth: []
          }
        ],
        responses:{
            '200':{
              description:"Parent retrieved successfully",
              content: {
                  // content-type
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/Parents",
                    },
                  },
                },
            },
        }
    }
}