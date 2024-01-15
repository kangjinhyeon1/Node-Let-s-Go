const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');


const router = require('./router/index');
const { sequelize } = require('./model');

dotenv.configDotenv();
const port = process.env.PORT || 8000

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: 'localhost',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
}))

app.use('/', router);

app.listen(port, () => {
    console.log(`Server has inited on ${port}!`);

    sequelize.sync({ force: false })
        .then(() => {
            console.log('DB has inited');
        }).catch(err => {
            console.error(err);
        })
})