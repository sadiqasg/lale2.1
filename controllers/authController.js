const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require('../models/users');
const Product = require('../models/product');

exports.signUp = async (req, res, next) => {
  try {

    let searchDuplicateUser = await User.findOne({ email: req.body.email });

    if (searchDuplicateUser) {
      return res.status(400).json({ message: 'User already exist' })
    }

    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) console.log('error', err);

      const user = new User({
        email: req.body.email,
        password: hash,
      })
      user.save().then(
        () => {
          jwt.sign({ user }, 'SuperSecRetKey', { expiresIn: '12h' }, (err, token) => {
            if (err) throw err;
            res.status(201).json({ message: 'User created', token })
          });
        }
      ).catch((err) => {
        res.status(400).json({ error: err });
      })

    });


  } catch (err) {
    res.json(err)
  }
}

exports.login = async (req, res, next) => {
  let data = {
    email: req.body.email,
    password: req.body.password
  }

  User.findOne({ email: data.email })
    .then((user) => {
      bcrypt.compare(data.password, user.password, (err, response) => {
        if (err) throw err;
        if (response) {
          jwt.sign({ user }, 'SuperSecRetKey', { expiresIn: '12h' }, (err, token) => {
            if (err) throw err;
            res.cookie('token', 'Bearer ' + token, {
              expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
            });
            // res.send('logged in')
            res.redirect("/admin");
            // res.status(201).json({ message: 'loggedin', user, token })
          });
        } else {
          res.status(400).json({ message: 'login failed' })
        }
      });
    })
    .catch((err) => res.status(404).json(err))

  console.log('req', req.cookies);

}

exports.logout = async (req, res, next) => {
  res.clearCookie('token');
  res.redirect("/");
}