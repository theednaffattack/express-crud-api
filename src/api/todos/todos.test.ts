import request from "supertest";

import app from "../../app";
import { wrapAsync } from "../../utils/wrap-async";
import { httpStatusCodes as codes } from "../response-codes";
import { TodosCollection } from "./todos.model";

beforeAll(async () => {
  // Check if we have any records in the database
  const results = TodosCollection.find();
  const [todos, todosError] = await wrapAsync(() => results.toArray());
  if (todosError) {
    console.error("BEFORE ALL 'todos.test.ts'");
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
    console.log("Success! Your collection was dropped from the database.");
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
      .expect(codes[422].code)
      .then((response) => {
        expect(response.body).toHaveProperty("message");
      });
  });
});

let id: string;

describe("POST /api/v1/todos", () => {
  it("Responds with an inserted object.", async () => {
    return request(app)
      .post("/api/v1/todos")
      .set("Accept", "application/json")
      .send({ content: "Learn TypeScript", done: false })
      .expect("Content-Type", /json/)
      .expect(codes[201].code)
      .then((response) => {
        expect(response.body).toHaveProperty("content");
        expect(response.body).toHaveProperty("done");
        expect(response.body).toHaveProperty("_id");
        id = response.body._id;
        expect(response.body.content).toBe("Learn TypeScript");
      });
  });
});

describe("GET /api/v1/todos/:id", () => {
  it("Responds with a single Todo", async () => {
    await request(app)
      .get(`/api/v1/todos/${id}`)
      .set("Accept", "application/json")
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty("content");
        expect(response.body).toHaveProperty("done");
        expect(response.body._id).toBe(id);
        expect(response.body).toHaveProperty("_id");
        expect(response.body.content).toBe("Learn TypeScript");
      });
  });
});

describe("GET /api/v1/todos/:id", () => {
  it("Responds with an invalid ObjectId error", (done) => {
    request(app)
      .get(`/api/v1/todos/rtrewyrwyr`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(codes[422].code, done);
  });

  it("Responds with a not found error", (done) => {
    request(app)
      .get(`/api/v1/todos/6337986e306ba4fa7827768e`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(codes[404].code, done);
  }, 6000);
});
