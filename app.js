const shell = require('shelljs')
const express = require('express'),
      fs = require('fs'),
      url = require('url');
const app = express()
const port = 4000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/', (req, res) => {
  res.send('API Here')
})

app.use('/public', express.static(__dirname + '/public'));  
app.use(express.static(__dirname + '/public'));

app.post('/receive', function(request, respond) {
  var body = '';
  filePath = __dirname + '/tools/vuln-regex-detector/input-regex.txt';
  request.on('data', function(data) {
      body = data;
  });

  request.on('end', function (){
      fs.appendFile(filePath, body, function() {
          respond.end();
      });
  });
});

app.post('/run', function(request, respond) {
  shell.chmod('+x', './tools/vuln-regex-detector/entrypoint.sh')
  shell.exec('./tools/vuln-regex-detector/entrypoint.sh')
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})