require("dotenv").config({ path: "./.env" });
const supabase = require("../db/supabase");
describe("integration tests w/ real supabase client", () => {
  let createdTodo;

  test("should create a todo in Supabase", async () => {
    const { data, error } = await supabase
      .from("todos")
      .insert([{ title: "Integration todo", completed: false }])
      .select();

    expect(error).toBeNull();
    expect(data[0].title).toBe("Integration todo");

    createdTodo = data[0];
  });

  test("should update the todo", async () => {
    const { data, error } = await supabase
      .from("todos")
      .update({ completed: true })
      .eq("id", createdTodo.id)
      .select();

    expect(error).toBeNull();
    expect(data[0].completed).toBe(true);
  });

  test("should delete the todo", async () => {
    const { error } = await supabase
      .from("todos")
      .delete()
      .eq("id", createdTodo.id);

    expect(error).toBeNull();
  });
});
