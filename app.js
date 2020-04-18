const express = require('express');
const path = require('path');
const router = require('./routes');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.static(path.join(__dirname, 'public/dist')));

app.use('/', router);
app.use('/', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
