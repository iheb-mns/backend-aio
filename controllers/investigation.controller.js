const db = require("../models");
const Investigation = db.investigation;

// Create and Save a new Investigation
exports.create = (req, res) => {
  // Validate request
  /*if (!req.body.number) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }*/

  // Create a Investigation
  const investigation = new Investigation({
    number: req.body.number,
    report: req.body.report,
    area: req.body.area,
    date: req.body.date,
    client: req.body.client,
    clientOther: req.body.clientOther,
    clientOpposent: req.body.clientOpposent,
    clientOpposentOther: req.body.clientOpposentOther,
    clientDescription: req.body.clientDescription,
    clientOpposentDescription: req.body.clientOpposentDescription,
    subject: req.body.subject,
    decision: req.body.decision,
    lawyer: req.body.lawyer,
    dateClose: req.body.dateClose,
    notes: req.body.notes,
    userId: req.body.userId
  });

  // Save Investigation in the database
  investigation
    .save(investigation)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Investigation.",
      });
    });
};

// Retrieve all Investigations from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

    Investigation.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Investigations.",
      });
    });
};

// Find a single Investigation with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Investigation.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "No found Investigation with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving Investigations with id=" + id });
    });
};

// Update a Investigation by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Investigation.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Investigation with id=${id}. Maybe Investigation was not found!`,
        });
      } else res.send({ message: "Investigation was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Investigation with id=" + id,
      });
    });
};

// Delete a Investigation with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Investigation.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Investigation with id=${id}. Maybe Investigation was not found!`,
        });
      } else {
        res.send({
          message: "Investigation was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Investigation with id=" + id,
      });
    });
};

//Count Investigations
exports.countInvestigations = (req, res) => {
    Investigation.countDocuments()
    .then((data) => {
      //res.sendStatus(data.statusCode);
      res.send({
        investigation: `${data}`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Investigations.",
      });
    });
};