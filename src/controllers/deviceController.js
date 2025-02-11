import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import deviceServcie from "../services/deviceService.js";
import { getErrorMessage } from "../utils/errorUtils.js";


const deviceController = Router();

deviceController.get('/create', isAuth, (req, res)=>{
    res.render('devices/create')
})

deviceController.post("/create", isAuth, async (req, res)=>{
    // Check if logged user
    // Get data from body
const deviceData = req.body;
const userId = req.user.id
    
try {
      // call device service
await deviceServcie.create(deviceData, userId)

// Redirect to catalog page
res.redirect('/devices')
} catch (err) {
    // Catch error and return response with kept data and error message
    
    res.render('devices/create', {
        error: getErrorMessage(err),
        device : deviceData})
}
    
})

export default deviceController;