'use strict'

const express = require('express')
const app = express()
let port = process.argv[2]
let thePath = process.argv[3]

app.get('/search', (req, res) => {
    let object = req.query
    res.send(object)
})


app.listen(port)