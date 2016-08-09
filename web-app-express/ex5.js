'use strict'

const express = require('express')
const stylus = require('stylus')
const app = express()
let port = process.argv[2]
let thePath = process.argv[3]

app.use(express.static(thePath))
app.use(stylus.middleware(thePath))


app.listen(port)