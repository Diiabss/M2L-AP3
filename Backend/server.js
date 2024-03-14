const express = require('express');
const app = express();
const db = require('./database/database');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
app.use(bodyParser.json());

app.use(cors());

app.use('/api/user', userRoute);
//app.use('/api/product', productRoute);

module.exports = app.listen(3000, () => {
    console.log('Server running on port 3000');
})
