import { IStock } from "../enitty/Emiter/emitter.entity";
import BrokerRepository from "../repository/broker.repository";





const brokerRepo = new BrokerRepository();

export default class BrokerService {
    identifier: number;

    constructor() {
        this.identifier = 13;
    }

    async chooseNewsToAffectStock() {
        const random = Math.floor(Math.random() * 100);
        if(random > 25 && random < 50) {
            const stock: IStock = await brokerRepo.chooseNewsToAffectStock();
            if (stock) {
                await brokerRepo.updateStockToAffectedStage(stock);
                console.log(`stock ${stock.name} has been choose`);
            }
        }
        console.log(`skipping`);
        return;
    }
}