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
    const ownDevices =await deviceServcie.getAll({ owner: req.user.id })
    const preferredDevices = await deviceServcie.getAll ({preferredBy: req.user.id})

    res.render('profile', { 
        ownDevices, 
        preferredDevices,
    })
})



export default homeController;