import { Router } from "express";

const homeController = Router();

homeController.get('/', (req, res)=>{
    res.send('it works')
})

export default homeController