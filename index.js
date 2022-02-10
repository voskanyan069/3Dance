const express = require('express');
const path = require('path')

const app = express();
const port = 5000;

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/build/', express.static(path.join(__dirname, 'node_modules/three/build')));
app.use('/jsm/', express.static(path.join(__dirname, 'node_modules/three/examples/jsm')));

app.listen(port, () =>
  console.log('Server ran in http://127.0.0.1:5000')
);
