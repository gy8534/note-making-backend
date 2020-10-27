const router = require("express").Router();
const { collection } = require("../models/note.model");
let Note = require("../models/note.model");

router.route("/").post((req, res) => {
  const newNote = new Note(req.body);

  newNote
    .save()
    .then(() => res.json(newNote.id))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get(async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id }).lean();
    res.json(note);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});
module.exports = router;
