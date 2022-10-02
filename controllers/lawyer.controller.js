const db = require("../models");
const Lawyer = db.lawyer;

// Create and Save a new Lawyer
exports.create = (req, res) => {
    // Validate request
    if (!req.body.number) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Lawyer
    const lawyer = new Lawyer({
        name: req.body.name,
        number: req.body.number,
        authNumber: req.body.authNumber,
        address: req.body.address,
        mobile: req.body.mobile,
        phone: req.body.phone,
        idCard: req.body.idCard,
        email: req.body.email,
        notes: req.body.notes,
        office: req.body.office,
        userId: req.body.userId
    });

    // Save Lawyer in the database
    lawyer
        .save(lawyer)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Lawyer.",
            });
        });
};

// Retrieve all Lawyers from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title
        ? { title: { $regex: new RegExp(title), $options: "i" } }
        : {};

        Lawyer.find(condition)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving lawyers.",
            });
        });
};


// Find a single Lawyer with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Lawyer.findById(id)
      .then((data) => {
        if (!data)
          res.status(404).send({ message: "No found Lawyer with id " + id });
        else res.send(data);
      })
      .catch((err) => {
        res.status(500).send({ message: "Error retrieving Lawyers with id=" + id });
      });
  };
  
  // Update a Lawyer by the id in the request
  exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }
  
    const id = req.params.id;
  
    Lawyer.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Lawyer with id=${id}. Maybe Lawyer was not found!`,
          });
        } else res.send({ message: "Lawyer was updated successfully." });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating Lawyer with id=" + id,
        });
      });
  };
  
  // Delete a Lawyer with the specified id in the request
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Lawyer.findByIdAndRemove(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Lawyer with id=${id}. Maybe Lawyer was not found!`,
          });
        } else {
          res.send({
            message: "Lawyer was deleted successfully!",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete Lawyer with id=" + id,
        });
      });
  };
  
  //Count Lawyers
  exports.countLawyers = (req, res) => {
    Lawyer.countDocuments()
      .then((data) => {
        //res.sendStatus(data.statusCode);
        res.send({
          lawyer: `${data}`,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving Lawyers.",
        });
      });
  };