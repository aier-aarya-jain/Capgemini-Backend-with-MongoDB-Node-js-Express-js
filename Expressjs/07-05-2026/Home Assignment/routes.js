const express = require("express");
const router = express.Router();

const User = require("./models/users");


router.get("/users", async (req, res) => {

  const users = await User.find();

  res.json(users);
});

router.get("/users/:id", async (req, res) => {

  const user = await User.findById(req.params.id);

  res.json(user);
});



router.post("/users", async (req, res) => {

  try {

    const users = await User.insertMany(req.body);

    res.status(201).json(users);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


router.patch("/users/:id", async (req, res) => {

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updatedUser);
});

router.put("/users/:id", async (req, res) => {

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      age: req.body.age
    },
    {
      new: true
    }
  );

  res.json(updatedUser);
});


router.delete("/users/:id", async (req, res) => {

  await User.findByIdAndDelete(req.params.id);

  res.json({
    message: "User deleted"
  });
});

module.exports = router;