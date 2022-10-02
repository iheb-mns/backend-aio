module.exports = (app) => {
  const lawyers = require("../controllers/lawyer.controller.js");

  var router = require("express").Router();

  // Create a new Lawyer
  router.post("/", lawyers.create);

  // Retrieve all Lawyers
  router.get("/", lawyers.findAll);

  // Count Lawyers
  router.get("/countLawyers", lawyers.countLawyers);

  // Retrieve a single Lawyer with id
  router.get("/:id", lawyers.findOne);

  // Update a Lawyer with id
  router.put("/:id", lawyers.update);

  // Delete a Lawyer with id
  router.delete("/:id", lawyers.delete);

  app.use("/api/lawyers", router);
};
