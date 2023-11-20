export default {
  patch: {
    tags: ["Children"],
    description: "Update the list of allowed snacks for a child",
    operationId: "updateAllowedSnacks",
    security: [
      {
        BearerAuth: []
      }
    ],
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        description: "ID of the child to update the list of allowed snacks",
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
              allowedSnacks: {
                type: "array",
                items: {
                  type: "integer"
                },
                description: "List of snack IDs that the child is allowed to buy",
                example: [1, 2, 6]
              }
            }
          }
        }
      }
    },
    responses: {
      200: {
        description: "Child updated",
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ChildrenWithoutPassword", 
            },
          },
        },
      },
    }
  }
}
