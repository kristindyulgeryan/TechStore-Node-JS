import { Router } from "express";
import deviceServcie from "../services/deviceService.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const homeController = Router();

homeController.get('/', async(req, res)=>{
    //Get last three devices
    const latestDevices = await deviceServcie.getLatest();
    res.render('home', {devices: latestDevices})
  
})

homeController.get('/about', (req, res)=>{
    res.render('about')
});

homeController.get('/profile',isAuth, async(req, res)=>{
    res.render('profile')
})



export default homeController;