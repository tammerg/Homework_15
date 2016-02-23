var express           = require('express');
var expressHandlebars = require('express-handlebars');
var bodyParser        = require('body-parser');
var session           = require('express-session');
var Sequelize         = require('sequelize');
var bcrypt            = require('bcryptjs');
var mysql             = require('mysql');
var app = express();
var PORT = process.env.PORT || 8080;

var sequelize = new Sequelize('class_db', 'root');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use('/static', express.static('public'));
app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/register', function(req, res){
  res.render('registration');
});

var Student = sequelize.define('student', {
	studentName: {
		type: Sequelize.STRING,
    field: 'student_name',
		allowNull: false,
		unique: true
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
	}
}, {
	hooks: {
		beforeCreate: function(input){
			input.password = bcrypt.hashSync(input.password, 10);
		}
	}
});

var Instructor = sequelize.define('instructor', {
	InstructorName: {
		type: Sequelize.STRING,
    field: 'Instructor_name',
		allowNull: false,
		unique: true
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
	}
}, {
	hooks: {
		beforeCreate: function(input){
			input.password = bcrypt.hashSync(input.password, 10);
		}
	}
});

// database connection via sequelize
sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("Listening on:" + PORT);
  });
});
