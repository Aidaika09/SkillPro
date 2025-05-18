const PORT = 3000;

var createError = require('http-errors');
var express = require('express');
var { engine } = require('express-handlebars');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require('fs');


//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

// Set Handlebars as the view engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
//app.use('/users', usersRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

//routes for html static pages integrated into handlebars
//Home Page
app.get('/', (req, res) => {
  res.render('index', {
    title: 'SkillPro',
    mainHeading: 'Your Personalized Learning Platform',
    mainDescription: 'Track your enrolled courses and continue your learning journey effortlessly.',
    newReleaseTitle: 'New Release Coming Soon!',
    newReleaseDescription: 'We’re excited to announce a brand new course on Advanced Web Development, launching soon! Stay tuned for more updates, and be the first to try it out when it’s released.',
  });
});


//About Page
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'SkillPro',
    description1: 'SkillPro is an intuitive learning platform designed to help users stay focused on their enrolled courses.',
    description2: 'We aim to make learning structured, accessible, and tailored to each user’s needs.'
  });
});

//Dashboard Page
app.get('/dashboard', (req, res) => {
  const courses = [
    { emoji: '📘', name: 'Intro to Web Development', nextLesson: 'Continue from Module 3: CSS Basics', progress: 40 },
    { emoji: '📙', name: 'JavaScript Essentials', nextLesson: 'Next lesson: Functions and Scope', progress: 65 },
    { emoji: '🎨', name: 'UI/UX Fundamentals', nextLesson: 'Recently Completed: User Research Techniques', progress: 100 }
  ];

  res.render('dashboard', {
    coursesHeading: 'Enrolled Courses',
    courses: courses,
    footerText: 'Learn. Grow. Succeed.'
  });
});

// Trying Out Handlebars
/*
app.get('/projects', (req, res) => {
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
    title: 'Project Lists',
    projects: inProgressProjects, // List of in-progress projects
    completedProjects: completedProjects, // List of completed projects
  });
});*/

// Login page
app.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

// Register page
app.get('/register', (req, res) => {
  res.render('register', { title: 'Register' });
});

app.get("/course_list", (req, res) => {
  // Load the data from the 'courses.json' file in the "data" folder
  fs.readFile(path.join(__dirname, 'data', 'courses.json'), 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading the JSON file", err);
      return res.status(500).send("Internal Server Error");
    }

    // Parse the data and render the page with the data
    const jsonData = JSON.parse(data); // Parse the JSON string to an object
    res.render('course_list', jsonData); // Render the Handlebars template with the JSON data
  });
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

module.exports = app;
