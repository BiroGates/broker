import { Router } from "express";
import getInputsFromRequest from "../../../common/helpers/getInputsFromRequest";


export default class DoRequest {
    router: Router;

    constructor(router: Router) {
        this.router = router;
    }

    get(path: string, callBackFunction: Function, validator: Function) {
        this.router.get(path, async (req, res) => {
            try{
                const args = validator(req)
                const x =  await callBackFunction(args);
                res.status(200).send({
                    data: x,
                });
            }catch(e: any) {
                res.status(400).send({
                    error: e.message,
                })                
            }
        }) 
    }
    
    post(path: string, callBackFunction: Function, validator: Function) {
        this.router.post(path, async (req, res) => {
            try{
                const args = validator(req)
                const x =  await callBackFunction(...args);
                res.status(200).send({
                    data: x,
                });
            }catch(e: any) {
                res.status(400).send({
                    error: e.message,
                })                
            }
        }) 
    }
}