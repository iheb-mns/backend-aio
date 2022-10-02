const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const auth = require('./routes/auth.routes');
app.use(express.static('files'));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

require("./routes/case.routes")(app);
require("./routes/client.routes")(app);
require("./routes/court.routes")(app);
require("./routes/expense.routes")(app);
require("./routes/investigation.routes")(app);
require("./routes/lawyer.routes")(app);
require("./routes/office.routes")(app);
require("./routes/session.routes")(app);

app.use('/auth', auth)

//mongo
const db = require("./models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


// simple route
app.get("/hello", (req, res) => {
  res.json({ message: "Welcome to your application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});