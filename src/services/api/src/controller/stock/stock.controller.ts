import { Router } from "express";
import DoRequest from "../../../helpers/doRequest";
import StockService from "../../service/stock/stocks.service";
import StockValidator from "../../validator/stock/stock.input.validator";

const stockService = new StockService();
const stockValidator = new StockValidator();
const doRequest = new DoRequest(Router());



doRequest.get('/stocks', stockService.listStocks, stockValidator.listStocks);
doRequest.get('/stocks/:stockId', stockService.listStockById, stockValidator.listStockById);
doRequest.post('/stocks/create', stockService.createStocks, stockValidator.createStocks);
doRequest.post('/stocks/buy/wallet/:walletId', stockService.buyStocks, stockValidator.buyStocks);
doRequest.post('/stocks/sell/wallet/:walletId', stockService.sellStocks, stockValidator.sellStocks);

//doRequest.get('/stocks/:stockId/news', () => console.log('TODO'));
//
//
//doRequest.get('/news', () => console.log('TODO'));
//doRequest.get('/news/:newsId', () => console.log('TODO'));


export default doRequest;
