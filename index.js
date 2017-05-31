//sudo service mongod start
(function() {
  "use strict";
  const express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    session = require('express-session'),
    Schema = mongoose.Schema,
    app = express();

  mongoose.connect('mongodb://localhost:3000/#/moje-konto');

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

  const User = mongoose.model('User', userSchema);

  const pattern = /^.+@.+\.\w{2,3}$/i;

  // register new user
  app.post('/register', function(req, res, next) {
    if (pattern.test(req.body.email) === false) {
      return res.send({
        message: "Email is incorrect"
      })
    }
    if (req.body.password != req.body.repeatPassword) {
      return res.send({
        message: "Paasswords are not the same"
      })
    } else {
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
                message: 'Something went wrong'
              });
            } else {
              res.send({
                message: 'success',
                email: obj.email
              });
            }
          });
        } else {
          res.send({
            message: 'Your email allready exist'
          })
        }
      });
    }
  });

  //login user
  app.post('/login', function(req, res, next) {

    if (pattern.test(req.body.email) === false) {
      return res.send({
        message: "Email is incorrect"
      })
    } else {
      User.findOne({
        email: req.body.email,
        password: req.body.password
      }, function(err, obj) {
        if (!obj) {
          res.send({
            message: "Wrong email or password"
          })
        } else {
          res.send({
            message: "success",
            email: obj.email
          });
          next()
        }
      });
    }
  });


  app.post('/comment', function(req, res, next) {

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
            message: "Something went wrong"
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
          message: "Empty"
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
  console.log("App listening on port 3000");

})();
