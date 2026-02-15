const http = require('http');

console.log('Fetching http://localhost:3000...');

const req = http.get('http://localhost:3000', (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log('BODY START');
    console.log(data); // Print full HTML
    console.log('BODY END');
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

req.end();
