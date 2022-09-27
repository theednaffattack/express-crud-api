import request from "supertest";

import app from "../../app";

describe("GET /api/v1/todos", () => {
  it("responds with an array of todos", async () => {
    return request(app)
      .get("/api/v1/todos")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty("length");
        expect(response.body.length).toBe(1);
      });
  });
});
