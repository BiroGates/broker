import { Request } from "express";
import { AbstractStockService, BuyStocksInput, SellStockInput } from "../../service/stock/stocks.service";
import { IStock } from "../../entity/stock/stock.entity";



type PickMatching<T> =
    {   [K in keyof T as T[K] extends Function ? K : never]: 
        ChangeReturnType<T[K], Parameters<T[K] extends (...args: any[]) => any ? T[K] : never>>}


type ChangeReturnType<K, NewReturn> = K extends (...args: any[]) => any
  ? (...args: any[]) => NewReturn
  : never;

type IStockValidator = PickMatching<AbstractStockService>;


export default class StockValidator implements IStockValidator {
    listStocks() {
        return [] as never;
    }

    listStockById(req: Request) {
        const { stockId } = req.params; 
        return [stockId] as unknown as [id: Pick<IStock, 'id'>];
    }
    
    createStocks(req: Request) {
        const { input } = req.body;
        input.forEach((data: any) => {
            if(data.name === '') {
                throw new Error('Nome não passado');
            }
            if(typeof data.currentPrice !== 'number') {
                throw new Error('Tipo nãop permitido');
            }
        });
        return [input] as [IStock[]];
    }

    buyStocks(req: Request) {
        const { walletId } = req.params;
        const { input } = req.body;

        
    
        return [input, walletId] as unknown as [input: BuyStocksInput[], walledId: string]
    }
    sellStocks(req: Request) {
        const { walletId } = req.params;
        const { input } = req.body;

        
        return [input, walletId] as unknown as [input: SellStockInput[], walledId: string]
    }
}





