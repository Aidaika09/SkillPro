const PORT = 3000;

var createError = require('http-errors');
var express = require('express');
var { engine } = require('express-handlebars');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');

// Set Handlebars as the view engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.get('/', (req, res) => {
  // Example data for projects
  const projects = [
    { name: 'Project A', description: 'This is a description for Project A', status: 'In Progress' },
    { name: 'Project B', description: 'This is a description for Project B', status: 'Completed' },
    { name: 'Project C', description: 'This is a description for Project C', status: 'In Progress' },
  ];

  // Create two separate lists of projects based on status
  const completedProjects = projects.filter(project => project.status === 'Completed');
  const inProgressProjects = projects.filter(project => project.status === 'In Progress');

  // Render the Handlebars template with data
  res.render('home', {
    projects: inProgressProjects, // List of in-progress projects
    completedProjects: completedProjects, // List of completed projects
  });
});


module.exports = app;
