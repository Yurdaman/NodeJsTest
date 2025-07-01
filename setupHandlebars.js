const exphbs = require("express-handlebars");

const hbs = exphbs.create({
  extname: ".hbs",
  defaultLayout: "main",
  layoutsDir: "./views/layouts/",
  partialsDir: "./views/partials/",
});

const setupHandlebars = (app) => {
  app.engine(".hbs", hbs.engine);
  app.set("view engine", ".hbs");
  app.set("views", "./views");
};

module.exports = setupHandlebars;
