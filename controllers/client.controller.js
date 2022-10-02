const db = require("../models");
const Client = db.client;

// Create and Save a new Client
exports.create = (req, res) => {
  // Validate request
  if (!req.body.number) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Client
  const client = new Client({
    name: req.body.name,
    number: req.body.number,
    authNumber: req.body.authNumber,
    address: req.body.address,
    mobile: req.body.mobile,
    phone: req.body.phone,
    idCard: req.body.idCard,
    profession: req.body.profession,
    authDate: req.body.authDate,
    email: req.body.email,
    notes: req.body.notes,
    commercialRegNumber: req.body.commercialRegNumber,
    taxRegNumber: req.body.taxRegNumber,
    companyNumber: req.body.companyNumber,
    area: req.body.area,
    userId: req.body.userId
  });

  // Save Client in the database
  client
    .save(client)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Client.",
      });
    });
};

// Retrieve all Clients from the database.
exports.findAll = (req, res) => {
  Client.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving clients.",
      });
    });
};

// Find a single Client with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Client.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "No found Client with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving Clients with id=" + id });
    });
};

// Update a Client by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Client.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Client with id=${id}. Maybe Client was not found!`,
        });
      } else res.send({ message: "Client was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Client with id=" + id,
      });
    });
};

// Delete a Client with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Client.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Client with id=${id}. Maybe Client was not found!`,
        });
      } else {
        res.send({
          message: "Client was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Client with id=" + id,
      });
    });
};

//Count Clients
exports.countClients = (req, res) => {
  Client.countDocuments()
    .then((data) => {
      //res.sendStatus(data.statusCode);
      res.send({
        client: `${data}`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Clients.",
      });
    });
};