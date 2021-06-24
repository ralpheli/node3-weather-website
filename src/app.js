//Hello express
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { request } = require("express");
const app = express();
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const port = process.env.PORT || 3000;

//Define paths for express config
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../template/views");
const partialsPath = path.join(__dirname, "../template/partials");
//app.used to customize the server
//Setup handlebars engine and views location
app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

//Setup static directory
app.use(express.static(publicDirectory));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Eli liwag",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Ralph Liwag",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "This is some helpful text",
    title: "Help me",
    name: "Eli liwag",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide address",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastdata) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastdata,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

// app.get("/products", (req, res) => {
//   if (!req.query.search) {
//     return res.send({
//       error: "You must provide search term ",
//     });
//   }
//   console.log(req.query.search);
//   res.send({
//     products: [],
//   });
// });

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: 404,
    name: "Eli liwag",
    errormessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: 404,
    name: "Eli liwag",
    errormessage: "Page not found",
  });
});

app.listen(port, () => {
  console.log("Server is up on port" + port);
});
