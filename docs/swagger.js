export default {
  openapi: "3.0.0",
  info: {
    title: "Blogs API",
    version: "1.0.0",
    description: "API documentation for the Blogs platform"
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local server"
    },
    {
      url: "https://blogs-api-ncn3.onrender.com",
      description: "Production server"
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    },
    schemas: {
      User: {
        type: "object",
        properties: {
          id: { type: "string" },
          username: { type: "string" },
          email: { type: "string" },
          role: { type: "string" }
        }
      },
      Post: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          content: { type: "string" },
          imageUrl: { type: "string" },
          authorId: { type: "string" }
        }
      },
      Category: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" }
        }
      },
      Comment: {
        type: "object",
        properties: {
          id: { type: "string" },
          content: { type: "string" },
          postId: { type: "string" },
          authorId: { type: "string" }
        }
      }
    }
  },
  security: [{ bearerAuth: [] }],
  paths: {
    "/api/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Register a new user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  username: { type: "string" },
                  email: { type: "string" },
                  password: { type: "string" }
                },
                required: ["username", "email", "password"]
              }
            }
          }
        },
        responses: {
          201: { description: "User registered" },
          400: { description: "Invalid input" }
        }
      }
    },
    "/api/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Login and get JWT",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string" },
                  password: { type: "string" }
                },
                required: ["email", "password"]
              }
            }
          }
        },
        responses: {
          200: { description: "JWT token" },
          401: { description: "Unauthorized" }
        }
      }
    },
    "/api/auth/profile": {
      get: {
        tags: ["Auth"],
        summary: "Get user profile",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "User profile",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" }
              }
            }
          },
          401: { description: "Unauthorized" }
        }
      }
    },
    "/api/posts": {
      get: {
        tags: ["Posts"],
        summary: "List all posts",
        responses: {
          200: {
            description: "List of posts",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Post" }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ["Posts"],
        summary: "Create a post",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  content: { type: "string" },
                  imageUrl: { type: "string" }
                },
                required: ["title", "content"]
              }
            }
          }
        },
        responses: {
          201: { description: "Post created" },
          401: { description: "Unauthorized" }
        }
      }
    },
    "/api/posts/{id}": {
      get: {
        tags: ["Posts"],
        summary: "Get single post",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" }
          }
        ],
        responses: {
          200: {
            description: "Post details",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Post" }
              }
            }
          },
          404: { description: "Not found" }
        }
      },
      put: {
        tags: ["Posts"],
        summary: "Update post",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" }
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  content: { type: "string" },
                  imageUrl: { type: "string" }
                }
              }
            }
          }
        },
        responses: {
          200: { description: "Post updated" },
          401: { description: "Unauthorized" },
          404: { description: "Not found" }
        }
      },
      delete: {
        tags: ["Posts"],
        summary: "Delete post",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" }
          }
        ],
        responses: {
          204: { description: "Post deleted" },
          401: { description: "Unauthorized" },
          404: { description: "Not found" }
        }
      }
    }
    // Add similar definitions for categories and comments as needed
  }
};