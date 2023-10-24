export default {
  get: {
    tags: ["Children"],
    description: "Get children by parent ID",
    operationId: "getChildrenByParentId",
    security: [
      {
        BearerAuth: [],
      },
    ],
    responses: {
      200: {
        description: "List of children obtained successfully",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Children"
              }
            }
          }
        }
      },
    }
  }
}
