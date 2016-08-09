'use strict'

const express = require('express')
const app = express()
let port = process.argv[2]
let thePath = process.argv[3]

app.put('/message/:id', (req, res) => {
    let id = req.params.id
    res.end(require('crypto')
              .createHash('sha1')
              .update(new Date().toDateString() + id)
              .digest('hex')
              )
})


app.listen(port)