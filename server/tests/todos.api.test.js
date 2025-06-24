require("dotenv").config({ path: "./.env" });
const supabase = require("../db/supabase");
const request = require("supertest");
const app = require("../index");
describe("api tests for /todos, more to come", () => {
  let createdId;

  test("POST /todos - should create a todo", async () => {
    const res = await request(app)
      .post("/todos")
      .send({ title: "API test todo" });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("title", "API test todo");

    createdId = res.body.id;
  });

  test("GET /todos - should return todos array", async () => {
    const res = await request(app).get("/todos");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("PUT /todos/:id - should update a todo", async () => {
    const res = await request(app)
      .put(`/todos/${createdId}`)
      .send({ title: "Updated API todo", completed: true });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("completed", true);
  });

  test("DELETE /todos/:id - should delete a todo", async () => {
    const res = await request(app).delete(`/todos/${createdId}`);
    expect(res.statusCode).toBe(204);
  });
});
