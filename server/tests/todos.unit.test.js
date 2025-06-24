require("dotenv").config({ path: "./.env" });
const supabase = require("../db/supabase");
jest.mock("../db/supabase");
describe("todo unit tests with mocked supabase client", () => {
  afterEach(() => jest.clearAllMocks());

  test("should insert a todo", async () => {
    const insertData = [{ id: 1, title: "Mock todo", completed: false }];
    supabase.from.mockReturnValueOnce({
      insert: () => ({
        select: () => Promise.resolve({ data: insertData, error: null }),
      }),
    });
    const { data, error } = await supabase
      .from("todos")
      .insert([{ title: "Mock todo", completed: false }])
      .select();
    expect(error).toBeNull();
    expect(data[0].title).toBe("Mock todo");
  });

  test("should return error on insert failure", async () => {
    supabase.from.mockReturnValueOnce({
      insert: () => ({
        select: () =>
          Promise.resolve({ data: null, error: { message: "Insert failed" } }),
      }),
    });
    const { data, error } = await supabase
      .from("todos")
      .insert([{ title: "", completed: false }])
      .select();
    expect(data).toBeNull();
    expect(error.message).toBe("Insert failed");
  });
});
