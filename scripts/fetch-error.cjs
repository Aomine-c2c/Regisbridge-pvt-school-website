const http = require('http');
const fs = require('fs');

console.log('Fetching http://localhost:3002...');

const req = http.get('http://localhost:3002', (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log('BODY START');
    console.log(data); // Print full HTML
    if (res.statusCode === 500) {
        // Try to extract error message if possible
        const match = data.match(/<pre>([\s\S]*?)<\/pre>/); // Next.js often puts stack trace in pre? 
        // Or specific div
    }
    console.log('BODY END');
    fs.writeFileSync(__dirname + '/output.log', `STATUS: ${res.statusCode}\n\n${data}`, 'utf8');
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

req.end();
