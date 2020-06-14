const express = require('express'),
	app = express();
const
	router = require('./routes/index');

router.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use('/', router);

module.exports = app;