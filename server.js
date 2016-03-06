var express = require('express');
var app = express();
var PORT = process.env.NODE_ENV || 3000;
var Sequelize = require('sequelize');
var connection = new Sequelize('user_authentication_db', 'root');
//requiring passport last
var passport = require('passport');
var passportLocal = require('passport-local');
var bcrypt = require("bcryptjs");
var flash = require('connect-flash');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(require('express-session')({
      secret:'ahasuhdude',
      resave: true,
      saveUninitialized: true,
      cookie: {secure: false, maxAge : (1000 * 60 * 60 * 2)},
}));

var exphb = require('express-handlebars');
app.engine('handlebars', exphb({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

//database models
var userStudent = connection.define("student", {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate : {
        is: ["^[a-z]+$",'i'],
         notEmpty: true
      }
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate : {
        is: ["^[a-z]+$",'i'],
         notEmpty: true
      }
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate : {
        isEmail: true,
        notEmpty: true
      }
    },
    userName: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate : {
        isAlphanumeric: true,
        notEmpty: true
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate : {
        isAlphanumeric: true,
        notEmpty: true,
        len: {
          args: [6,20],
          msg: "password must be 6-20chars long"
        }
      }
    }
});
var userInstructor = connection.define("instructor", {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate : {
        is: ["^[a-z]+$",'i'],
         notEmpty: true
      }
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate : {
        is: ["^[a-z]+$",'i'],
         notEmpty: true
      }
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate : {
        isEmail: true,
        notEmpty: true
      }
    },
    userName: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate : {
        isAlphanumeric: true,
        notEmpty: true
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate : {
        isAlphanumeric: true,
        notEmpty: true,
        len: {
          args: [6,20],
          msg: "password must be 6-20chars long"
        }
      }
    }
});
/************* Routes *************/
app.get('/', function(req, res) {
    res.render('index', {msg: req.query.msg});
});
app.get('/login', function(req, res) {
  res.render('login');
});
app.get('/register', function(req, res) {
  res.render('register');
});
app.post('/register', function(req, res){
  userStudent.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    userName: req.body.userName,
    password: req.body.password
  });
});
//port listen
app.listen(PORT);
