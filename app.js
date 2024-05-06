// server.js
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser'); // Middleware to parse incoming requests

const indexRoutes = require('./routes'); // Import the new route

const app = express();

// Set Handlebars as the templating engine with a default layout
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Middleware to parse incoming JSON and URL-encoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.post('/generate-pdf', async (req, res) => {
  const { html } = req.body; // Receive the HTML content from the client

  if (!html) {
    return res.status(400).json({ error: 'HTML content is required to generate PDF' });
  }

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set the HTML content to the Puppeteer page
    await page.setContent(html, { waitUntil: 'networkidle2' });

    // Generate PDF with A4 size and print background
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
    });

    await browser.close();

    // Send the PDF as a response
    res.contentType('application/pdf');
    res.send(pdf);
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ error: 'Error generating PDF' });
  }
});

// Use imported routes for routing
app.use('/', indexRoutes);

const PORT = process.env.PORT || 6868;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
