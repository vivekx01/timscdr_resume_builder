// public/generatePdf.js
document.addEventListener('DOMContentLoaded', () => {
    // Function to send the content of the a4-page div to the server
    const sendHtmlForPdf = async () => {
      const a4PageContent = document.querySelector('.a4-page').outerHTML; // Get outer HTML of the a4-page
  
      try {
        const response = await fetch('/generate-pdf', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ html: a4PageContent }),
        });
  
        if (response.ok) {
          // Create a blob from the response to download the PDF
          const blob = await response.blob();
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'Resume.pdf'; // Name of the downloaded file
          link.click();
        } else {
          console.error('Failed to generate PDF');
        }
      } catch (error) {
        console.error('Error sending HTML for PDF generation:', error);
      }
    };
  
    // Add an event listener to a button or another trigger to initiate PDF generation
    const generatePdfButton = document.getElementById('generate-pdf-btn');
    if (generatePdfButton) {
      generatePdfButton.addEventListener('click', sendHtmlForPdf);
    }
  });
  