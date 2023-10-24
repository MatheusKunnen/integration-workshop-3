
export default {
    components:{
        securitySchemes: {
          BearerAuth: {
            type: "http",
            scheme: "bearer",
          }
        },
        schemas:{
            id:{
                type:'integer',
                description:"An id of an object",
                example: 1,
            },
            token:{
              type:'object',
              properties:{
                token:{
                  type:'string',
                  description:"A JSON Web Token used for authentication",
                  example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJlbnRfaWQiOjEsImVtYWlsIjoiZ2gubGlua2VAaG90bWFpbC5jb20iLCJpYXQiOjE2OTczMDQzMDF9.fuZfAZmpc8MiuQF5-0xrXjmVDFbE5vcC0wwqaXA5Gfg",
                }
              },
            },
            Images:{
                type:'object',
                properties:{
                    id:{
                        type:'integer',
                        description:"Image identification number",
                        example: 1
                    },
                    url:{
                        type:'string',
                        format: 'uri',
                        description:"URL to an image",
                        example:"http://localhost:3000/snickers.png"
                    },
                }
            },
            PasswordGroups: {
              type: "object",
              properties: {
                id: {
                  type: "integer",
                  description: "Password group identification number",
                  example: 1
                },
                image1: {
                  $ref: "#/components/schemas/Images",
                  description: "Reference to Image 1 in the group"
                },
                image2: {
                  $ref: "#/components/schemas/Images",
                  description: "Reference to Image 2 in the group"
                },
                image3: {
                  $ref: "#/components/schemas/Images",
                  description: "Reference to Image 3 in the group"
                },
                image4: {
                  $ref: "#/components/schemas/Images",
                  description: "Reference to Image 4 in the group"
                },
                image5: {
                  $ref: "#/components/schemas/Images",
                  description: "Reference to Image 5 in the group"
                },
                image6: {
                  $ref: "#/components/schemas/Images",
                  description: "Reference to Image 6 in the group"
                }
              }
            },
            Snacks: {
              type: "object",
              properties: {
                id: {
                  type: "integer",
                  description: "Snack identification number",
                  example: 1
                },
                name: {
                  type: "string",
                  description: "Name of the snack",
                  example: "Chocolate Bar"
                },
                image: {
                  $ref: "#/components/schemas/Images",
                  description: "Reference to the snack's image"
                },
                ingredients: {
                  type: "string",
                  description: "Ingredients of the snack",
                  example: "Sugar, cocoa, milk"
                },
                price: {
                  type: "integer",
                  description: "Price of the snack in cents",
                  example: 150
                },
                stock: {
                  type: "integer",
                  description: "Current stock of the snack",
                  example: 50
                }
              }
            },
            Parents: {
              type: "object",
              properties: {
                id: {
                  type: "integer",
                  description: "Parent identification number",
                  example: 1,
                },
                email: {
                  type: "string",
                  format: "email",
                  description: "Parent's email address",
                  example: "parent@example.com",
                },
                password: {
                  type: "string",
                  description: "Password of the parent",
                  example: "password123",
                },
                balance: {
                  type: "integer",
                  description: "Parent's account balance in cents",
                  example: 100,
                },
                createdAt: {
                  type: "string",
                  format: "date-time",
                  description: "Date and time of creation",
                  example: "2023-10-24T01:48:46.314Z"
                },
                updatedAt: {
                  type: "string",
                  format: "date-time",
                  description: "Date and time of the last update",
                  example: "2023-10-24T01:48:46.314Z"
                }
              }
            },
            ParentCredentials: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                  format: "email",
                  description: "Parent's email address",
                  example: "parent@example.com",
                },
                password: {
                  type: "string",
                  description: "Password of the parent",
                  example: "password123",
                },
              }
            }
        }
    }
}