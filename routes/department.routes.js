module.exports = (app) => {
    const departments = require("../controllers/department.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Department
    router.post("/", departments.create);
  
    // Retrieve all Departments
    router.get("/", departments.findAll);
  
    // Retrieve a single Department with id
    router.get("/:id", departments.findOne);
  
    // Update a Department with id
    router.put("/:id", departments.update);
  
    // Delete a Department with id
    router.delete("/:id", departments.delete);
  
    // Count Department
    router.get("/countDepartments", departments.countDepartments);
  
    app.use("/api/departments", router);
  };
  