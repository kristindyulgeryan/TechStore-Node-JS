import { Router } from "express";
import authService from "../services/authService.js";


const authController = Router();

authController.get('/register', (req, res)=>{
    res.render('auth/register')
});

authController.post('/register', (req, res)=>{
    const userData = req.body;
    console.log(userData);
    authService.register(userData)

    res.redirect('/auth/login')
})

export default authController;