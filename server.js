const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname + '/dist/da-vis-electricity-production-germany'));
app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+
    '/dist/da-vis-electricity-production-germany/index.html'));});
app.listen(process.env.PORT || 8080);
