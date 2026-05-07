const express = require("express");

const router = express.Router();

// GET
router.get("/users/:id", (req, res) => {
  res.send(`GET user ${req.params.id}`);
});

// POST
router.post("/users/:id", (req, res) => {
  res.send(`POST user ${req.params.id}`);
});

// PUT
router.put("/users/:id", (req, res) => {
  res.send(`PUT user ${req.params.id}`);
});

// PATCH
router.patch("/users/:id", (req, res) => {
  res.send(`PATCH user ${req.params.id}`);
});

// DELETE
router.delete("/users/:id", (req, res) => {
  res.send(`DELETE user ${req.params.id}`);
});

module.exports = router;
