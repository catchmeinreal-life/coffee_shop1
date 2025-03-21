import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}



import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import initializePassport from './passport-config.js';
import passport from 'passport';
import flash from 'express-flash'
import session from 'express-session'

//DB
import { connectDB } from './config/db.js';

import userRoutes from './routes/user.route.js'
// import { error } from 'console';

initializePassport(
    passport,
    email => user.find(user  => user.email == email),
    id => user.find(user => user.id === id)
)

// import mysql from 'mysql2';


const app = express();
// set up EJS as template engine
app.set('view engine', 'ejs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(session({
    secret : process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());


//db integration
app.use(express.json());  //allows accepting of JSON data in the route body


//Routes
app.use('/user/register', userRoutes )


//page rendering
app.get('/', (req, res) =>{
    res.render('index'); //render index.ejs
});



app.get('/login', (req, res) =>{
    res.render('login'); //render login.ejs
});
app.post('/login', passport.authenticate('local',{
    successRedirect : '/',
    failureRedirect : '/login',
    failureFlash : true
   

}));

app.get('/register', (req, res) =>{
    res.render('register'); //render index.ejs
});




const startServer = async () => {
    try{
        await connectDB();
        const PORT = 3000;
        app.listen(PORT, (error) => {
            if (error) throw error;
            console.log(`Web app is running at port ${PORT} ...`)
        });
    } catch (error) {
        console.error('Error connecting to the database', error.message);
    }
};

startServer();