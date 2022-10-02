module.exports = (app) => {
  const offices = require("../controllers/office.controller.js");

  var router = require("express").Router();

  // Create a new Office
  router.post("/", offices.create);

  // Retrieve all Office
  router.get("/", offices.findAll);

  // Retrieve a single Office with id
  router.get("/:id", offices.findOne);

  // Update a Office with id
  router.put("/:id", offices.update);

  // Delete a Office with id
  router.delete("/:id", offices.delete);

  // Count Offices
  router.get("/countOffices", offices.countOffices);

  app.use("/api/offices", router);
};
