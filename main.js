const app = require('./app')
const MONGODB_URI =  process.env.MONGODB_URI || ((process.env.NODE_ENV === 'test') ? 'mongodb://localhost:27017/save-the-bzz_test_db' : 'mongodb://localhost:27017/save-the-bzz')
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect( MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true  })

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

app.listen(app.get('port'), () => {
    console.log(`The express server has started on port ${app.get('port')}`);
});
