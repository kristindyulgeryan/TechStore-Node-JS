import { Router } from "express";

const homeController = Router();

homeController.get('/', (req, res)=>{
    res.render('home', { pageTitle: 'Techstore | Home'})
})

export default homeController