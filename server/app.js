const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const morgan = require('morgan')
require('dotenv').config();

const userRouter = require('./routes/user');
const sellerRouter = require('./routes/seller');
const ownerRouter = require('./routes/owner');


const app = express();

//jwt check function
function secure(req, res, next) {
  try {
    //exluding the paths
    if (req.baseUrl.indexOf('login') !== -1) {
      return next();
    }
    if (req.baseUrl.indexOf('signup') !== -1) {
      return next();
    }
    if (req.baseUrl.indexOf('user') !== -1) {
      return next();
    }

    if (!req.cookies || !req.cookies.jwt) {
      throw new Error();
    }

    const token = req.cookies.jwt;
   
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        throw new Error();
      }
      req.email = decoded;
      next();
    });
  } catch (error) {
    console.log('Token mismatch');
    res.status(403).send();
  }
}

app.use(cors({
  credentials: true,
  origin: "http://localhost:3000"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan('tiny'))
app.use('*', secure);

app.use('/user', userRouter);
app.use('/seller', sellerRouter);
app.use('/owner', ownerRouter);
app.get('/tokenVerify', (req, res) => {
  res.sendStatus(200)
})
// error handler
app.use(function (err, req, res, next) {
  console.log(err.message);
  return res
    .status(err.status || 500)
    .json({ error: err, message: err.message });
});


app.listen(8000, () => {
  console.log("Listening on 8000")
})

module.exports = app;
