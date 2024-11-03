import Emitter from "../enitty/Emiter/emitter.entity";




const emiter = new Emitter();


setInterval(emiter.updateStocksForMainBroker, 5000);
