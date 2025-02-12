import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import deviceServcie from "../services/deviceService.js";
import { getErrorMessage } from "../utils/errorUtils.js";


const deviceController = Router();

deviceController.get('/', async(req, res)=>{
// Get all devices
    const devices = await deviceServcie.getAll();
    res.render('devices/catalog', { devices })
})

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
    
});

deviceController.get('/:deviceId/details', async (req,res)=>{
    const deviceId = req.params.deviceId;
    const device= await deviceServcie.getOne(deviceId)
    const isOwner =  device.owner.equals(req.user?.id)
    const isPreferred = device.preferredList.includes(req.user?.id)
    res.render('devices/details', {device, isOwner, isPreferred})
})

deviceController.get('/:deviceId/prefer', isAuth, async (req, res)=>{
    // get device id
    const deviceId = req.params.deviceId;
    const userId = req.user.id;

    try {
        // Call service
    await deviceServcie.prefer(deviceId, userId) 
    
    } catch (err) {
        res.setError(getErrorMessage(err))
    }
    // redirect details
    res.redirect(`/devices/${deviceId}/details`)
});

deviceController.get('/:deviceId/delete', isAuth, async (req, res)=>{
    const deviceId = req.params.deviceId

    try {
        await deviceServcie.remove(deviceId, req.user.id)

        res.redirect('/devices')
    } catch (err) {
        res.setError(getErrorMessage(err))
        res.redirect(`/devices/${deviceId}/details`)
    }
} );

deviceController.get('/:deviceId/edit', isAuth, async(req,res)=>{
    // get current divece
    const deviceId = req.params.deviceId
    const device = await deviceServcie.getOne(deviceId)

    // check if owner
    if(!device.owner.equals(req.user.id)){
        res.setError('You are not offer of this offer')
      return  res.redirect(`/devices/${deviceId}/details`)
    }
    // render edit page
    res.render('devices/edit', {device})

});

deviceController.post('/:deviceId/edit', isAuth, async( req, res )=>{
    // get current divece
    const deviceId = req.params.deviceId;
    const userId = req.user.id;
    const deviceData = req.body;
   
    try {
        await deviceServcie.update(deviceId,userId, deviceData)
    
        res.redirect(`/devices/${deviceId}/details`)
    } catch (err) {
        res.render('devices/edit', {
            device: deviceData,
            error: getErrorMessage(err)
        })
    }
   
})



export default deviceController;