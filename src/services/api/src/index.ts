import express from 'express';
import cors from 'cors';
import doRequest from './controller/stock/stock.controller';



const server = express();
server.use(cors());
server.use(express.json());


server.use(doRequest.router);


server.listen(4000 ,() => console.log('up and running'));
