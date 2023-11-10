export default {
  delete: {
    tags: ["Children"],
    description: "Delete a child",
    operationId: "deleteChild",
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        description: "Child ID to be deleted",
        schema: {
          type: "integer",
          example: 34
        }
      }
    ],
    security: [
      {
        BearerAuth: [], // Assuming you have defined a Bearer authentication scheme
      },
    ],
    responses: {
      204: {
        description: "Child deleted successfully"
      },
    }
  }
}
