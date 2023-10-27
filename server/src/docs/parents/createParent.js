export default {
    post:{
        tags: ["Parents"],
        description: "Create a parent",
        operationId: 'createParent',
        requestBody: {
          // expected request body
          content: {
            // content-type
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ParentCredentials", // todo input data model
              },
            },
          },
        },
        responses:{
            '201':{
              description:"Parent created",
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