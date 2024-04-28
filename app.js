const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const indexRoutes = require('./routes'); // Import routes

const app = express();

// Set Handlebars as the templating engine with a default layout
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Use imported routes for routing
app.use('/', indexRoutes);

// Start the server and listen on a specific port
const PORT = process.env.PORT || 6868; 
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`); // Notify the server is running
});
