export default {
  openapi: "3.0.0",
  info: {
    title: "Blogs Application API",
    version: "1.0.0",
    description: "API documentation for the Blogs platform"
  },
  servers: [
    // { url: "http://localhost:3000", description: "Local server" },
    { url: "https://blogs-api-ncn3.onrender.com", description: "Production server" }
  ],
  components: {
    securitySchemes: {
      bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" }
    },
    schemas: {
      User: {
        type: "object",
        properties: {
          id: { type: "integer" },
          name: { type: "string", nullable: true },
          email: { type: "string" },
          role: { type: "string", enum: ["USER", "ADMIN"] },
          created_at: { type: "string", format: "date-time" },
          updated_at: { type: "string", format: "date-time" }
        }
      },
      Post: {
        type: "object",
        properties: {
          id: { type: "integer" },
          title: { type: "string" },
          content: { type: "string" },
          thumbnail: { type: "string", nullable: true },
          authorId: { type: "integer" },
          status: { type: "string", enum: ["DRAFT", "PUBLISHED", "ARCHIVED"] },
          isPublished: { type: "boolean" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" }
        }
      },
    //   Category: {
    //     type: "object",
    //     properties: {
    //       id: { type: "integer" },
    //       name: { type: "string" }
    //     }
    //   },
      Comment: {
        type: "object",
        properties: {
          id: { type: "integer" },
          content: { type: "string" },
          postId: { type: "integer" },
          authorId: { type: "integer" },
          parentId: { type: "integer", nullable: true },
          created_at: { type: "string", format: "date-time" },
          updated_at: { type: "string", format: "date-time" },
          replies: {
            type: "array",
            items: { $ref: "#/components/schemas/Comment" }
          }
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
                  name: { type: "string" },
                  email: { type: "string" },
                  password: { type: "string" }
                },
                required: ["email", "password"]
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
            content: { "application/json": { schema: { $ref: "#/components/schemas/User" } } }
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
            content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Post" } } } }
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
                  thumbnail: { type: "string" },
                  categoryIds: { type: "array", items: { type: "integer" } }
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
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: {
          200: { description: "Post details", content: { "application/json": { schema: { $ref: "#/components/schemas/Post" } } } },
          404: { description: "Not found" }
        }
      },
      put: {
        tags: ["Posts"],
        summary: "Update post",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  content: { type: "string" },
                  thumbnail: { type: "string" },
                  status: { type: "string", enum: ["DRAFT", "PUBLISHED", "ARCHIVED"] }
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
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: {
          204: { description: "Post deleted" },
          401: { description: "Unauthorized" },
          404: { description: "Not found" }
        }
      }
    },
    // "/api/categories": {
    //   get: {
    //     tags: ["Categories"],
    //     summary: "List all categories",
    //     responses: {
    //       200: {
    //         description: "List of categories",
    //         content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Category" } } } }
    //       }
    //     }
    //   },
    //   post: {
    //     tags: ["Categories"],
    //     summary: "Create category (admin only)",
    //     security: [{ bearerAuth: [] }],
    //     requestBody: {
    //       required: true,
    //       content: {
    //         "application/json": {
    //           schema: { type: "object", properties: { name: { type: "string" } }, required: ["name"] }
    //         }
    //       }
    //     },
    //     responses: {
    //       201: { description: "Category created" },
    //       401: { description: "Unauthorized" }
    //     }
    //   }
    // },
    // "/api/categories/{id}": {
    //   put: {
    //     tags: ["Categories"],
    //     summary: "Update category (admin only)",
    //     security: [{ bearerAuth: [] }],
    //     parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
    //     requestBody: {
    //       required: true,
    //       content: {
    //         "application/json": {
    //           schema: { type: "object", properties: { name: { type: "string" } } }
    //         }
    //       }
    //     },
    //     responses: {
    //       200: { description: "Category updated" },
    //       401: { description: "Unauthorized" },
    //       404: { description: "Not found" }
    //     }
    //   },
    //   delete: {
    //     tags: ["Categories"],
    //     summary: "Delete category (admin only)",
    //     security: [{ bearerAuth: [] }],
    //     parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
    //     responses: {
    //       204: { description: "Category deleted" },
    //       401: { description: "Unauthorized" },
    //       404: { description: "Not found" }
    //     }
    //   }
    // },
    "/api/comments": {
      get: {
        tags: ["Comments"],
        summary: "List comments (protected)",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "List of comments",
            content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Comment" } } } }
          }
        }
      },
      post: {
        tags: ["Comments"],
        summary: "Create comment or reply (protected)",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  content: { type: "string" },
                  postId: { type: "integer" },
                  parentId: { type: "integer", nullable: true }
                },
                required: ["content", "postId"]
              }
            }
          }
        },
        responses: {
          201: { description: "Comment created" },
          401: { description: "Unauthorized" }
        }
      }
    },
    "/api/comments/{id}": {
      put: {
        tags: ["Comments"],
        summary: "Update comment (protected)",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { type: "object", properties: { content: { type: "string" } } }
            }
          }
        },
        responses: {
          200: { description: "Comment updated" },
          401: { description: "Unauthorized" },
          404: { description: "Not found" }
        }
      },
      delete: {
        tags: ["Comments"],
        summary: "Delete comment (protected)",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: {
          204: { description: "Comment deleted" },
          401: { description: "Unauthorized" },
          404: { description: "Not found" }
        }
      }
    },
    "/api/comments/post/{postId}/replies": {
      get: {
        tags: ["Comments"],
        summary: "Get all top-level comments and their nested replies for a post",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "postId", in: "path", required: true, schema: { type: "integer" } }
        ],
        responses: {
          200: {
            description: "List of comments with nested replies",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Comment" }
                }
              }
            }
          },
          401: { description: "Unauthorized" },
          404: { description: "Not found" }
        }
      }
    }
  }
};