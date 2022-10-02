module.exports = (app) => {
  const investigations = require("../controllers/investigation.controller.js");

  var router = require("express").Router();

  // Create a new Investigation
  router.post("/", investigations.create);

  // Retrieve all Investigations
  router.get("/", investigations.findAll);

  // Count Investigations
  router.get("/countInvestigations", investigations.countInvestigations);

  // Retrieve a single Investigation with id
  router.get("/:id", investigations.findOne);

  // Update a Investigation with id
  router.put("/:id", investigations.update);

  // Delete a Investigation with id
  router.delete("/:id", investigations.delete);

  app.use("/api/investigations", router);
};
