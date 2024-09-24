require('dotenv').config(); 
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user.routes')
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);

// Default route for home page
app.get('/', (req, res) => {
    res.send('Welcome to the User API');
});
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
