module.exports = (app) => {
  const cases = require("../controllers/case.controller.js");
  var router = require("express").Router();
  const multer = require('multer');

  //Upload PDF files
  const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./files/");
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
    }
  });

  // Multer Filter
  const multerFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[1] === "pdf") {
      cb(null, true);
    } else {
      cb(new Error("Not a PDF File!!"), false);
    }
  };

  const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
  });

  // Create a new Case
  router.post("/", upload.array("files"), cases.create);

  // Retrieve all Cases
  router.get("/", cases.findAll);

  // Count Cases
  router.get("/countCases", cases.countCases);

  // Retrieve a single Case with id
  router.get("/:id", cases.findOne);

  // Update a Case with id
  router.put("/:id", cases.update);

  // Delete a Case with id
  router.delete("/:id", cases.delete);

  // Delete a Case with id
  router.put("/deleteFile/:id/:filename", cases.deleteFile);

  app.use("/api/cases", router);
};
