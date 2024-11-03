import { Router } from "express";
import DoRequest from "../../../helpers/doRequest";
import NewsService from "../../service/news/news.service";
import NewsValidator from "../../validator/news/news.input.validator";
const newsService = new NewsService();
const newsValidator = new NewsValidator();


const doRequest = new DoRequest(Router());

doRequest.get('/news', newsService.listNews, newsValidator.listNews);
//doRequest.get('/news/:newsId', () => console.log('TODO'));

export default doRequest;
