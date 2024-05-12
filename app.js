// server.js
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser'); // Middleware to parse incoming requests

const indexRoutes = require('./routes'); // Import the new route

const app = express();

// Set Handlebars as the templating engine with a default layout
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Middleware to parse incoming JSON and URL-encoded form data
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));


// Use imported routes for routing
app.use('/', indexRoutes);

const PORT = process.env.PORT || 6868;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
