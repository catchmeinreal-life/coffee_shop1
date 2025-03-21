import mysql from 'mysql2/promise';

import { connectDB } from '../config/db.js';

export const createTable = async () => {
    try {
        const conn = await connectDB();

        //table creation query
        const sql = `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userName VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`

        //execute querry
        await conn.query(sql);
        console.log("table users created successfully... next product table")
    } catch (error) {
        console.error('Error creating table:', error.message);
    }

};

