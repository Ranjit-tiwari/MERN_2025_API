import express, { Router } from 'express';
import { userLogin, userRegister, logout, getMyProfile } from '../controllers/user.js'
import { isAuthenticated } from '../middlewares/auth.js';


const router = express.Router();

// REGISTER
router.post('/register', userRegister)

// LOGIN
router.post('/login', userLogin)

// Logout
router.get('/logout', logout)

// MyProfile
router.get('/myprofile', isAuthenticated,getMyProfile)

export default router;
