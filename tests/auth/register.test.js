const request = require("supertest");
const app = require("../../src/app"); // your Express app

describe("POST /api/auth/register", () => {
  it("should register a new user", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Krishna",
        email: "krishna@example.com",
        password: "password123"
      });

    expect(response.statusCode).toBe(201);
  });
});