require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const models = require('./models/models');
const router = require('./routes/index');
const fileUpload = require('express-fileupload');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const path = require('path');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}))
app.use('/api', router);

// Error handling middleware
app.use(errorHandler);

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Working!' });
});

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync( /*{ force: true }*/);
        app.listen(PORT, () => { console.log(`Server listening on port ${PORT}.`); });
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

start();