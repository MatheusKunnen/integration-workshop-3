
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
            }
        }
    }
}