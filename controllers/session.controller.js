const db = require("../models");
const Session = db.session;

// Create and Save a new Session
exports.create = (req, res) => {
    // Validate request
    /*if (!req.body.number) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }*/

    // Create a Session
    const session = new Session({
        number: req.body.number,
        case: req.body.case,
        client: req.body.client,
        date: req.body.date,
        department: req.body.department,
        roll: req.body.roll,
        reason: req.body.reason,
        demands: req.body.demands,
        lawyer: req.body.lawyer,
        decision: req.body.decision,
        dateNext: req.body.dateNext,
        notes: req.body.notes,
        userId: req.body.userId
    });

    // Save Session in the database
    session
        .save(session)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Session.",
            });
        });
};

// Retrieve all Sessions from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title
        ? { title: { $regex: new RegExp(title), $options: "i" } }
        : {};

    Session.find(condition)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Sessions.",
            });
        });
};

// Find a single Session with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Session.findById(id)
      .then((data) => {
        if (!data)
          res.status(404).send({ message: "No found Session with id " + id });
        else res.send(data);
      })
      .catch((err) => {
        res.status(500).send({ message: "Error retrieving Session with id=" + id });
      });
  };
  
  // Update a Session by the id in the request
  exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }
  
    const id = req.params.id;
  
    Session.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Session with id=${id}. Maybe Session was not found!`,
          });
        } else res.send({ message: "Session was updated successfully." });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating Session with id=" + id,
        });
      });
  };
  
  // Delete a Session with the specified id in the request
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Session.findByIdAndRemove(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Session with id=${id}. Maybe Session was not found!`,
          });
        } else {
          res.send({
            message: "Session was deleted successfully!",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete Session with id=" + id,
        });
      });
  };
  
  //Count Session
  exports.countSessions = (req, res) => {
    Session.countDocuments()
      .then((data) => {
        //res.sendStatus(data.statusCode);
        res.send({
          session: `${data}`,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving Sessions.",
        });
      });
  };