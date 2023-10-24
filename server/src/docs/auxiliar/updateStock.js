export default {
  patch: {
    tags: ["Auxiliar"],
    description: "Update snack stock",
    operationId: "updateStock",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "ID of the snack to update stock",
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
              stock: {
                type: "integer",
                description: "New stock value"
              }
            },
            required: ["stock"]
          }
        }
      },
      required: true
    },
    responses: {
      200: {
        description: "Snack stock updated successfully",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Snacks"
            }
          }
        }
      },
    }
  }
}
