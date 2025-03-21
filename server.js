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

initializePassport(
    passport,
    email => users.find(user  => user.email == email),
    id => users.find(user => user.id === id)
)

// import mysql from 'mysql2';


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
    secret : process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());

const users = [];  //create table users in our database id, username, email, password , date joined

app.set('view engine', 'ejs');



const PORT = 3000;
app.listen(PORT);

//setting routes

app.get('/', (req, res) =>{
    res.render('index'); //render index.ejs
});

app.get('/login', (req, res) =>{
    res.render('login'); //render login.ejs
});

app.get('/register', (req, res) =>{
    res.render('register'); //render index.ejs
});

app.post('/register', async (req, res) => {  //add user to the database  >> username, email, password , date joined
    try {

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        users.push({  //push to list for now

            id : Date.now().toString(),
            name : req.body.userName,
            email : req.body.email,
            password : hashedPassword

        })
        res.redirect('/login');
    } catch {
        res.redirect('/register');
    }
});

app.post('/login', passport.authenticate('local',{
    successRedirect : '/',
    failureRedirect : '/login',
    failureFlash : true
   

}));