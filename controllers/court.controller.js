const db = require("../models");
const Court = db.court;

// Create and Save a new Court
exports.create = (req, res) => {
    // Validate request
    if (!req.body.number) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Court
    const court = new Court({
        number: req.body.number,
        name: req.body.name,
        address: req.body.address,
        persons: req.body.persons,
        email: req.body.email,
        notes: req.body.notes,
        userId: req.body.userId
    });

    // Save Court in the database
    court
        .save(court)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Court.",
            });
        });
};

// Retrieve all Courts from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title
        ? { title: { $regex: new RegExp(title), $options: "i" } }
        : {};

    Court.find(condition)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving courts.",
            });
        });
};

// Find a single Court with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Court.findById(id)
      .then((data) => {
        if (!data)
          res.status(404).send({ message: "No found Court with id " + id });
        else res.send(data);
      })
      .catch((err) => {
        res.status(500).send({ message: "Error retrieving Courts with id=" + id });
      });
  };
  
  // Update a Court by the id in the request
  exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }
  
    const id = req.params.id;
  
    Court.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Court with id=${id}. Maybe Court was not found!`,
          });
        } else res.send({ message: "Court was updated successfully." });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating Court with id=" + id,
        });
      });
  };
  
  // Delete a Court with the specified id in the request
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Court.findByIdAndRemove(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Court with id=${id}. Maybe Court was not found!`,
          });
        } else {
          res.send({
            message: "Court was deleted successfully!",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete Court with id=" + id,
        });
      });
  };
  
  //Count Courts
  exports.countCourts = (req, res) => {
    Court.countDocuments()
      .then((data) => {
        //res.sendStatus(data.statusCode);
        res.send({
          court: `${data}`,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving Courts.",
        });
      });
  };