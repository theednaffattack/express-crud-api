import request from "supertest";

import app from "../../app";
import { asyncWrap } from "../../utils/async-wrap";
import { TodosCollection } from "./todos.model";

beforeAll(async () => {
  // Check if we have any records in the database
  const results = TodosCollection.find();
  const [todos, todosError] = await asyncWrap(() => results.toArray());
  if (todosError) {
    console.error(todosError);
  }

  // If we find Todos in the database, drop the database
  if (todos && todos.length) {
    const [_collDrop, collDropError] = await asyncWrap(() =>
      TodosCollection.drop()
    );

    // Report any errors we have dropping
    if (collDropError) {
      console.error("Error dropping collection for test", collDropError);
    }
    // Otherwise, success!
    console.log("Success, your collection was dropped from the database");
  }
});

describe("GET /api/v1/todos", () => {
  it("responds with an array of todos", async () => {
    return request(app)
      .get("/api/v1/todos")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty("length");
        expect(response.body.length).toBe(0);
      });
  });
});
