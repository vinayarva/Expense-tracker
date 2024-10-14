const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const sequelize = require('./database/database');

const routes = require('./Route/routes'); // Assuming routes are in a separate file

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(routes); // Mount routes under the '/api' prefix

sequelize
    .sync() // Adjust force to true for development, false for production
    .then(() => {
        app.listen(4000, () => {
            console.log('Server is running on http://localhost:4000/');
        });
    })
    .catch((err) => {
        console.error('Error connecting to database:', err);
    });