export default {
  get: {
    tags: ["Children"],
    description: "Get order history for a child",
    operationId: "getOrderHistory",
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        description: "Child ID to retrieve the order history",
        schema: {
          type: "integer",
          example: 1
        }
      }
    ],
    security: [
      {
        BearerAuth: [],
      },
    ],
    responses: {
      200: {
        description: "Order history obtained successfully",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                $ref: "#/components/schemas/OrderHistory"
              }
            }
          }
        }
      },
    }
  }
}
