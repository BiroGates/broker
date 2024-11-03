import Stock, { IStock } from "../../entity/stock/stock.entity";
import StockRepository from "../../repository/stocks/stocks.repository";
const stockRepository = new StockRepository();



export type CreateStocksInput = Exclude<IStock[], 'id'>
export interface BuyStocksInput {
    stockId: Pick<IStock, 'id'>;
    moneyAmount: number;
}
export interface SellStockInput {
    stockId: Pick<IStock, 'id'>;
    stockAmount: number;
}

export interface SellStockPayload {
    soldStockId: Pick<IStock, 'id'>;
    moneyRecieved: number;
}

export abstract class AbstractStockService {
    abstract listStocks(): Promise<IStock[]>;
    abstract listStockById(id: Pick<IStock, 'id'>): Promise<IStock>;
    abstract buyStocks(input: BuyStocksInput[], walledId: string): Promise<void>;
    abstract sellStocks(input: SellStockInput[], walledId: string): Promise<SellStockPayload[]>;
    abstract createStocks(stocks: IStock[]): Promise<IStock[]>;
    // abstract updateStocks: (stocks: IStock[]) => IStock[];
}



export default class StockService extends AbstractStockService {
    constructor() {
        super();
    }
    
    async listStocks() {
        return stockRepository.listStocks();
    };
    async listStockById(id: Pick<IStock, "id">) {
        return stockRepository.listStockById(id);
    };
    async buyStocks(input: BuyStocksInput[], walletId: string) {
        const totalMoneyOnOperation = input.reduce((acc, cur): number => {
            return acc += cur.moneyAmount;
        }, 0)
        const totalMoneyAvailableOnWallet = await stockRepository.getWalletAvailableMoney(walletId);

        if(totalMoneyAvailableOnWallet < totalMoneyOnOperation) {
            throw new Error('You dont have enough money to buy this/these stocks');
        }
        return stockRepository.buyStocks(input, walletId);
    };
    
    async sellStocks(input: SellStockInput[], walledId: string) {
        // TODO: Validate
        return stockRepository.sellStocks(input, walledId);
    }
   
    async createStocks(stocks: IStock[]) {
        const stocksToBeCreated = stocks.map(s => new Stock(s));
        return stockRepository.createStocks(stocksToBeCreated)
    };
    // async updateStocks() {};
}