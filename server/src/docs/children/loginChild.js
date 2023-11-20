export default {
  post: {
    tags: ["Children"],
    description: "Login as a child",
    operationId: "loginChild",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/ChildCredentials"
          }
        }
      },
      required: true
    },
    responses: {
      200: {
        description: "Child successfully logged in",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/token"
            }
          }
        }
      },
    }
  }
}
