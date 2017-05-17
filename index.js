//sudo service mongod start

"use strict";
const express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  app = express();

mongoose.connect('mongodb://localhost/#/moje-konto');

mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/www'));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connect")
});


app.post('/moje-konto', function(req, res, next) {

  User.findOne({
    email: req.body.email
  }, function(err, obj) {
    if (!obj) {
      res.send({
        message: "Nieprawidłowa nazwa użytkownika lub hasło"
      })
    } else {
      res.json(obj.comment);
      next()
    }
  });
});

// schema register
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  comment: [{
    title: String,
    content: String
  }]
});

var User = mongoose.model('User', userSchema);

// register new user
app.post('/register', function(req, res, next) {
  if (req.body.password != req.body.repeatPassword) {
    return res.send({
      message: "Paasswords are not the same"
    })
  }
  User.findOne({
    email: req.body.email
  }, function(err, obj) {
    if (!obj) {
      var user = new User({
        email: req.body.email,
        password: req.body.password
      });
      user.save(function(err, obj) {
        if (err) {
          res.send({
            message: 'something went wrong'
          });
        } else {
          console.log(obj);
          res.send({
            message: 'success',
            email: obj.email
          });
        }
      });
    } else {
      res.send({
        message: 'podany mail już istnieje'
      })
    }
  });
});

//login user
app.post('/login', function(req, res, next) {

  User.findOne({
    email: req.body.email,
    password: req.body.password
  }, function(err, obj) {
    if (!obj) {
      res.send({
        message: "Nieprawidłowa nazwa użytkownika lub hasło"
      })
    } else {
      res.send({
        message: "success",
        email: obj.email
      });
      next()
    }
  });
});


app.post('/comment', function(req, res, next) {
  console.log(req.body.title, req.body.content);

  User.findOneAndUpdate({
      email: req.body.email
    }, {
      $push: {
        comment: [{
          title: req.body.title,
          content: req.body.content
        }]
      }
    },
    function(err, obj) {
      if (!obj) {
        res.send({
          message: "something went wrong"
        })
      } else {
        res.send({
          message: "success"
        });
        next()
      }
    })
});

//account
app.post('/my-account', function(req, res, next) {
  User.findOne({
    email: req.body.email
  }, function(err, obj) {
    if (!obj) {
      res.send({
        message: "Brak"
      })
    } else {
      let com = obj.comment;
      res.send({
        com
      });
      next()
    }
  });
});

app.listen(3000);
console.log("App listening on port 3000")
