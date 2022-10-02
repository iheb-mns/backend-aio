module.exports = (app) => {
    const expenses = require("../controllers/expense.controller");

    var router = require("express").Router();

    // Create a new Expense
    router.post("/", expenses.create);

    // Retrieve all Expense
    router.get("/", expenses.findAll);

    // Retrieve a single Expense with id
    router.get("/:id", expenses.findOne);

    // Update a Expense with id
    router.put("/:id", expenses.update);

    // Delete a Expense with id
    router.delete("/:id", expenses.delete);

    // Count Expenses
    router.get("/countExpenses", expenses.countExpenses);

    app.use("/api/expenses", router);
};
