
import { differenceInSeconds } from "date-fns";
import BrokerRepository from "../../repository/broker.repository";
import ClockTrigger from "../ClockTrigger/clockTrigger.entity";
import Generator from "../Generator/generator.entity";
import BrokerService from "../../services/broker.service";

const brokerRepo = new BrokerRepository();
const brokerService = new BrokerService();
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
    durationTimeInSeconds: number;
    affectedFactorNumber: number;
    stage: number;
};


export default class Emitter {
    async updateStocksForMainBroker() {
        await brokerService.chooseNewsToAffectStock()
        const stocksAlreadyBeingAffected = await brokerRepo.listStocksThatAreBeingAffected();
        const stocksNotBeingAffected = await brokerRepo.listStocksThatAreNotBeingAffected();


        if(stocksAlreadyBeingAffected.length) {
            await brokerService.generatePriceToStocksAlreadyBeingAffected(stocksAlreadyBeingAffected);   
        };
        
        if (stocksNotBeingAffected) {
            await brokerService.generatePriceToStocksNotBeingAffected(stocksNotBeingAffected);
        };
    };
};