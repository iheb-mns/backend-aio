const db = require("../models");
const Office = db.office;

// Create and Save a new Office
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Office
    const office = new Office({
        number: req.body.number,
        name: req.body.name,
        address: req.body.address,
        persons: req.body.persons,
        email: req.body.email,
        notes: req.body.notes,
        userId: req.body.userId
    });

    // Save Office in the database
    office
        .save(office)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the office.",
            });
        });
};

// Retrieve all offices from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title
        ? { title: { $regex: new RegExp(title), $options: "i" } }
        : {};

    Office.find(condition)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving offices.",
            });
        });
};

// Find a single Office with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Office.findById(id)
      .then((data) => {
        if (!data)
          res.status(404).send({ message: "No found Office with id " + id });
        else res.send(data);
      })
      .catch((err) => {
        res.status(500).send({ message: "Error retrieving Offices with id=" + id });
      });
  };
  
  // Update a Office by the id in the request
  exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }
  
    const id = req.params.id;
  
    Office.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Office with id=${id}. Maybe Office was not found!`,
          });
        } else res.send({ message: "Office was updated successfully." });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating Office with id=" + id,
        });
      });
  };
  
  // Delete a Office with the specified id in the request
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Office.findByIdAndRemove(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Office with id=${id}. Maybe Office was not found!`,
          });
        } else {
          res.send({
            message: "Office was deleted successfully!",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete Office with id=" + id,
        });
      });
  };
  
  //Count Offices
  exports.countOffices = (req, res) => {
    Office.countDocuments()
      .then((data) => {
        //res.sendStatus(data.statusCode);
        res.send({
          office: `${data}`,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving Offices.",
        });
      });
  };