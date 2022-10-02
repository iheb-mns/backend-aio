const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

db.case = require("./case.model.js")(mongoose);
db.client = require("./client.model.js")(mongoose);
db.court = require("./court.model.js")(mongoose);
db.expense = require("./expense.model")(mongoose);
db.investigation = require("./investigation.model.js")(mongoose);
db.lawyer = require("./lawyer.model.js")(mongoose);
db.office = require("./office.model.js")(mongoose);
db.session = require("./session.model.js")(mongoose);
db.department = require("./department.model.js")(mongoose);
//db.report = require("./report.model.js")(mongoose);

module.exports = db;