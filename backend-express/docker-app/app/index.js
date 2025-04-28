const express = require("express");
const path = require('path');
const app = express();
const port = 3002;

// Serve static files under /doc
app.use('/doc', express.static(path.join(__dirname, 'nginx/public_html')));

app.get("/", (req, res) => {
  res.send("Hello World! This is SkillPro (Backend)");
});

app.listen(port, () => {
  console.log(`Express listening on port ${port}!`);
});