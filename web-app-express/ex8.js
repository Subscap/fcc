'use strict'

const fs = require('fs')
const express = require('express')
const app = express()
let port = process.argv[2]
let fileName = process.argv[3]



app.get('/books', (req, res) => {
    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
            throw err
        }
        res.json(JSON.parse(data))
    })
})

app.listen(port)