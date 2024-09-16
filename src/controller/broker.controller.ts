import { response, request } from "express";
import { Router } from "express";
import { authMiddleware } from "../common/authMiddleware";
import BrokerService from "../services/broker.service";

const brokerService = new BrokerService();

const router = Router();



/*authMiddleware*/ 
// ENABLE AUTH MIDDLEWARE AFTER TESTS !!!!
router.get('/stocks', async (req, res) => {
    try {
        const stocks = await brokerService.listStocks();
        res.send({ 
            data: stocks
        })
    } catch (e: any) {
        res.send({
            error: e.message
        });
    } 
});

router.get('/stockById/:id', authMiddleware, async (req, res) => {
    try {
        const { stockId } = req.params;
        const stocks = await brokerService.getStockById(stockId);
        res.send({ 
            data: stocks
        })
    } catch (e: any) {
        res.send({
            error: e.message
        });
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


export default router;
