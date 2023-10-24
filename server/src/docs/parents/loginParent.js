export default {
    post:{
        tags: ["Parents"],
        description: "Login a parent",
        operationId: 'loginParent',
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
            '200':{
              description:"Parent logged in",
              content: {
                  // content-type
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/token",
                    },
                  },
                },
            },
        }
    }
}