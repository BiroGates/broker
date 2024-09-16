import { differenceInSeconds } from "date-fns";
import { IStock } from "../enitty/Emiter/emitter.entity";
import Generator from "../enitty/Generator/generator.entity";
import BrokerRepository from "../repository/broker.repository";



const generator = new Generator();
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

    async generatePriceToStocksAlreadyBeingAffected(stocksAlreadyBeingAffected: IStock[]): Promise<void> {
        const ids = stocksAlreadyBeingAffected.map(item => {
            return item.id;
        });

        const news = await brokerRepo.listNewsByStocksIds(ids);
        
        const promises = stocksAlreadyBeingAffected.map(async stock => {
            
            // Change this to be N -> N
            const currentNewsByStockId = news.filter(item => item.stockId === stock.id);
            const currentStageByNews = currentNewsByStockId.find(item => item.stage === (stock.affectedStage ?? 0));

            if (currentStageByNews) {
                let timeElapsed = 0;
                // Make it better
                if (stock.startBeingAffectedAt) {
                    timeElapsed = differenceInSeconds(new Date(), stock.startBeingAffectedAt);
                }
                
                if(timeElapsed > currentStageByNews.durationTimeInSeconds) {
                    stock.affectedStage = currentStageByNews.stage + 1;
                    stock.startBeingAffectedAt = new Date();   
                }
                
                stock.currentPrice = generator.generateStockPriceAffectedByNews(currentStageByNews.affectedFactorNumber, stock.currentPrice);

            } else {
                stock.beingAffected = false;
                stock.affectedStage = null;
                stock.startBeingAffectedAt = null;
            }
            console.log(stock.currentPrice);
            await brokerRepo.updateStock(stock);
            await brokerRepo.insertIntoStockPriceHistory(stock);
        });
        await Promise.all(promises);
    }

    async generatePriceToStocksNotBeingAffected(stocksNotBeingAffected: IStock[]) {
        
        const promises = stocksNotBeingAffected.map(async stock => {
            const previousPrice = await brokerRepo.getPreviousPriceForStock(stock.id);
            
            if (!previousPrice.length) {
                stock.currentPrice = generator.generateStockPrice(stock.currentPrice);
            } else {
                stock.currentPrice = generator.generateStockPrice(previousPrice[0].price);
            }
            
            console.log(stock.currentPrice);
            await brokerRepo.updateStock(stock);
            await brokerRepo.insertIntoStockPriceHistory(stock);
        });
        await Promise.all(promises);
    }

    async listStocks(): Promise<IStock[]> {
        return await brokerRepo.listStocks();
    }

    async getStockById(stockId: string) {
        

    }
}