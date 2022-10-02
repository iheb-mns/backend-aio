module.exports = (app) => {
    const sessions = require("../controllers/session.controller.js");

    var router = require("express").Router();

    // Create a new Session
    router.post("/", sessions.create);

    // Retrieve all Session
    router.get("/", sessions.findAll);

    // Retrieve a single Session with id
    router.get("/:id", sessions.findOne);

    // Update a Session with id
    router.put("/:id", sessions.update);

    // Delete a Session with id
    router.delete("/:id", sessions.delete);

    // Count Sessions
    router.get("/countSessions", sessions.countSessions);

    app.use("/api/sessions", router);
};
