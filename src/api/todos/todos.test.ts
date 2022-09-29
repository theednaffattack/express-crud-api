import request from "supertest";

import app from "../../app";
import { wrapAsync } from "../../utils/wrap-async";
import { httpStatusCodes } from "../response-codes";
import { TodosCollection } from "./todos.model";

beforeAll(async () => {
  // Check if we have any records in the database
  const results = TodosCollection.find();
  const [todos, todosError] = await wrapAsync(() => results.toArray());
  if (todosError) {
    console.error(todosError);
  }

  // If we find Todos in the database, drop the database
  if (todos && todos.length) {
    const [_collDrop, collDropError] = await wrapAsync(() =>
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

describe("POST /api/v1/todos", () => {
  it("Responds with an error if the Todo is invalid.", async () => {
    return request(app)
      .post("/api/v1/todos")
      .set("Accept", "application/json")
      .send({ content: "" })
      .expect("Content-Type", /json/)
      .expect(httpStatusCodes[422].code)
      .then((response) => {
        expect(response.body).toHaveProperty("message");
      });
  });
});

describe("POST /api/v1/todos", () => {
  it("Responds with an inserted object.", async () => {
    return request(app)
      .post("/api/v1/todos")
      .set("Accept", "application/json")
      .send({ content: "Learn TypeScript", done: false })
      .expect("Content-Type", /json/)
      .expect(httpStatusCodes[201].code)
      .then((response) => {
        expect(response.body).toHaveProperty("content");
        expect(response.body).toHaveProperty("done");
        expect(response.body).toHaveProperty("_id");
        expect(response.body.content).toBe("Learn TypeScript");
      });
  });
});
