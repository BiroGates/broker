import express from 'express';
import cors from 'cors';


import BrokerController from './controller/broker.controller';
import Emitter from './enitty/Emiter/emitter.entity';



const server = express();
server.use(cors());
server.use(express.json());


server.use('/broker', BrokerController);

server.listen(3001, () => console.log('up and running'));


const emiter = new Emitter();


setInterval(emiter.updateStocksForMainBroker, 2000);



