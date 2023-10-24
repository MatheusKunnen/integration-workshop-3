export default {
    post: {
      tags: ["Children"],
      description: "Create a child",
      operationId: "createChild",
      requestBody: {
        // expected request body
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ChildrenCreate",
            },
          },
        },
      },
      security: [
        {
          BearerAuth: [], 
        },
      ],
      responses: {
        201: {
          description: "Child created",
          content: {
            // content-type
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ChildrenWithoutPassword", // todo response data model
              },
            },
          },
        },
        400: {
          description: "Bad Request. All inputs are required",
        },
      },
    },
  };