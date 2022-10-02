const db = require("../models");
const Case = db.case;
var fs = require('fs');

// Create and Save a new Case
exports.create = (req, res) => {
  // Validate request
  /*if (!req.body.number) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }*/

  const url = req.protocol + '://' + req.get('host')

  // Create a Case
  const casee = new Case({
    number: req.body.number,
    subject: req.body.subject,
    notes: req.body.notes,
    court: req.body.court,
    client: req.body.client,
    clientOpposent: req.body.clientOpposent,
    lawyer: req.body.lawyer,
    lawyerOpposent: req.body.lawyerOpposent,
    date: req.body.date,
    type: req.body.type,
    clientAddress: req.body.clientAddress,
    relatedCases: req.body.relatedCases,
    room: req.body.room,
    departmentNumber: req.body.departmentNumber,
    status: req.body.status,
    userId: req.body.userId,
    files: req.files,
  });

  // Save Case in the database
  casee
    .save(casee)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Case.",
      });
    });
};

// Retrieve all Cases from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  Case.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving cases.",
      });
    });
};

// Find a single Case with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Case.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "No found Case with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving Cases with id=" + id });
    });
};

// Update a Case by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Case.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Case with id=${id}. Maybe Case was not found!`,
        });
      } else res.send({ message: "Case was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Case with id=" + id,
      });
    });
};

// Delete a Case with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Case.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Case with id=${id}. Maybe Case was not found!`,
        });
      } else {
        res.send({
          message: "Case was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Case with id=" + id,
      });
    });
};

//Count Cases
exports.countCases = (req, res) => {
  Case.countDocuments()
    .then((data) => {
      //res.sendStatus(data.statusCode);
      res.send({
        case: `${data}`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving cases.",
      });
    });
};

// Delete a File with the specified id in the request
exports.deleteFile = async (req, res) => {
  var filePath = 'C:/Users/houba/Desktop/aiolawyers/backend/files/';
  const id = req.params.id;
  const filename = req.params.filename;
  //const idCompany = await Files.findById(id, 'company').exec()
  //await Files.findByIdAndRemove(id);
  await Case.findOneAndUpdate({ _id: id }, { $pull: { files: { filename: filename } } });
  fs.unlinkSync(filePath+filename);
  res.send("File was deleted successfully");
};