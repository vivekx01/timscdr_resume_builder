const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');

router.get('/', (req, res) => {
  // Extract the protocol and host from the request
  const protocol = req.protocol;
  const host = req.hostname;
  const port = process.env.PORT || 6868; // or any other default port if not set

  // Construct the base URL
  let baseUrl;
  if (host === 'localhost') {
    baseUrl = `${protocol}://${host}:${port}`;
  } else {
    baseUrl = `${protocol}://${host}`;
  }

  // Pass the baseUrl to the template
  res.render('home', { baseUrl });
});



router.post('/generate-pdf', async (req, res) => {
  const { html } = req.body; // Receive the HTML content from the client

  if (!html) {
    return res.status(400).json({ error: 'HTML content is required to generate PDF' });
  }

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set the HTML content to the Puppeteer page
    await page.setContent(html, { waitUntil: 'networkidle2' });
    const pageTitle = 'Resume';
    
    await page.evaluate((title) => {
      document.title = title;
    }, pageTitle);

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

module.exports = router;
