process.env.NODE_ENV = "test" 
const Product = require('../models/product')
const Subscriber = require('../models/subscriber')
const request = require('supertest')
const app = require('../main')
const mongoose = require('mongoose')

const mongodbURI = process.env.MONGO_URL_USE_TEST || process.env.MONGO_URL

beforeAll(() => {
  process.env.NODE_ENV = 'test'
  mongoose.set('bufferCommands', false)
  mongoose.connect(mongodbURI,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(console.log('connected to mongoose: ' + mongodbURI))
    .catch(error => console.log('error creating connection to: ' + mongodbURI + error))
  mongoose.connection.on('error', err => {
    console.log(err)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
  console.log('+++++ afterAll DB Close')
})

module.exports = {
  Product: Product,
  Subscriber: Subscriber,
  app: app,
  request: request,
  supertest: request,
  db: mongoose.connection
}