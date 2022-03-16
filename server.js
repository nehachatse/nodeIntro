const express = require('express');
let books = require('./db.json');
let fs = require('fs')

const app = express();
app.use(express.json());


app.get("/books", (req, res) => {
    res.json(books)
})

app.post("/books", (req, res) => {
    books.push(req.body);
    let newData = JSON.stringify(books, null, 2)
    fs.writeFile('db.json', newData, () => {
        console.log("Add")
    })
    res.json(newData)
})

app.listen(8000, () => {
    console.log("start")
})