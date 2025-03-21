import express from 'express';
// import bcrypt from 'bcrypt';
import { createUser } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/', createUser); //handles registration


export default router;

//setting routes






