//handles user logic
/** adding form data to database */
import bcrypt from 'bcrypt';
import { connectDB } from '../config/db.js';
import { createTable } from '../models/user.model.js';

export const createUser =  async (req, res) => {
    try {
        const { userName, email, password} = req.body;

        if(!userName || !email || !password) {
            return res.status(400).json({ success : false, message : "all fields are required"});
        }
        console.log(req.userName);
        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //connect to Mysql
        const db = await connectDB();

        //create users table if it does not exist
        await createTable();

        await db.query(`INSERT INTO users (userName, email, password) VALUES (?, ?, ?)`, [userName, email, hashedPassword]);

        console.log('user created Successfully!');

        res.redirect('/login')

    } catch (error) {
        console.error('error in user Registartion', error);
        res.status(500).json({success : false, message : "Server Error"});
    }
}