module.exports = (app) => {
  const courts = require("../controllers/court.controller.js");

  var router = require("express").Router();

  // Create a new courts
  router.post("/", courts.create);

  // Retrieve all courts
  router.get("/", courts.findAll);

  // Retrieve a single Court with id
  router.get("/:id", courts.findOne);

  // Update a Court with id
  router.put("/:id", courts.update);

  // Delete a Court with id
  router.delete("/:id", courts.delete);

  // Count Courts
  router.get("/countCourts", courts.countCourts);

  app.use("/api/courts", router);
};
