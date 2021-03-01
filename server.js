// Requiring express, file system, path, UUID and declaring a PORT
const { json } = require("body-parser");
const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const stored = "db/db.json";

// Creating an express server, creating a notes array and declaring a port to use.
const app = express();
const PORT = process.env.PORT || 8080;

// These 2 use requests are required to make a post request:
// Tells the server to recognize requests objects as a string or array.
app.use(express.urlencoded({ extended: true }));
// Tells the express server to only look at requests that use JSON format.
app.use(express.json());
// Declaring a static location for my html pages.
app.use(express.static(path.join(__dirname, "public")));
// A GET request to get the notes stored inside the json file
app.get("/api/notes", (req, res) => {
  fs.readFile(path.join(__dirname, stored), (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});
// A POST request which adds new files to the json file
app.post("/api/notes", (req, res) => {
  var newNote = req.body;
  newNote.id = uuidv4();
  fs.readFile(stored, (err, data) => {
    if (err) throw err;
    var notes = JSON.parse(data);
    notes.push(newNote);
    fs.writeFile(stored, JSON.stringify(notes), (err) => {
      if (err) throw err;
      console.log("Note Added!");
    });
    res.json(JSON.parse(data));
  });
});
// Delete request that removes the note from json obj
app.delete("/api/notes/:id", (req, res) => {
  fs.readFile(stored, (err, data) => {
    if (err) throw err;
    notes = JSON.parse(data);
    for (i = 0; i < notes.length; i++) {
      if (notes[i].id === req.params.id) {
        notes.splice(i, 1);
      }
    }
    fs.writeFile(stored, JSON.stringify(notes), (err) => {
      if (err) throw err;
      console.log("Note Removed!");
    });
  });
  res.end();
});

// .get with callback functions to send the correct files when a path is selected.
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);
// Starts the server listening on the port
app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`);
});
