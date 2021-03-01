// Requiring express, file system, path, UUID and declaring a PORT
const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 8000;

// These 2 use requests are required to make a post request:
// Tells the server to recognize requests objects as a string or array.
app.use(express.urlencoded());
// Tells the express server to only look at requests that use JSON format.
app.use(express.json());
app.use(express.static(path.join(__dirname,'Develop/public')));

app.get('/notes', (request,result) => result.sendFile(path.join(__dirname,'Develop/public/notes.html')));
app.get('*', (request,result) => result.sendFile(path.join(__dirname,'Develop/public/index.html')));

app.get('/api/notes',(request,result) => {
    fs.readFile(path.join(__dirname,'db/db.json'),(error,data) => {
        if (error) throw error;
        result.json(JSON.parse(data));
    });
});

// post goes here

// delete goes here maybe

app.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`); 
});