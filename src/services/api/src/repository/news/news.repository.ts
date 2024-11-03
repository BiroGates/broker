import { INews } from "../../entity/news/news.entity";
import pool from "../../../../../database/pool";






export abstract class AbstractNewsRepository {
    abstract listNews(): Promise<INews[]>;
    //abstract listNewsById(): Promise<INews>;
    //abstract listNewsByStockId(): Promise<INews[]>;
}


export default class NewsRepository extends AbstractNewsRepository{
    async listNews() {
        const [rows] = await pool.query('SELECT * FROM news');
        return rows as unknown as INews[];
    }

}