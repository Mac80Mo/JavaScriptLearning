// Imports
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const requestLogger = require("./middlewares/requestLogger");

// neue Instanz
const server = express();

// Statische Dateien
server.use(express.static("./public"));

// Middlewares
server.use(express.urlencoded({ extended: true }));
server.use(requestLogger);

// Template -engine
server.use(expressLayouts);
server.set("layout", "./layouts/default");
server.set("view engine", "ejs");

// Routes
server.get("/", (request, response) => {
  response.render("index", { text: "Welt" });
});

const projectRouter = require("./routes/projects");

server.use("/projekte", projectRouter);

// WebErver an Port 3000
server.listen("3000", () => console.log("Server running"));
