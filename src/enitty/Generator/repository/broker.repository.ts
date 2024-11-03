import { IStock, INews } from "../../Emiter/emitter.entity";
import pool from "../../../database/pool";
import { v4 as uuidv4 } from 'uuid';

export default class BrokerRepository {
    async chooseNewsToAffectStock() {
        const [rows]: any[] = (await pool.query('SELECT * FROM stock WHERE beingAffected = 0 ORDER BY rand() LIMIT 1'));
        return rows[0] as unknown as IStock;    
    }

    async listStocksThatAreBeingAffected() {
        const [rows] = (await pool.query('SELECT * FROM stock WHERE beingAffected = 1'));
        return rows as unknown as IStock[];
    };
    
    async listStocksThatAreNotBeingAffected() {
        const [rows] = (await pool.query('SELECT * FROM stock WHERE beingAffected = 0'));
        return rows as unknown as IStock[];
    };

    async listNewsByStocksIds(stockIds: string[]) {
        const [rows] = await pool.query('SELECT * FROM news WHERE stockId IN (?)', [stockIds]);
        return rows as unknown as INews[];
    };

    async getPreviousPriceForStock(stockId: string) {
        const [rows] = await pool.query('SELECT price FROM stock_price_history WHERE stockId = ? order by at DESC limit 1', [stockId]);
        return rows as unknown as { price: number }[];  
    }

    async listStocks(){};
    
    async updateStock(stock: IStock) {
        const [affectedRows] = await pool.query(`UPDATE stock SET name = ?, currentPrice = ?, maxPriceDay = ?, minPriceDay = ?, beingAffected = ?, affectedStage = ?, startBeingAffectedAt = ?, lastUpdate = ? WHERE id = ?`, 
            [
                stock.name, 
                stock.currentPrice, 
                stock.maxPriceDay, 
                stock.minPriceDay, 
                stock.beingAffected, 
                stock.affectedStage, 
                stock.startBeingAffectedAt, 
                stock.lastUpdate,
                stock.id
            ]);
        return affectedRows;
    };
    async updateStocks(){};

    async updateStockToAffectedStage(stock: IStock){
        const [affectedRows] = await pool.query('UPDATE stock SET beingAffected = 1, affectedStage = 0, startBeingAffectedAt = now() WHERE id = ?', [stock.id]);
        return affectedRows;
    };

    async insertIntoStockPriceHistory(stock: IStock) {
        const [affectedRows] = await pool.query('insert into stock_price_history (id, price, at, stockId) values (?, ?, ?, ?)', [uuidv4(), stock.currentPrice.toFixed(2), new Date(), stock.id]);
        return affectedRows;
    }

    
};