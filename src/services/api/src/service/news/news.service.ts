import { INews } from "../../entity/news/news.entity";
import NewsRepository from "../../repository/news/news.repository";
const newsRepository = new NewsRepository();


export abstract class AbstractNewsService {
    abstract listNews(): Promise<INews[]>;
    //abstract listNewsById(): Promise<INews>;
    //abstract listNewsByStockId(): Promise<INews[]>;
    // abstract createNews(): Promise<Pick<INews, 'id'>[]>
}



export default class NewsService extends AbstractNewsService{
    async listNews() {
        return newsRepository.listNews();
    }
}