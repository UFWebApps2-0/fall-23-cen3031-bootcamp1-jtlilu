var http = require('http'),
    fs = require('fs'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function (request, response) {
  /* Investigate the request object.
    You will need to use several of its properties: url and method
  */
  console.log(request.url); // Log the URL being requested
  console.log(request.method); // Log the HTTP method (GET, POST, etc.)

  /*
    Your request handler should send listingData in the JSON format as a response if a GET request
    is sent to the '/listings' path. Otherwise, it should send a 404 error.
  */
  if (request.method === 'GET' && request.url === '/listings') {
    // Send the listingData as a JSON response
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(listingData));
  } else {
    // Send a 404 error response
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.end('404 Not Found');
  }
};

fs.readFile('listings.json', 'utf8', function (err, data) {
  /*
    This callback function should save the data in the listingData variable,
    then start the server.
  */

  // Check for errors when reading the file
  if (err) {
    throw err;
  }

  // Parse the JSON data and store it in the listingData variable
  listingData = JSON.parse(data);

  // Create the server
  server = http.createServer(requestHandler);

  // Start the server
  server.listen(port, function () {
    console.log('Server is listening on port ' + port);
  });
});


