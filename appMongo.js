const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoBDStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const multer = require('multer');

const User = require('./models/userMongo');
const authRoutes = require('./routes/authMongo');
const adminRoutes = require('./routes/adminMongo');
const shopRoutes = require('./routes/shopMongo');
const errorController = require('./controllers/error');
const { ServerApiVersion } = require('mongodb');

const MONGODB_URI =
  'mongodb+srv://node-complete:nodecomplete@cluster0.etxrz.azure.mongodb.net/shop?retryWrites=true&w=majority';

const app = express();
const store = new MongoBDStore({
  uri: MONGODB_URI,
  collection: 'sessions',
});

const csrfProtection = csrf();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toString() + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(
  multer({
    storage: fileStorage,
    fileFilter,
  }).single('image')
);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  res.locals.isAuth = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch(err => {
      next(new Error(err));
    });
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.get('/500', errorController.getError500);
app.use(errorController.getError404);

app.use((err, req, res, next) => {
  res.status(500).render('error-500', {
    pageTitle: 'Internal error',
    path: '/500',
    isAuth: req.session.isLoggedIn,
  });
});

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  })
  .then(res => {
    app.listen(3000, () => {
      console.log('Server is running');
    });
  })
  .catch(err => {
    console.log(err);
  });
