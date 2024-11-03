import Emitter from "../Emiter/emitter.entity";




const emiter = new Emitter();


setInterval(emiter.updateStocksForMainBroker, 2000);
