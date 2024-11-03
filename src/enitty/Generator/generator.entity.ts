
import { INews } from "../Emiter/emitter.entity";



export default class Generator {
    volatility;
    timeStep;
    drift;
    constructor() {
        this.volatility = 0.2;
        this.timeStep =  1 / 252;
        // tendencia pra subir;
        this.drift = .05;
    }
    
    chooseNewsToAffectStock() {};
    

    generateStockPriceAffectedByNews(
        drift: number,              
        currentPrice: number        
    ): number {
        const randomShock = Math.sqrt(this.timeStep) * this.generateRandom();
        const priceChange = drift * currentPrice * this.timeStep + this.volatility * currentPrice * randomShock;
        return currentPrice + priceChange;
    }

    generateStockPrice(
        previousPrice: number        
    ): number {
        const randomShock = Math.sqrt(this.timeStep) * this.generateRandom();
        const priceChange = this.drift * previousPrice * this.timeStep + this.volatility * previousPrice * randomShock;
        return previousPrice + priceChange;
    }


    generateRandom() {
        let u = 0, v = 0;
        while (u === 0) u = Math.random(); // Converte [0,1) para (0,1)
        while (v === 0) v = Math.random();
        return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    }

};