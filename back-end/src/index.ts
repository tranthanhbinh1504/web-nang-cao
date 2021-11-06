import express from 'express'
import mongoose from 'mongoose';

// await mongoose.connect('mongodb://localhost:27017/web-nang-cao')

const mongodbUrl = 'mongodb://localhost:27017/web-nang-cao'

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})