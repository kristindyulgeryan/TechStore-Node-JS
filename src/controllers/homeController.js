import { Router } from "express";
import deviceServcie from "../services/deviceService.js";

const homeController = Router();

homeController.get('/', async(req, res)=>{
    //Get last three devices
    const latestDevices = await deviceServcie.getLatest();
    res.render('home', {devices: latestDevices})
  
})

homeController.get('/about', (req, res)=>{
    res.render('about')
})

export default homeController;