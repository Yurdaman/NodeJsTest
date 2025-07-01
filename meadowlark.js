var express = require("express");
var app = express();
require("dotenv").config();
const cors = require("cors");

const setupHandlebars = require("./setupHandlebars");

app.set("port", process.env.PORT || 3000);

var fortunes = [
  "Conquer your fears or they will conquer you.",
  "Rivers need springs.",
  "Do not fear what you don't know.",
  "You will have a pleasant surprise.",
  "Whenever possible, keep it simple.",
];

setupHandlebars(app);
app.use(express.static(__dirname + "/public"));
app.use(cors());

app.use(function (req, res, next) {
  res.locals.showTests =
    app.get("env") !== "production" && req.query.test === "1";
  console.log("Tests enabled:", res.locals.showTests, "for URL:", req.url); // Добавь эту строку
  next();
});

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/about", function (req, res) {
  var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
  res.render("about", {
    fortune: randomFortune,
    pageTestScript: "/qa/tests-about.js",
  });
});

app.get("/tours/hood-river", (req, res) => {
  res.render("tours/hood-river");
});

app.get("/tours/oregon-coast", (req, res) => {
  res.render("tours/oregon-coast");
});

app.get("/tours/request-group-rate", (req, res) => {
  res.render("tours/request-group-rate");
});

// custom 404 page
app.use(function (req, res) {
  res.status(404);
  res.render("404");
});

// custom 500 page
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render("500");
});

app.listen(app.get("port"), function () {
  console.log(
    "Express started on http://localhost:" +
      app.get("port") +
      "; press Ctrl-C to terminate."
  );
});
