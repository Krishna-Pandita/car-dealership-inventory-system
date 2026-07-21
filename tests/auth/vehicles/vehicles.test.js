import request from "supertest";
import mongoose from "mongoose";
import "dotenv/config";
import User from "../../src/models/userModel.js";

import app from "../../src/app.js";
import connectDB from "../../database/db.js"; // adjust path if needed


beforeEach(async () => {
  await User.deleteMany({});
});


beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await mongoose.connection.close();
});



describe("POST /api/vehicles", () => {
  it("should add a new vehicle", async () => {
    const response = await request(app)
      .post("/api/vehicles")
      .send({
        make: "Toyota",
        model: "Fortuner",
        category: "SUV",
        price: 4500000,
        quantity: 5,
      });

    expect(response.statusCode).toBe(201);

    expect(response.body.message).toBe("Vehicle added successfully");

    expect(response.body.vehicle).toHaveProperty("_id");
    expect(response.body.vehicle.make).toBe("Toyota");
    expect(response.body.vehicle.model).toBe("Fortuner");
    expect(response.body.vehicle.category).toBe("SUV");
    expect(response.body.vehicle.price).toBe(4500000);
    expect(response.body.vehicle.quantity).toBe(5);
  });
});





it("should return all vehicles", async () => {
  const response = await request(app).get("/api/vehicles");

  expect(response.statusCode).toBe(200);
  expect(Array.isArray(response.body)).toBe(true);
});