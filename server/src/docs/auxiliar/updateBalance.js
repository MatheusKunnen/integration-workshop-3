export default {
  patch: {
    tags: ["Auxiliar"],
    description: "Update parent's balance",
    operationId: "updateBalance",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "ID of the parent to update balance",
        required: true,
        schema: {
          type: "integer"
        }
      }
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              balance: {
                type: "integer",
                description: "New balance value"
              }
            },
            required: ["balance"]
          }
        }
      },
      required: true
    },
    responses: {
      200: {
        description: "Parent's balance updated successfully",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Parents"
            }
          }
        }
      },
    }
  }
}
