export default {
  patch: {
    tags: ["Children"],
    description: "Update a child",
    operationId: "updateChild",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "ID of the child to update",
        required: true,
        schema: {
          type: "integer",
          example: 1,
        },
      },
    ],
    requestBody: {
      // expected request body
      content: {
        // content-type
        "application/json": {
          schema: {
            $ref: "#/components/schemas/ChildrenUpdate", // todo input data model
          },
        },
      },
    },
    security: [
      {
        BearerAuth: [], // Assuming you have defined a Bearer authentication scheme
      },
    ],
    responses: {
      200: {
        description: "Child updated",
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ChildrenWithoutPassword", // todo response data model
            },
          },
        },
      },
    },
  },
};
