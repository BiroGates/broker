import { Request } from "express";
import { AbstractNewsService } from "../../service/news/news.service";
import { PickMatching } from "../../../helpers/types";




type INewsValidator = PickMatching<AbstractNewsService>;


export default class NewsValidator implements INewsValidator {
    listNews(req: Request) {
        return [] as never;
    }
}