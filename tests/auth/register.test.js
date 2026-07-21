import request from "supertest";
import mongoose from "mongoose";
import "dotenv/config";

import app from "../../src/app.js";
import connectDB from "../../database/db.js"; // adjust path if needed

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("POST /api/auth/register", () => {
  it("should register a new user", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Krishna",
        email: "krishna1@example.com",
        password: "password123",
      });

    expect(response.statusCode).toBe(201);
  });
});


describe("User Login", () => {

  it("should login an existing user", async () => {

    await request(app)
      .post("/api/auth/register")
      .send({
        name: "Krishna",
        email: "krishna@gmail.com",
        password: "123456"
      });


    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "krishna@gmail.com",
        password: "123456"
      });


    expect(response.statusCode).toBe(200);

    expect(response.body).toHaveProperty("token");

    expect(response.body.message)
      .toBe("Login successful");

  });

});