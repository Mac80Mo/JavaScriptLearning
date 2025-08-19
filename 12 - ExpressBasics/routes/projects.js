const express = require("express");
const router = express.Router();

router.get("/", (request, response) => {
  response.render("projectList", { layout: "./layouts/special" });
});

router.get("/neu", (request, response) => {
  response.render("projectNew", { layout: "./layouts/special" });
});

router.post("/", (request, response) => {
  console.log(request.body.projectName);
  response.redirect("/projekte");
});

router
  .route("/:id")
  .get((req, res) => {
    const ID = req.params.id;
    res.render("project", {
      layout: "layouts/special",
      projektID: ID,
    });
  })
  .put((req, res) => {
    res.send("Projekt aktualisiert");
  })
  .delete((req, res) => {
    res.send("Projekt gelöscht");
  });

module.exports = router;
