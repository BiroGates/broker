import { v4 } from "uuid";

export interface IStock {
    id: string;
    name: string;
    currentPrice?: number;
    maxPriceDay?: number;
    minPriceDay?: number;
    beingAffected?: boolean;
    affectedStage?: number | null;
    startBeingAffectedAt?: Date | null;
    lastUpdate?: Date;
}


export default class Stock implements IStock {
    id: string;
    name: string;
    currentPrice?: number;
    maxPriceDay?: number;
    minPriceDay?: number;
    beingAffected?: boolean;
    affectedStage?: number | null;
    startBeingAffectedAt?: Date | null;
    lastUpdate?: Date;

    constructor (input: IStock) {
        this.id = v4(),
        this.name = input.name;
        this.currentPrice = input.currentPrice;
        this.maxPriceDay = input.maxPriceDay;
        this.minPriceDay = input.minPriceDay;
        this.beingAffected = input.beingAffected;
        this.affectedStage = input.affectedStage;
        this.startBeingAffectedAt = input.startBeingAffectedAt;
        this.lastUpdate = new Date();
    }
}