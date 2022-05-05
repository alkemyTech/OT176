const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const cors = require('cors');
require('dotenv').config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const newsRouter = require('./routes/news');
const testimonialRouter = require('./routes/testimonials');
const slidesRouter = require('./routes/slides');
const membersRouter = require('./routes/members');
const commentsController = require('./routes/comments');
const contactsRouter = require('./routes/contact');
const backofficeRouter = require('./routes/backoffice');
const categoriesRouter = require('./routes/categories');
const organizationRouter = require('./routes/organization');
const documentationRouter = require('./routes/documentation');
const activitieRouter = require('./routes/activities')

const app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/news', newsRouter);
app.use('/testimonials', testimonialRouter);
app.use('/slides', slidesRouter);
app.use('/members', membersRouter);
app.use('/comments', commentsController);
app.use('/contacts', contactsRouter);
app.use('/backoffice', backofficeRouter);
app.use('/categories', categoriesRouter);
app.use('/organization', organizationRouter);
app.use('/api', documentationRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
