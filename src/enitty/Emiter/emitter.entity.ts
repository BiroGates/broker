
import BrokerRepository from "../../repository/broker.repository";
import ClockTrigger from "../ClockTrigger/clockTrigger.entity";
import Generator from "../Generator/generator.entity";

const brokerRepo = new BrokerRepository();
const clockTrigger = new ClockTrigger();
const generator = new Generator();

export interface IStock {
    id: string;
    name: string;
    currentPrice: number;
    maxPriceDay: number;
    minPriceDay: number;
    beingAffected: boolean;
    affectedStage?: number | null;
    startBeingAffectedAt?: Date | null;
    lastUpdate: Date;
};

export interface INews {
    stockId: string;
    durationTimeInSecons: number;
    affectedFactorNumber: number;
    stage: number;
};


export default class Emitter {
    async updateStocksForMainBroker() {
        console.log('Executed!');
        // const stocksToBeAffectedByNews = (generator.chooseNewsToAffectStock()) as unknown as INews[];
        // if(stocksToBeAffectedByNews) {
        //    brokerRepo.updateStocksToAffectedStage(stocksToBeAffectedByNews);
        //}
        
        const stocksAlreadyBeingAffected = await brokerRepo.listStocksThatAreBeingAffected();
        const stocksNotBeingAffected = await brokerRepo.listStocksThatAreNotBeingAffected();


        if(stocksAlreadyBeingAffected.length) {
            const ids = stocksAlreadyBeingAffected.map(item => {
                return item.id;
            });

            const news = await brokerRepo.listNewsByStocksIds(ids);
            
            const promises = stocksAlreadyBeingAffected.map(async stock => {
                
                const currentNewsByStockId = news.filter(item => item.stockId === stock.id);
                const currentStageByNews = currentNewsByStockId.find(item => item.stage === stock.affectedStage);

                if (currentStageByNews) {
                    const timeElapsed = 120;
    
                    if(timeElapsed > currentStageByNews.durationTimeInSecons) {
                        stock.affectedStage = currentStageByNews.stage + 1;
                        stock.startBeingAffectedAt = new Date();   
                    }
                    
                    stock.currentPrice = generator.generateStockPriceAffectedByNews(currentStageByNews.affectedFactorNumber,stock.currentPrice);

                } else {
                    stock.beingAffected = false;
                    stock.affectedStage = null;
                    stock.startBeingAffectedAt = null;
                }
                await brokerRepo.updateStock(stock);
                await brokerRepo.insertIntoStockPriceHistory(stock);
            });
            await Promise.all(promises);
        };

        if (stocksNotBeingAffected) {
            const promises = stocksNotBeingAffected.map(async stock => {
                const previousPrice = await brokerRepo.getPreviousPriceForStock(stock.id);
                
                console.log(stock.currentPrice);
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
        };
    };
};