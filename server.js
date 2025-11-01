require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connectDB = require('./dbConn');
const MongoStore = require('connect-mongo');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 3000;
const login = require('./Controllers/authController');
const logout = require('./Controllers/logoutController');
const {getAllUsers} = require('./Controllers/userController');
const signalSender = require('./Controllers/signalController');
const validate = require('./middleware/validate');
const verifyRole = require('./middleware/verifyRoles');

connectDB();
// Basic Middlewares
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'Views')));
app.use(express.json());
app.use(cors({
    origin: "https://smart-p3eh.onrender.com",
    credentials: true
}));

// Middleware for Express Sessions
app.use(session({
    secret:"090408",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl:process.env.DATABASE_URI}),
    cookie:{secure:false}
}));

// Routes
app.get('/',(req,res) => {
    res.sendFile();
});
app.post('/login',login);
app.post('/logout',logout);
app.get('/users',validate,verifyRole("admin"),getAllUsers);
app.use('/user',require('./routes/users'));
app.use('/light',require('./routes/lights'));
app.post('/signal',signalSender); // null-> Both user and admin may control

mongoose.connection.once('open',()=>{
    console.log("Connected To MongoDB!");
    app.listen(PORT,()=> console.log(`Server running on PORT ${PORT}`));
});