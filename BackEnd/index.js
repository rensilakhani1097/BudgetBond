require('dotenv').config(); 
const express = require('express');
const connectDB = require('./config/db');
const routes = require('./routes/user.routes')
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', routes);
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
