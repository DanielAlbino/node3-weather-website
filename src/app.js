const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirectorypath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectorypath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Daniel"
  });
});

app.get("", (req, res) => {
  res.send("<h1>Weather!</h1>");
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "ABOUT",
    description: " this page is part of a tutorial!",
    name: "Daniel"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help",
    description: " Help page!",
    name: "Daniel"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!"
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address
        });
      });
    }
  );

  /* res.send({
    forecast: "It is snowing",
    locationg: "Setubal",
    address: req.query.address
  }); */
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide a serch terms"
    });
  }

  console.log(req.query);
  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 - Help",
    errorMessage: "Help article not found",
    name: "Daniel"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not Found",
    name: "Daniel"
  });
});

// - start server

app.listen(port, () => {
  console.log("Server is up on port" + port);
});
