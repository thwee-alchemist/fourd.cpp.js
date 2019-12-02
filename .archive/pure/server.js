const express = require('express');

const app = express();
const yargs = require('yargs')
const favicon = require('serve-favicon');

const argv = yargs
  .option('port', {
    alias: 'p',
    description: 'specifies to port to listen on',
    type: 'number'
  })
  .help()
  .alias('help', 'h')
  .argv;

app.use('/', express.static('.'));
app.use(favicon('favicon.ico'));


app.all('*', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

const server = app.listen(argv.port ? argv.port : 8000, function(){
  var port = server.address().port;
  console.log(`Listening on port ${port}`);
})
