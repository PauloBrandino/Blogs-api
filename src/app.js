const express = require('express');
const { LoginRoute } = require('./Routers');
const userRoute = require('./Routers/UserRoute');
const categoryRoute = require('./Routers/CategoryRoute');

// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.use('/login', LoginRoute);
app.use('/user', userRoute);
app.use('/categories', categoryRoute);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
