import { jest } from "@jest/globals";
import request from "supertest";
import express from "express";
import router from "../routes/addressRoutes.js";
const app = express();
app.use(express.json());
app.use(router);


// 1️⃣ Mock FIRST
jest.unstable_mockModule("../controllers/addressController.js", () => ({
  listRecord: (req, res) => {
    res.status(200).json([{ name: "Mocked Data" }]);
  },
}));
describe("GET /address", () => {
  it("should return a list of items", async () => {
    const res = await request(app).get("/address");
    expect(res.statusCode).toBe(200);
  });
});