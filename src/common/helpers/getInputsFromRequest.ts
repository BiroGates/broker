import { Request } from "express";
import { EndPointDefaultInput } from "../types/endpoint.default.input";

const regexForPathParams = RegExp(':\\w+', 'g');
const regexForQueryParams = RegExp('(\\?\\w+)|(\\&\\w+)', 'g');

const getInputsFromRequest = (req: Request, path: string): EndPointDefaultInput => {
    const sanitizedInput = { ...req.body.input };
    const pathParams = req.params
    const queryParams = req.query;


    // TODO: Find a better way to do it in the future, that's terrible
    const pathParamsIdentifier = path.matchAll(regexForPathParams);
    const queryParamsIdentifier = path.matchAll(regexForQueryParams);
    for(const match of pathParamsIdentifier) {
        const id = match[0].substring(1 ,match[0].length);
        Object.defineProperty(sanitizedInput, id, { value:  pathParams[id]});
    }
    
    for(const match of queryParamsIdentifier) {
        const id = match[0].substring(1 ,match[0].length);
        Object.defineProperty(sanitizedInput, id, { value:  queryParams[id]});
    }
    
    // This might be not as performatic as I wish as well, review later on.
    return {
        input: sanitizedInput,
    }
}

export default getInputsFromRequest;