'use strict'

const express = require('express')
const path = require('path')
const app = express()

let port = process.argv[2]
let thePath = process.argv[3]

app.set('views', thePath)
app.set('view engine', 'jade')

app.get('/home', (req, res) => {
    res.render('index', {date: new Date().toDateString()})
})

app.listen(port)