import { IStock } from "../../entity/stock/stock.entity"
import pool from "../../../../../database/pool";
import { v4 as uuidv4 } from 'uuid';
import { BuyStocksInput, SellStockInput, SellStockPayload } from "../../service/stock/stocks.service";



abstract class AbstractStockRepository {
    abstract listStocks(): Promise<IStock[]>;
    abstract listStockById(id: Pick<IStock, 'id'>): Promise<IStock>;
    abstract createStocks(stocks: IStock[]): Promise<IStock[]>;
    abstract buyStocks(input: BuyStocksInput[], walletId: string): Promise<void>;
    abstract sellStocks(input: SellStockInput[], walletId: string): Promise<SellStockPayload[]>;
}


export default class StockRepository extends AbstractStockRepository{
    getWalletAvailableMoney = async (walletId: string) => {
        const [rows]: any[] = await pool.query('SELECT totalMoneyAmount FROM wallet WHERE id = ?', [walletId]);
        return rows[0].totalMoneyAmount as unknown as number;
    }

    getStockPrice = async (stockId: Pick<IStock, 'id'>) => {
        const [rows]: any[] = await pool.query('SELECT currentPrice FROM stock WHERE id = ?', [stockId]);
        return rows[0].currentPrice as unknown as number;
    }

    listStocks = async () => {
        const [rows]: any[] = (await pool.query('SELECT * FROM stock'));
        return rows as unknown as IStock[];    
    };

    listStockById = async (id: Pick<IStock, 'id'>) => {
        const [rows]: any[] = (await pool.query('SELECT * FROM stock WHERE id = ?', [id]));
        return rows[0] as IStock;
    }

    createStocks = async (stocks: IStock[]) => {
        const promises = stocks.map(async stock => {
            return await pool.query('INSERT INTO stock(id, name, currentPrice, maxPriceDay, minPriceDay,beingAffected, affectedStage, startBeingAffectedAt, lastUpdate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [stock.id, stock.name, stock.currentPrice, stock.maxPriceDay ?? null, stock.minPriceDay ?? null, stock.beingAffected ?? 0, stock.affectedStage ?? null, stock.startBeingAffectedAt ?? null, stock.lastUpdate])
        });
        await Promise.all(promises);
        return stocks;
    }

    buyStocks = async (input: BuyStocksInput[], walletId: string) => {
        const promises = input.map(async buyInfo => {
            const currentStockPrice = await this.getStockPrice(buyInfo.stockId);
            
            // Move this validatio to service
            if(!currentStockPrice) {
                throw new Error('Stock not found');
            }
            const stockAmount = buyInfo.moneyAmount / currentStockPrice;

            await pool.query('INSERT INTO wallet_stock(id, stockId, walletId, stockAmount, moneyAmount) values (?, ?, ?, ?, ?)', [uuidv4(), buyInfo.stockId, walletId, stockAmount, buyInfo.moneyAmount]);
            await pool.query('UPDATE wallet SET totalMoneyAmount = totalMoneyAmount - ?', [buyInfo.moneyAmount]);
        });
        await Promise.all(promises);
    }

    sellStocks = async (input: SellStockInput[], walletId: string) => {
        const promises = input.map(async sellInfo => {
            const currentStockPrice = await this.getStockPrice(sellInfo.stockId);
            const moneyToRecieveBySell = sellInfo.stockAmount * currentStockPrice;
            
            await pool.query('UPDATE wallet_stock SET stockAmount = stockAmount - ? WHERE walletId = ? and stockId = ?', [sellInfo.stockAmount, walletId, sellInfo.stockId])
            await pool.query('UPDATE wallet SET totalMoneyAmount = totalMoneyAmount + ? WHERE id = ?', [moneyToRecieveBySell, walletId]);


            return {
                soldStockId: sellInfo.stockId,
                moneyRecieved: moneyToRecieveBySell,
            } as unknown as SellStockPayload;
        })
        return await Promise.all(promises);
    }
}