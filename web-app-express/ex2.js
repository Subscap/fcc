'use strict'

const express = require('express')
const path = require('path')
const app = express()

let port = process.argv[2]
let thePath = process.argv[3]

app.use(express.static(thePath||path.join(__dirname, 'public')))

app.listen(port)