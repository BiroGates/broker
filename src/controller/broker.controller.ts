import { response, request } from "express";
import { Router } from "express";
import { authMiddleware } from "../common/authMiddleware";


const router = Router();



router.get('/stocks', authMiddleware, (req, res) => {
    try {
        
    } catch (e) {
    
    } 
});

router.post('/stocks/buy', authMiddleware, (req, res) => {
    try {

    } catch (e) {
    
    } 
});

router.post('/stocks/sell', authMiddleware, (req, res) => {
    try {

    } catch (e) {
    
    } 
});



