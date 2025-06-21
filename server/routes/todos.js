const express = require("express");
const router = express.Router();
const supabase = require("../db/supabase");

// GET all todos
router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("todos").select("*").order("id");
  if (error) return res.status(500).json({ error });
  res.json(data);
});
// POSt todo
router.post("/", async (req, res) => {
  const { title } = req.body;

  const { data, error } = await supabase
    .from("todos")
    .insert([{ title, completed: false }])
    .select();

  if (error) {
    console.error("Supabase insert error:", error.message || error);
    return res.status(500).json({ error: error.message || error });
  }

  res.status(201).json(data[0]);
});

// PUT update a todo
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  const { data, error } = await supabase
    .from("todos")
    .update({ title, completed })
    .eq("id", id)
    .select();

  if (error) return res.status(500).json({ error });
  res.json(data[0]);
});

// DELETE a todo
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from("todos").delete().eq("id", id);
  if (error) return res.status(500).json({ error });
  res.status(204).send();
});

module.exports = router;
