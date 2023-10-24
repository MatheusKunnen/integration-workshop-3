
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
            },
            ParentIdentification: {
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
              }
            },
            Children: {
              type: "object",
              properties: {
                id: {
                  type: "integer",
                  description: "Child identification number",
                  example: 1
                },
                name: {
                  type: "string",
                  description: "Child's name",
                  example: "John Doe"
                },
                tagNumber: {
                  type: "string",
                  description: "Unique tag number of the child",
                  example: "12345"
                },
                budget: {
                  type: "integer",
                  description: "Child's budget",
                  example: 100
                },
                isBlocked: {
                  type: "boolean",
                  description: "Indicates if the child is blocked",
                  example: false
                },
                parent: {
                  $ref: "#/components/schemas/ParentIdentification",
                  description: "Reference to the parent of the child"
                },
                passwordImage: {
                  $ref: "#/components/schemas/Images",
                  description: "Reference to the child's password image"
                },
                passwordGroup: {
                  $ref: "#/components/schemas/PasswordGroups",
                  description: "Reference to the child's password group"
                },
                allowedSnacks: {
                  type: "array",
                  items: {
                    type: "integer"
                  },
                  example: [1, 5, 6],
                  description: "List of snacks ids allowed for the child"
                },
              }
            },
            ChildrenCreate: {
              type: "object",
              properties: {
                passwordImageId: {
                  type: "integer",
                  description: "Identification number of the password image",
                  example: 20
                },
                passwordGroupId: {
                  type: "integer",
                  description: "Identification number of the password group",
                  example: 3
                },
                name: {
                  type: "string",
                  description: "Child's name",
                  example: "Maria"
                },
                tagNumber: {
                  type: "string",
                  description: "Unique tag number of the child",
                  example: "123"
                },
                budget: {
                  type: "integer",
                  description: "Child's budget",
                  example: 1000
                },
                allowedSnacks: {
                  type: "array",
                  items: {
                    type: "integer"
                  },
                  description: "List of snack identifiers allowed for the child",
                  example: [1, 5, 6]
                }
              }
            },
            ChildrenUpdate: {
              type: "object",
              properties: {
                passwordImageId: {
                  type: "integer",
                  description: "ID of the new password image for the child",
                  example: 20
                },
                name: {
                  type: "string",
                  description: "New name for the child",
                  example: "Maria"
                },
                tagNumber: {
                  type: "string",
                  description: "New tag number for the child",
                  example: "123"
                }
              }
            },
            ChildCredentials: {
              type: "object",
              properties: {
                tagNumber: {
                  type: "string",
                  description: "Unique tag number of the child",
                  example: "123"
                },
                passwordImageId: {
                  type: "integer",
                  description: "Identification number of the password image",
                  example: 20
                }
              }
            },
            ChildrenWithoutPassword: {
              type: "object",
              properties: {
                id: {
                  type: "integer",
                  description: "Child identification number",
                  example: 1
                },
                name: {
                  type: "string",
                  description: "Child's name",
                  example: "John Doe"
                },
                tagNumber: {
                  type: "string",
                  description: "Unique tag number of the child",
                  example: "12345"
                },
                budget: {
                  type: "integer",
                  description: "Child's budget",
                  example: 100
                },
                isBlocked: {
                  type: "boolean",
                  description: "Indicates if the child is blocked",
                  example: false
                },
                parent: {
                  $ref: "#/components/schemas/ParentIdentification",
                  description: "Reference to the parent of the child"
                },
                passwordGroup: {
                  $ref: "#/components/schemas/PasswordGroups",
                  description: "Reference to the child's password group"
                },
                allowedSnacks: {
                  type: "array",
                  items: {
                    type: "integer"
                  },
                  example: [1, 5, 6],
                  description: "List of snacks ids allowed for the child"
                },
              }
            },
            ChildrenFromTag: {
              type: "object",
              properties: {
                id: {
                  type: "integer",
                  description: "Child identification number",
                  example: 1
                },
                tagNumber: {
                  type: "string",
                  description: "Unique tag number of the child",
                  example: "12345"
                },
                isBlocked: {
                  type: "boolean",
                  description: "Indicates if the child is blocked",
                  example: false
                },
                credit: {
                  type: "integer",
                  description: "Child's credit. How much they still can spend during the day",
                  example: 100
                },
                passwordGroup: {
                  $ref: "#/components/schemas/PasswordGroups",
                  description: "Reference to the child's password group"
                },
                allowedSnacks: {
                  type: "array",
                  items: {
                    type: "integer"
                  },
                  example: [1, 5, 6],
                  description: "List of snacks ids allowed for the child"
                },
              }
            },            
            OrderHistory: {
              type: "object",
              properties: {
                snackId: {
                  type: "integer",
                  description: "Id of a snack",
                  example: 1,
                },
                price: {
                  type: "integer",
                  description: "How much the snack costed when it was bought",
                  example: 100,
                },
                createdAt: {
                  type: "string",
                  format: "date-time",
                  description: "Date and time of creation",
                  example: "2023-10-24T01:48:46.314Z"
                },
              }
            },
          }
        }
      }