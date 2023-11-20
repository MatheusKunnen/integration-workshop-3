export default {
  patch: {
    tags: ["Children"],
    description: "Update the budget of a child",
    operationId: "updateBudget",
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        description: "ID of the child to update the budget",
        schema: {
          type: "integer",
          example: 1
        }
      }
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              budget: {
                type: "integer",
                description: "New budget for the child",
                example: 1400
              }
            }
          }
        }
      }
    },
    security: [
      {
        BearerAuth: [], // Assuming you have defined a Bearer authentication scheme
      },
    ],
    responses: {
      200: {
        description: "Child's budget updated successfully",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ChildrenWithoutPassword"
            }
          }
        }
      },

    }
  }
};
