const db = require("../models");
const Department = db.department;

// Create and Save a new Department
exports.create = (req, res) => {
    // Validate request
    if (!req.body.number) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Department
    const department = new Department({
        number: req.body.number,
        name: req.body.name,
        address: req.body.address,
        persons: req.body.persons,
        email: req.body.email,
        notes: req.body.notes,
        userId: req.body.userId
    });

    // Save Department in the database
    department
        .save(department)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Department.",
            });
        });
};

// Retrieve all Departments from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title
        ? { title: { $regex: new RegExp(title), $options: "i" } }
        : {};

    Department.find(condition)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Departments.",
            });
        });
};

// Find a single Department with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Department.findById(id)
      .then((data) => {
        if (!data)
          res.status(404).send({ message: "No found Department with id " + id });
        else res.send(data);
      })
      .catch((err) => {
        res.status(500).send({ message: "Error retrieving Departments with id=" + id });
      });
  };
  
  // Update a Department by the id in the request
  exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }
  
    const id = req.params.id;
  
    Department.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Department with id=${id}. Maybe Department was not found!`,
          });
        } else res.send({ message: "Department was updated successfully." });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating Department with id=" + id,
        });
      });
  };
  
  // Delete a Department with the specified id in the request
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Department.findByIdAndRemove(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Department with id=${id}. Maybe Department was not found!`,
          });
        } else {
          res.send({
            message: "Department was deleted successfully!",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete Department with id=" + id,
        });
      });
  };
  
  //Count Departments
  exports.countDepartments = (req, res) => {
    Department.countDocuments()
      .then((data) => {
        //res.sendStatus(data.statusCode);
        res.send({
          department: `${data}`,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving Departments.",
        });
      });
  };