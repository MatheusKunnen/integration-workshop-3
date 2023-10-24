export default {
    get:{
        tags: ["Snacks"],
        description: "Purchase the snack with the specified id",
        operationId: 'purchase',
        security: [
          {
            BearerAuth: []
          }
        ],
        parameters: [
          // expected params.
          {
            name: "id", // name of the param
            in: "path", // location of the param
            schema: {
              $ref: "#/components/schemas/id", // data model of the param
            },
            required: true, // Mandatory param
            description: "A single snack id", // param desc.
          },
        ],
        responses:{
            '200':{
              description:"Password Group obtained",
              content: {
                  // content-type
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/Snacks",
                    },
                  },
                },
            },
        }
    }
}