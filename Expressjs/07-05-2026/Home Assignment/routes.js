const express = require("express");

const router = express.Router();

const User = require("./models/users");


router.get("/users", async (req, res) => {

  const users = await User.find();

  res.send(users);
});

router.post("/users", async (req, res) => {

  const users = await User.insertMany(req.body);

  res.send(users);
});

router.patch("/users/:id", async (req, res) => {

  const user = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.send(user);
});

router.put("/users/:id", async (req, res) => {

  const user = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.send(user);
});


// DELETE user
router.delete("/users/:id", async (req, res) => {

  await User.findByIdAndDelete(req.params.id);

  res.send("User deleted");
});


// fallback middleware
router.use((req, res) => {

  if (
    req.method !== "GET" &&
    req.method !== "POST" &&
    req.method !== "PUT" &&
    req.method !== "PATCH" &&
    req.method !== "DELETE"
  ) {

    return res.send("405 Method Not Allowed");
  }

  res.send("404 Page Not Found");
});

module.exports = router;