import mysql from 'mysql2/promise';

const DB_NAME = "coffee_shop1";

export const connectDB =async () =>{
    
    try { //landing on the moon
        const conn = await mysql.createConnection({
            host : 'localhost',
            user : 'root',
            password : '7jq6qM@125',
        });

        console.log("Landed on the moon 🚀, connected to MySQL server..");

    
        //create db if it doesn't exist
        await conn.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`);

        console.log(`Database '${DB_NAME}' created`)

        const db = await mysql.createConnection({
            host : 'localhost',
            user : 'root',
            password : '7jq6qM@125',
            database : DB_NAME

        });

        console.log('connected to database ready to proceeding to create other tables now')
        return db;

    } catch (error) {
        console.error(`Err : ${error.message}`);
        process.exit(1);
    }
};
