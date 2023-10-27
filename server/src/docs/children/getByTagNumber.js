export default {
  get: {
    tags: ["Children"],
    description: "Get children by tag number",
    operationId: "getChildrenByTagNumber",
    parameters: [
      {
        name: "tagNumber",
        in: "path",
        required: true,
        description: "Tag number to filter children",
        schema: {
          type: "string",
          example: "123"
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
        description: "Children obtained successfully",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                $ref: "#/components/schemas/ChildrenFromTag"
              }
            }
          }
        }
      },
    }
  }
}
