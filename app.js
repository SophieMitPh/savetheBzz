const express = require('express'),
	app = express();
const
	router = require('./routes/index');
	var bodyParser = require('body-parser');
router.use(express.json());
app.set('view engine', 'ejs');
 app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.use('/', router);

module.exports = app;