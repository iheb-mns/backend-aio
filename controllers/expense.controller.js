const db = require("../models");
const Expense = db.expense;

// Create and Save a new Expense
exports.create = (req, res) => {
    // Validate request
    /*if (!req.body.number) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }*/

    // Create a Expense
    const expense = new Expense({
        case: req.body.case,
        receiver: req.body.receiver,
        giver: req.body.giver,
        amount: req.body.amount,
        date: req.body.date,
        notes: req.body.notes,
        userId: req.body.userId
    });

    // Save Expense in the database
    expense
        .save(expense)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Expense.",
            });
        });
};

// Retrieve all Expenses from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title
        ? { title: { $regex: new RegExp(title), $options: "i" } }
        : {};

    Expense.find(condition)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Expenses.",
            });
        });
};

// Find a single Expense with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Expense.findById(id)
        .then((data) => {
            if (!data)
                res.status(404).send({ message: "No found Expense with id " + id });
            else res.send(data);
        })
        .catch((err) => {
            res.status(500).send({ message: "Error retrieving Expense with id=" + id });
        });
};

// Update a Expense by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!",
        });
    }

    const id = req.params.id;

    Expense.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Expense with id=${id}. Maybe Expense was not found!`,
                });
            } else res.send({ message: "Expense was updated successfully." });
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Expense with id=" + id,
            });
        });
};

// Delete a Expense with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Expense.findByIdAndRemove(id)
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Expense with id=${id}. Maybe Expense was not found!`,
                });
            } else {
                res.send({
                    message: "Expense was deleted successfully!",
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete Expense with id=" + id,
            });
        });
};

//Count Expenses
exports.countExpenses = (req, res) => {
    Expense.countDocuments()
        .then((data) => {
            //res.sendStatus(data.statusCode);
            res.send({
                expense: `${data}`,
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Expenses.",
            });
        });
};